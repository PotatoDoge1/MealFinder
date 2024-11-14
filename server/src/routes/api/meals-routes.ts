import express from 'express';
import type { Request, Response } from 'express';
import axios from 'axios';
import { Meal, UserMeals } from '../../models/index.js';
import { User } from '../../models/users';

const router = express.Router();
const MEALDB_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php';

// GET /meals - Get all meals from the database
// localhost:3001/api/meals
router.get('/', async (_req: Request, res: Response) => {
    try {
        const meals = await Meal.findAll();
        res.json(meals);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// GET /meals/:id - Get a meal by ID
// localhost:3001/api/meals/:id
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const meal = await Meal.findByPk(id);
        if (meal) {
            res.json(meal);
        } else {
            res.status(404).json({ message: 'Meal not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// GET /meals/search - Search for meals from MealDB API
// localhost:3001/api/meals/search?query=pasta
router.get('/search', async (req: Request, res: Response) => {
    const { query } = req.query;
    try {
        const response = await axios.get(`${MEALDB_API_URL}?s=${query}`);
        const meals = response.data.meals;

        if (!meals) {
            return res.status(404).json({ message: 'No meals found' });
        }

        return res.json(meals);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});

// POST /meals/add - Add a meal to the database
// localhost:3001/api/meals/add
router.post('/add', async (req: Request, res: Response) => {
    const { mealDBId, mealName, strCategory, strArea, strInstructions, strMealThumb } = req.body;

    try {
        const [meal, created] = await Meal.findOrCreate({
            where: { mealDBId },
            defaults: {
                mealDBId,
                mealName,
                strCategory,
                strArea,
                strInstructions,
                strMealThumb,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        res.json({ meal, created });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// POST /meals/save - Save a meal to user’s favorites
// localhost:3001/api/meals/save
router.post('/save', async (req: Request, res: Response) => {
    const { userId, mealId } = req.body;

    try {
        // Check if user and meal exist
        const user = await User.findByPk(userId);
        const meal = await Meal.findByPk(mealId);

        if (!user || !meal) {
            return res.status(404).json({ message: 'User or Meal not found' });
        }

        // Save the meal to user's favorites
        await UserMeals.findOrCreate({ where: { userId, mealId } });

        return res.json({ message: 'Meal saved to favorites' });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});

// GET /meals/favorites/:userId - Get user’s favorite meals
// localhost:3001/api/meals/favorites/:userId
router.get('/favorites/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await User.findByPk(userId, {
            include: {
                model: Meal,
                as: 'favoriteMeals',
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.favoriteMeals);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
    return;
});

export { router as mealsRouter };
