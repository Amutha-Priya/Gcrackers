"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart} from "../Context/carcontext";
import { useState, useEffect } from "react";


const Navbar = () => {
  const userName = "Amutha";
  const isAdmin = true;
  const router = useRouter();
const { cart } = useCart();
const [openCart, setOpenCart] = useState(false);

const cartItems = Object.entries(cart);
const cartCount = cartItems.reduce(
  (sum: number, [, item]: any) => sum + item.qty,
  0
);

const grandTotal = cartItems.reduce(
  (sum: number, [, item]: any) => sum + item.total,
  0
);

  const handleAdminClick = () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin"); // 🔥 force login
    } else {
      router.push("/admin/login"); // dashboard
    }
  };
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-black text-white">

        {/* Top thin strip */}
        <div className="bg-orange-500 text-black text-sm px-6 py-1 flex justify-between">
          <span>😊 Welcome to G Crackers World!</span>
          <span>📞 Order Now | Best Sivakasi Prices</span>
        </div>

        {/* Main navbar */}
<div className="flex items-center px-8 py-3 border-b border-gray-800">

          {/* Left */}
          <nav className="flex-1 flex justify-center">
    <ul className="flex gap-16 text-lg font-medium tracking-wide">
      <li><Link href="/" className="hover:text-orange-400">Home</Link></li>
      <li><Link href="/products" className="hover:text-orange-400">Products</Link></li>
      <li><Link href="/offers" className="hover:text-orange-400">Offers</Link></li>
      <li><Link href="/about" className="hover:text-orange-400">About Us</Link></li>
      <li><Link href="/contact" className="hover:text-orange-400">Contact</Link></li>
    </ul>
  </nav>

          {/* Right */}
       <div className="flex items-center gap-6 text-sm">
       {isAdmin && (
              <button
                onClick={handleAdminClick}
                className="text-orange-400 font-semibold hover:underline"
              >
                Admin
              </button>
            )}

<div
  className="relative cursor-pointer"
  onClick={() => setOpenCart(true)}
>
  <span className="text-lg">🛒</span>

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-3 bg-orange-500 text-black text-xs px-1 rounded-full">
      {cartCount}
    </span>
  )}
</div>

          </div>

        </div>
      </div>
      {/* Cart Sidebar */}
{openCart && (
  <>
    {/* Overlay */}
    <div
  className="fixed inset-0 z-40 bg-transparent"
      onClick={() => setOpenCart(false)}
    />

    {/* Sidebar */}
    <div className="fixed top-0 right-0 w-80 h-full bg-white z-50 shadow-lg p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Your Cart</h3>
        <button
          onClick={() => setOpenCart(false)}
          className="text-xl font-bold"
        >
          ×
        </button>
      </div>

{cartItems.length > 0 && (
  <div className="flex-1 overflow-y-auto">
    {cartItems.map(([id, item]: [string, any]) => (
      <div
        key={id}
        className="border-b py-3 flex items-center gap-4"
      >
        {/* Image */}
        <div className="w-16 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded"
          />
        </div>

        {/* Name */}
        <div className="flex-1">
          <p className="font-semibold">{item.name}</p>
           <p className="font-semibold">Qty: {item.qty}</p>
        </div>

        {/* Amount */}
        <div className="w-20 text-right font-semibold">
           <p className="font-semibold">Amount</p>
          
          ₹{item.total}
        </div>
      </div>
    ))}
  </div>
)}



      {/* Checkout */}
      {cartItems.length > 0 && (
        <div className="text-sm text-center font-semibold border-t border-black-300">
  Total: ₹{grandTotal}
 
</div>
        
      )}
    </div>
  </>
)}

    </header>
  );
};

export default Navbar;
