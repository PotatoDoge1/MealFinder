// import React from 'react';
// import type { Meal } from '../interfaces/MealInterface.tsx';

// // Props for the FecthButton
// interface FetchButtonProps {
//   setData: React.Dispatch<React.SetStateAction<Meal>>;
// }

// const fetchRandomButton: React.FC<FetchButtonProps> = ({ setData }) => {
//     const fetchData = async () => {
//         try{
//           const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
//           const data = await response.json();

//           setData(data.meals[0]);
    
//         } catch (error) {
//           console.log('Error fetching data from database: ', error);
//         }

//         return <button onClick={fetchData}>Get Random</button>
//     }
// }

// export default fetchRandomButton;