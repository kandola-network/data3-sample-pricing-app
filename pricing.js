/***
 Pricing logic based on request structure:
 {
  name: 'My Dev Deployment',
  address: '581037272ca2533df3cf215dceac56c3fe8a1d6cc7317ec28e5e257e556ed056',
  region: 'WESTERN_EUROPE-United Kingdom-London',
  dbEngine: 'MySQL',
  dbEngineVersion: '8.2.0',
  specification: 'DB AI MODEL K12 - 256 GB RAM - 64 vCPU(s)',
  memory: 256,
  storage: 4100,
  cpu: 64,
  isRedundancyRequired: true,
  redundancy: 1,
  isBackupRequired: true,
  backupFrequencyDays: 2,
  backupRetentionDays: 1,
  deploymentType: 'SHARED',
  isSharedInstance: true,
  iops: 1000,
  paymentFrequency: 'MONTHLY',
  isActive: true,
  status: 'NEW',
  dateCreated: 1709156623175,
  dbOwner: '0xa1d2339b6d633e129f3aeb2a59a8445dbb8b4117'
}
 * @param request
 * @returns {number}
 */
function calculatePrice(request) {
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
    if(request.isSharedInstance) {
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