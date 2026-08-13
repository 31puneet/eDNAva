# eDNAva 🧬

Identifying Taxonomy and Assessing Biodiversity from eDNA Datasets.

## Prerequisites
- **Python 3.10+**
- **Node.js 20+**

## Installation Guide

Because this is a Monorepo containing both a Python backend and a Node.js frontend, you need to set up both environments to run the full application.

### 1. Backend Setup (Python)

**For Windows:**
```powershell
# Create the virtual environment
python -m venv venv

# Activate the virtual environment
.\venv\Scripts\activate

# Install the machine learning and API dependencies
pip install -r backend/requirements.txt
```

**For macOS / Linux:**
```bash
# Create the virtual environment
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install the machine learning and API dependencies
pip install -r backend/requirements.txt
```

### 2. Frontend Setup (Next.js)

The frontend uses standard Node.js commands, which run identically on both Windows and Mac.

```bash
# Move into the frontend directory
cd frontend

# Install all the React and Next.js dependencies
npm install

# Start the development server
npm run dev
```

Once the server starts, open `http://localhost:3000` in your browser to view the dashboard!