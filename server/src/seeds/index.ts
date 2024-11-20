import { seedUsers } from './user-seeds.js';
import { seedMeals } from './meals-seeds.js';
import { seedUserMeals } from './user-meals-seeds.js';
import sequelize from '../config/connection.js';


const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedMeals();
    console.log('\n----- MEALS SEEDED -----\n');

    await seedUserMeals();
    console.log('\n----- USER-MEALS SEEDED -----\n');

    process.exit(0)

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();