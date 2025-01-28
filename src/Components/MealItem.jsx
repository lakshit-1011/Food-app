import React from "react";

const formater = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function MealItem({ meal,dispatch }) {
  return (
    <li className="meal-item">
      <article>
        <img
          src={`http://localhost:3000/${meal.image}`}
          alt={meal.name}
        />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{formater.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <button className="button" onClick={()=>dispatch({type:'addCart',payload:meal})}>Add to Cart</button>
        </p>
      </article>
    </li>
  );
}
