import React from "react";

const Navbar = () => {
  const userName = "Amutha"; // 🔹 temporary (UI only)
  const isAdmin = true;      // 🔹 later this will come from backend

  return (
    <header className="header">
      
      <div className="flex items-center justify-between bg-gray-900 text-white p-4 sticky top-0 z-50">
  <div className="flex items-center gap-4">
    <span className="font-bold text-yellow-400">Welcome, Amutha 👋</span>
    <a href="/admin" className="text-cyan-400 font-semibold hover:text-red-500 underline">
      Admin
    </a>
  </div>
  <nav>
    <ul className="flex gap-6">
      <li><a href="/">Home</a></li>
      <li><a href="/products">Products</a></li>
      <li><a href="/offers">Offers</a></li>
      <li><a href="/about">About Us</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
  <div className="flex items-center gap-4">
    <input
      type="text"
      placeholder="Search crackers..."
      className="bg-gray-800 text-white rounded-full px-3 py-1 outline-none"
    />
    <div className="relative">
      🛒
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">2</span>
    </div>
  </div>
</div>

    </header>
  );
};

export default Navbar;
