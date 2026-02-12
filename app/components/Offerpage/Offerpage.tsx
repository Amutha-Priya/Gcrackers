
"use client";

import { useCart } from "./../Context/carcontext";

const offers = {
  combos: [
    {
      id: "combo1",
      name: "Family Celebration Box",
      price: 999,
      items: ["Flower Pots", "Sparklers", "Chakkars", "Bombs"],
    },
    {
      id: "combo2",
      name: "Kids Special Box",
      price: 499,
      items: ["Sparklers", "Ground Chakkar", "Color Matches"],
    },
    {
      id: "combo3",
      name: "Premium Diwali Box",
      price: 1999,
      items: ["Sky Shots", "Fancy Crackers", "Gift Items"],
    },
  ],
  budget: [
    { id: "b1", name: "Starter Pack", price: 299 },
    { id: "b2", name: "Mini Combo", price: 399 },
    { id: "b3", name: "Value Pack", price: 499 },
  ],
};


export default function Offerpage() {
  // const { addToCart } = useCart();
  const { updateQty } = useCart();

  return (
    <div className="min-h-screen bg-orange-50 p-6">

      {/* 🔥 Banner */}
      <div className="bg-orange-400 text-center text-white p-6 rounded-xl shadow mb-10">
        <h1 className="text-3xl font-bold">🔥 Special Offers</h1>
        <p className="mt-2">Best Sivakasi Deals – Limited Time Only</p>
      </div>

      {/* 🎁 Combo Boxes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">
          🎁 Combo / Gift Boxes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.combos.map((box) => (
            <div
              key={box.id}
              className="bg-white rounded-xl shadow p-5 text-center"
            >
              <h3 className="font-bold text-lg mb-2">{box.name}</h3>
              <p className="text-sm text-gray-600 mb-3">
                Includes: {box.items.join(", ")}
              </p>
              <p className="text-xl font-bold text-orange-500 mb-4">
                ₹{box.price}
              </p>
              <button
                onClick={() =>
                  // addToCart({
                  //   id: box.id,
                  //   name: box.name,
                  //   price: box.price,
                  //   image: "/combo.png",
                  // })
                               updateQty(
  Number(box.id.replace(/\D/g, "")), // convert id to number
  box.name,
  "/combo.png",
  1,
  box.price
)
                }
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Add Combo
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 💰 Budget Deals */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">
          💰 Budget Deals (Under ₹500)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.budget.map((pack) => (
            <div
              key={pack.id}
              className="bg-white rounded-xl shadow p-5 text-center"
            >
              <h3 className="font-semibold text-lg">{pack.name}</h3>
              <p className="text-xl font-bold text-green-600 my-3">
                ₹{pack.price}
              </p>
             <button
  onClick={() =>
    updateQty(
      pack.id,
      pack.name,
      "/budget.png",
      1,
      pack.price
    )
  }
  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
>
  Add Pack
</button>

            </div>
          ))}
        </div>
      </section>

      {/* 🎁 Free Gift */}
      <div className="bg-blue-900 text-white text-center p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold">🎁 Free Gift Offer</h2>
        <p className="mt-2">
          Orders above <b>₹1500</b> get a FREE Sparkler Pack!
        </p>
      </div>
    </div>
  );
}
