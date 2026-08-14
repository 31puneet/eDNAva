import os
import numpy as np
import scipy.sparse
import joblib
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report
import lightgbm as lgb

def train_and_evaluate():
    data_dir = os.path.join(os.path.dirname(__file__), "..", "data")
    model_dir = os.path.join(os.path.dirname(__file__), "..", "models")
    os.makedirs(model_dir, exist_ok=True)
    
    print("Loading strictly isolated Train and Test matrices...")
    X_train = scipy.sparse.load_npz(os.path.join(data_dir, "X_train.npz"))
    X_test = scipy.sparse.load_npz(os.path.join(data_dir, "X_test.npz"))
    y_train_str = np.load(os.path.join(data_dir, "y_train.npy"))
    y_test_str = np.load(os.path.join(data_dir, "y_test.npy"))
    
    print("Encoding 20 Target Species labels...")
    le = LabelEncoder()
    le.fit(y_train_str)
    y_train = le.transform(y_train_str)
    y_test = le.transform(y_test_str)
    
    print("Initializing LightGBM Model (20 Classes)...")
    model = lgb.LGBMClassifier(
        objective='multiclass',
        num_leaves=31,
        feature_fraction=0.8,
        random_state=42,
        n_jobs=-1
    )
    
    print("Training model...")
    model.fit(X_train, y_train)
    
    print("\n--- Evaluation on Strictly Isolated Test Set ---")
    y_pred = model.predict(X_test)
    
    report = classification_report(y_test, y_pred, target_names=le.classes_)
    print(report)
    
    model_path = os.path.join(model_dir, "edna_model.pkl")
    encoder_path = os.path.join(model_dir, "label_encoder.pkl")
    
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
