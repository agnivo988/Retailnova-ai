# RetailNova AI 🚀 

**The Next-Generation Enterprise AI Retail Operating System**

[![Status: Active](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)]()
[![Next.js](https://img.shields.io/badge/Next.js-15.x-black?logo=next.js)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)]()
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?logo=tailwind-css)]()

RetailNova AI is a futuristic, enterprise-grade AI-powered retail intelligence ecosystem—a centralized smart store operating system designed for supermarkets, hypermarkets, shopping malls, and large retail chains. 

The platform acts as a complete AI Retail Store Assistant, merging high-fidelity cyberpunk-inspired visualizations with robust, scalable microservices to deliver real-time operational intelligence.

---

## 1. Project Overview

**What is RetailNova AI?**
RetailNova AI transforms physical retail spaces into highly optimized, data-driven environments. By leveraging Computer Vision, Natural Language Processing, and Predictive Analytics, it bridges the gap between digital e-commerce efficiency and the physical shopping experience.

**Objectives:**
- Automate store operations and shelf monitoring using AI.
- Predict and manage crowd congestion in real-time.
- Enhance customer experience through intelligent indoor navigation and a multilingual voice assistant.
- Provide store managers with a unified, real-time command center.

**Real-world Problem Solving:**
- **Out-of-Stock Scenarios:** Solved via real-time computer vision and predictive restocking.
- **Checkout Bottlenecks:** Solved via crowd congestion AI and dynamic staff rerouting.
- **Customer Frustration:** Solved via AR-ready smart navigation and instant AI voice assistance.
- **Resource Inefficiency:** Solved via sustainability AI tracking energy and food waste.

---

## 2. Features

### Core AI Modules
- 👁️ **Computer Vision System**: Real-time shelf health analysis and object detection.
- 🗺️ **Smart Indoor Navigation**: Interactive 3D/2D store map with AI product locator.
- 📊 **Crowd Congestion AI**: Predictive heatmap visualization and density tracking.
- 🎤 **Multilingual Voice Assistant**: NLP-powered customer support across 6 languages.
- 📦 **Inventory Intelligence**: AI-driven demand forecasting and stock health monitoring.
- ⚡ **Restocking Engine**: Automated urgency-scored task assignment for staff workflows.
- 🛡️ **Security & Safety**: Threat detection and anomalous behavior tracking.
- ♻️ **Sustainability Intelligence**: Real-time food waste and energy consumption analytics.
- 👥 **Customer Experience Hub**: Loyalty metrics and personalized recommendation engines.
- 🌐 **Digital Twin**: Virtual isometric store simulation with live customer tracking.

---

## 3. System Architecture

RetailNova AI follows a scalable, modular, API-first enterprise architecture.

- **Frontend Architecture**: Next.js (App Router), Zustand (State), Tailwind CSS v4, Framer Motion, Three.js/React Three Fiber.
- **Backend Architecture**: Node.js, Express.js, MVC + Service pattern, WebSocket integration.
- **AI Architecture**: Isolated Python microservices (TensorFlow, OpenCV, YOLO) exposed via an API Gateway.
- **Database Flow**: MongoDB (Primary Data), PostgreSQL (Transactional), Redis (High-speed caching & Pub/Sub).
- **Communication Flow**: RESTful APIs for CRUD operations; WebSockets for real-time telemetry (CV feeds, crowd updates).

---

## 4. Folder Structure

The repository is organized as a scalable monorepo.

```bash
RetailNova-AI/
├── frontend/             # Next.js Application (UI, Dashboards, State)
├── backend/              # Node.js Express API Server (Business Logic)
├── ai-services/          # Isolated AI & ML Python Microservices
├── database/             # Migrations, Schemas, Seeders, Redis Config
├── docs/                 # Extended Technical Documentation
├── deployment/           # CI/CD, Kubernetes, Terraform manifests
├── docker/               # Dockerfiles and Compose configurations
├── tests/                # E2E and Integration test suites
├── scripts/              # Utility and deployment scripts
└── .github/              # GitHub Actions workflows
```

---

## 5. Installation Guide

### Prerequisites
- Node.js (v20+)
- Python (v3.10+)
- Docker & Docker Compose
- MongoDB & Redis

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Access via http://localhost:3000
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
# API runs on http://localhost:5000
```

### AI Services Setup
```bash
cd ai-services
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On Mac/Linux:
# source venv/bin/activate
pip install -r requirements.txt
python api_gateway/main.py
```

---

## 6. Environment Variables

Create `.env` files in the respective directories based on `.env.example`.

**Frontend (`frontend/.env.local`)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:5000
NEXT_PUBLIC_AI_ASSISTANT_KEY=your_nlp_key
```

**Backend (`backend/.env`)**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/retailnova
REDIS_URL=redis://localhost:6379
JWT_SECRET=super_secure_enterprise_key_2026
```

---

## 7. API Documentation

All APIs are versioned (`/api/v1`) and documented using Swagger/OpenAPI.

**Standard Response Format:**
```json
{
  "success": true,
  "message": "Data fetched successfully",
  "data": { ... },
  "error": null
}
```

**Key Endpoints:**
- `GET /api/v1/analytics/revenue` - Retrieves real-time financial metrics.
- `POST /api/v1/ai/assistant` - Processes NLP queries for the voice assistant.
- `GET /api/v1/inventory/critical` - Fetches items requiring immediate restocking.
- `WS /api/v1/stream/vision` - WebSocket connection for live camera telemetry.

---

## 8. Workflow Documentation

**Customer Journey:**
1. Customer enters the store; **Crowd Congestion AI** logs the entry.
2. Customer uses the **Multilingual Voice Assistant** via a kiosk or mobile app to ask for "Organic Milk".
3. The **Smart Indoor Navigation** module generates the fastest path to Aisle A2.

**Staff Workflow:**
1. The **Computer Vision System** detects low stock in Aisle A2.
2. The **Restocking Engine** generates an urgent task.
3. A notification is pushed to the nearest staff member's device via WebSockets.
4. Staff completes the task; the **Digital Twin** updates instantly.

---

## 9. AI Workflow

1. **Input:** Raw data (RTSP video streams, voice audio, POS transaction logs).
2. **Preprocessing:** Frames extracted and normalized; audio transcribed to text.
3. **Inference:** YOLOv8 runs object detection on frames; NLP models process text intent.
4. **Prediction:** Demand forecasting algorithms predict stock-outs based on current velocity.
5. **Output Visualization:** Data is published to Redis, consumed by Node.js, and pushed to the Next.js frontend via WebSockets, rendering in Recharts and Framer Motion.

---

## 10. UI/UX Design System

- **Aesthetics**: Neon Dark Futuristic / Cyberpunk Enterprise.
- **Tokens**: Deep Slate/Midnight backgrounds, vibrant Cyan, Purple, and Emerald accents.
- **Animations**: Framer Motion handles staggered lists, layout transitions, and micro-interactions.
- **Immersive Layers**: Three.js and React Three Fiber power the holographic neural network backgrounds.
- **Responsiveness**: Mobile-first Tailwind utility architecture ensuring full functionality on tablets for store managers.

---

## 11. Deployment Guide

**Using Docker Compose (Local/Staging):**
```bash
docker-compose up -d --build
```

**Cloud Deployment (Production):**
1. **Frontend**: Deployed via Vercel for Edge caching and global CDN.
2. **Backend**: Containerized and deployed to AWS ECS / Google Cloud Run.
3. **AI Services**: Deployed on GPU-optimized instances (e.g., AWS EC2 g4dn or GCP Compute Engine).
4. **CI/CD**: GitHub Actions handles automated testing, building, and container registry pushing.

---

## 12. Security Features

- **Authentication**: JWT-based auth with short-lived access tokens and secure HttpOnly refresh tokens.
- **API Protection**: Helmet.js for headers, Rate Limiting to prevent DDoS.
- **Encryption**: bcrypt for passwords, AES-256 for sensitive PII.
- **Roles**: Strict RBAC (Role-Based Access Control) for Admin, Manager, Staff, and Customer tiers.

---

## 13. Future Scope

- 🤖 **Smart Robotic Restocking**: Integration with autonomous warehouse robots.
- 👓 **Advanced AR Navigation**: WebXR implementation for spatial computing devices.
- 📹 **Real CCTV Integration**: Adapting the CV pipeline to accept live ONVIF camera streams.
- 🔗 **Blockchain Supply Chain**: Immutable ledger tracking for high-value and organic produce provenance.
- 📡 **IoT Sensor Mesh**: Integration with BLE beacons and smart shelf weight sensors.

---
*Built for the Future of Retail.*
