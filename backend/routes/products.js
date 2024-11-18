const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Add a product (Seller Only)
router.post("/add", async (req, res) => {
  const { name, price, description, sellerId } = req.body;

  const product = new Product({ name, price, description, sellerId });

  try {
    await product.save();
    res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error adding product." });
  }
});

// Approve product (Owner Only)
router.patch("/approve/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error approving product." });
  }
});

module.exports = router;
