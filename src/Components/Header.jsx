import logo from "../assets/logo.jpg"

export default function Header({cartItems,handleCart}) {
  const total=cartItems.reduce((totalNumberItems,item)=>{return totalNumberItems+item.quantity},0)
  return(
    <header id="main-header">
          <div id="title">
                <img src={logo} alt="restro image" />
                <h1>React food</h1>
          </div>
          <nav>
            <button className="text-button" onClick={handleCart}  >Cart({total})</button>
          </nav>
    </header>
  )
}
