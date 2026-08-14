"""
Biodiversity service — computes ecological metrics from batch prediction results.
"""
import math
from typing import List, Dict, Any
from collections import Counter


def compute_biodiversity(predictions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Compute biodiversity metrics from a list of prediction results.

    Returns:
        species_richness: Number of unique species detected
        shannon_index: Shannon Diversity Index (H' = -Σ pᵢ ln pᵢ)
        abundance: Species name → count mapping
        native_count: Count of native species detections
        invasive_count: Count of invasive species detections
        other_count: Count of other/unknown species detections
    """
    # Filter to successful predictions only
    successful = [p for p in predictions if p.get("status") == "success"]

    if not successful:
        return {
            "species_richness": 0,
            "shannon_index": 0.0,
            "abundance": {},
            "native_count": 0,
            "invasive_count": 0,
            "other_count": 0,
        }

    # Count species occurrences
    species_counts = Counter(p["prediction"] for p in successful)
    total = sum(species_counts.values())

    # Species richness (S)
    species_richness = len(species_counts)

    # Shannon Diversity Index: H' = -Σ (pᵢ * ln(pᵢ))
    shannon_index = 0.0
    for count in species_counts.values():
        if count > 0:
            p_i = count / total
            shannon_index -= p_i * math.log(p_i)

    # Round to 4 decimal places
    shannon_index = round(shannon_index, 4)

    # Group counts
    group_counts = Counter(p.get("group", "Unknown") for p in successful)

    return {
        "species_richness": species_richness,
        "shannon_index": shannon_index,
        "abundance": dict(species_counts),
        "native_count": group_counts.get("Native", 0),
        "invasive_count": group_counts.get("Invasive", 0),
        "other_count": group_counts.get("Other", 0) + group_counts.get("Unknown", 0),
    }
