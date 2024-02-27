// For loading config from .env file
require('dotenv').config();

const express = require('express');
const axios = require('axios');

const pricingEngineApp = express();
pricingEngineApp.use(express.json());


const calculatePrice = (params) => {
    // Simple pricing logic
    const basePrice = 50; // Base price for any deployment
    const memoryPrice = params.memory * 5; // Example: $5 per GB of memory
    const storagePrice = params.storage * 2; // Example: $2 per GB of storage
    // Add more calculations based on cpuSpec, redundancy, region, etc.

    return basePrice + memoryPrice + storagePrice; // Total price
};

pricingEngineApp.post('/price', async (req, res) => {
    const params = req.body;
    const price = calculatePrice(params);

    try {
        await axios.post(process.env.WEBHOOK_URL, {
            requestId: params.requestId,
            price: price
        });
        res.send({ status: 'success', requestId: params.requestId, price: price });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Failed to call webhook on node provider service' });
    }
});

const PORT = process.env.PORT || 3080;
pricingEngineApp.listen(PORT, () => {
    console.log(`Pricing Engine is running on port ${PORT}`);
    console.log(`Pricing Engine will send calculated pries to ${process.env.WEBHOOK_URL}`);
});
