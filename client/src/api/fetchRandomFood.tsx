import { Meal } from '../interfaces/MealInterface.tsx';

const fetchRandomFood = async () => {
    try{
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await response.json();

      //console.log(data.meals[0]);
      // console.log(data[0]);
      const mealObject = data.meals[0];
      // console.log('meal ID:', mealObject.idMeal);
      // console.log('meal preview link:', mealObject.strMealThumb);

      const meal: Meal = {
        mealName: mealObject.strMeal,
        mealDBId: mealObject.idMeal,
        strCategory: mealObject.strCategory,
        strArea: mealObject.strArea,
        strMealThumb: mealObject.strMealThumb
      }

      console.log(meal);
      return meal;

    } catch (error) {
      console.log('Error from data retrieval fetching random food:', error);
      return [];
    }
}

export default fetchRandomFood;