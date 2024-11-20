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
// localhost:3001/api/meals/:id
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
});


// api to add a meal to a database; to be called and executed before saving a meal
// localhost:3001/api/meals
router.post('/', async (req: Request, res: Response) => {
    const { mealName, mealDBId, strCategory, strArea, strMealThumb } = req.body;

    try {
        // Validate required fields
        if (!mealName || !mealDBId) {
            res.status(400).json({ message: 'Meal name and MealDB Id are required fields.'});
            return;
        }

        // Make sure the meal does not already exist
        const existingMeal = await Meal.findOne({ where: {mealDBId} });
        if (existingMeal) {
            res.status(409).json({
                message: `Meal with MealDB Id ${mealDBId} already exists.`
            });
            return;
        }

        // Create and add a new meal in the database
        const newMeal = await Meal.create({
            mealName,
            mealDBId,
            strCategory,
            strArea,
            strMealThumb
        });

        // Return the created meal
        res.status(201).json(newMeal);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
});

export { router as mealsRouter };