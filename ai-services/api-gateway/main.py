from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import sys
from dotenv import load_dotenv

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from shelf_analysis.shelf_detector import detector as shelf_detector
from shared.utils.model_loader import model_loader

load_dotenv()

app = FastAPI(
    title="RetailNova AI Gateway",
    description="Centralized AI Inference and Analytics API",
    version="1.0.0"
)

# Allow CORS for backend Node.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "online", "service": "RetailNova AI Gateway", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "models_loaded": ["crowd_prediction_v2", "inventory_detection_yolo", "voice_nlp_v1"],
        "gpu_available": False
    }

from pydantic import BaseModel
from typing import List, Optional

class DemandQuery(BaseModel):
    category: str
    current_stock: int

@app.post("/api/v1/demand-forecast")
def predict_demand(query: DemandQuery):
    # Mocking actual ML inference
    predicted = int(query.current_stock * 1.2) if query.category in ['Beverages', 'Produce'] else int(query.current_stock * 0.9)
    return {
        "category": query.category,
        "predicted_demand": predicted,
        "confidence": 89.5
    }

class VoiceQuery(BaseModel):
    text: str

@app.post("/api/v1/voice-assistant")
def process_voice(query: VoiceQuery):
    text = query.text.lower()
    intent = "unknown"
    response = "I couldn't understand that."
    
    if "where" in text and "milk" in text:
        intent = "navigation"
        response = "Milk is located in Aisle 4, Dairy Section."
    elif "stock" in text or "inventory" in text:
        intent = "inventory_check"
        response = "We currently have adequate stock for most items. Would you like to check a specific product?"
    
    return {
        "intent": intent,
        "response": response,
        "confidence": 95.0
    }

@app.get("/api/v1/crowd-analysis")
def analyze_crowd():
    return {
        "zones": [
            {"zone": "Checkout", "density": 85, "trend": "increasing"},
            {"zone": "Produce", "density": 45, "trend": "stable"}
        ]
    }

@app.post("/api/v1/shelf-detection")
def detect_shelf(image_url: Optional[str] = None):
    return shelf_detector.detect_from_url(image_url or "mock_url")

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
