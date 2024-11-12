import { DataTypes, type Sequelize, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export class Meal extends Model<InferAttributes<Meal>, InferCreationAttributes<Meal>>{
    declare mealId: CreationOptional<number>;
    declare mealName: string;
    declare mealDBId: number;
    declare strCategory: string;
    declare strArea: string;
    declare strInstructions: string;
}

export function MealFactory (sequelize: Sequelize): typeof Meal {
    Meal.init(
        {
            mealId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            mealName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mealDBId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            strCategory: {
                type: DataTypes.STRING,
                allowNull: true
            },
            strArea: {
                type: DataTypes.STRING,
                allowNull: true
            },
            strInstructions:{
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'meals',
            hooks: {}
        }
    );

    return Meal;
}