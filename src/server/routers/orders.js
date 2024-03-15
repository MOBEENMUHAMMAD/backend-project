import express from "express";
import { createOrder } from "../controllers/orders.js";

const router = express.Router();

router.post('/create-order', async (req, res) => {
    const { customerId, products } = req.body;

    // Validate input data
    if (!customerId || !products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Invalid request. Customer ID and at least one product are required.' });
    }

    try {
        const createdOrder = await createOrder(customerId, products);
        res.status(201).json({success:true,createdOrder});
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, error: 'Internal server error' });
    }
});

export default router;
