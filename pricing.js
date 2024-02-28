/***
 Pricing logic based on request:
    address
    memory
    storage
    cpuSpec
    redundancy
    region - Possible GeoRegions as defined by UN
                         EASTERN_AFRICA("Eastern Africa"),
                         MIDDLE_AFRICA("Middle Africa"),
                         NORTHERN_AFRICA("Northern Africa"),
                         SOUTHERN_AFRICA("Southern Africa"),
                         WESTERN_AFRICA("Western Africa"),
                         CARIBBEAN("Caribbean"),
                         CENTRAL_AMERICA("Central America"),
                         NORTHERN_AMERICA("Northern America"),
                         SOUTH_AMERICA("South America"),
                         CENTRAL_ASIA("Central Asia"),
                         EASTERN_ASIA("Eastern Asia"),
                         SOUTH_EASTERN_ASIA("South Eastern Asia"),
                         SOUTHERN_ASIA("Southern Asia"),
                         WESTERN_ASIA("Western Asia"),
                         WESTERN_EUROPE("Western Europe"),
                         SOUTHERN_EUROPE("Southern Europe"),
                         EASTERN_EUROPE("Eastern Europe"),
                         NORTHERN_EUROPE("Northern Europe"),
                         AUSTRALIA_AND_NEW_ZEALAND("Australia and New Zealand"),
                         MELANESIA("Melanesia"),
                         MICRONESIA("Micronesia"),
                         POLYNESIA("Polynesia")

                    Enabled on the marketplace till now :
                         [geoScheme: "WESTERN_EUROPE",country: "United Kingdom", city:"London" ],
                         [geoScheme: "SOUTH_EASTERN_ASIA",country: "India", city:"Mumbai" ],
                         [geoScheme: "NORTHERN_AMERICA",country: "USA", city:"Philadelphia" ],
                         [geoScheme: "AUSTRALIA_AND_NEW_ZEALAND",country: "Australia", city:"Sydney" ]
                    If you want to support more regions and cities, please let us know.

    isBackupRequired
    backupFrequency
    isSharedInstance
    paymentFrequency
    dbEngine
    isActive
    status
    dateCreated
    dbOwner
 * @param request
 * @returns {number}
 */
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


module.exports = { calculatePrice };