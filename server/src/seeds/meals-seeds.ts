import { Meal } from '../models/index.js';
import mealsSeedData from './mealsData.json' assert { type: 'json' };

export const seedMeals = async () => {
    await Meal.bulkCreate(mealsSeedData, {
        individualHooks: true,
        returning: true,
        validate: true
    })
}