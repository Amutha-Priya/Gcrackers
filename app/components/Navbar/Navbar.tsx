import React from "react";
import Link from "next/link";

const Navbar = () => {
  const userName = "Amutha";
  const isAdmin = true;

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-black text-white">

        {/* Top thin strip */}
        <div className="bg-orange-500 text-black text-sm px-6 py-1 flex justify-between">
          <span>Welcome, {userName}</span>
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
      <Link href="/admin" className="text-orange-400 font-semibold">
        Admin
      </Link>
    )}

    <div className="relative">
      <span className="text-lg">🛒</span>
      <span className="absolute -top-2 -right-3 bg-orange-500 text-black text-xs px-1 rounded-full">
        2
      </span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
