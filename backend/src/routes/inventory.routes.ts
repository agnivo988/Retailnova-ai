import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

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
