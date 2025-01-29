import React, { useState } from "react";

const formater = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function MealItem({ meal, dispatch }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleAddToCart = () => {
    dispatch({ type: "addCart", payload: meal });
    
    setIsPopupVisible(true);
    
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 2000);
  };

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
          <button className="button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </p>
      </article>

      {isPopupVisible && (
        <div className="popup-notification">
          <p>1 item added to cart!</p>
        </div>
      )}
    </li>
  );
}
