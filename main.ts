import { ethers } from 'ethers';

// Check if MetaMask is installed
if (!(window as any).ethereum) {
  console.error('MetaMask is not installed');
} else {
  // Connect to MetaMask provider
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);

  // Request access to accounts
  (async () => {
    try {
      await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      
      // Get the connected account
      const accounts = await provider.listAccounts();
      const signer = provider.getSigner();
      console.log('Connected account:', accounts[0]);

      // Your dApp logic here

      // Example: Sign a transaction
      const transaction = {
        to: '0xYourRecipientAddress',
        value: ethers.utils.parseEther('0.1'), // 0.1 ETH
      };

      const signedTransaction = await signer.sendTransaction(transaction);
      console.log('Transaction sent:', signedTransaction);

    } catch (error) {
      console.error('Error connecting to MetaMask:', error.message);
    }
  })();
}
