// seed.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const productsData = [
        {
            name: 'Product 1',
            description: 'Description for Product 1',
            price: 19.99,
        },
        {
            name: 'Product 2',
            description: 'Description for Product 2',
            price: 99.99,
        },
        {
            name: 'Product 3',
            description: 'Description for Product 2',
            price: 19.99,
        },
        {
            name: 'Product 4',
            description: 'Description for Product 2',
            price: 9.99,
        },
        {
            name: 'Product 5',
            description: 'Description for Product 2',
            price: 19.99,
        },
        {
            name: 'Product 6',
            description: 'Description for Product 2',
            price: 50.99,
        },
        {
            name: 'Product 7',
            description: 'Description for Product 2',
            price: 29.99,
        },

        // Add more product data as needed
    ];

    for (const product of productsData) {
        await prisma.product.create({
            data: product,
        });
    }

    console.log('Products seeded successfully');
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
