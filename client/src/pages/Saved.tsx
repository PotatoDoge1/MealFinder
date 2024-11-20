
import React from 'react';

import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';


//export default function Saved() {
const Saved: React.FC = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const savedFood = JSON.parse(localStorage.getItem('savedFood') || '[]');
    setSavedRecipes(savedFood); 
  }, []);

  function removeFood(index) {
    const updatedRecipes = savedRecipes.filter((_, i) => i !== index);
    setSavedRecipes(updatedRecipes);
    localStorage.setItem('savedFood', JSON.stringify(updatedRecipes));
  }

  function clearAllFood() {
    localStorage.removeItem('savedFood');
    setSavedRecipes([]);
  }

  return (
    <div>
      <h1>Saved Recipes</h1>

      {savedRecipes.length > 0 ? (
        <div>
          {savedRecipes.map((recipe, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h2>{recipe.name}</h2>
              {recipe.image && <img src={recipe.image} alt={recipe.name} style={{ width: '200px' }} />}
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              {/* Wrap the removeFood call in an arrow function */}
              <Button variant="danger" onClick={() => removeFood(index)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved recipes found.</p>
      )}

      {/* Attach the clearAllFood function to the Clear button */}
      {savedRecipes.length > 0 && (
        <Button variant="warning" onClick={clearAllFood}>
          Clear All
        </Button>
      )}
    </div>
  );
}

export default Saved;