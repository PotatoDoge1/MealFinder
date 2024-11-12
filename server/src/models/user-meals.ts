import { DataTypes, type Sequelize, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export class UserMeals extends Model<InferAttributes<UserMeals>, InferCreationAttributes<UserMeals>> {
    declare userMealId: CreationOptional<number>;
    declare mealId: number;
    declare mealName: string;
    declare userId: number;
    declare username: string;
}

export function UserMealsFactory (sequelize: Sequelize): typeof UserMeals{
    UserMeals.init(
        {
            userMealId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            mealId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            mealName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'user_meals'
        }
    );
    return UserMeals;
}