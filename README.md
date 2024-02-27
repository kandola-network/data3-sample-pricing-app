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

## Built With
* [Node.js](https://nodejs.org/) 
* [Express.js](https://expressjs.com/)

## Authors
* [Data3.Network](https://data3.network/) (powered by [Kandola Network](https://kandola.network/))