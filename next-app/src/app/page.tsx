"use client";
import { useActiveAccount } from "thirdweb/react";
import { client } from "./client";
import { AutoConnect } from "thirdweb/react";
import MiniGame from "./components/MiniGame";
import { ConnectButton } from "thirdweb/react";



export default function Home() {
  const address = useActiveAccount()?.address;
  const handleRewardClaim = async () => {
    if (!address ) return;

 
    try {
    const response = await fetch('/api/mintToken', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        userWalletAddress: address,
        amount: 1,
        }),
    });

    const result = await response.json();

    if (response.ok) {
        console.log('Claim successful:', result);
        
    } else if (response.status === 408) {
        console.log('Transaction not mined within timeout period:', result);
    } else {
        console.error('Claim failed:', result);
    }
    } catch (error) {
        console.error('Error claiming reward:', error);
    } finally {
       
    }
};
  return (
    <main className="h-screen w-full">
      <ConnectButton client={client} />
      {address &&(
        <button onClick={handleRewardClaim}>claim nft  </button>
      )}
    </main>
  );
}

