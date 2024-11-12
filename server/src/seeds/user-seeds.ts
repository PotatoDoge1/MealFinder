import { User } from '../models/index.js';
import userSeedData from './userData.json' assert { type: 'json' };

export const seedUsers = async () => {
    await User.bulkCreate(userSeedData, {
        individualHooks: true,
        returning: true,
        validate: true
    });

};