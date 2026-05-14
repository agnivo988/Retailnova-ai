import { Router } from 'express';
import { prisma } from '../config/db';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const crowdStats = await prisma.crowdAnalytics.findMany({
      orderBy: { timestamp: 'desc' },
      take: 50
    });
    res.json({ success: true, data: crowdStats });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
