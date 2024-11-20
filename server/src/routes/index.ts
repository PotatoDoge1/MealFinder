import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// localhost:3001/auth
router.use('/auth', authRoutes);
// localhost:3001/api
router.use('/api', authenticateToken, apiRoutes);

export default router;