import os
import sys
import joblib
import numpy as np
from sklearn.feature_extraction import FeatureHasher
from sklearn.preprocessing import normalize
from typing import Dict, Any
import random
from Bio import SeqIO

_MODEL = None
_LABEL_ENCODER = None
_HASHER = None

def _extract_kmers(sequence: str, k: int = 12):
    """Yields k-mers of length k from a sequence."""
    seq_len = len(sequence)
    for i in range(seq_len - k + 1):
        yield sequence[i:i+k]

def load_resources():
    """Loads the model and encoder into memory if not already loaded."""
    global _MODEL, _LABEL_ENCODER, _HASHER
    if _MODEL is not None and _LABEL_ENCODER is not None:
        return

    model_dir = os.path.join(os.path.dirname(__file__), "..", "models")
    model_path = os.path.join(model_dir, "edna_model.pkl")
    encoder_path = os.path.join(model_dir, "label_encoder.pkl")
    
    if not os.path.exists(model_path) or not os.path.exists(encoder_path):
        raise FileNotFoundError("Model files not found. Please train the model first.")
        
    _MODEL = joblib.load(model_path)
    _LABEL_ENCODER = joblib.load(encoder_path)
    
    # Initialize the exact same hasher used in training
    _HASHER = FeatureHasher(n_features=2**20, input_type="string", alternate_sign=False)

def predict_sequence(sequence: str, threshold: float = 0.70) -> Dict[str, Any]:
    """
    Predicts the taxonomy of a single DNA sequence.
    If the maximum probability is below 70%, returns 'Unknown Species'.
    """
    load_resources()
    
    sequence = sequence.strip().upper()
    
    # Preprocess: extract k-mers, hash, normalize
    kmers_gen = _extract_kmers(sequence)
    X_sparse = _HASHER.transform([kmers_gen])
    X_normalized = normalize(X_sparse, norm='l1')
    
    probabilities = _MODEL.predict_proba(X_normalized)[0]
    
    max_prob_index = np.argmax(probabilities)
    max_prob = probabilities[max_prob_index]
   
    if max_prob < threshold:
        return {
            "prediction": "Unknown Species",
            "confidence": round(float(max_prob) * 100, 2),
            "status": "below_threshold"
        }
        
    predicted = _MODEL.classes_[max_prob_index]
    predicted_class = _LABEL_ENCODER.inverse_transform([predicted])[0]
    
    return {
        "prediction": predicted_class,
        "confidence": round(float(max_prob) * 100, 2),
        "status": "success"
    }

if __name__ == "__main__":
    print("Testing Predictor Module with REAL data...")
    
    fasta_path = os.path.join(os.path.dirname(__file__), "..", "data", "lake_ecosystem.fasta")
    
    if not os.path.exists(fasta_path):
        print("Error: Could not find lake_ecosystem.fasta. Run dataset.py first.")
        sys.exit(1)
        
    test_records = [r for r in SeqIO.parse(fasta_path, "fasta") if "|Test" in r.id]
    
    if test_records:
        random_record = random.choice(test_records)
        actual_species = random_record.id.split('|')[1].replace('_', ' ')
        real_dna = str(random_record.seq)
        
        try:
            result = predict_sequence(real_dna)
            print(f"Target: {actual_species}")
            print(f"Prediction: {result['prediction']} ({result['confidence']}%)")
            print(f"Match: {result['prediction'] == actual_species}")
        except Exception as e:
            print(f"Error: {e}")
            sys.exit(1)
