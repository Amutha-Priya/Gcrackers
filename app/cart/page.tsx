"use client";
import { useCart } from "../components/Context/carcontext";

export default function CartPage() {
  const { cart } = useCart();

  const items = Object.entries(cart);

  if (items.length === 0) {
    return <p className="text-center mt-10">Your cart is empty 🛒</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {items.map(([id, item]: any) => (
        <div
          key={id}
          className="flex justify-between border-b py-3"
        >
          <span>Product ID: {id}</span>
          <span>Qty: {item.qty}</span>
          <span>₹{item.total}</span>
        </div>
      ))}
    </div>
  );
}
