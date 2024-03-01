// For loading config from .env file
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const pricingEngineApp = express();
pricingEngineApp.use(express.json());
//pricingEngineApp.use(express.urlencoded({ extended: true }));
const { calculatePrice } = require('./pricing');

pricingEngineApp.post('/deploy', async (req, res) => {
    const reqJson = req.body;
    console.debug("Data3 External Deploy API: Got deploy request body:", reqJson);
    res.send({ status: 'success'});
});

pricingEngineApp.post('/price', async (req, res) => {
    const reqJson = req.body;
    //console.debug("Data3 External Pricing Engine: Got pricing request body:", reqJson);

    if(!reqJson) {
        res.status(500).send({ status: 'error', message: 'Data3 External Pricing Engine Error: No request body for pricing' });
        return;
    }

    /*const bodyMessage = req.body.message;
    console.debug("Data3 External Pricing Engine: Got pricing request message:", bodyMessage);
    if(!bodyMessage) {
        res.status(500).send({ status: 'error', message: 'Data3 External Pricing Engine Error: No request body message for pricing' });
        return;
    }*/
    /*let reqJson = null;
    try {
        reqJson = JSON.parse(bodyMessage);
    } catch(error) {
        console.error('Data3 External Pricing Engine Error: Failed to parse request JSON:', error.message);
    }
    console.debug("Data3 External Pricing Engine: Got pricing request JSON:", reqBody);
    */

    const requestData = {
        name: reqJson.name,
        address: reqJson.address,
        region: reqJson.region,


        dbEngine: reqJson.dbEngineName,
        dbEngineVersion: reqJson.dbEngineVersion,

        specification: reqJson.cpuMemorySpecCode,
        memory: parseNumberSafely(reqJson.cpuMemorySpecMemory, 10, 0),
        storage: parseNumberSafely(reqJson.storage, 10, 0),
        cpu: parseNumberSafely(reqJson.cpuMemorySpecCores,10, 0),

        isRedundancyRequired: reqJson.redundancyRequired,
        redundancy: parseNumberSafely(reqJson.redundancy, 10, 0),

        isBackupRequired: reqJson.isBackupRequired,
        backupFrequencyDays: parseNumberSafely(reqJson.backupFrequency, 10, 0),
        backupRetentionDays: parseNumberSafely(reqJson.backupRetentionTime, 10, 0),

        deploymentType: reqJson.instanceDeploymentType,
        isSharedInstance: reqJson.instanceDeploymentType === 'SHARED',

        iops: parseNumberSafely(reqJson.iopsRequested,10, 0),
        paymentFrequency: reqJson.paymentFrequency,



        isActive: reqJson.isActive,
        status: reqJson.status,
        dateCreated: parseNumberSafely(reqJson.dateCreated, 10, 0),
        dbOwner: reqJson.dbOwner
    };

    //console.debug("Data3 External Pricing Engine: Calculating price for ", requestData);
    const price = calculatePrice(requestData);

    try {
        const formData = new FormData();
        formData.append('rspAddress', requestData.address);
        formData.append('price', price);

        console.log("Sent price of " + price + " for request " + requestData.address + " to " + process.env.WEBHOOK_URL);

        await axios.post(process.env.WEBHOOK_URL, formData, {headers: formData.getHeaders()});

        res.send({ status: 'success'});
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Failed to call webhook on node provider service' });
    }
});

function parseNumberSafely(field, radix = 10, defaultValue = 0) {
    // Ensure the default value is a number, use 0 if it's not
    const validDefaultValue = typeof defaultValue === 'number' ? defaultValue : 0;

    // Ensure radix is between 2 and 16, default to 10 otherwise
    const validRadix = typeof radix === 'number' && radix >= 2 && radix <= 16 ? radix : 10;

    // If the field is null, return the valid default value
    if (field === null || field === undefined) {
        return validDefaultValue;
    }

    // If the field is already a number, return it directly
    if (typeof field === 'number') {
        return field;
    }

    // If the field is a string or can be converted to string, attempt to parse it
    if (typeof field === 'string' || field.toString) {
        try {
            const parsedInt = parseInt(field, validRadix);
            // Check if parsedInt is a valid number, otherwise return valid default value
            return isNaN(parsedInt) ? validDefaultValue : parsedInt;
        } catch (error) {
            // In case of an error during parsing, return the valid default value
            return validDefaultValue;
        }
    }

    // For all other cases where field is not parsable, return the valid default value
    return validDefaultValue;
}

const PORT = process.env.PORT || 3080;
pricingEngineApp.listen(PORT, () => {
    console.log(`Pricing Engine is running on port ${PORT}`);
    console.log(`Pricing Engine will send calculated prices to ${process.env.WEBHOOK_URL}`);
});
