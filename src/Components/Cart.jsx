import React from "react";
const formater = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Cart({ totalItems, onClose,dispatch }) {
  console.log(totalItems);

  const totalPrice = totalItems.reduce((curr, item) => {
    return curr + item.quantity * item.price;
  }, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-lg w-[500px]">
        <h2 className="text-xl font-bold text-stone-700 my-4">Cart Items</h2>
        {totalItems.length > 0 ? (
          <div className="cart-items text-stone-600 mb-4">
            {totalItems.map((item) => (
              <p className="cart-item" key={item.id}>
                {item.name} <span><button >-</button>({item.quantity})<button>+</button></span> <span className="text-stone-600">{formater.format(item.price)}</span>
              </p>
            ))}
          </div>
        ) : (
          <p className="text-stone-600 mb-4">Your cart is empty.</p>
        )}
        <div className="flex flex-row-reverse mb-5">
          <span className="text-right font-bold text-yellow-700">
            {formater.format(totalPrice)}
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md text-black font-bold "
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md bg-yellow-200 text-black font-bold hover:bg-yellow-400"
          >
            Go to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
