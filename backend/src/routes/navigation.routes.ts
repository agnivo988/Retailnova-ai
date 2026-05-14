import { Router } from 'express';
import { prisma } from '../config/db';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const routes = await prisma.navigationRoute.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    });
    res.json({ success: true, data: routes });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
