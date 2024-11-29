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
Starting token transfer...
Transaction Data: 0xa9059cbb000000000000000000000000ab5801a7d398351b8be11c439e05c5b3259aec9b000000000000000000000000000000000000000000000000b469471f80140000
Gas Limit in gas units: 35442
Gas Price in Gwei: 5.993523427
Nonce: 35
Chain ID: 11155111n
Transaction Details: {
  to: '0x72EaE48A5a509FEE30Ff34F3cB2A3fe6732251b3',
  value: 0n,
  gasLimit: 42530n,
  gasPrice: 5993523427n,
  data: '0xa9059cbb000000000000000000000000ab5801a7d398351b8be11c439e05c5b3259aec9b000000000000000000000000000000000000000000000000b469471f80140000',
  nonce: 35,
  chainId: 11155111n
}
Transaction size before signing (bytes): 111
Signed Transaction: 0x01f8ae83aa36a7238501653de8e382a6229472eae48a5a509fee30ff34f3cb2a3fe6732251b380b844a9059cbb000000000000000000000000ab5801a7d398351b8be11c439e05c5b3259aec9b000000000000000000000000000000000000000000000000b469471f80140000c001a0a57990fa6bf46ce00ba2ac573c3144b5fdb0e648d10678101b42a0e7db15b4d7a047ae8f217f2a2ca060886e098121a8186b17a74d6b3ac40717f9797e911a0995
Transaction size after signing (bytes): 178
Decoded Transaction:
  Hash: 0x3cb1984c7dad2f464dd1c3b8ade7a686e5e23612997aadd375f37f733a29c3d8
  v: 28
  r: 0xa57990fa6bf46ce00ba2ac573c3144b5fdb0e648d10678101b42a0e7db15b4d7
  s: 0x47ae8f217f2a2ca060886e098121a8186b17a74d6b3ac40717f9797e911a0995
Transaction Hash: 0x5e1ff76a85188960fd7e333daadb9a1ecd85dd0751cfc4eb1cf7248f96d5226e
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
