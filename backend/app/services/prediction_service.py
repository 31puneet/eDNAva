"""
Prediction service — wraps the ML pipeline predictor for use by the API layer.
Handles single and batch predictions with species group enrichment.
"""
import sys
import os

# Add project root to path so ml_pipeline is importable
_project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
if _project_root not in sys.path:
    sys.path.insert(0, _project_root)

from ml_pipeline.src.predictor import predict_sequence, load_resources
from ml_pipeline.src.dataset import SPECIES_MAP
from typing import List, Dict, Any

# Build a reverse lookup: species_name → group
_SPECIES_TO_GROUP: Dict[str, str] = {}
for group, species_list in SPECIES_MAP.items():
    for species in species_list:
        _SPECIES_TO_GROUP[species] = group


def get_species_group(species_name: str) -> str:
    """Look up the ecological group (Native/Invasive/Other) for a predicted species."""
    return _SPECIES_TO_GROUP.get(species_name, "Unknown")


def predict_single(sequence: str) -> Dict[str, Any]:
    """
    Run a single DNA sequence through the ML model.
    Enriches the result with the species group classification.
    """
    result = predict_sequence(sequence)
    result["group"] = get_species_group(result["prediction"])
    return result


def predict_batch(sequences: List[str]) -> List[Dict[str, Any]]:
    """
    Run multiple DNA sequences through the ML model.
    Returns a list of enriched prediction results.
    """
    results = []
    for seq in sequences:
        try:
            result = predict_single(seq)
            results.append(result)
        except Exception as e:
            results.append({
                "prediction": "Error",
                "confidence": 0.0,
                "status": "error",
                "group": "Unknown",
                "error": str(e)
            })
    return results


def is_model_loaded() -> bool:
    """Check if the ML model is currently loaded in memory."""
    from ml_pipeline.src.predictor import _MODEL
    return _MODEL is not None


def preload_model():
    """Pre-load the ML model into memory (called on app startup)."""
    try:
        load_resources()
        return True
    except FileNotFoundError:
        return False
