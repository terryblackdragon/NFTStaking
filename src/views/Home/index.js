import { ethers } from "ethers";
import { hooks } from "../../connectors/metaMask";
import { useState, useEffect } from "react";
import NFTCard from "../../components/NFTCard";
import { nftContractAddress, nftABI, stakeContractAddress, stakeABI } from "../../config";


const { useAccounts, useProvider } = hooks;

function Home() {
  const accounts = useAccounts();
  const provider = useProvider();

  const [nfts, setNfts] = useState([]);
  const [staked, setStaked] = useState([]);

  useEffect(() => {
    if (provider === undefined || accounts === undefined) return;
    if (accounts.length <= 0) return;

    const walletAddress = accounts[0];

    const nftContract = new ethers.Contract(
      nftContractAddress,
      nftABI,
      provider.getSigner(0)
    );

    const stakeContract = new ethers.Contract(
      stakeContractAddress,
      stakeABI,
      provider.getSigner(0)
    );

    async function getOwnedNfts() {
      const returnIds = await nftContract.walletOfOwner(walletAddress);

      setNfts (returnIds);
    }

    async function getStakedNfts() {
      const allStakedIds = await nftContract.walletOfOwner(stakeContractAddress);
            
      allStakedIds.map ((id) => {
        const check = async () => {
          const owner = await stakeContract.tokenOwner(id);
          console.log ('owner', owner);
          console.log ('walletAddress', walletAddress);
          if (owner == walletAddress) {
            setStaked([...staked, id])
          }
        }

        check();
      })

    }
    
    getOwnedNfts();
    getStakedNfts();
  }, [provider, accounts]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Your NFTs
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {
            nfts.map((nft, index) => <NFTCard key = {index} tokenId = {nft}/>)
          }
          {
            staked.map((nft, index) => <NFTCard key = {index} tokenId = {nft}/>)
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
