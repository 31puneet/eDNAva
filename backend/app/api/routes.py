"""
eDNAva API Routes — connects frontend to ML pipeline via REST endpoints.
"""
import uuid
from io import StringIO
from typing import Optional

from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Query
from sqlalchemy.orm import Session
from Bio import SeqIO

from .schemas import (
    PredictRequest,
    PredictResponse,
    BatchAnalysisResponse,
    BiodiversityMetrics,
    AnalysisHistoryItem,
    AnalysisHistoryResponse,
    HealthResponse,
)
from ..services import prediction_service, biodiversity_service, history_service
from ..models.database import get_db

router = APIRouter(prefix="/api")


@router.get("/health", response_model=HealthResponse)
def health_check():
    """Health check — confirms the API and ML model status."""
    return HealthResponse(
        status="ok",
        model_loaded=prediction_service.is_model_loaded(),
    )


@router.post("/predict", response_model=PredictResponse)
def predict_single(request: PredictRequest, db: Session = Depends(get_db)):
    """
    Predict the species taxonomy of a single DNA sequence.
    Also saves the result to the analysis history.
    """
    result = prediction_service.predict_single(request.sequence)

    # Save as a single-sequence analysis
    analysis_id = str(uuid.uuid4())[:8]
    bio_metrics = biodiversity_service.compute_biodiversity([result])
    history_service.save_analysis(db, analysis_id, [result], bio_metrics)

    return PredictResponse(**result)


@router.post("/analyze/batch", response_model=BatchAnalysisResponse)
async def analyze_batch(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    """
    Upload a FASTA file for batch species prediction.
    Parses all sequences, predicts each, computes biodiversity metrics.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    # Validate file type
    valid_extensions = (".fasta", ".fa", ".fna", ".fas")
    if not any(file.filename.lower().endswith(ext) for ext in valid_extensions):
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Expected FASTA file ({', '.join(valid_extensions)})",
        )

    # Read and parse FASTA content
    try:
        content = await file.read()
        text = content.decode("utf-8")
        records = list(SeqIO.parse(StringIO(text), "fasta"))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse FASTA file: {str(e)}")

    if not records:
        raise HTTPException(status_code=400, detail="No valid sequences found in the file")

    if len(records) > 500:
        raise HTTPException(status_code=400, detail="Maximum 500 sequences per upload")

    # Extract raw sequences
    sequences = [str(record.seq).upper() for record in records]

    # Run batch prediction
    predictions = prediction_service.predict_batch(sequences)

    # Compute biodiversity metrics
    bio_metrics = biodiversity_service.compute_biodiversity(predictions)

    # Save to history
    analysis_id = str(uuid.uuid4())[:8]
    analysis = history_service.save_analysis(
        db, analysis_id, predictions, bio_metrics, filename=file.filename
    )

    return BatchAnalysisResponse(
        analysis_id=analysis_id,
        total_sequences=len(predictions),
        predictions=[PredictResponse(**p) for p in predictions],
        biodiversity=BiodiversityMetrics(**bio_metrics),
        created_at=analysis.created_at.isoformat(),
    )


@router.get("/history", response_model=AnalysisHistoryResponse)
def get_history(
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
):
    """Get paginated list of past analyses."""
    analyses = history_service.get_analysis_list(db, limit=limit, offset=offset)
    total = history_service.get_analysis_count(db)

    items = [
        AnalysisHistoryItem(
            analysis_id=a.id,
            total_sequences=a.total_sequences,
            species_found=a.species_found,
            shannon_index=a.shannon_index,
            native_count=a.native_count,
            invasive_count=a.invasive_count,
            created_at=a.created_at.isoformat(),
            filename=a.filename,
        )
        for a in analyses
    ]

    return AnalysisHistoryResponse(analyses=items, total=total)


@router.get("/biodiversity/{analysis_id}", response_model=BiodiversityMetrics)
def get_biodiversity(analysis_id: str, db: Session = Depends(get_db)):
    """Get biodiversity metrics for a specific analysis."""
    analysis = history_service.get_analysis_by_id(db, analysis_id)
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")

    # Reconstruct biodiversity from stored predictions
    preds = history_service.get_predictions_for_analysis(db, analysis_id)
    pred_dicts = [
        {
            "prediction": p.prediction,
            "confidence": p.confidence,
            "status": p.status,
            "group": p.group,
        }
        for p in preds
    ]

    bio_metrics = biodiversity_service.compute_biodiversity(pred_dicts)
    return BiodiversityMetrics(**bio_metrics)
