import { Router, Request, Response } from 'express';

const router = Router();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// Generic proxy helper
async function proxyToAI(path: string, method: string, body?: any): Promise<any> {
  const res = await fetch(`${AI_SERVICE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) throw new Error(`AI Service error: ${res.status}`);
  return res.json();
}

// Health check
router.get('/health', async (_req: Request, res: Response) => {
  try {
    const data = await proxyToAI('/health', 'GET');
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(503).json({ success: false, error: err.message });
  }
});

// Voice Assistant
router.post('/voice', async (req: Request, res: Response) => {
  try {
    const data = await proxyToAI('/api/v1/voice-assistant', 'POST', req.body);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Demand Forecast
router.post('/demand-forecast', async (req: Request, res: Response) => {
  try {
    const data = await proxyToAI('/api/v1/demand-forecast', 'POST', req.body);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Crowd Analysis
router.get('/crowd-analysis', async (_req: Request, res: Response) => {
  try {
    const data = await proxyToAI('/api/v1/crowd-analysis', 'GET');
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Shelf Detection
router.post('/shelf-detection', async (req: Request, res: Response) => {
  try {
    const data = await proxyToAI('/api/v1/shelf-detection', 'POST', req.body);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Emotion Analysis
router.post('/emotion-analysis', async (req: Request, res: Response) => {
  try {
    const data = await proxyToAI('/api/v1/emotion-analysis', 'POST', req.body);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Inventory Detection
router.get('/inventory-detection', async (_req: Request, res: Response) => {
  try {
    const data = await proxyToAI('/api/v1/inventory-detection', 'GET');
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Navigation AI
router.post('/navigation', async (req: Request, res: Response) => {
  try {
    const data = await proxyToAI('/api/v1/navigation-ai', 'POST', req.body);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Recommendation Engine
router.post('/recommendations', async (req: Request, res: Response) => {
  try {
    const data = await proxyToAI('/api/v1/recommendation-engine', 'POST', req.body);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Sustainability AI
router.get('/sustainability', async (_req: Request, res: Response) => {
  try {
    const data = await proxyToAI('/api/v1/sustainability-ai', 'GET');
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Theft Detection
router.post('/theft-detection', async (req: Request, res: Response) => {
  try {
    const data = await proxyToAI('/api/v1/theft-detection', 'POST', req.body);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
