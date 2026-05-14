import { Router } from 'express';
import { prisma } from '../config/db';

const router = Router();

// Get all inventory
router.get('/', async (req, res) => {
  try {
    const inventory = await prisma.inventory.findMany({
      include: { product: true, shelf: true },
    });
    res.json({ success: true, data: inventory });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
