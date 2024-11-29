import { ethers } from 'ethers';

// Constants
const MINT_ABI = ['function mint(uint256 amount)'];

// Mint tokens
export async function mintTokens(contractAddress, amount, signer) {
  try {
    console.log('Minting tokens...');
    const tokenContract = new ethers.Contract(contractAddress, MINT_ABI, signer);

    const tx = await tokenContract.mint(amount);
    await tx.wait();
    console.log('Tokens minted successfully!');
  } catch (error) {
    console.error('Error while minting tokens:', error);
    throw error;
  }
}
