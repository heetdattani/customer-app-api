import { Router } from 'express';
import { authJwt } from '../../middlewares';
import customerRoutes from './customerRoutes';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/customer', authJwt, customerRoutes);
router.use('/me', authJwt, userRoutes);

export default router;
