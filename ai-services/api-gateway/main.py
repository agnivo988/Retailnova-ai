from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from dotenv import load_dotenv

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
        "models_loaded": ["crowd_prediction_v2", "inventory_detection_yolo"],
        "gpu_available": False
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
