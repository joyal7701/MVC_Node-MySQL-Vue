//import express
import express from "express";

//import functions from controller
import {
  showProducts,
  showProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";

//init express router
const router = express.Router();

//get all product
router.get("/products", showProducts);

//get single product
router.get("/products/:id", showProductById);

// Create New Product
router.post("/products", createProduct);

// Update Product
router.put("/products/:id", updateProduct);

// Delete Product
router.delete("/products/:id", deleteProduct);

//export default router
export default router;
