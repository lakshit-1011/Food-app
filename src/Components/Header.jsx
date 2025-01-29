import logo from "../assets/logo.jpg"

export default function Header({cartItems,handleCart,totalOrders}) {
  const total=cartItems.reduce((totalNumberItems,item)=>{return totalNumberItems+item.quantity},0)
  return(
    <header id="main-header">
          <div id="title">
                <img src={logo} alt="restro image" />
                <h1>Food Depo</h1>
          </div>
          <nav>
          <button className="text-button" onClick={totalOrders} style={{paddingInline:'30px'}}>Your Orders</button>
            <button className="text-button" onClick={handleCart}  >Cart({total})</button>
          </nav>
    </header>
  )
}
