import { UserMeals } from '../models/index.js';
import userMealsSeedData from './userMealData.json' assert { type: 'json' };

export const seedUserMeals = async () => {
    await UserMeals.bulkCreate(userMealsSeedData, {
        individualHooks: true,
        returning: true,
        validate: true
    })
}