import { useState, useEffect } from 'react';

export default function Search() 
{

  const [food, setFood] = useState({
    name: '',
    instructions: '',
    image: '',
  });

  async function searchFood(){
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json(); 
      setFood({
          name: data.meals[0].strMeal,
          instructions: data.meals[0].strInstructions,
          image: data.meals[0].strMealThumb,
        })
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function saveFood () {
      const savedFood = JSON.parse(localStorage.getItem('savedFood') || '[]');
      savedFood.push(food);
      localStorage.setItem('savedFood', JSON.stringify(savedFood));
      searchFood();
  };

  useEffect(() => {
    searchFood();
  }, []);

  return (
    <div>
      <h1>Recipe Search</h1>
      {food.image && <img src={food.image} alt={`${food.name}`}/>}
      <p><strong>Name:</strong> {food.name}</p>
      <p><strong>Instructions:</strong> {food.instructions}</p>
      <button onClick={saveFood}>Save</button>
      <button onClick={searchFood}>Next</button>
    </div>
  );
};