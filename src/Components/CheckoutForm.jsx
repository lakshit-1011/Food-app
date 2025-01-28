
export default function CheckoutForm({cancelHandle}) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
            <div class="bg-white p-8 rounded-md shadow-lg w-[500px]">
                <h2 class="text-2xl font-bold text-gray-800">Complete your order</h2>
                <form class="mt-8">
                    <div>
                        <h3 class="text-sm lg:text-base text-gray-800 mb-4">Personal Details</h3>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <input type="text" placeholder="First Name"
                                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                            </div>

                            <div>
                                <input type="text" placeholder="Last Name"
                                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                            </div>

                            <div>
                                <input type="email" placeholder="Email"
                                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                            </div>

                            <div>
                                <input type="number" placeholder="Phone No."
                                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div class="mt-8">
                        <h3 class="text-sm lg:text-base text-gray-800 mb-4">Shipping Address</h3>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <input type="text" placeholder="Address Line"
                                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                            </div>
                            <div>
                                <input type="text" placeholder="City"
                                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                            </div>
                            <div>
                                <input type="text" placeholder="State"
                                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                            </div>
                            <div>
                                <input type="text" placeholder="Zip Code"
                                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                            </div>
                        </div>

                        <div class="flex gap-4 max-md:flex-col mt-8">
                            <button onClick={(e)=>cancelHandle(e)} class="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1">Cancel</button>
                            <button  class="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white">Complete Purchase</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


