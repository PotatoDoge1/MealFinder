import React from 'react';
import type { Meal } from '../interfaces/MealInterface.tsx';
import fetchRandomFood from '../api/fetchRandomFood.tsx';

// Props for the FecthButton
interface FetchButtonProps {
  setData: React.Dispatch<React.SetStateAction<Meal>>;
}

const FetchRandomButton: React.FC<FetchButtonProps> = ({ setData }) => {
    const randomMeal = async () => {
        try{
          const response = await fetchRandomFood();

          if (Array.isArray(response) && response.length > 0) {
            setData(response[0]);
          } else {
            console.log('No meal found');
          }
    
        } catch (error) {
          console.log('Error fetching data from meal DB database: ', error);
        }

    }

    return <button onClick={randomMeal}>Get Random</button>;
}

export default FetchRandomButton;