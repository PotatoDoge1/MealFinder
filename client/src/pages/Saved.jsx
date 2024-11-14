import { useState, useEffect } from 'react';

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
  };

  function clearAllFood(){
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
              <button onClick={removeFood(index)}>Remove</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved recipes found.</p>
      )}
      <button onClick={clearAllFood}>Clear</button>
    </div>
  );
}
