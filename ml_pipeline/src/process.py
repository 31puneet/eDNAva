import os
import numpy as np
from Bio import SeqIO
from sklearn.feature_extraction import FeatureHasher
from sklearn.preprocessing import normalize
import scipy.sparse

def extract_kmers(sequence: str, k: int = 12):
    seq_len = len(sequence)
    for i in range(seq_len - k + 1):
        yield sequence[i:i+k]

def process_fasta(fasta_path: str, k: int = 12, n_features: int = 2**20):
    print(f"Reading FASTA: {fasta_path}")
    
    train_labels = []
    test_labels = []
    train_kmers = []
    test_kmers = []
    
    print("Parsing strictly isolated sequences...")
    for record in SeqIO.parse(fasta_path, "fasta"):
        # Header: seq_00000|Dreissena_polymorpha|Invasive|Train
        parts = record.id.split('|')
        species_label = parts[1].replace('_', ' ')
        split_tag = parts[3]
        
        kmers = list(extract_kmers(str(record.seq).upper(), k))
        
        if split_tag == "Train":
            train_labels.append(species_label)
            train_kmers.append(kmers)
        else:
            test_labels.append(species_label)
            test_kmers.append(kmers)

    print(f"Applying Feature Hashing (k={k}, features={n_features})...")
    hasher = FeatureHasher(n_features=n_features, input_type="string", alternate_sign=False)
    
    X_train = hasher.transform(train_kmers)
    X_test = hasher.transform(test_kmers)
    
    print("Applying L1 Normalization...")
    X_train_norm = normalize(X_train, norm='l1')
    X_test_norm = normalize(X_test, norm='l1')
    
    return X_train_norm, np.array(train_labels), X_test_norm, np.array(test_labels)

def main():
    data_dir = os.path.join(os.path.dirname(__file__), "..", "data")
    fasta_path = os.path.join(data_dir, "lake_ecosystem.fasta")
    
    if not os.path.exists(fasta_path):
        print(f"Error: Could not find {fasta_path}. Run dataset.py first.")
        return

    X_train, y_train, X_test, y_test = process_fasta(fasta_path, k=12)
    
    print("Saving separate Train and Test sparse matrices...")
    scipy.sparse.save_npz(os.path.join(data_dir, "X_train.npz"), X_train)
    scipy.sparse.save_npz(os.path.join(data_dir, "X_test.npz"), X_test)
    np.save(os.path.join(data_dir, "y_train.npy"), y_train)
    np.save(os.path.join(data_dir, "y_test.npy"), y_test)
    
    print("\nSuccess! Data processing complete.")

if __name__ == "__main__":
    main()
