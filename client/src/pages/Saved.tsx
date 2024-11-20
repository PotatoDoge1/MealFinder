
import React from 'react';

import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


//export default function Saved() {
const Saved: React.FC = () => {

  const [authToken] = useState<string | null>(localStorage.getItem('id_token'));

  const [savedRecipes, setSavedRecipes] = useState([]);

  const [ message , setMessage ] = useState<string>('');

  const fetchFood = async () => {

    const response:any = await fetch(`/api/user-meals`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
      },
    });

    const data = await response.json();

    if (data.message) setMessage(data.message);

    const list = data.message ? [] : data.map((item: any) => {

      const data = item.data ? JSON.parse(item.data) : {};

      return {
        name: data.name,
        image: data.image,
        instructions: data.instructions,
        apiMealId: item.apiMealId,
        userMealId: item.userMealId
      };
    });

    setSavedRecipes(list);
  };

  useEffect(() => {

    fetchFood();

  }, []);

  //function removeFood(recipe: any) {
  const removeFood = async (recipe: any) => {

    console.log(recipe);

    // const updatedRecipes = savedRecipes.filter((_, i) => i !== index);
    // setSavedRecipes(updatedRecipes);
    // localStorage.setItem('savedFood', JSON.stringify(updatedRecipes));

    const response:any = await fetch(`/api/user-meals/${ recipe.userMealId }`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
      },
    });

    const data = await response.json();

    setMessage(data.message);

    fetchFood();
  }

  function clearAllFood() {
    localStorage.removeItem('savedFood');
    setSavedRecipes([]);
  }

  return (
    <div>
      <h1>Saved Recipes</h1>

      { message ? (
      <Alert variant={'dark'}>{ message }</Alert>
    ) : null }

      {savedRecipes.length > 0 ? (
        <div>
          {savedRecipes.map((recipe, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h2>{recipe.name}</h2>
              {recipe.image && <img src={recipe.image} alt={recipe.name} style={{ width: '200px' }} />}
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              {/* Wrap the removeFood call in an arrow function */}
              <Button variant="danger" onClick={() => removeFood(recipe)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved recipes found.</p>
      )}

      {/* Attach the clearAllFood function to the Clear button */}
      {/* {savedRecipes.length > 0 && (
        <Button variant="warning" onClick={clearAllFood}>
          Clear All
        </Button>
      )} */}
      
    </div>
  );
}

export default Saved;