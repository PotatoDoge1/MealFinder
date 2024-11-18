import express from 'express';
import type { Request, Response } from 'express';
import { User, Meal, UserMeals } from '../../models/index.js';

const router = express.Router();

// Get a specific user's meals
//localhost:3001/api/user-meals/:id
router.get('/:userId', async ( req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const meals = await UserMeals.findAll({
            where: { userId: userId }
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
//localhost:3001/api/user-meals/:userId/:mealId
router.post('/:userId/:mealId', async (req: Request, res: Response) => {

    const { userId, mealId } = req.params;
    console.log('user: ', userId, 'meal: ', mealId);
    
    try {

        // Check if the userId exists, exit if not
        const userExists = await User.findByPk(Number(userId));
        if(!userExists) {
            res.status(404).json({ message: `User with ID ${userId} does not exist` });
            return; // exit if this is called
        }

        // Check if the mealId exists
        const mealExists = await Meal.findByPk(Number(mealId));
        if(!mealExists) {
            res.status(404).json({ message: `Meal with ID ${mealId} does not exist` })
            return; // exit if this is called
        }

        // Save a newUserMeal if the user and meal exist in the database
        const newUserMeal = await UserMeals.create({
            userId: Number(userId),
            mealId: Number(mealId)
        });
        res.status(201).json(newUserMeal);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }

});

// Delete/remove a user-meal from the data base
// localhost:3001/api/user-meals/:userId/:mealId

router.delete('/:userId/:mealId', async (req: Request, res: Response) => {
    const { userId, mealId } = req.params;
    console.log(userId, mealId)

    try {

        // check if user exists
        const userExists = await User.findByPk(Number(userId));
        if(!userExists) {
            res.status(404).json({ message: `User with ID ${userId} does not exist` });
            return; // exit if this is called
        }

        // check if the meal exists
        // Check if the mealId exists
        const mealExists = await Meal.findByPk(Number(mealId));
        if(!mealExists) {
            res.status(404).json({ message: `Meal with ID ${mealId} does not exist` })
            return; // exit if this is called
        }

        // find the internal userMealId from the table
        const userMealId = await UserMeals.findOne({
            where: { userId: Number(userId), mealId: Number(mealId) }
        });
        console.log(userId);
        console.log(mealId);
        console.log(userMealId);

        // if no userMealId found, return an error message
        if (!userMealId) {
            res.status(404).json({ message: `No user-meal found for user ID ${userId} and meal ID ${mealId}.`});
            return;
        }

        // destroy the record if found
        await userMealId.destroy();

        res.status(200).json({ message: `User-meal record for user ID ${userId} and meal ID ${mealId} removed.`})
         
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export { router as userMealsRouter };