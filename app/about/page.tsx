"use client";
import { useEffect, useState } from "react";
import Counter from "../components/Counter/Counter"

// Sample images — replace with your actual image URLs
const images = [
  "/images/cracker1.jpg",
  "/images/cracker2.jpg",
  "/images/cracker3.jpg",
  "/images/cracker4.jpg",
];

export default function AboutPage() {
   const [currentIndex, setCurrentIndex] = useState(0);

   
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000); // change every 2 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <main className="bg-gray-100 min-h-screen p-6">
       <h2 className="text-3xl font-bold mb-4 text-center">About Us</h2>
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Column: Repeating Pictures */}
       <div className="w-full h-150 overflow-hidden rounded-lg shadow-lg">
  <img
    src={images[currentIndex]}
    alt={`Cracker ${currentIndex + 1}`}
    className="w-full h-full object-cover transition-all duration-700"
  />
</div>


        {/* Right Column: About Us + Counters */}
        <div>
         
          <p className="text-gray-700 mb-6">
 G Crackers is one of the most trusted and reliable destinations for online crackers shopping in India. We are committed to delivering the best quality crackers at the most competitive prices, ensuring complete satisfaction for our customers. Our wide range includes traditional crackers, fancy novelty items, and the latest additions introduced every festive season.<br />

Every year, we carefully select and introduce new varieties of crackers to meet the evolving preferences of our customers. Quality and safety are our top priorities, and we strictly follow all safety standards from sourcing and packing to final delivery. Each product is tested and packed with care to ensure a safe and enjoyable celebration.<br />

At G Crackers, customer happiness comes first. Our dedicated 24/7 support team is always ready to assist with product selection, order tracking, and delivery updates. We believe in building long-term relationships with our customers by providing fast service, reliable delivery, and consistent quality.<br />

Celebrate Diwali and every special occasion with G Crackers. Let us add color, joy, and excitement to your celebrations with our premium crackers and exceptional service.
          </p>

          {/* Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-900 rounded-lg">
              <h3 className="text-3xl font-bold text-yellow-400">
                <Counter end={200} />+
              </h3>
              <p className="text-gray-300 mt-2">Products</p>
            </div>

            <div className="p-4 bg-gray-900 rounded-lg">
              <h3 className="text-3xl font-bold text-yellow-400">
                <Counter end={500} />+
              </h3>
              <p className="text-gray-300 mt-2">Happy Clients</p>
            </div>

            <div className="p-4 bg-gray-900 rounded-lg">
              <h3 className="text-3xl font-bold text-yellow-400">
                <Counter end={100} />%
              </h3>
              <p className="text-gray-300 mt-2">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
