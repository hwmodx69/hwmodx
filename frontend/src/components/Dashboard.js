import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";

const Dashboard = ({ userRole }) => {
  const [products, setProducts] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);

  // Fetch products based on the user's role
  useEffect(() => {
    if (userRole === "seller") {
      fetchSellerProducts();
    } else if (userRole === "owner") {
      fetchPendingProducts();
    }
  }, [userRole]);

  const fetchSellerProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/seller");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching seller products:", error);
    }
  };

  const fetchPendingProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/pending");
      setPendingProducts(res.data);
    } catch (error) {
      console.error("Error fetching pending products:", error);
    }
  };

  const approveProduct = async (productId) => {
    try {
      await axios.patch(`http://localhost:5000/api/products/approve/${productId}`);
      setPendingProducts(pendingProducts.filter((p) => p._id !== productId));
    } catch (error) {
      console.error("Error approving product:", error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {userRole === "seller" ? (
        <>
          <h3>Your Products</h3>
          <ul>
            {products.map((product) => (
              <li key={product._id}>
                {product.name} - {product.approved ? "Approved" : "Pending"}
              </li>
            ))}
          </ul>
          <ProductForm />
        </>
      ) : (
        <>
          <h3>Pending Products for Approval</h3>
          <ul>
            {pendingProducts.map((product) => (
              <li key={product._id}>
                {product.name} - ${product.price}{" "}
                <button onClick={() => approveProduct(product._id)}>Approve</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Dashboard;
