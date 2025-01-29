import { useReducer, useState } from "react";
import Header from "./Components/Header";
import Meals from "./Components/Meals";
import Cart from "./Components/Cart";
import CheckoutForm from "./Components/CheckoutForm";
import OrderShip from "./Components/OrderShip";
import OrderDetails from "./Components/OrderDetails";

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

  if(action.type==='empty'){
     return {...intialState};
  }
}
function App() {
  const [state, dispatch] = useReducer(cartReducer, intialState);
  const [visible,setVisible]=useState(false);
  const [formvisible,setFormvisible]=useState(false);
  const [orderrr,setOrderrr]=useState(false);
  const [yourOrder,setYourOrder]=useState(false);

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
  
  function order(){
    // setVisible(!visible);
    setFormvisible(!formvisible);
    setOrderrr(!orderrr);
  }

  function handleDone(){
    setOrderrr(!orderrr);
    dispatch({type:'empty'});
  }
  
  function totalOrders(){
    setYourOrder(!yourOrder);
  }
  
  function handlelastClick(){
    setYourOrder(!yourOrder);
  }

  
  return (
    <>
     
          <Header cartItems={state.items} handleCart={handleCart} totalOrders={totalOrders} />
          <Meals dispatch={dispatch} />
          {visible && <Cart dispatch={dispatch} totalItems={state.items} onClose={onClose} onForm={onForm} />}
          {formvisible && <CheckoutForm cartItems={state.items} order={order} cancelHandle={cancelHandle} handleDone={handleDone}/>}
          {orderrr && <OrderShip handleDone={handleDone} />}
          {yourOrder && <OrderDetails handlelastClick={handlelastClick} />}
    </>
  );
}

export default App;
