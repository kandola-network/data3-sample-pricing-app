/***
 Pricing logic based on request structure:
 {
  dbOwner: '0xb34ce981c44702f0e5b19884009f76be2f10fbb7',
  region: 'WESTERN_EUROPE-United Kingdom-London',
  dbEngine: 'MySQL',
  dbEngineVersion: '8.2.0',
  isLicensed: null,
  licenseKey: null,
  deploymentType: 'SHARED',
  specification: 'DB STARTER K2 - 1 GB RAM - 2 vCPU(s)',
  cpu: 2,
  memory: 1,
  storage: 100,
  iops: 1000,
  isRedundancyRequired: false,
  redundancy: null,
  isBackupRequired: false,
  backupFrequencyDays: null,
  backupRetentionDays: null,
  paymentFrequency: 'MONTHLY',
  dbUsername: 'admin',
  isAutoGenPassword: false,
  dbPassword: 'admin',
  name: 'Test 37',
  address: 'c934502630220c58b726194c8ce87e96fb1adf48cf2720a053f8ca7721101238'
}

 * @param request
 * @returns {number}
 */
function calculatePrice(request) {
    console.debug("Data3 External Pricing Engine: Got pricing request:", request);
    // Simple pricing logic
    const basePrice = 50; // Base price for any deployment
    const cpuPrice = request.cpu * 10; // Example: $10 per vCPU core
    const memoryPrice = request.memory * 5; // Example: $5 per GB of memory
    const storagePrice = request.storage * 2; // Example: $2 per GB of storage

    let redundancyMultiplier = 1;
    if(request.isRedundancyRequired) {
        redundancyMultiplier = request.redundancy;
    }

    let dedicatedMultiplier = 1;
    if(request.deploymentType === 'SHARED') {
        dedicatedMultiplier = 1;
    } else {
        dedicatedMultiplier = 2;
    }
    let iopsMultiplier = 1;
    let iops = request.iops;
    if(iops<=1000) {
        iopsMultiplier = 1;
    } else if(iops<=2000) {
        iopsMultiplier = 1.2;
    } else if(iops<=3000) {
        iopsMultiplier = 1.3;
    } else if(iops<=4000) {
        iopsMultiplier = 1.4;
    } else if(iops<=6000) {
        iopsMultiplier = 1.6;
    } else if(iops<=9000) {
        iopsMultiplier = 1.9;
    } else if(iops<=12000) {
        iopsMultiplier = 2.5;
    } else {
        iopsMultiplier = 10;
    }
    let totalPrice = (basePrice + cpuPrice + memoryPrice + storagePrice) * redundancyMultiplier * dedicatedMultiplier * iopsMultiplier;
    return totalPrice;
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


module.exports = { calculatePrice };