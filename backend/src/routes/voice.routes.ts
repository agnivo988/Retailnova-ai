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

export default router;
