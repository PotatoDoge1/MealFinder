import {
    DataTypes,
    type Sequelize,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';
import { User } from './users';
import { Meal } from './meals';

export class UserMeals extends Model<InferAttributes<UserMeals>, InferCreationAttributes<UserMeals>> {
    declare userMealId: CreationOptional<number>;
    declare mealId: number;
    declare userId: number;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

export function UserMealsFactory(sequelize: Sequelize): typeof UserMeals {
    UserMeals.init(
        {
            userMealId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            mealId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Meal,
                    key: 'mealId',
                },
                onDelete: 'CASCADE',
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: User,
                    key: 'userId',
                },
                onDelete: 'CASCADE',
            },
            createdAt: '',
            updatedAt: ''
        },
        {
            sequelize,
            tableName: 'user_meals',
            timestamps: true,
            underscored: true,
        }
    );

    // Define associations
    User.belongsToMany(Meal, { through: UserMeals, foreignKey: 'userId', as: 'favoriteMeals' });
    Meal.belongsToMany(User, { through: UserMeals, foreignKey: 'mealId', as: 'users' });

    return UserMeals;
}
