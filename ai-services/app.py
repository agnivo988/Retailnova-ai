from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import os
import json
from dotenv import load_dotenv

try:
    from groq import Groq
except ImportError:
    Groq = None

# Try to import from submodules, handle if they fail
try:
    from shelf_analysis.shelf_detector import detector as shelf_detector
except ImportError:
    shelf_detector = None

load_dotenv()

app = FastAPI(
    title="RetailNova Unified AI Services",
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

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def get_groq_client():
    if not Groq or not GROQ_API_KEY:
        return None
    return Groq(api_key=GROQ_API_KEY)

@app.get("/")
def read_root():
    return {"status": "online", "service": "RetailNova Unified AI Service", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "models_loaded": ["unified_ai_service"],
        "gpu_available": False
    }

class DemandQuery(BaseModel):
    category: str
    current_stock: int

@app.post("/api/v1/demand-forecast")
def predict_demand(query: DemandQuery):
    client = get_groq_client()
    predicted = int(query.current_stock * 1.2) if query.category in ['Beverages', 'Produce'] else int(query.current_stock * 0.9)
    
    explanation = "Calculated based on standard category trends."
    if client:
        prompt = f"Product category: '{query.category}', Current stock: {query.current_stock}. Predicted future demand: {predicted}. In 1 short sentence, explain why this demand shift makes retail sense."
        try:
            completion = client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model="llama3-8b-8192",
            )
            explanation = completion.choices[0].message.content
        except Exception as e:
            pass

    return {
        "category": query.category,
        "predicted_demand": predicted,
        "confidence": 89.5,
        "explanation": explanation
    }

class VoiceQuery(BaseModel):
    text: str

@app.post("/api/v1/voice-assistant")
def process_voice(query: VoiceQuery):
    client = get_groq_client()
    if not client:
        return {"intent": "error", "response": "Groq API Key is missing in .env file or groq is not installed.", "confidence": 0}

    prompt = f"You are an AI retail assistant for 'RetailNova'. A store manager says: '{query.text}'. Provide a very brief, professional response."
    
    try:
        completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama3-8b-8192",
        )
        response_text = completion.choices[0].message.content
        return {
            "intent": "assistant_response",
            "response": response_text,
            "confidence": 99.0
        }
    except Exception as e:
        return {"intent": "error", "response": str(e), "confidence": 0}

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
    if shelf_detector:
        return shelf_detector.detect_from_url(image_url or "mock_url")
    return {
        "result": "shelf_analysis_stub",
        "confidence": 0.92
    }

@app.post("/analyze")
def analyze(data: dict):
    return {
        "result": "vision_analysis_stub",
        "confidence": 0.95
    }

# --- Additional Unified AI Services ---

@app.post("/api/v1/emotion-analysis")
def analyze_emotion(image_url: Optional[str] = None):
    return {
        "emotion_profile": "engaged",
        "sentiment_score": 0.85,
        "confidence": 0.91
    }

@app.get("/api/v1/inventory-detection")
def check_inventory_status():
    return {
        "status": "stable",
        "low_stock_items": ["Coca-Cola 2L", "Lays Classic"],
        "critical_alerts": 0
    }

@app.post("/api/v1/navigation-ai")
def get_navigation_path(start: str, destination: str):
    return {
        "path": f"From {start} proceed straight to Aisle 3, then turn left for {destination}.",
        "estimated_time_seconds": 45
    }

@app.post("/api/v1/recommendation-engine")
def get_recommendations(user_id: str, current_item: str):
    return {
        "recommendations": [
            {"item": "Related Item 1", "match_score": 95},
            {"item": "Related Item 2", "match_score": 82}
        ]
    }

@app.get("/api/v1/sustainability-ai")
def get_sustainability_metrics():
    return {
        "energy_usage_trend": "decreasing",
        "waste_reduction_score": 88,
        "recommendation": "Dim lighting in Aisle 5 during low traffic hours."
    }

@app.post("/api/v1/theft-detection")
def detect_theft(video_stream_id: str):
    return {
        "suspicious_activity_detected": False,
        "risk_level": "low",
        "monitored_zones": ["Checkout", "High-Value Electronics"]
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)
