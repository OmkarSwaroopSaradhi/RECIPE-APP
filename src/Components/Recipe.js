import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Recipe = () => {
  const { mealid } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`);
      const jsonData = await response.json();

      if (jsonData.meals) {
        setData(jsonData.meals[0]);
      } else {
        setData(null); // or handle error state
      }
    };

    fetchData();
  }, [mealid]);

  if (!data) {
    return <div className="msg">Data Not Found</div>;
  }

  return (
    <div className="recipe-container">
      <img src={data.strMealThumb} alt={data.strMeal} className="recipe-image" />
      <div className="recipe-details">
        <h1 className="recipe-title">{data.strMeal}</h1>
        <h3 className="recipe-subtitle">Instructions:</h3>
        <p className="recipe-instructions">{data.strInstructions}</p>
      </div>
    </div>
  );
};

export default Recipe;
