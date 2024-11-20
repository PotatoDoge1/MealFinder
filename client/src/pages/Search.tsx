import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';

const Search: React.FC = () =>
{

  const [authToken] = useState<string | null>(localStorage.getItem('id_token'));

  const [saved, setSaved] = useState('Save');

  const [food, setFood] = useState({
    name: '',
    instructions: '',
    image: '',
    idMeal: ''
  });

  async function searchFood() {

    setSaved('Save');

    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json(); 
      setFood({
          name: data.meals[0].strMeal,
          instructions: data.meals[0].strInstructions,
          image: data.meals[0].strMealThumb,
          idMeal: data.meals[0].idMeal
        })
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const saveFood = async () => {
    
    const response:any = await fetch(`/api/user-meals/${ food.idMeal }`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({data: JSON.stringify(food)})
    });

    const data = await response.json();

    setSaved(data.userMealId ? 'Saved' : 'Failed to Save');


    /*
    if (!food.name || !food.instructions || !food.image) {
      alert("No valid recipe to save!");
      return;
    }

    const savedFood = JSON.parse(localStorage.getItem('savedFood') || '[]');
    const isDuplicate = savedFood.some((item) => item.name === food.name);
    if (isDuplicate) {
      alert("This recipe is already saved!");
      return;
    }

    savedFood.push(food);
    localStorage.setItem('savedFood', JSON.stringify(savedFood));
    alert(`${food.name} has been saved!`);
    console.log("Saved recipes:", savedFood);
    */

  }

  useEffect(() => {
    searchFood();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center">
      <h1>Recipe Search</h1>
      </div>
      {food.image && <img src={food.image} alt={`${food.name}`}/>}
      <p><strong>Name:</strong> {food.name}</p>
      <p><strong>Instructions:</strong> {food.instructions}</p>
      

      <div className="d-flex justify-content-between">

      { authToken ? <Button variant="primary" onClick={saveFood}>{ saved }</Button> : null }
   
      
      <Button variant="primary" onClick ={searchFood}>Next</Button >

      </div>
    
    </div>
  );
};

export default Search;