
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Function to get a list of products
const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json({ data: products, message: "Product list retrieved successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get details of a specific product
const getProductDetails = async (req, res) => {
    const productId = req.params.productId;

    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(productId) },
        });

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ data: product, message: "Product details retrieved successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export { getProducts, getProductDetails };
