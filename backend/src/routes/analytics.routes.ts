import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get analytics dashboard data
router.get('/', async (req, res) => {
  try {
    const analytics = await prisma.analytics.findMany({
      orderBy: { timestamp: 'desc' },
      take: 20
    });
    res.json({ success: true, data: analytics });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
