import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Adminpage.css";

// const API_URL = "http://127.0.0.1:8000/app/products/";
// const API_URL = "https://crackersbackend-upmi.onrender.com/app/products/";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/product`;



function AdminPage() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    id: null,
    name: "",
    name_tamil: "",
    price: "",
    category: "",
    image: null,
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  if (name === "image" && files && files.length > 0) {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      // const data = new FormData();
        formData.append("Product_name", form.name);
      formData.append("Product_name_tamil", form.name_tamil);
      formData.append("Product_category", form.category);
      formData.append("Product_price", form.price);
if (form.image && form.image instanceof File) {
  formData.append("Product_image", form.image);
}

  
      if (editMode) {
      // ✅ UPDATE product
       const res = await axios.put(`${API_URL}/${form.id}`, formData,  {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Product updated successfully!");
         setProducts(products.map(p => 
        p.id === res.data.data.id ? res.data.data : p
      ));
    } else {
      // ✅ ADD product
        res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Product added successfully!");
          setProducts([...products, res.data.data]);
    }

    setEditMode(false);
      setForm({
        id: null,
        name: "",
        name_tamil: "",
        price: "",
        category: "",
        image: null,
      });

      fetchProducts(); // reload updated list
    } catch (err) {
      console.error("Error adding product:", err);
      setMessage("❌ Failed to add product. Please try again.");
    }
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.Product_name,
      name_tamil: product.Product_name_tamil || "",
      price: product.Product_price,
      category: product.Product_category || "",
 image: product.Product_image || null, // keep existing image path
    });
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // await axios.delete(`${API_URL}${id}/`);
        await axios.delete(`${API_URL}/${id}`);
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">🛍️ Admin Product Dashboard</h1>
      
      {message && <p className="message">{message}</p>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name_tamil"
          placeholder="Product Name (Tamil)"
          value={form.name_tamil}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Product Category"
          value={form.category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input type="file" name="image" onChange={handleChange} />
        <button type="submit">{editMode ? "Update" : "Add"} Product</button>
      </form>

      <h2 className="list-title">Product List</h2>

      <div className="product-list">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            {p.Product_image && (
              <img
               src={`${p.Product_image}?t=${new Date().getTime()}`} // force refresh
                alt={p.Product_name}
              />
            )}
            <h3>{p.Product_name}</h3>
            {p.Product_name_tamil && <p>{p.Product_name_tamil}</p>}
            {p.Product_category && <p>Category: {p.Product_category}</p>}
            <p>₹{p.Product_price}</p>
            <div className="card-buttons">
              <button className="btn-edit" onClick={() => handleEdit(p)}>
                Edit
              </button>
              <button className="btn-delete" onClick={() => handleDelete(p.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
