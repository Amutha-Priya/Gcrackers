"use client";

import{useState}  from "react";
export default function ContactPage() {
  const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  altPhone: "",
  message: "",
});


  
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Breadcrumb */}
        <p className="text-sm text-gray-600 mb-4">
          Home <span className="mx-2">/</span> <span className="font-semibold">Contact Us</span>
        </p>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Contact Us
        </h1>
        <p className="text-gray-600 mb-8">
          Please Drop a Mail to Know about More Detail.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibo
            ld mb-4">Get in Touch</h2>
<form
  className="space-y-4"
  onSubmit={(e) => {
    e.preventDefault();

    const whatsappNumber = "918754883610"; // change if needed

    const text = `
Hello,
Name: ${form.firstName} ${form.lastName}
Email: ${form.email}
Phone: ${form.phone}
Alternate Phone: ${form.altPhone}
Message: ${form.message}
    `;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }}
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="text"
      placeholder="First name*"
      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
      required
    />
    <input
      type="text"
      placeholder="Last name*"
      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
      required
    />
  </div>

  <input
    type="email"
    placeholder="Email"
    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
    onChange={(e) => setForm({ ...form, email: e.target.value })}
  />

  <input
    type="tel"
    placeholder="Phone*"
    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
    onChange={(e) => setForm({ ...form, phone: e.target.value })}
    required
  />

  <input
    type="tel"
    placeholder="Alternate Phone number"
    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
    onChange={(e) => setForm({ ...form, altPhone: e.target.value })}
  />

  <textarea
    rows={4}
    placeholder="Your Message"
    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
    onChange={(e) => setForm({ ...form, message: e.target.value })}
  ></textarea>

  <button
    type="submit"
    className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
  >
    Send via WhatsApp
  </button>

  <p className="text-sm text-gray-500">
    * This will open WhatsApp to send your message
  </p>
</form>

          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            
            {/* Address */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Our Address</h3>
              <p className="text-gray-600">
                1/805, South Street,<br />
                NaranaPuram, Sivakasi.
              </p>
              <p className="mt-3 text-gray-600">
                Phone: <br />
                (+91) 754 002 7151 <br />
                (+91) 956 691 3888
              </p>
              <p className="mt-3 text-gray-600">
                Email: <span className="font-medium">info@crackersshope.com</span>
              </p>
            </div>

            {/* Opening Hours */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Opening Hours</h3>
              <p className="text-gray-600">
                Monday to Friday: <strong>9am – 9pm</strong>
              </p>
              <p className="text-gray-600">
                Saturday to Sunday: <strong>9am – 11pm</strong>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
