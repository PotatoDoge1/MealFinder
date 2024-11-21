import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';

const Search: React.FC = () => {

  const [authToken] = useState<string | null>(localStorage.getItem('id_token'));

  const [saved, setSaved] = useState('Save');
  const [ expand, setExpand ] = useState(false);

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

    const response: any = await fetch(`/api/user-meals/${food.idMeal}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ data: JSON.stringify(food) })
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

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 25,
        marginTop: 25,
      }}>

        {food.image ? (
          <div style={{
            flex: '1 1 auto',
          }}>
            <img src={food.image} alt={`${food.name}`} style={{
              maxWidth: '300px',
              borderRadius: 25,
            }} />
          </div>
        ) : null}

        <div style={{
          flex: '1 1 50%',
          textAlign: 'left',
        }}>
          
          <h1><strong>Recipe Search</strong></h1>
          
          <p><strong>Name:</strong> {food.name}</p>
          
          <div>
            <p>
              <strong>Instructions: </strong>
              { expand ? food.instructions : `${food.instructions.slice(0, 250)}...` }
            </p>
            <Button variant="primary" onClick={() => setExpand(!expand)}>Read {expand ? 'Less' : 'More'}</Button>
          </div>

        </div>

      </div>

      <div className="d-flex justify-content-between">

        {authToken ? <Button variant="info" onClick={saveFood}>{saved}</Button> : null}

        <Button variant="info" onClick={searchFood}>Next</Button >

      </div>


    </div>
  );
};

export default Search;
