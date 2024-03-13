// For loading config from .env file
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const pricingEngineApp = express();
pricingEngineApp.use(express.json());
const { calculatePrice } = require('./pricing');
const { deploy } = require('./deploy');

pricingEngineApp.post('/deploy', async (req, res) => {
    const reqJson = req.body;
    if(!reqJson) {
        res.status(500).send({ status: 'error', message: 'Data3 External Deployment Engine Error: No request body for deployment' });
        return;
    }
    deploy(reqJson);
    res.send({ status: 'success'});
});

pricingEngineApp.post('/price', async (req, res) => {
    const reqJson = req.body;
    //console.debug("Data3 External Pricing Engine: Got pricing request body:", reqJson);

    if(!reqJson) {
        res.status(500).send({ status: 'error', message: 'Data3 External Pricing Engine Error: No request body for pricing' });
        return;
    }
    const price = calculatePrice(reqJson);

    if(price !== NaN && price > 0) {
        // Price is greater than 0
        try {
            const formData = new FormData();
            formData.append('rspAddress', reqJson.address);
            formData.append('price', price);

            console.log("Sent price of " + price + " for request " + reqJson.address + " to " + process.env.WEBHOOK_URL);

            await axios.post(process.env.WEBHOOK_URL, formData, {headers: formData.getHeaders()});

            res.send({ status: 'success'});
        } catch (error) {
            res.status(500).send({ status: 'error', message: 'Failed to call webhook on node provider service' });
        }
    } else {
        // Price is not a valid number or prise is 0 or negative - do not send price
        console.log("Calculated price of " + price + " for request " + reqJson.address + " and price is not greater than 0. So, not sending price for deployment");
        res.send({ status: 'success'});
    }

});


const PORT = process.env.PORT || 3080;
const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
pricingEngineApp.listen(PORT, HOSTNAME , () => {
    console.log(`Pricing / Deployment Engine is running on http://${HOSTNAME}:${PORT}`);
    console.log(`Pricing / Deployment Engine will send calculated prices to ${process.env.WEBHOOK_URL}`);
});
