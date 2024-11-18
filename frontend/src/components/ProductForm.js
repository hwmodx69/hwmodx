import React, { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleAddProduct = async () => {
    try {
      const sellerId = "currentSellerId"; // Replace with actual seller ID from context/session
      await axios.post("http://localhost:5000/api/products/add", {
        name,
        price,
        description,
        sellerId,
      });
      alert("Product added successfully! Pending approval.");
      setName("");
      setPrice("");
      setDescription("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <h3>Add New Product</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddProduct();
        }}
      >
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
