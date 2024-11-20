
import React from 'react';

import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';


//export default function Saved() {
const Saved: React.FC = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [authToken] = useState<string | null>(localStorage.getItem('id_token'));
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [message, setMessage] = useState<string>('');
  const [recipe, setRecipe] = useState<any>(null);

  const fetchFood = async () => {

    const response: any = await fetch(`/api/user-meals`, {
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

    // const updatedRecipes = savedRecipes.filter((_, i) => i !== index);
    // setSavedRecipes(updatedRecipes);
    // localStorage.setItem('savedFood', JSON.stringify(updatedRecipes));

    const response: any = await fetch(`/api/user-meals/${recipe.userMealId}`, {
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

      {message ? (
        <Alert variant={'dark'}>{message}</Alert>
      ) : null}

      {savedRecipes.length > 0 ? (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
        }}>
          {savedRecipes.map((recipe, index) => (

            <Card key={index} style={{ width: '18rem', padding: 0, }}>

              <Card.Img variant="top" src={recipe.image} />

              <Card.Body style={{
                padding: 25,
              }}>

                <Card.Title>{recipe.name}</Card.Title>
                <Card.Text>
                {recipe.instructions.substring(0, 100)}...
                </Card.Text>

                <ButtonGroup aria-label="Basic example">
                  <Button variant="danger" onClick={() => removeFood(recipe)}>Remove</Button>
                  <Button variant="secondary" onClick={ () =>
                  {

                    setRecipe(recipe);

                    handleShow();

                  }}>View</Button>
                </ButtonGroup>

              </Card.Body>
            </Card>





          ))}
        </div>
      ) : (
        <p>No saved recipes found.</p>
      )}



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Instrunctions</Modal.Title>
        </Modal.Header>
        <Modal.Body>{recipe ? recipe.instructions : 'Pick a recipe.'}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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