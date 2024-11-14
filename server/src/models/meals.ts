import {
    DataTypes,
    type Sequelize,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

export class Meal extends Model<InferAttributes<Meal>, InferCreationAttributes<Meal>> {
    declare mealId: CreationOptional<number>;
    declare mealName: string;
    declare mealDBId: string;
    declare strCategory: string;
    declare strArea: string;
    declare strInstructions: string;
    declare strMealThumb: string;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

export function MealFactory(sequelize: Sequelize): typeof Meal {
    Meal.init(
        {
            mealId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            mealName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mealDBId: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, // Unique constraint to prevent duplicate entries from MealDB
            },
            strCategory: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            strArea: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            strInstructions: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            strMealThumb: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            createdAt: '',
            updatedAt: ''
        },
        {
            sequelize,
            tableName: 'meals',
            underscored: true,
            timestamps: true, // Enable createdAt and updatedAt timestamps
        }
    );

    return Meal;
}
