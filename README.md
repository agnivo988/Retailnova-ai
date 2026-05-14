# 🚀 RetailNova AI — Enterprise AI Retail OS

**The Next-Generation Cinematic Intelligence Ecosystem for Smart Retail Automation.**

[![Status: Active](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)]()
[![Next.js](https://img.shields.io/badge/Next.js-15.x-black?logo=next.js)]()
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?logo=three.js)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)]()
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)]()

RetailNova AI is a futuristic, enterprise-grade AI-powered retail intelligence platform. It transforms traditional retail spaces into autonomous, data-driven environments by merging high-fidelity cinematic visualizations with a robust, scalable microservices backend.

---

## 🎯 Goal: Full Feature Enablement

This guide ensures **all AI-integrated services, authentication (login/signup), backend connections, and real-time systems** are enabled properly. Follow these steps to ensure **no feature is left disconnected or partially configured**.

---

## 1. 🔐 Authentication System (Login & Signup FULL SETUP)

### Implement & Ensure Connection:
* **Frontend Auth Pages:**
  * `/signup`
  * `/login`
* **Backend APIs:**
  * `POST /api/auth/signup`
  * `POST /api/auth/login`
  * `GET /api/auth/me`

### Required Config (Backend `.env`):
```env
JWT_SECRET=your_super_secure_secret
JWT_EXPIRES_IN=7d
```

### Manual Tasks:
* Run Prisma migration for the User table.
* Ensure password hashing using `bcrypt`.
* Ensure the JWT token is stored in HTTP-only cookies or secure local storage.
* Protect private routes in the frontend using Next.js middleware.

---

## 2. 🤖 AI SERVICES INTEGRATION (IMPORTANT)

### AI Microservice (Python)
**Location:**
```text
ai-services/
```

### Required Config (AI Service `.env`):
```env
AI_SERVICE_URL=http://localhost:8000
GROQ_API_KEY=your_groq_key_here
```

### Manual Setup Needed:
* Install Python dependencies:
  ```bash
  pip install -r requirements.txt
  ```
* Start the AI service:
  ```bash
  python app.py
  ```

### AI Features Enabled:
* Shelf detection
* Product recognition
* Crowd analysis

---

## 3. 🧠 GROQ / LLM INTEGRATION

### REQUIRED API KEY (MANDATORY)
```env
GROQ_API_KEY=your_groq_key_here
```

### Where Used:
* Smart chatbot assistant
* Inventory prediction reasoning
* Customer behavior insights

### Manual Task:
* Ensure backend route `/api/ai/chat` is connected.
* Add rate limiting to prevent abuse.

---

## 4. 📡 REAL-TIME SYSTEM (SOCKET.IO)

### Required Setup:
**Backend (`backend/.env`):**
```env
SOCKET_PORT=5000
```
**Frontend (`frontend/.env.local`):**
```env
SOCKET_URL=http://localhost:5000
```

### Manual Steps:
* Initialize the Socket server in Express.
* Connect the frontend listener in:
  * `lib/socket.ts`
* Ensure the backend emits the following events:
  * `inventory_update`
  * `crowd_heatmap`
  * `restock_alert`

---

## 5. 🗄️ DATABASE FULL CONNECTION (PRISMA)

### Required Config (Backend `.env`):
```env
DATABASE_URL=postgresql://user:password@localhost:5432/retailnova_ai
```

### Manual Steps:
```bash
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

### Ensure Tables Exist:
* Users
* Products
* Inventory
* Analytics logs
* AI predictions

---

## 6. ⚡ REDIS CACHE SETUP

### Required Config (Backend `.env`):
```env
REDIS_URL=redis://localhost:6379
```

### Manual Tasks:
* Enable caching in the backend for:
  * Product queries
  * AI responses
  * Dashboard metrics

---

## 7. 🌐 FRONTEND ↔ BACKEND CONNECTION

### Required Config (Frontend `.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
SOCKET_URL=http://localhost:5000
```

### Manual Tasks:
* Ensure Axios or fetch `baseURL` is configured properly.
* Add a global API handler:
  * `lib/api.ts`
* Add an auth token interceptor for secure requests.



---

# 🚀 FINAL STEP-BY-STEP RUN GUIDE

### STEP 1: Clone the Repository
```bash
git clone https://github.com/Samar2442/Retailnova-ai.git
cd Retailnova-ai
```

### STEP 2: Setup Environments
Setup all `.env` files across the project (`frontend`, `backend`, and `ai-services`).

### STEP 3: Start Backend & Database
```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### STEP 4: Start Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

### STEP 5: Start Python AI Services
Open a new terminal:
```bash
cd ai-services
pip install -r requirements.txt
python app.py
```

### STEP 6: External Services
Start your local instances of **Redis** and **PostgreSQL**.

---

# ⚠️ IMPORTANT NOTES

* **AI features WILL NOT work** without a valid `GROQ_API_KEY`.
* **Authentication WILL NOT work** without a defined `JWT_SECRET`.
* **Real-time dashboard updates** require the Socket server running.
* **Database must be migrated** before starting the backend server.
* **Python AI service must run separately** using the unified `app.py`.

---

# 💡 RESULT AFTER THIS SETUP

* ✔ **Fully working Login/Signup**
* ✔ **AI-powered assistant active**
* ✔ **Real-time retail dashboard**
* ✔ **Computer vision pipeline running**
* ✔ **Database fully synced**
* ✔ **Redis caching enabled**
* ✔ **End-to-end microservice architecture**

---
*Built with ❤️ for the future of retail by the Samar2442 team.*
