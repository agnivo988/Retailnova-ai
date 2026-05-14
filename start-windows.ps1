# Startup Script for RetailNova AI Enterprise Stack

Write-Host "🚀 Starting RetailNova AI Stack..." -ForegroundColor Cyan

# Check if Docker is running
docker --version > $null 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "🐳 Starting PostgreSQL and Redis via Docker Compose..." -ForegroundColor Green
    docker compose up -d postgres redis
} else {
    Write-Host "⚠️ Docker is not installed or running. The database connection may fail." -ForegroundColor Yellow
}

# Start Backend
Write-Host "⚙️  Starting Node.js Express Backend..." -ForegroundColor Green
Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/c cd backend && npm run dev"

# Start Frontend
Write-Host "🌐 Starting Next.js App Router Frontend..." -ForegroundColor Green
Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/c cd frontend && npm run dev"

# Start AI Gateway (assuming venv exists)
Write-Host "🧠 Starting Python AI Gateway..." -ForegroundColor Green
if (Test-Path "ai-services\venv\Scripts\python.exe") {
    Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/c cd ai-services && .\venv\Scripts\python.exe api_gateway/main.py"
} else {
    Write-Host "⚠️ Python venv not found. Please run: cd ai-services && python -m venv venv && .\venv\Scripts\Activate.ps1 && pip install -r requirements.txt" -ForegroundColor Yellow
}

Write-Host "✅ All services launched!" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000"
Write-Host "Backend: http://localhost:5000"
Write-Host "AI Gateway: http://localhost:8000"
