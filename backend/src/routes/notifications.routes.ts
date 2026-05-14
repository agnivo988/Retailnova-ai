import { Router } from 'express';
import { prisma } from '../config/db';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: 'desc' },
      take: 30
    });
    res.json({ success: true, data: notifications });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
