import { useReducer, useState } from "react";
import Header from "./Components/Header";
import Meals from "./Components/Meals";
import Cart from "./Components/Cart";
import CheckoutForm from "./Components/CheckoutForm";

const intialState = {
  items: [],
};

function cartReducer(state, action) {
  if (action.type === "addCart") {
    const existingItem = state.items.find(
      (item) => item.id === action.payload.id
    );
    if (existingItem) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    } else {
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
  }

  if (action.type === "removeCart") {
    const existingItemId = state.items.findIndex(
      (item) => item.id === action.payload.id
    );

    const existingItem = state.items[existingItemId];
    const updatedItems = [...state.items];
    if (existingItem.quantity === 1) {
      updatedItems.splice(existingItemId, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingItemId] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }
}
function App() {
  const [state, dispatch] = useReducer(cartReducer, intialState);
  const [visible,setVisible]=useState(false);
  const [formvisible,setFormvisible]=useState(false);


  function handleCart(){
    setVisible(!visible);
  }
  function onClose(){
    setVisible(!visible);
  }

  function onForm(){
    setVisible(!visible);
    setFormvisible(!formvisible);
  }

  function cancelHandle(e){
    e.preventDefault();
    setVisible(!visible);
    setFormvisible(!formvisible);
  }

  return (
    <>
     
          <Header cartItems={state.items} handleCart={handleCart} />
          <Meals dispatch={dispatch} />
          {visible && <Cart dispatch={dispatch} totalItems={state.items} onClose={onClose} onForm={onForm} />}
          {formvisible && <CheckoutForm cancelHandle={cancelHandle} />}
    </>
  );
}

export default App;
