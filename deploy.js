/***
 Deployment logic based on request structure:
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
function deploy(request) {
    console.debug("Data3 External Deploy API: Got deploy request body:", request);
};

module.exports = { deploy };