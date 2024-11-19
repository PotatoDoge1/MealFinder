import React, { useState, useEffect } from 'react';

export default function Saved() {
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
      {savedRecipes.length === 0 ? (
        <p>No saved recipes yet.</p>
      ) : (
        <div>
          {savedRecipes.map((recipe, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              {recipe.image && <img src={recipe.image} alt={recipe.name} style={{ maxWidth: '100px' }} />}
              <p><strong>Name:</strong> {recipe.name}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              <button onClick={() => removeFood(index)}>Remove</button>
            </div>
          ))}
          <button onClick={clearAllFood} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}>
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

