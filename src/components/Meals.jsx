import React from "react";
import CardMeal from "./CardMeal";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }
  if (error) {
    return <Error title="Failed to fetch Meals" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => {
        return <CardMeal key={meal.id} meal={meal} />;
      })}
    </ul>
  );
}
