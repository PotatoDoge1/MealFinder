import express from 'express';
import type { //Request, 
    Response } from 'express';
import {
    //User,
   // Meal,
    UserMeals
} from '../../models/index.js';

const router = express.Router();

// Get a specific user's meals
//localhost:3001/api/user-meals/
router.get('/', async ( req: any, res: Response) => {

    try {
        const meals = await UserMeals.findAll({
            where: { userId: req.user.userId }
        });
        
        // If no meals are returened exit
        if (meals.length) {
            res.json(meals);
        } else {
            res.status(404).json({ message: 'No meals found user-meals-routes.ts' });
            return;
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }

});

// Save/add a user-meal to the database
//localhost:3001/api/user-meals/:mealId
router.post('/:mealId', async (req: any, res: Response) => {

    const { mealId } = req.params;
    console.log('user: ', req.user.userId, 'meal: ', mealId);
    
    try {

        // Save a newUserMeal if the user and meal exist in the database
        const newUserMeal = await UserMeals.create({
            userId: Number(req.user.userId),
            apiMealId: mealId,
            data: req.body.data,
            //mealId: Number(mealId) // for now we'll use the meal ID that comes from the front-end API.
        });
        res.status(201).json(newUserMeal);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }

});

// Delete/remove a user-meal from the data base
// localhost:3001/api/user-meals/:userId/:mealId

router.delete('/:mealId', async (req: any, res: Response) => {
    const { mealId } = req.params;


    try {

        // find the internal userMealId from the table
        const userMealId = await UserMeals.findOne({
            where: { userId: Number(req.user.userId), userMealId: Number(mealId) }
        });
      
        console.log(userMealId);

        // if no userMealId found, return an error message
        if (!userMealId) {
            res.status(404).json({ message: `No user-meal found for user ID ${req.user.userId} and meal ID ${mealId}.`});
            return;
        }

        // destroy the record if found
        await userMealId.destroy();

        res.status(200).json({ message: `User-meal record for user ID ${req.user.userId} and meal ID ${mealId} removed.`})
         
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export { router as userMealsRouter };