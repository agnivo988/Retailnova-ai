import { Router } from 'express';
import { prisma } from '../config/db';

import redisClient from '../config/redis';

const router = Router();

// Products list
router.get('/', async (req, res) => {
  try {
    // Try to get from cache first
    const cachedProducts = await redisClient.get('all_products');
    if (cachedProducts) {
      return res.json({ success: true, data: JSON.parse(cachedProducts), source: 'cache' });
    }

    const products = await prisma.product.findMany({
      include: { category: true }
    });

    // Save to cache for 5 minutes
    await redisClient.setEx('all_products', 300, JSON.stringify(products));

    res.json({ success: true, data: products, source: 'database' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Single product
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { category: true, inventory: true }
    });
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
