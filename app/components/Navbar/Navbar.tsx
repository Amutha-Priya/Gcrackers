import React from "react";
import "./Navbar.css";

const Navbar = () => {
  const userName = "Amutha"; // 🔹 temporary (UI only)
  const isAdmin = true;      // 🔹 later this will come from backend

  return (
    <header className="header">
      
      {/* LEFT SIDE */}
      <div className="authendication">
        <span className="welcome">
          Welcome, {userName} 👋
        </span>

        {isAdmin && (
          <a href="/admin" className="admin-link">
            Admin
          </a>
        )}
      </div>

      {/* Navigation */}
      <nav className="nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/offers">Offers</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      {/* Right side */}
      <div className="right-section">
        <div className="search-box">
          <input type="text" placeholder="Search crackers..." />
        </div>

        <div className="cart-icon">
          🛒
          <span className="cart-count">2</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
