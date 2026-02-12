"use client";

import React, { useState, useEffect } from "react";
import generateOrderSummaryPDF from "./OrderSummarypdf";

import { useCart } from "./../Context/carcontext";



// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

import QRCode from "qrcode";

function OrderSummary() {
  const [products, setProducts] = useState<any[]>([]);
  // const [cart, setCart] = useState<{ [key: number]: { qty: number; total: number } }>({});

const { cart, updateQty } = useCart();


  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    mobile: "",
  address: "",
  orderId: "",           // will come from backend
  paymentMethod: "",     // user input
  deliveryMethod: "", 
  });

  // useEffect(() => {
  //   fetch("https://crackersbackend-upmi.onrender.com/app/products/")
  //     .then((res) => {
  //       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  //       return res.json();
  //     })
  //     .then((data) => setProducts(data))
  //     .catch((err) => console.error("Error fetching products:", err));
  // }, []);
useEffect(() => {
  fetch("http://localhost:7000/product")
    .then(res => res.json())
    .then(result => {
      setProducts(result.data); // 🔥 MUST
    })
    .catch(err => console.error(err));
}, []);

  // const updateQty = (id: number, change: number, price: number) => {
  //   setCart((prev) => {
  //     const qty = (prev[id]?.qty || 0) + change;
  //     if (qty < 0) return prev;
  //     return {
  //       ...prev,
  //       [id]: { qty, total: qty * price },
  //     };
  //   });
  // };

  const orderedItems = products.filter((p) => cart[p.id]?.qty > 0);
  const netTotal = Object.values(cart).reduce((sum, item) => sum + item.total, 0);

  const groupedProducts = products.reduce((acc: any, product: any) => {
    const category = product.Product_category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});
//  const isValidMobile = /^[6-9]\d{9}$/.test(mobile);

// if (!isValidMobile) {
//   alert("Enter valid 10-digit mobile number");
//   return;
// }


const handleDownloadPDF = () => {
  generateOrderSummaryPDF({
    customer,
    orderedItems,
    cart,
    netTotal, 
    // orderId: data.id, // after API success
  });
}


 const handlePlaceOrder = async () => {
  if (!orderedItems.length) {
    alert("Please add at least one product!");
    return;
  }

  const payload = {
    customer_name: customer.name,
    email: customer.email,
    mobile: customer.mobile,
    address: customer.address,
    products: orderedItems.map((item) => item.id),
  };

  try {
    const res = await fetch("http://localhost:7000/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
    const data = await res.json();

    // ✅ Update customer with orderId
    const updatedCustomer = {
      ...customer,
      orderId: data.id, // orderId from backend
    };

    setCustomer(updatedCustomer); // optional, if you want to keep state updated

    alert(`Order placed successfully! Order ID: ${data.id}`);

    // ✅ Pass updated customer to PDF
    generateOrderSummaryPDF({
      customer: updatedCustomer, // use updated customer
      orderedItems,
      cart,
      netTotal,
    });
  } catch (err) {
    console.error("Error placing order:", err);
    alert("Failed to place order. Please try again.");
  }
};


  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-orange-50 rounded-xl shadow-md">
  <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Order Summary</h2>

      {/* Products Table */}
      {Object.keys(groupedProducts).map((category) => (
        <div key={category} className="max-w-6xl mx-auto mb-8 text-center background-black p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">{category}</h3>
          <div className="overflow-x-auto">
<table className="w-full bg-white border border-gray-200 rounded-lg text-xs md:text-sm">
              <thead className="bg-orange-400">
                <tr>
                  <th className="p-1 md:p-2 border">Image</th>
                  <th className="p-1 md:p-2 border">Product</th>
                  <th className="p-1 md:p-2 border">Product (Tamil)</th>
                  <th className="p-1 md:p-2 border">Qty</th>
                  <th className="p-1 md:p-2 border">Price</th>
                  <th className="p-1 md:p-2 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {groupedProducts[category].map((product: any) => (
                  <tr key={product.id} className="text-center border-b">
                    <td className="hidden md:table-cell p-2 border">
                      {product.Product_image && (
                       <img
  src={
    product.Product_image.startsWith("http")
      ? product.Product_image
      : `${process.env.NEXT_PUBLIC_API_URL}${product.Product_image}`
  }
  alt={product.Product_name}
  className="w-12 h-12 object-cover rounded"
/>

                      )}
                    </td>
                    <td className="p-2 border-r">{product.Product_name}</td>
                    <td className="p-2 border-r">{product.Product_name_tamil}</td>
                  <td className="p-2 border-r">
  <div className="flex justify-center items-center gap-2 h-full">
    <button
      className="bg-orange-500 text-white px-2 py-1 rounded hover:bg-green-700"
      onClick={() => updateQty(product.id,product.Product_name, product.Product_image.startsWith("http")
        ? product.Product_image
        : `${process.env.NEXT_PUBLIC_API_URL}${product.Product_image}`,  -1, product.Product_price)}
 >
      -
    </button>

    <input
      type="text"
      readOnly
      value={cart[product.id]?.qty || 0}
      className="w-10 text-center border rounded"
    />

    <button
      className="bg-orange-500 text-white px-2 py-1 rounded hover:bg-green-700"
        onClick={() => updateQty(product.id,product.Product_name, product.Product_image.startsWith("http")
        ? product.Product_image
        : `${process.env.NEXT_PUBLIC_API_URL}${product.Product_image}`,1, product.Product_price)}
>
      +
    </button>
  </div>
</td>

                    <td className="p-2 border-r">₹{product.Product_price}</td>
                    <td className="p-2 border-r">₹{cart[product.id]?.total || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
<div className="max-w-6xl mx-auto text-center font-bold text-lg text-gray-800 mb-6 bg-orange-400 p-3 shadow rounded">

  Grand Total: ₹{netTotal}
</div>


      {/* Customer Form */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mb-6">
        <h3 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
          Customer Details
        </h3>
        <input
          type="text"
          placeholder="Name"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          className="w-full p-3 mb-3 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={customer.email}
          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
          className="w-full p-3 mb-3 border border-gray-300 rounded"
        />
        <input
  type="tel"
  placeholder="Mobile Number"
 value={customer.mobile}
  onChange={(e) => setCustomer({ ...customer, mobile: e.target.value })}
  maxLength={10}
  className="w-full p-3 mb-3 border border-gray-300 rounded"
/><select
  value={customer.paymentMethod}
  onChange={(e) =>
    setCustomer({ ...customer, paymentMethod: e.target.value })
  }
  className="w-full p-3 mb-3 border border-gray-300 rounded"
>
  <option value="">Select Payment Method</option>
  <option value="UPI">UPI</option>
  <option value="Credit Card">Credit Card</option>
  <option value="Cash on Delivery">Cash on Delivery</option>
</select>

<select
  value={customer.deliveryMethod}
  onChange={(e) =>
    setCustomer({ ...customer, deliveryMethod: e.target.value })
  }
  className="w-full p-3 mb-3 border border-gray-300 rounded"
>
  <option value="">Select Delivery Method</option>
  <option value="Home Delivery">Home Delivery</option>
  <option value="Pickup">Pickup</option>
</select>


        <textarea
          placeholder="Address"
          value={customer.address}
          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          className="w-full p-3 mb-3 border border-gray-300 rounded resize-none min-h-[80px]"
        />
  

      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
        <button
          className="border border-blue-900 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-900 hover:text-white"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
   
      </div>
    </div>
  );
}

export default OrderSummary;
