"use client";

import React from "react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FaInstagram, FaFacebookF } from "react-icons/fa";


export default function Footer() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initMap = () => {
      if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const myLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const map = new google.maps.Map(mapRef.current!, {
            center: myLocation,
            zoom: 16,
          });

          new google.maps.Marker({
            position: myLocation,
            map,
            title: "You are here",
          });
        },
        () => alert("Location permission denied")
      );
    };

    if (window.google) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    }
  }, []);
  return (
    <footer className="bg-[#0d1b2a] text-white px-5 pt-10 pb-5 font-sans">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Contact */}
        
        <div>

          <h3 className="text-yellow-400 text-lg font-semibold mb-4 border-b border-white inline-block pb-1">
             G Crackers
          </h3>

            <p className="text-sm mb-1">
              G Crackers is a leading direct fireworks outlet in Sivakasi, offering fire crackers with discount.
          </p>
          <h3 className="text-yellow-400 text-lg font-semibold mb-4 border-b border-white inline-block pb-1">
            Location
          </h3>

         
          <p className="text-sm mb-1">
            📍Sivakasi to Vembakottai Road,Maddathupatti,Sivakasi,TamilNadu-626123
          </p>
          {/* <p className="text-sm">📞 (+91) 96298 36731</p>
          <p className="text-sm">📞 (+91) 99523 49604</p>
          <p className="text-sm">✉️ akshitacrackers@gmail.com</p> */}
        </div>
        
        {/* Information */}
        <div>
          <h3 className="text-yellow-400 text-lg font-semibold mb-4 border-b border-white inline-block pb-1">
            Quik Links
          </h3>
        <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className="bg-zinc-800 text-white px-4 py-2 text-sm font-medium
                     hover:bg-white hover:text-black transition rounded-sm"
        >
          Home
        </Link>

        <Link
          href="/about"
          className="bg-zinc-800 text-white px-4 py-2 text-sm font-medium
                     hover:bg-red-600 transition rounded-sm"
        >
          About GCrackers
        </Link>

        <Link
          href="/products"
          className="bg-zinc-800 text-white px-4 py-2 text-sm font-medium
                     hover:bg-red-600 transition rounded-sm"
        >
          Fire Crackers
        </Link>

        <Link
          href="/gift-box"
          className="bg-zinc-800 text-white px-4 py-2 text-sm font-medium
                     hover:bg-red-600 transition rounded-sm"
        >
          Fireworks Gift Box
        </Link>

        <Link
          href="/price-list"
          className="bg-zinc-800 text-white px-4 py-2 text-sm font-medium
                     hover:bg-red-600 transition rounded-sm"
        >
          Price List
        </Link>

        <Link
          href="/quick-purchase"
          className="bg-zinc-800 text-white px-4 py-2 text-sm font-medium
                     hover:bg-red-600 transition rounded-sm"
        >
          Quick Purchase
        </Link>

        <Link
          href="/contact"
          className="bg-zinc-800 text-white px-4 py-2 text-sm font-medium
                     hover:bg-red-600 transition rounded-sm"
        >
          Contact Us
        </Link>
      </div>
        </div>

        <div>
               <h3 className="text-yellow-400 text-lg font-semibold mb-4 border-b border-white inline-block pb-1">
            Contact Us
          </h3>

 <div className="space-y-2 text-l">
    <p className="text-l">📞 (+91) 99999 88888</p>
  <p className="text-l">📞 (+91) 99523 49604</p>
  <p className="flex items-center gap-2">
    <HiOutlineMail className="text-yellow-400 text-lg" />
    Gcrackers@gmail.com
  </p>

  <p className="flex items-center gap-2">
    <FaInstagram className="text-pink-500 text-lg" />
    @gcrackers
  </p>

  <p className="flex items-center gap-2">
    <FaFacebookF className="text-blue-500 text-lg" />
    G Crackers
  </p>
</div>
</div>

         

        {/* Route Map */}
        <div>
      
          <h3 className="text-yellow-400 text-lg font-semibold mb-4 border-b border-white inline-block pb-1">
            Route Map
          </h3>
          {/* <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3..."
            className="w-full h-40 rounded-lg border-0"
            loading="lazy"
          ></iframe> */}
          <div ref={mapRef} className="w-full h-40 rounded-lg border-0"></div>
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
      As per 2018 supreme court order, online sale of firecrackers are not permitted!
       We value our customers and at the same time, respect jurisdiction.
        We request you to add your products to the cart and submit the required crackers through the enquiry button.
         We will contact you within 24 hrs and confirm the order through WhatsApp or phone call.
          Please add and submit your enquiries and enjoy your Diwali with G Crackers. 
          Our License No.----. G Crackers as a company following 100% legal & statutory compliances and all our shops, go-downs are maintained as per the explosive acts.
           We send the parcels through registered and legal transport service providers as like every other major companies
            in Sivakasi is doing so.
      </div>
    </footer>
  );
}
