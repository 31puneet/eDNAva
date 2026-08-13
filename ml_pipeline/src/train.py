import os
import numpy as np
import scipy.sparse
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report
import lightgbm as lgb

def train_and_evaluate():
    data_dir = os.path.join(os.path.dirname(__file__), "..", "data")
    model_dir = os.path.join(os.path.dirname(__file__), "..", "models")
    os.makedirs(model_dir, exist_ok=True)
    
    features_path = os.path.join(data_dir, "features.npz")
    labels_path = os.path.join(data_dir, "labels.npy")
    model_path = os.path.join(model_dir, "edna_model.pkl")
    encoder_path = os.path.join(model_dir, "label_encoder.pkl")
    
    if not os.path.exists(features_path) or not os.path.exists(labels_path):
        print("Error: features.npz or labels.npy not found. Run process.py first.")
        return None
        
    print("Loading sparse matrix and labels...")
    X = scipy.sparse.load_npz(features_path)
    y_str = np.load(labels_path)
    
    print("Encoding labels...")
    le = LabelEncoder()
    y = le.fit_transform(y_str)
    
    print("Splitting dataset (80% Train, 20% Test)...")
    # stratify=y ensures the 80/20 split is perfectly balanced across all 3 classes
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    print("Initializing LightGBM Model...")
    # Parameters optimized for highly sparse datasets
    model = lgb.LGBMClassifier(
        objective='multiclass',
        num_leaves=31,
        feature_fraction=0.8,
        random_state=42,
        n_jobs=-1
    )
    
    print("Training model (this may take a minute)...")
    model.fit(X_train, y_train)
    
    print("\n--- Evaluation on Test Set (4000 Sequences) ---")
    y_pred = model.predict(X_test)
    
    # Print the text-based classification report (Precision, Recall, F1)
    report = classification_report(y_test, y_pred, target_names=le.classes_)
    print(report)
    
    print(f"\nSaving model to {os.path.abspath(model_path)}...")
    joblib.dump(model, model_path)
    joblib.dump(le, encoder_path)
    
    print("Success! Training complete.")
    return {
        'y_test': y_test,
        'y_pred': y_pred,
        'classes': le.classes_,
        'report': report
    }

if __name__ == "__main__":
    train_and_evaluate()
