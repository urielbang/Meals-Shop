import React, { useEffect, useState } from "react";
import CardMeal from "./CardMeal";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const res = await fetch("http://localhost:3000/meals");

      if (!res.ok) {
      }
      const meals = await res.json();
      setLoadedMeals(meals);
    }
    fetchMeals();
  }, []);
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => {
        return <CardMeal key={meal.id} meal={meal} />;
      })}
    </ul>
  );
}
