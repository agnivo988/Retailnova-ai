import { Router } from 'express';
import { prisma } from '../config/db';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const voices = await prisma.voiceQuery.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    });
    res.json({ success: true, data: voices });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { text, language } = req.body;
    
    const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
    const response = await fetch(`${aiServiceUrl}/api/v1/voice-assistant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      throw new Error(`AI Service returned ${response.status}`);
    }

    const aiData = await response.json();
    res.json({ success: true, data: aiData });
  } catch (error: any) {
    console.error("Voice Assistant Error:", error.message);
    res.status(500).json({ success: false, error: "AI communication error" });
  }
});

export default router;
