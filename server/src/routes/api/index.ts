import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { mealsRouter } from './meals-routes.js';
import { userMealsRouter } from './user-meals-routes.js';

const router = Router();

//localhost3001/api/users
router.use('/users', userRouter);
//localhost3001/api/meals
router.use('/meals', mealsRouter);
//localhost3001/api/user-meals
router.use('/user-meals', userMealsRouter);

export default router;