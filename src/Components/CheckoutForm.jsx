import { useState } from "react";

export default function CheckoutForm({ cancelHandle, order, cartItems }) {
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    let validationErrors = {};

    if (!data.firstName?.trim())
      validationErrors.firstName = "First name is required.";
    if (!data.lastName?.trim())
      validationErrors.lastName = "Last name is required.";
    if (!data.email?.trim() || !/\S+@\S+\.\S+/.test(data.email))
      validationErrors.email = "Valid email is required.";
    if (!data.phoneNumber?.trim() || isNaN(data.phoneNumber))
      validationErrors.phoneNumber = "Valid phone number is required.";
    if (!data.address?.trim())
      validationErrors.address = "Address is required.";
    if (!data.city?.trim()) validationErrors.city = "City is required.";
    if (!data.state?.trim()) validationErrors.state = "State is required.";
    if (!data.pinCode?.trim() || isNaN(data.pinCode))
      validationErrors.pinCode = "Valid zip code is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Store errors
      return false; // Prevent form submission
    }

    setErrors({});

    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order: { items: cartItems, customer: data } })
    });

    console.log("Form submitted:", data);
    console.log("totalItems", cartItems);
    return true;
  }

  function handleOrderClick(e) {
    e.preventDefault();

    const form = e.target.closest("form");
    if (form) {
      const isValid = handleSubmit({ preventDefault: () => {}, target: form });
      if (!isValid) return; // Stop if form is invalid
    }

    order(e); // Proceed with the order function
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-lg w-[500px]">
        <h2 className="text-2xl font-bold text-gray-800">
          Complete your order
        </h2>
        <form className="mt-8">
          <div>
            <h3 className="text-sm lg:text-base text-gray-800 mb-4">
              Personal Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Phone No."
                  name="phoneNumber"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm lg:text-base text-gray-800 mb-4">
              Shipping Address
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Address Line"
                  name="address"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                {errors.state && (
                  <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Zip Code"
                  name="pinCode"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                {errors.pinCode && (
                  <p className="text-red-500 text-xs mt-1">{errors.pinCode}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4 max-md:flex-col mt-8">
              <button
                onClick={(e) => cancelHandle(e)}
                className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1"
              >
                Cancel
              </button>
              <button
                onClick={handleOrderClick}
                className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
              >
                Complete Purchase
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
