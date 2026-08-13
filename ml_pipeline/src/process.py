import os
import numpy as np
from Bio import SeqIO
from sklearn.feature_extraction import FeatureHasher
from sklearn.preprocessing import normalize
import scipy.sparse

def extract_kmers(sequence: str, k: int = 12):
    """Yields k-mers of length k from a string sequence."""
    seq_len = len(sequence)
    for i in range(seq_len - k + 1):
        yield sequence[i:i+k]

def process_fasta(fasta_path: str, k: int = 12, n_features: int = 2**20):
    """Extracts k-mers and applies Feature Hashing in a memory-efficient stream."""
    print(f"Reading FASTA: {fasta_path}")
    labels = []
    
    def kmer_generator():
        for record in SeqIO.parse(fasta_path, "fasta"):
            label = record.id.split('|')[-1]
            labels.append(label)
            yield extract_kmers(str(record.seq).upper(), k)

    print(f"Applying Feature Hashing (k={k}, features={n_features})...")
    # input_type="string" expects an iterable of strings (our k-mer generator)
    hasher = FeatureHasher(n_features=n_features, input_type="string", alternate_sign=False)
    X = hasher.transform(kmer_generator())
    
    print("Applying L1 Normalization...")
    X_normalized = normalize(X, norm='l1')
    
    return X_normalized, np.array(labels)

def main():
    data_dir = os.path.join(os.path.dirname(__file__), "..", "data")
    fasta_path = os.path.join(data_dir, "lake_ecosystem.fasta")
    out_features = os.path.join(data_dir, "features.npz")
    out_labels = os.path.join(data_dir, "labels.npy")

    if not os.path.exists(fasta_path):
        print(f"Error: Could not find {fasta_path}. Run dataset.py first.")
        return

    X, y = process_fasta(fasta_path, k=12)
    
    print(f"\nSaving sparse matrix (Shape: {X.shape}) to {os.path.abspath(out_features)}")
    scipy.sparse.save_npz(out_features, X)
    
    print(f"Saving labels to {os.path.abspath(out_labels)}")
    np.save(out_labels, y)
    
    print("\nSuccess! Data processing complete.")

if __name__ == "__main__":
    main()
