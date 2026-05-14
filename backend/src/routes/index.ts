import { Router } from 'express';
import inventoryRoutes from './inventory.routes';
import analyticsRoutes from './analytics.routes';
import productsRoutes from './products.routes';
import crowdRoutes from './crowd.routes';
import authRoutes from './auth.routes';
import usersRoutes from './users.routes';
import navigationRoutes from './navigation.routes';
import notificationsRoutes from './notifications.routes';
import voiceRoutes from './voice.routes';
import adminRoutes from './admin.routes';
import reportsRoutes from './reports.routes';
import aiRoutes from './ai.routes';

const router = Router();

router.use('/inventory', inventoryRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/products', productsRoutes);
router.use('/crowd', crowdRoutes);
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/navigation', navigationRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/voice', voiceRoutes);
router.use('/admin', adminRoutes);
router.use('/reports', reportsRoutes);
router.use('/ai', aiRoutes);

export default router;
