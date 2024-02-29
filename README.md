# Sample Data3.Network Pricing Engine App (NodeJS)

This Node.js project is designed to provide an automated pricing engine for node providers in the Data3 Network's decentralized Database-as-a-Service (DBaaS) platform. It leverages a REST API to receive database deployment requests from customers, processes these requests based on predefined pricing logic, and communicates the calculated bid back to the network via a configurable webhook. This enables node providers to efficiently and dynamically price database services in a decentralized environment, catering to a wide range of customer needs and regional pricing variations.
## Getting Started

### Prerequisites
* Node 20.9+ and npm 10.1+

```bash
node --version
npm --version
```

These instructions will get you a copy of this sample pricing engine project up and running on your local machine for development and testing purposes.
* Clone the repository:
```shell
git clone [repository URL]
cd [local repository]
```
* Install project dependencies:
```shell
npm install
```

## Programming Your Custom Pricing Logic
Use the function `calculatePrice(request)` to program your algorithm for pricing, given the customer request.
The customer's request has these fields that you can use to determine the price:
Pricing logic based on request structure:
```json
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
```

## Configuration
You can pass the required environment variable either in a .env file in the root of the project:

```shell
WEBHOOK_URL=https://node_provider_service_local_url/internalCommunication/responseForProposal
```

Or, you can set it in the environment prior to running the pricing application (see env.sh)
```shell
export WEBHOOK_URL=https://dev.example.com/webhook
```


## Running the Application
```shell
npm start
```

## API
* HTTP Method: POST
* Endpoint: "/price"
* Post Data (JSON):
```json
{
  "requestId": "e2c7e462f52fa2c252970c739532ac8a98694f036833d3135fe7b5dea97c4718",
  "memory":6,
  "storage":250,
  "cpuSpec":"intel xeon e5-2.5-8",
  "redundancy":3,
  "region":"WESTERN_EUROPE-United Kingdom-London",
  "isBackupRequired":true,
  "backupFrequency":"MONTHLY",
  "isSharedInstance":true,
  "paymentFrequency":"MONTHLY",
  "name":"Dev 2",
  "dbEngine":"MySQL-8.2.0-community",
  "isActive":true,
  "status":"NEW",
  "dateCreated":1708959382125,
  "dbOwner":"0xb34ce981c44702f0e5b19884009f76be2f10fbb7"
}
```

## Built With
* [Node.js](https://nodejs.org/) 
* [Express.js](https://expressjs.com/)

## Authors
* [Data3.Network](https://data3.network/) (powered by [Kandola Network](https://kandola.network/))