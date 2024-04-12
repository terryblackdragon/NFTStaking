import { ethers } from "ethers";
import { hooks } from "../connectors/metaMask";
import { useState, useEffect } from "react";
import {
  nftContractAddress,
  nftABI,
  stakeContractAddress,
  stakeABI,
} from "../config";

import NoImage from "../image-not-found-vector_.jpg";

const { useAccounts, useProvider } = hooks;

export default function NFTCard(props) {
  const accounts = useAccounts();
  const provider = useProvider();
  const [staked, setStaked] = useState(false);

  const [itemInfo, setItemInfo] = useState({});

  useEffect(() => {
    async function getItemInfo() {
      if (provider === undefined) return;

      const nftContract = new ethers.Contract(
        nftContractAddress,
        nftABI,
        provider.getSigner(0)
      );

      const tokenUri = await nftContract.tokenURI(props.tokenId);

      const uri = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/");

      fetch(uri) // Replace with your API endpoint
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Work with the fetched data
          setItemInfo(data);
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error fetching data:", error);
        });

      const stakeContract = new ethers.Contract(
        stakeContractAddress,
        stakeABI,
        provider.getSigner(0)
      );

      if (accounts === undefined) return;

      const walletAddress = accounts[0];
      const owner = await stakeContract.tokenOwner(props.tokenId);

      setStaked(owner == walletAddress);
    }

    getItemInfo();
  }, [provider, accounts]);

  function handleStakeOrUnstake() {
    async function stakeOrUnstake() {
      const stakeContract = new ethers.Contract(
        stakeContractAddress,
        stakeABI,
        provider.getSigner(0)
      );

      const nftContract = new ethers.Contract(
        nftContractAddress,
        nftABI,
        provider.getSigner(0)
      );

      if (staked) {

        const estimateGas = await stakeContract.unstake.estimateGas(props.tokenId);

        await stakeContract.unstake(props.tokenId,  {
          gasLimit: estimateGas.toString(),
        });
      } else {
        
        const approve = await nftContract.setApprovalForAll(
          stakeContractAddress,
          true
        );

        const estimateGas = await stakeContract.stake.estimateGas(props.tokenId);

        await stakeContract.stake(props.tokenId,  {
          gasLimit: estimateGas.toString(),
        });
      }

      setStaked (!staked);
    }

    stakeOrUnstake();
  }

  return (
    <div>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
        <img
          src={itemInfo.image === undefined ? NoImage : itemInfo.image}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            {/* <span aria-hidden="true" className="absolute inset-0"></span> */}
            {itemInfo.name}
          </h3>
          <button
            className="mt-2 w-full right-2 text-xl bg-orange-600 rounded-lg px-3 py-2 hover:bg-orange-700 bounce"
            onClick={() => handleStakeOrUnstake()}
          >
            {staked ? "Unstake" : "Stake"}
          </button>
        </div>
        <p className="text-sm font-medium text-gray-900">1 ETH</p>
      </div>
    </div>
  );
}
