"use client";

import { useEffect, useState } from "react";
import generateOrdersPDF from "./OrdersDocument";
import axios from "axios";
import generateAdminOrderPDF from "../../components/Adminpage/AdminSingleOrderPDF";


const API_URL = "http://127.0.0.1:7000/order"; // your Postman endpoint

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);


  useEffect(() => {
    fetchOrders();
  }, []);

//  const fetchOrders = async () => {
//   try {
//     const res = await axios.get(API_URL);
//     const data = Array.isArray(res.data) ? res.data : res.data.data;
//     console.log("DATA ARRAY 👉", data);

//     const grouped = data.reduce((acc, item) => {
//       const orderId = item.orderId || item.id;
//       if (!acc[orderId]) {
//         acc[orderId] = {
//           id: orderId,
//           customer_name: item.customer_name,
//           email: item.email,
//           mobile: item.mobile,
//           address: item.address,
//           createdAt: item.createdAt,
//           items: [],
//         };
//       }

//       if (item.Product) {
//         acc[orderId].items.push({
//           product_name: item.Product.Product_name,
//           product_price: item.Product.Product_price,
//           quantity: 1,
//         });
//       } else {
//         acc[orderId].items.push({
//           product_name: `Product ID: ${item.productId}`,
//           product_price: item.price,
//           quantity: 1,
//         });
//       }

//       return acc;
//     }, {});

//     setOrders(Object.values(grouped));
//   } catch (err) {
//     console.error(err);
//   }
// };
const fetchOrders = async () => {
      const token = localStorage.getItem("adminToken");
  try {
    const res = await axios.get(API_URL,{
        headers: {
    Authorization: `Bearer ${token}`,
  },
    });
    const data = res.data.data || [];

    console.log("ORDERS 👉", data);
    setOrders(data);
  } catch (err) {
    console.error(err);
  }
};



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Orders</h1>
    <button
  onClick={() => generateOrdersPDF(orders)}
  className="fixed top-60 right-6 px-4 py-2 bg-blue-600 text-white rounded shadow-lg"
>
  Download Orders PDF
</button>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
     const total = (order.items || []).reduce(
  (sum, item) =>
    sum + (item.Product?.Product_price || item.price || 0),
  0
);



            return (
  <div
    key={order.id}
    className="bg-white rounded-xl shadow-md border hover:shadow-lg transition p-6"
  >
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <span className="px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-700 font-semibold">
        Order #{order.id}
      </span>

      <span className="text-sm text-gray-500">
        {new Date(order.createdAt).toLocaleString()}
      </span>
    </div>

    {/* Customer Info */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
      <p>
        <b>Customer:</b> {order.customer_name}
      </p>
      <p>
        <b>Email:</b> {order.email}
      </p>
      <p>
        <b>Mobile:</b> {order.mobile || "-"}
      </p>
      <p>
        <b>Address:</b> {order.address || "-"}
      </p>
    </div>
    {/* Toggle Items */}
    <button
      onClick={() =>
        setOpenOrderId(openOrderId === order.id ? null : order.id)
      }
      className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800"
    >
      {openOrderId === order.id ? "▲ Hide Items" : "▼ View Items"}
    </button>
    <br/>
      {/* Download Items */}
    <button
      onClick={() => generateAdminOrderPDF(order)}
      className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800"
    >
      ▼ Download Items PDF
    </button>

    {/* Items */}
    {openOrderId === order.id && (
      <div className="mt-4 bg-gray-50 border rounded-lg p-4">
        <b className="text-gray-800">Items</b>

        <ul className="mt-2 space-y-1 text-sm">
          {(order.items || []).map((item, idx) => {
            const price = item.Product?.Product_price || item.price || 0;
            const name =
              item.Product?.Product_name ||
              `Product ID: ${item.productId}`;

            return (
              <li
                key={idx}
                className="flex justify-between border-b pb-1"
              >
                <span>{name}</span>
                <span className="font-medium">₹{price}</span>
              </li>
            );
          })}
        </ul>
      </div>
    )}

    {/* Total */}
    <div className="mt-4 flex justify-end">
      <span className="text-lg font-bold text-green-600">
        Total: ₹{total}
      </span>
    </div>
  </div>
);

          })}
        </div>
      )}
    </div>
  );
}
