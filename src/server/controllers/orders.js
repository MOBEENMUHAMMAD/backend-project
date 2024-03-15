import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Function to create an order
const createOrder = async (customerId, products) => {
    console.log("req",products)
    try {
        // Create order in the database
        const createdOrder = await prisma.order.create({
            data: {
                customer: { connect: { id: customerId } },
                products: {
                    create: products.map(product => ({
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        // quantity: product.quantity
                    }))
                },
            },
            include: { products: true },
        });
        return createdOrder;
    } catch (error) {
        throw new Error(`Error creating order: ${error.message}`);
    }
};

export { createOrder };