import React from 'react';
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
      <button onClick={clearAllFood}>Clear</button>
    </div>
  );
}
