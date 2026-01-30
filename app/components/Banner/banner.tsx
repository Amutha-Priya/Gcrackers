"use client"; // Required for useState/useEffect

import React, { useEffect, useState } from "react";
import useCrackerEffect from "../Crackereffect/useCrackerEffect";



const images = [
  "/Bannerimage/Banner1.jpg",
  "/Bannerimage/Banner2.jpg",
  "/Bannerimage/Banner3.jpg",
];

const Banner = () => {
   useCrackerEffect();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Slides */}
      {images.map((image, i) => (
        <div
          key={i}
          className={`absolute w-full h-full bg-center bg-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}

      {/* Overlay & Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/20 text-white text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 drop-shadow-lg">
          Welcome to Crackers World 🎆
        </h1>
        <p className="text-lg sm:text-2xl drop-shadow-md">
          Celebrate your moments with colorful joy!
        </p>
      </div>
    </div>
  );
};

export default Banner;
