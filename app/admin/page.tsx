
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.replace("/admin/login");
    }
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl p-6 bg-orange-100  h-[300px]">
        
        <div
          onClick={() => router.push("/admin/products")}
          className="cursor-pointer bg-white shadow-lg rounded-xl p-16 min-h-[160px] text-center hover:scale-105 transition"
        >
          <h2 className="text-2xl font-bold mb-2">📦 Product Admin</h2>
          <p>Manage products, images, prices</p>
        </div>

        <div
          onClick={() => router.push("/admin/orders")}
          className="cursor-pointer bg-white shadow-lg rounded-xl p-16 min-h-[160px] text-center hover:scale-105 transition"
        >
          <h2 className="text-2xl font-bold mb-2">🧾 Order Admin</h2>
          <p>View orders, customers, totals</p>
        </div>

      </div>
    </div>
  );
}
