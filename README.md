# ERC20 Token Transfer on Ethereum Sepolia

This project demonstrates a detailed transaction workflow in the Ethereum Sepolia network for transferring ERC20 tokens. The code includes an automated process for minting and transferring tokens, with a comprehensive breakdown of the transfer transaction.

---

## Requirements

### Prerequisites

To work with this repository, ensure the following:

- **Node.js** (preferably the latest stable version)
- **npm** (Node Package Manager)
- A **.env** file containing:

  ```plaintext
  USER_PRIVATE_KEY=<your-private-key>
  ETH_SEPOLIA=<rpc-url>
  ```

### Additional Notes

- You need a small amount of test Ether in your wallet for gas fees.  
  [Get Sepolia test Ether from a faucet](https://sepoliafaucet.com/).

---

## Usage

1. **Install dependencies**:  
   Run the following command to install required packages:

   ```bash
   npm install
   ```

2. **Run the script**:  
   Execute the script to mint and transfer tokens:
   ```bash
   node src/index.js
   ```

---

## How It Works

- **Minting**: A simple token mint function is invoked to create tokens that will be transferred.
- **Transfer**: The transfer function is implemented with detailed transaction processing.

The console output includes all key transaction details.

### Example Console Output

```plaintext
Minting tokens...
Tokens minted successfully!
Starting transfer process...
Transaction Data: 0xa9059cbb0000000000000000000000004EAC292458355ba1D03F10BF4A9B39d7fD7d1E32000000000000000000000000000000000000000000000000b469471f80140000
Gas Limit in gas units: 52972
Gas Price in Gwei: 0.033794724
Nonce: 29
Chain ID: 11155111n
Transaction Details: {
  to: '0x72EaE48A5a509FEE30Ff34F3cB2A3fe6732251b3',
  value: 0n,
  gasLimit: 63566n,
  gasPrice: 33794724n,
  data: '0xa9059cbb0000000000000000000000004EAC292458355ba1D03F10BF4A9B39d7fD7d1E32000000000000000000000000000000000000000000000000b469471f80140000',
  nonce: 29,
  chainId: 11155111n
}
Signed Transaction: 0x01f8ad83aa36a71d840203aaa482f84e9472eae48a5a509fee30ff34f3cb2a3fe6732251b380b844a9059cbb0000000000000000000000004eac292458355ba1d03f10bf4a9b39d7fd7d1e32000000000000000000000000000000000000000000000000b469471f80140000c001a0af77c059dccfdc57b02a281cff8bfd8c6e67cdd05f222021a9dc46ac24d98659a00e05cc2848f7dc39f4dbdf26b2bb7cde6ad7bcaa0ecef6f2cb5aefbf9999de6a
  v: 28
  r: 0xaf77c059dccfdc57b02a281cff8bfd8c6e67cdd05f222021a9dc46ac24d98659
  s: 0x0e05cc2848f7dc39f4dbdf26b2bb7cde6ad7bcaa0ecef6f2cb5aefbf9999de6a
Transaction Hash: 0xbdf6bfe1118f622ed9274895e21b896883e71461ce7f19f197a63ffbf6c2377a
```

---

## Transaction Encoding Details

### Ethereum Transaction Structure

Ethereum transactions are serialized into raw byte sequences for transmission across the network. The encoding method, RLP (Recursive Length Prefix), structures the transaction as follows:

#### EIP-1559 Transaction Format:

- **chainId**: Network ID (e.g., Sepolia's chain ID is `11155111`).
- **nonce**: Transaction count for the sender.
- **maxPriorityFeePerGas**: Maximum priority fee (introduced in EIP-1559)
- **maxFeePerGas**: Maximum total fee (introduced in EIP-1559)
- **gasLimit**: Maximum gas units allowed for the transaction.
- **gasPrice**: Gas price per unit.
- **to**: Recipient address.
- **value**: Amount sent (in wei).
- **data**: Encoded function call (`transfer(address,uint256)`).
- **accessList**: Optional access list for gas optimization (introduced in EIP-2930)
- **v, r, s**: Transaction signature.

### Comparison of Transaction Types

| Feature                  | Legacy (Type 0) | EIP-2930 (Type 1) | EIP-1559 (Type 2) |
| ------------------------ | --------------- | ----------------- | ----------------- |
| `gasPrice`               | ✅              | ✅                | ❌                |
| `maxFeePerGas`           | ❌              | ❌                | ✅                |
| `maxPriorityFeePerGas`   | ❌              | ❌                | ✅                |
| `accessList`             | ❌              | ✅                | ✅                |
| Automatic Gas Adjustment | ❌              | ❌                | ✅                |
| Gas Efficiency           | Low             | Medium            | High              |

---

## Important Notes

- **Mint Functionality**: Simplified to ensure there are tokens to transfer.
- **Transfer Functionality**: Presented in a detailed manner, showcasing advanced Ethereum transaction handling.

---

Feel free to explore and customize the script to suit your needs!
