import { ethers } from "ethers";
import { hooks } from "../../connectors/metaMask";
import { useState, useEffect, useContext } from "react";
import NFTCard from "../../components/NFTCard";
import { nftContractAddress, stakeContractAddress } from "../../config";
import SidebarContext from "../../context/SidebarContext";

import APEABI from "../../abi/APE.json";
import APEStakingAPI from "../../abi/APEStaking.json";

const { useAccounts, useProvider } = hooks;

function Home() {
  const accounts = useAccounts();
  const provider = useProvider();
  const sidebarContext = useContext(SidebarContext);

  const [nfts, setNfts] = useState([]);
  const [staked, setStaked] = useState([]);

  useEffect(() => {
    if (provider === undefined || accounts === undefined) return;
    if (accounts.length <= 0) return;

    console.log ('reload');

    const walletAddress = accounts[0];

    const nftContract = new ethers.Contract(
      nftContractAddress,
      APEABI,
      provider.getSigner(0)
    );

    const stakeContract = new ethers.Contract(
      stakeContractAddress,
      APEStakingAPI,
      provider.getSigner(0)
    );

    async function getOwnedNfts() {
      const returnIds = await nftContract.tokensOfOwner(walletAddress);

      setNfts (returnIds);
    }

    async function getStakedNfts() {
      const returnIds = await stakeContract.tokensOfOwner(walletAddress);

      console.log (returnIds);
            
      setStaked(returnIds);
    }
    
    getOwnedNfts();
    getStakedNfts();
  }, [provider, accounts, sidebarContext.reload]);

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
