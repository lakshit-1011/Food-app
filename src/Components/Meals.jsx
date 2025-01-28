import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals({dispatch}) {
  const [meals, setMeal] = useState([]);

  useEffect(() => {
    async function getMeals() {
      try {
        const res = await fetch('http://localhost:3000/meals');
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Data is not fetched");
        }
        setMeal(data);
        
      } catch (error) {
        console.log(error.message);
      }
    }
    getMeals();
  },[]);
  console.log(meals);
  return <ul id="meals">{meals.map((meal)=>(<MealItem dispatch={dispatch} key={meal.id} meal={meal} />))}</ul>;
}
