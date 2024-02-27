// For loading config from .env file
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const pricingEngineApp = express();
//pricingEngineApp.use(express.json());
pricingEngineApp.use(express.urlencoded({ extended: true }));

const { calculatePrice } = require('./pricing');



pricingEngineApp.post('/price', async (req, res) => {
    const params = req.body;
    //console.log("Got pricing request:", params);

    const bodyMessage = req.body.message;
    //console.log("Got pricing request message:", bodyMessage);

    const bodyMessageJson = JSON.parse(bodyMessage);
    console.log("Got pricing request:", bodyMessageJson);

    const requestData = {
        // Assuming the form fields match the JSON structure you provided earlier
        address: bodyMessageJson.address,
        memory: parseInt(bodyMessageJson.memory, 10),
        storage: parseInt(bodyMessageJson.storage, 10),
        cpuSpec: bodyMessageJson.cpuSpec,
        redundancy: parseInt(bodyMessageJson.redundancy, 10),
        region: bodyMessageJson.region,
        isBackupRequired: bodyMessageJson.isBackupRequired === 'true',
        backupFrequency: bodyMessageJson.backupFrequency,
        isSharedInstance: bodyMessageJson.isSharedInstance === 'true',
        paymentFrequency: bodyMessageJson.paymentFrequency,
        dbEngine: bodyMessageJson.dbEngine,
        isActive: bodyMessageJson.isActive === 'true',
        status: bodyMessageJson.status,
        dateCreated: parseInt(bodyMessageJson.dateCreated, 10),
        dbOwner: bodyMessageJson.dbOwner
    };

    const price = calculatePrice(requestData);

    try {
        const formData = new FormData();
        formData.append('rsvpAddress', requestData.address);
        formData.append('price', price);

        console.log("Sent price of " + price + " for request " + requestData.address);

        await axios.post(process.env.WEBHOOK_URL, formData, {headers: formData.getHeaders()});

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
