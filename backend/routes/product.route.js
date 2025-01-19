import express from 'express';
import mongoose from 'mongoose';
import Product from '../model/product.model.js';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(`Error in fetching product: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
})

router.post("/", async (req, res) => {
  const product = req.body;

  if (!product || !product.name || !product.price || !product.image) {
    console.log(product);
    
    return res.status(400).json({
      success: false,
      message: "Provide all fields",
    });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    return res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error(`Error in creating product: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
})

router.delete("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: 'Product deleted.',
    })
  } catch (error) {
    console.error(`Error in deleting product: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
})


router.put("/:id", async (req, res) => {
  const {id} = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: 'Invalid ID or Product ID does not exist'
    });
  }
  
  const product = req.body;

  if (!product || !product.name || !product.price || !product.image) {
    console.log(product);
    
    return res.status(400).json({
      success: false,
      message: "Provide all fields",
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
    return res.status(201).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error(`Error in updating product: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
})

export default router;