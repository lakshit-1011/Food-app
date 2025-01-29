import { useEffect, useState } from "react";
const formater = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export default function OrderDetails({handlelastClick}) {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    async function getYourOrders() {
      try {
        const res = await fetch("http://localhost:3000/orders");
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Data is not fetched");
        }

        setOrder(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getYourOrders();
  }, []);

 

  console.log(order);
  if (order.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
        <div className="bg-white p-8 rounded-md shadow-lg w-[500px]">
          <h2 className="text-xl font-bold text-stone-700 my-4">
            No Orders Found
          </h2>
          <div className="flex flex-row justify-between">
            <button onClick={handlelastClick} className="rounded-md px-4 py-2.5 w-full text-xl tracking-wide bg-blue-600 hover:bg-blue-700 text-white">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-lg w-[500px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-stone-700 my-4">
          Your Order Details
        </h2>

        {/* Loop through orders */}
        {order.map((orderItem, index) => (
          <div key={index} className="border-b-8 border-black mb-8 pb-5">
            <div className="flex flex-col justify-between mb-5">
              <div className="flex font-bold text-yellow-700 justify-between mb-5">
                <strong>Name:</strong>{" "}
                {orderItem.customer.firstName} {orderItem.customer.lastName}
              </div>
              <div className="flex font-bold text-yellow-700 justify-between">
                <strong>Phone:</strong> {orderItem.customer.phoneNumber}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-2xl text-black">Items:</h3>
              <ul className="flex flex-col text-black font-bold justify-between">
                {orderItem.items.map((item, index) => (
                  <li className="w-[436px] mt-5" key={index}>
                    <div className="flex text-black font-bold px-2 py-2 justify-between">
                      <div>{item.name}</div>
                      <div className=" text-yellow-600">
                        {item.quantity} x {formater.format(item.price)}
                      </div>
                      <div  className=" text-yellow-600">{formater.format(item.price * item.quantity)}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <div className="flex flex-row justify-between mt-4">
          {/* <span className="text-right font-bold text-yellow-700">
            <span className="pr-14">Total Amount: </span> {formater.format(totalPrice)}
          </span> */}
          <button onClick={handlelastClick} className="rounded-md px-4 py-2.5 w-full text-xl tracking-wide bg-blue-600 hover:bg-blue-700 text-white">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
