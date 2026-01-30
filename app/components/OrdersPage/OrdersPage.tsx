"use client";

import { useEffect, useState } from "react";
import generateOrdersPDF from "./OrdersDocument";
import axios from "axios";

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
      // const token = localStorage.getItem("adminToken");
  try {
    const res = await axios.get(API_URL);
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
  className="fixed top-6 right-6 px-4 py-2 bg-blue-600 text-white rounded shadow-lg"
>
  PDF Generate
</button>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
           const total = order.items.reduce(
  (sum, item) =>
    sum + (item.Product?.Product_price || item.price || 0),
  0
);


            return (
              <div
                key={order.id}
                className="border rounded p-4 bg-white shadow"
              >
                <div className="flex justify-between mb-2">
                  <span>
                    <b>Order ID:</b> #{order.id}
                  </span>
                  <span>
                    <b>Date:</b>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
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
                <button
  onClick={() =>
    setOpenOrderId(openOrderId === order.id ? null : order.id)
  }
  className="text-blue-600 underline mt-2"
>
  {openOrderId === order.id ? "Hide Items" : "View Items"}
</button>
               {openOrderId === order.id && (
  <div className="mt-2">
    <b>Items:</b>
    <ul className="ml-4 list-disc">
      {order.items.map((item, idx) => {
        const price = item.Product?.Product_price || item.price || 0;
        const name =
          item.Product?.Product_name ||
          `Product ID: ${item.productId}`;

        return (
          <li key={idx}>
            {name} x 1 = ₹{price}
          </li>
        );
      })}
    </ul>
  </div>
)}

                <p className="mt-2 font-bold">Total: ₹{total}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
