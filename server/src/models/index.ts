import sequelize from '../config/connection.js';
import { UserFactory } from './users.js';
import { MealFactory } from './meals.js';
import { UserMealsFactory } from './user-meals.js';

const User = UserFactory(sequelize);
const Meal = MealFactory(sequelize);
const UserMeals = UserMealsFactory(sequelize);


// User.hasMany(Meal, {
//     onDelete: 'CASCADE',
// });

// Meal.belongsTo(User, {
//     onDelete: 'CASCADE'
// });

export { sequelize, User, Meal, UserMeals };