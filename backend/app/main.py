"""
eDNAva — FastAPI Application Entry Point.
Identifies Taxonomy and Assesses Biodiversity from eDNA Datasets.
"""
import sys
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Ensure project root is on sys.path for ml_pipeline imports
_project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
if _project_root not in sys.path:
    sys.path.insert(0, _project_root)

from .api.routes import router
from .models.database import init_db
from .services.prediction_service import preload_model


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan: initialize DB and pre-load ML model on startup."""
    print("🧬 eDNAva API starting up...")
    init_db()
    print("  ✅ Database initialized")

    model_loaded = preload_model()
    if model_loaded:
        print("  ✅ ML model loaded into memory")
    else:
        print("  ⚠️  ML model not found — run the training pipeline first")
        print("     python ml_pipeline/src/dataset.py")
        print("     python ml_pipeline/src/process.py")
        print("     python ml_pipeline/src/train.py")

    yield
    print("🧬 eDNAva API shutting down...")


app = FastAPI(
    title="eDNAva API",
    description="Identifying Taxonomy and Assessing Biodiversity from eDNA Datasets",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8443",
        "http://127.0.0.1:8443",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(router)
