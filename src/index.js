import { ethers } from 'ethers';
import { config } from 'dotenv';
import { mintTokens } from './utils/mint.js';

config();

// Constants
const TOKEN_ADDRESS = '0x72EaE48A5a509FEE30Ff34F3cB2A3fe6732251b3';
const RECEIVER_ADDRESS = '0x4EAC292458355ba1D03F10BF4A9B39d7fD7d1E32';
const TOKEN_AMOUNT = ethers.parseUnits('13', 18); // 13 tokens with 18 decimals

// Initialize provider and user wallet
const provider = new ethers.JsonRpcProvider(process.env.ETH_SEPOLIA);
const signer = new ethers.Wallet(process.env.USER_PRIVATE_KEY, provider);

const tokenTransfer = async () => {
  try {
    console.log('Starting token transfer...');

    // Prepare transaction data
    const selector = '0xa9059cbb'; // Function selector for transfer(address,uint256)
    const receiver = RECEIVER_ADDRESS.replace('0x', '').padStart(64, '0'); // Адрес получателя без '0x' и с нулями в начале, чтобы суммарно было 256 бит
    const amount = TOKEN_AMOUNT.toString(16).padStart(64, '0'); // toString(16) переводит в шестнадцатеричную строку: 1_000_000 => 0xf4240

    const txData = selector + receiver + amount;
    console.log('Transaction Data:', txData);

    // Estimate gas
    const txGasLimit = await signer.estimateGas({
      to: TOKEN_ADDRESS,
      value: 0n,
      data: txData,
    });
    console.log('Gas Limit in gas units:', txGasLimit.toString());

    // Fetch fee data
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice || 0n;
    console.log('Gas Price in Gwei:', ethers.formatUnits(gasPrice, 'gwei'));

    // Get nonce and chain ID
    const txNonce = await provider.getTransactionCount(signer.address);
    const { chainId } = await provider.getNetwork();
    console.log('Nonce:', txNonce);
    console.log('Chain ID:', chainId);

    // Build transaction object
    const tx = {
      to: TOKEN_ADDRESS,
      value: 0n,
      gasLimit: (txGasLimit * 120n) / 100n, // Increase gas limit by 20%
      gasPrice,
      data: txData,
      nonce: txNonce,
      chainId,
    };
    console.log('Transaction Details:', tx);

    // Sign the transaction
    const signedTx = await signer.signTransaction(tx);
    console.log('Signed Transaction:', signedTx);

    // Decode and log the signature
    const txDecoded = ethers.Transaction.from(signedTx);
    if (txDecoded.signature) {
      const { v, r, s } = ethers.Signature.from(txDecoded.signature);
      console.log('  v:', v);
      console.log('  r:', r);
      console.log('  s:', s);
    }

    // Broadcast the transaction
    const txResponse = await provider.broadcastTransaction(signedTx);
    console.log('Transaction Hash:', txResponse.hash);
  } catch (error) {
    console.error('Error during token transfer:', error);
  }
};

(async () => {
  try {
    // Mint tokens before transfer
    await mintTokens(TOKEN_ADDRESS, TOKEN_AMOUNT, signer);

    // Perform the token transfer
    await tokenTransfer();
  } catch (error) {
    console.error('Error in mint and transfer process:', error);
  }
})();
