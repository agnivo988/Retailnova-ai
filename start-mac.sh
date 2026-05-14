#!/bin/bash
echo "🚀 Starting RetailNova AI Stack..."

if command -v docker &> /dev/null; then
    echo "🐳 Starting PostgreSQL and Redis via Docker Compose..."
    docker compose up -d postgres redis
else
    echo "⚠️ Docker is not installed or running. The database connection may fail."
fi

echo "⚙️  Starting Node.js Express Backend..."
cd backend && npm run dev &
BACKEND_PID=$!

echo "🌐 Starting Next.js App Router Frontend..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo "🧠 Starting Python AI Gateway..."
cd ../ai-services
if [ -f "venv/bin/python" ]; then
    venv/bin/python api_gateway/main.py &
    AI_PID=$!
else
    echo "⚠️ Python venv not found. Please configure the AI environment."
fi

echo "✅ All services launched in background!"
echo "Press Ctrl+C to stop all services."

trap "kill $BACKEND_PID $FRONTEND_PID $AI_PID; exit" INT
wait
