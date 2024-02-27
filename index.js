// For loading config from .env file
require('dotenv').config();

const express = require('express');
const axios = require('axios');

const pricingEngineApp = express();
pricingEngineApp.use(express.json());


function calculatePrice(request) {
    // Simple pricing logic
    const basePrice = 50; // Base price for any deployment
    const memoryPrice = request.memory * 5; // Example: $5 per GB of memory
    const storagePrice = request.storage * 2; // Example: $2 per GB of storage
    // Add more calculations based on cpuSpec, redundancy, region, etc.

    return basePrice + memoryPrice + storagePrice; // Total price
};


/*function calculatePriceComplex(request) {
    request.isBackupRequired = undefined;
    let basePrice = calculateBasePrice(request.memory, request.storage, request.cpuSpec);
    let regionMultiplier = getRegionMultiplier(request.region);
    let redundancyCost = calculateRedundancyCost(basePrice, request.redundancy);
    let backupCost = request.isBackupRequired ? calculateBackupCost(basePrice, request.backupFrequency) : 0;
    let sharedDiscount = request.isSharedInstance ? calculateSharedDiscount(basePrice) : 0;
    let paymentDiscount = calculatePaymentDiscount(basePrice, request.paymentFrequency);

    return (basePrice + redundancyCost + backupCost - sharedDiscount - paymentDiscount) * regionMultiplier;
}

function calculateBasePrice(memory, storage, cpuSpec) {
    return undefined;
}

function getRegionMultiplier(region) {
    return undefined;
}

function calculateRedundancyCost(basePrice, redundancy) {
    return undefined;
}

function calculateBackupCost(basePrice, backupFrequency) {
    return 0;
}

function calculateSharedDiscount(basePrice) {
    return 0;
}

function calculatePaymentDiscount(basePrice, paymentFrequency) {
    return undefined;
}*/


pricingEngineApp.post('/price', async (req, res) => {
    const params = req.body;
    console.log("Got pricing request:", params);
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
    console.log(`Pricing Engine will send calculated prices to ${process.env.WEBHOOK_URL}`);
});
