import express from "express";
import { getProductDetails, getProducts } from "../controllers/product.js";

const router = express.Router();


router.get("/products", getProducts);
router.get("/products/:productId", getProductDetails);

export default router;
