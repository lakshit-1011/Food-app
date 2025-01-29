export default function OrderShip({handleDone}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div class="bg-white p-8 rounded-md shadow-lg w-[500px]">
        <h2 class="text-2xl font-bold text-gray-800">Yay!, We Recieved your order is successfully 💥</h2>
        <div class="flex gap-4 max-md:flex-col mt-8">
          <button onClick={(e)=>handleDone(e)} class="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
