# Hyperledger Fabric Asset Management System

This project implements a blockchain-based asset management system for a financial institution using **Hyperledger Fabric**. The system manages and tracks asset transactions, allowing secure, transparent, and immutable records of assets with specific attributes.

## Project Structure

- **Level 1**: Set up a Hyperledger Fabric test network.
- **Level 2**: Develop and deploy a smart contract that performs asset creation, updating, and querying.
- **Level 3**: Develop a REST API for interacting with the deployed smart contract on the test network and create a Docker image for the REST API.

## Prerequisites

- [Hyperledger Fabric](https://hyperledger-fabric.readthedocs.io/en/latest/getting_started.html)
- [Docker](https://www.docker.com/get-started) and Docker Compose
- **Programming Language**: Golang (preferred), JavaScript, TypeScript, or Java.

## Setup Instructions

### 1. Setup Hyperledger Fabric Test Network
Refer to the [Hyperledger Fabric documentation](https://hyperledger-fabric.readthedocs.io/en/latest/test_network.html) to initialize the test network.

### 2. Develop and Test Smart Contract
Use the references provided in [Hyperledger Fabric Documentation](https://hyperledger-fabric.readthedocs.io/en/latest/smartcontract/smartcontract.html) to create a smart contract that fulfills the project requirements. Deploy the smart contract to the test network.

### 3. Develop REST API and Dockerize
Create a REST API to interact with the smart contract. Package the REST API into a Docker image for deployment.

### Useful Resources

- [Hyperledger Fabric Gateway](https://hyperledger-fabric.readthedocs.io/en/latest/gateway.html)
- [Chaincode Deployment](https://hyperledger-fabric.readthedocs.io/en/release-2.4/deploy_chaincode.html)

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
