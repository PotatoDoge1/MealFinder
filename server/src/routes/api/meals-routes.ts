import express from 'express';
import type { Request, Response } from 'express';
import axios from 'axios';
import { Meal } from '../../models/index.js';

const router = express.Router();

const MEALS_DB_API_KEY = process.env.MEALS_DB_API_KEY || '1';
const MEALS_DB_BASE_URL = `https://www.themealdb.com/api/json/v1/${MEALS_DB_API_KEY}`;

// GET /meals - Get all meals from the local database
// localhost:3001/api/meals
router.get('/', async (_req: Request, res: Response) => {
    try {
        const meals = await Meal.findAll();
        res.json(meals);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// GET /meals/:id - Get a meal by ID from the local database
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

// GET /meals/search?query=<meal_name> - Search for meals using the Meals DB API
// localhost:3001/api/meals/search?query=chicken
router.get('/search', async (req: Request, res: Response) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }

    try {
        const response = await axios.get(`${MEALS_DB_BASE_URL}/search.php?s=${query}`);
        const meals = response.data.meals;

        if (meals) {
            res.json(meals);
        } else {
            res.status(404).json({ message: 'No meals found' });
        }
    } catch (error: any) {
        console.error('Error fetching meals:', error.message);
        res.status(500).json({ error: 'Failed to fetch meals' });
    }
});

// GET /meals/random - Get a random meal using the Meals DB API
// localhost:3001/api/meals/random
router.get('/random', async (_req: Request, res: Response) => {
    try {
        const response = await axios.get(`${MEALS_DB_BASE_URL}/random.php`);
        const meal = response.data.meals[0];

        if (meal) {
            res.json(meal);
        } else {
            res.status(404).json({ message: 'No random meal found' });
        }
    } catch (error: any) {
        console.error('Error fetching random meal:', error.message);
        res.status(500).json({ error: 'Failed to fetch random meal' });
    }
});

export { router as mealsRouter };
