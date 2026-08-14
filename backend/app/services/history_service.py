"""
History service — CRUD operations for analysis history in the database.
"""
from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from ..models.database import Analysis, Prediction


def save_analysis(
    db: Session,
    analysis_id: str,
    predictions: List[Dict[str, Any]],
    biodiversity: Dict[str, Any],
    filename: Optional[str] = None,
) -> Analysis:
    """Save a complete analysis (predictions + biodiversity metrics) to the database."""
    analysis = Analysis(
        id=analysis_id,
        filename=filename,
        total_sequences=len(predictions),
        species_found=biodiversity["species_richness"],
        shannon_index=biodiversity["shannon_index"],
        native_count=biodiversity["native_count"],
        invasive_count=biodiversity["invasive_count"],
        other_count=biodiversity.get("other_count", 0),
    )
    db.add(analysis)

    for i, pred in enumerate(predictions):
        db_pred = Prediction(
            analysis_id=analysis_id,
            sequence_index=i,
            prediction=pred["prediction"],
            confidence=pred["confidence"],
            status=pred["status"],
            group=pred.get("group", "Unknown"),
        )
        db.add(db_pred)

    db.commit()
    db.refresh(analysis)
    return analysis


def get_analysis_list(db: Session, limit: int = 50, offset: int = 0) -> List[Analysis]:
    """Get a paginated list of past analyses, most recent first."""
    return (
        db.query(Analysis)
        .order_by(Analysis.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )


def get_analysis_count(db: Session) -> int:
    """Get total number of analyses."""
    return db.query(Analysis).count()


def get_analysis_by_id(db: Session, analysis_id: str) -> Optional[Analysis]:
    """Get a single analysis by ID, including its predictions."""
    return db.query(Analysis).filter(Analysis.id == analysis_id).first()


def get_predictions_for_analysis(db: Session, analysis_id: str) -> List[Prediction]:
    """Get all predictions for a given analysis."""
    return (
        db.query(Prediction)
        .filter(Prediction.analysis_id == analysis_id)
        .order_by(Prediction.sequence_index)
        .all()
    )
