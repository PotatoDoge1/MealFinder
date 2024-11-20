


const fetchRandomFood = async () => {
    try{
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await response.json();

      console.log(data.meals[0]);
      // console.log(data[0]);
      const meal = data.meals[0];
      console.log('meal ID:', meal.idMeal);
      console.log('meal preview link:', meal.strMealThumb);


    } catch (error) {
      console.log(error);
    }
}

export default fetchRandomFood;