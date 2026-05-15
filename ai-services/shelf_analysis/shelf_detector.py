import random

class ShelfDetector:
    def __init__(self):
        self.classes = ["coke", "pepsi", "lays", "doritos", "bread", "milk"]

    def detect_from_url(self, image_url: str):
        # Simulated detection logic
        items_detected = []
        num_items = random.randint(5, 15)
        
        for _ in range(num_items):
            item = random.choice(self.classes)
            confidence = round(random.uniform(0.85, 0.99), 2)
            items_detected.append({
                "item": item,
                "confidence": confidence,
                "status": "in-stock" if random.random() > 0.2 else "low-stock"
            })

        return {
            "source": image_url,
            "detections": items_detected,
            "total_count": len(items_detected),
            "shelf_status": "optimal" if len(items_detected) > 10 else "needs_restock"
        }

detector = ShelfDetector()
