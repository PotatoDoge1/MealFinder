import { DataTypes, type Sequelize, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export class UserMeals extends Model<InferAttributes<UserMeals>, InferCreationAttributes<UserMeals>> {
    declare userMealId: CreationOptional<number>;
    declare mealId?: number;
    declare apiMealId?: String;
    declare userId: number;
    declare data?: Text;
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
                //allowNull: true
            },

            apiMealId: {
                type: DataTypes.STRING
            },

            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            data: {
                type: DataTypes.TEXT
            }
        },
        {
            sequelize,
            underscored: true,
            modelName: 'user_meals'
        }
    );
    return UserMeals;
}