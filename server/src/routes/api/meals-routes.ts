import express from 'express';
import type { Request, Response } from 'express';
import { Meal } from '../../models/index.js';

const router = express.Router();

//Get /meals - get all meals
//localhost:3001/api/meals
router.get('/', async (_req: Request, res: Response) => {
    try {
        const meals = await Meal.findAll();
        res.json(meals);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// GET /meals/:id
//localhost:3001/api/meals/:id
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const meal = await Meal.findByPk(id);
        if (meal) {
            res.json(meal);
        } else {
            res.status(404).json({message: 'Meal not found'});
        }
    } catch(error: any) {
        res.status(500).json({message: error.message});
    }
})

export { router as mealsRouter };