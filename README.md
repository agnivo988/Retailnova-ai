# RetailNova AI 🚀 

**The Next-Generation Enterprise AI Retail Operating System**

[![Status: Active](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)]()
[![Next.js](https://img.shields.io/badge/Next.js-15.x-black?logo=next.js)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)]()
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)]()

RetailNova AI is a futuristic, enterprise-grade AI-powered retail intelligence ecosystem—a centralized smart store operating system designed for supermarkets, hypermarkets, shopping malls, and large retail chains. 

The platform acts as a complete AI Retail Store Assistant, merging high-fidelity cyberpunk-inspired visualizations with robust, scalable microservices to deliver real-time operational intelligence.

---

## 1. Project Overview

**What is RetailNova AI?**
RetailNova AI transforms physical retail spaces into highly optimized, data-driven environments. By leveraging Computer Vision, Natural Language Processing, and Predictive Analytics, it bridges the gap between digital e-commerce efficiency and the physical shopping experience.

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

---

## 3. System Architecture

RetailNova AI follows a scalable, modular, API-first enterprise architecture.

- **Frontend**: Next.js (App Router), Zustand (State), Tailwind CSS v4, Framer Motion, Three.js/React Three Fiber.
- **Backend**: Node.js, Express.js, MVC + Service pattern, WebSocket integration.
- **Database**: **PostgreSQL** (Primary Relational Database managed by **Prisma ORM**), Redis (High-speed caching & Pub/Sub).
- **AI Services**: Isolated Python Fast API microservices exposed via an API Gateway.

---

## 4. Environment Variables Setup

Ensure the following variables are configured correctly before starting the application:

**Frontend (`frontend/.env.local`)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_AI_ASSISTANT_KEY=mock_openai_key
```

**Backend (`backend/.env`)**
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/retailnova_ai?schema=public
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=retailnova_ai
JWT_SECRET=retailnova_secret
REDIS_URL=redis://localhost:6379
PORT=5000
AI_SERVICE_URL=http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:5000
SOCKET_URL=http://localhost:5000
```

---

## 5. Setup & Installation Guide

### Option 1: Docker Setup (Recommended)
This requires Docker and Docker Compose. It spins up all services instantly.

```bash
docker-compose up -d --build
```
This will start:
- Frontend (Port 3000)
- Backend (Port 5000)
- PostgreSQL (Port 5432)
- Redis (Port 6379)
- AI Gateway (Port 8000)

### Option 2: Manual / Local Setup

**1. PostgreSQL Setup:**
Ensure PostgreSQL is running locally on port `5432` with username `postgres` and password `password`.

**2. Prisma Setup & Migrations:**
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
# Or to run full migrations: npx prisma migrate dev
```

**3. Start Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**4. Start Frontend:**
```bash
cd frontend
npm install
npm run dev
# Dashboard available on http://localhost:3000
```

**5. Start AI Services:**
```bash
cd ai-services
python -m venv venv
# Windows: .\venv\Scripts\Activate.ps1
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python api-gateway/main.py
# Gateway runs on http://localhost:8000
```

---

## 6. API Documentation

All APIs are documented and versioned (`/api/v1`).
- `POST /api/v1/auth/login` - Authenticates user and returns token.
- `GET /api/v1/analytics` - Fetches real-time financial metrics.
- `GET /api/v1/inventory` - Retrieves current inventory and shelf statuses.
- `GET /api/v1/crowd` - Fetches crowd density and heatmap analytics.
- `GET /api/v1/ai` - AI predictions and general model outputs.

**Standard Response Format:**
```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

---

## 7. Workflow Explanation

1. **Computer Vision & Sensor Input**: Cameras detect an empty shelf.
2. **AI Inference**: The Python AI Server processes the input and confirms low stock.
3. **Database Transaction**: The Express Backend records the event in PostgreSQL via Prisma.
4. **Real-time Broadcast**: The Backend emits a WebSocket event.
5. **UI Update**: The Next.js frontend instantly updates the Live Dashboard without refreshing.

---

## 8. Troubleshooting Guide

### ❌ PostgreSQL Database Not Connecting
**Fix:** Verify that PostgreSQL is running. If running locally (without Docker), ensure the password is set to `password` for user `postgres`. Use `npx prisma db push` to initialize tables.

### ❌ APIs Failing or Returning 404
**Fix:** Ensure backend server is running on `http://localhost:5000` and `NEXT_PUBLIC_API_URL` is set correctly in `frontend/.env.local` without trailing slashes. Check Express routes in `src/routes/index.ts`.

### ❌ Dummy Data Showing Up
**Fix:** The frontend is configured to fetch from the DB. Run Prisma migrations and seed your database.

### ❌ AI Services Not Working
**Fix:** Ensure the Python virtual environment is activated, dependencies from `requirements.txt` are installed, and `uvicorn` is running the `main.py` gateway.

---
*Built for the Future of Retail.*
