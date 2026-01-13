"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0d1b2a] text-white px-5 pt-10 pb-5 font-sans">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Information */}
        <div>
          <h3 className="text-yellow-400 text-lg font-semibold mb-4 border-b border-white inline-block pb-1">
            Information
          </h3>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-yellow-300">Home</li>
            <li className="cursor-pointer hover:text-yellow-300">About Us</li>
            <li className="cursor-pointer hover:text-yellow-300">Products</li>
            <li className="cursor-pointer hover:text-yellow-300">Safety Tips</li>
            <li className="cursor-pointer hover:text-yellow-300">Contact Us</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-yellow-400 text-lg font-semibold mb-4 border-b border-white inline-block pb-1">
            Contact Us
          </h3>
          <p className="text-sm mb-1">
            RR nagar to kannicheri road, EB office near, RR nagar
          </p>
          <p className="text-sm">📞 (+91) 96298 36731</p>
          <p className="text-sm">📞 (+91) 99523 49604</p>
          <p className="text-sm">✉️ akshitacrackers@gmail.com</p>
        </div>

        {/* Route Map */}
        <div>
          <h3 className="text-yellow-400 text-lg font-semibold mb-4 border-b border-white inline-block pb-1">
            Route Map
          </h3>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3..."
            className="w-full h-40 rounded-lg border-0"
            loading="lazy"
          ></iframe>
        </div>

        {/* Optional Logo Section (future use) */}
        {/* 
        <div className="flex items-center justify-center">
          <img src="/logo.png" alt="Akshita Crackers" className="w-36 rounded-lg" />
        </div>
        */}
      </div>

      {/* Disclaimer */}
      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-gray-600 text-center text-sm text-gray-300 leading-relaxed">
        As per 2018 supreme court order, online sale of firecrackers are not
        permitted! We value our customers and at the same time, respect
        jurisdiction. We request you to add your products to the cart and submit
        the required crackers through the enquiry button. We will contact you
        within 24 hrs and confirm the order through WhatsApp or phone call.
        Please add and submit your enquiries and enjoy your Diwali with Akshita
        Crackers. Our License No.----. Akshita Crackers is a company following
        100% legal & statutory compliances and all our shops and godowns are
        maintained as per the explosive acts.
      </div>
    </footer>
  );
}
