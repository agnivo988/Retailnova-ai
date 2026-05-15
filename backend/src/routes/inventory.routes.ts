import { Router } from 'express';
import { prisma } from '../config/db';

import { io } from '../app';

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

// Update inventory stock
router.patch('/:id', async (req, res) => {
  try {
    const { stock, status } = req.body;
    const updated = await prisma.inventory.update({
      where: { id: req.params.id },
      data: { stock, status },
      include: { product: true }
    });

    // Emit realtime event
    io.emit('inventory_update', {
      id: updated.id,
      product: updated.product.name,
      stock: updated.stock,
      status: updated.status
    });

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
