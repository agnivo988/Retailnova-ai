import { Router } from 'express';
import { prisma } from '../config/db';

const router = Router();

router.get('/stats', async (req, res) => {
  try {
    const usersCount = await prisma.user.count();
    const storesCount = await prisma.store.count();
    const productsCount = await prisma.product.count();
    
    res.json({ 
      success: true, 
      data: { users: usersCount, stores: storesCount, products: productsCount } 
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
