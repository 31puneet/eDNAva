"""
Pydantic schemas for eDNAva API request/response models.
"""
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime


# ─── Request Models ────────────────────────────────────────────────
class PredictRequest(BaseModel):
    """Single DNA sequence prediction request."""
    sequence: str = Field(
        ...,
        min_length=50,
        description="Raw DNA sequence string (ATCG characters)"
    )


# ─── Response Models ──────────────────────────────────────────────
class PredictResponse(BaseModel):
    """Single sequence prediction result."""
    prediction: str
    confidence: float
    status: str
    group: str = "Unknown"


class BiodiversityMetrics(BaseModel):
    """Computed biodiversity statistics for a batch analysis."""
    species_richness: int = Field(description="Number of unique species detected")
    shannon_index: float = Field(description="Shannon Diversity Index (H')")
    abundance: Dict[str, int] = Field(description="Species name → count mapping")
    native_count: int = 0
    invasive_count: int = 0
    other_count: int = 0


class BatchAnalysisResponse(BaseModel):
    """Full batch analysis result with biodiversity metrics."""
    analysis_id: str
    total_sequences: int
    predictions: List[PredictResponse]
    biodiversity: BiodiversityMetrics
    created_at: str


class AnalysisHistoryItem(BaseModel):
    """Summary of a past analysis for the history list."""
    analysis_id: str
    total_sequences: int
    species_found: int
    shannon_index: float
    native_count: int
    invasive_count: int
    created_at: str
    filename: Optional[str] = None


class AnalysisHistoryResponse(BaseModel):
    """List of past analyses."""
    analyses: List[AnalysisHistoryItem]
    total: int


class HealthResponse(BaseModel):
    """Health check response."""
    status: str
    model_loaded: bool
    version: str = "1.0.0"
