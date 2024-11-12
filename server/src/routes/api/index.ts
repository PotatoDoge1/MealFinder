import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { mealsRouter } from './meals-routes.js';

const router = Router();

//localhost3001/api/users
router.use('/users', userRouter);
router.use('/meals', mealsRouter);

export default router;