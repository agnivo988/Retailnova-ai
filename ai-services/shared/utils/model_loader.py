import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ModelLoader")

class ModelLoader:
    def __init__(self):
        self.models = {}

    def load_model(self, model_name: str):
        logger.info(f"🚀 Loading AI Model: {model_name}...")
        # Simulate model loading delay
        self.models[model_name] = {"name": model_name, "status": "loaded"}
        logger.info(f"✅ Model {model_name} initialized successfully.")
        return self.models[model_name]

    def get_model(self, model_name: str):
        return self.models.get(model_name)

model_loader = ModelLoader()
