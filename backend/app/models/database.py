"""
SQLAlchemy database setup and models for eDNAva.
Uses SQLite for the SIH demo — easily swappable to PostgreSQL.
"""
import os
from datetime import datetime, timezone
from sqlalchemy import create_engine, Column, String, Integer, Float, DateTime, Text, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

# SQLite database stored in backend/data/
_db_dir = os.path.join(os.path.dirname(__file__), "..", "..", "data")
os.makedirs(_db_dir, exist_ok=True)
DATABASE_URL = f"sqlite:///{os.path.join(_db_dir, 'ednava.db')}"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class Analysis(Base):
    """A batch analysis run (one FASTA upload or single prediction)."""
    __tablename__ = "analyses"

    id = Column(String, primary_key=True)
    filename = Column(String, nullable=True)
    total_sequences = Column(Integer, default=0)
    species_found = Column(Integer, default=0)
    shannon_index = Column(Float, default=0.0)
    native_count = Column(Integer, default=0)
    invasive_count = Column(Integer, default=0)
    other_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    predictions = relationship("Prediction", back_populates="analysis", cascade="all, delete-orphan")


class Prediction(Base):
    """Individual sequence prediction within an analysis."""
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    analysis_id = Column(String, ForeignKey("analyses.id"), nullable=False)
    sequence_index = Column(Integer, default=0)
    prediction = Column(String, nullable=False)
    confidence = Column(Float, default=0.0)
    status = Column(String, default="success")
    group = Column(String, default="Unknown")

    analysis = relationship("Analysis", back_populates="predictions")


def init_db():
    """Create all tables if they don't exist."""
    Base.metadata.create_all(bind=engine)


def get_db():
    """FastAPI dependency to get a database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
