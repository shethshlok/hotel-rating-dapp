# DApp Hotel Rating

[![Website](https://img.shields.io/badge/Website-dapp.shloksheth.tech-blue)](https://dapp.shloksheth.tech)

## Introduction

DApp Hotel Rating is a decentralized application (DApp) designed to enable users to rate hotels in a transparent and tamper-proof manner using blockchain technology. The project leverages the power of Ethereum smart contracts to ensure that all ratings are securely stored on the blockchain, preventing any form of data manipulation.

## Features

- **Decentralized Ratings**: All ratings are stored on the Ethereum blockchain, ensuring transparency and immutability.
- **User Authentication**: Users can authenticate and interact with the DApp using their Ethereum wallets.
- **Responsive Design**: The application is designed to be responsive and user-friendly across various devices.
- **Real-time Updates**: Ratings and reviews are updated in real-time, providing users with the latest information.

## Technologies Used

- **JavaScript**: Used for the front-end logic and interacting with the Ethereum blockchain.
- **CSS**: Styling of the user interface.
- **Solidity**: Smart contract development for the Ethereum blockchain.
- **HTML**: Structuring of the web pages.
- **Ethers.js**: A lightweight JavaScript library for interacting with the Ethereum blockchain.
- **Hardhat**: Ethereum development environment for compiling, deploying, and testing smart contracts.
- **MetaMask**: Ethereum wallet for user authentication and transactions.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- MetaMask extension installed on your browser.
- Hardhat installed locally via npm.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/shethshlok/dapp-hotel-rating.git
   cd dapp-hotel-rating
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Compile the smart contracts:
   ```bash
   npx hardhat compile
   ```

4. Deploy the smart contracts to a local blockchain (e.g., Hardhat Network):
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

5. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Open your browser and navigate to http://localhost:3000 (or the specified port).
2. Connect your MetaMask wallet to the application.
3. Interact with the DApp by rating hotels and viewing existing ratings.

Visit the live application at [dapp.shloksheth.tech](https://dapp.shloksheth.tech)