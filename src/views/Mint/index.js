import MintModal from "../../components/MintModal";
import { menuItems } from "../../config";
import SidebarContext from "../../context/SidebarContext";
import { useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { hooks } from "../../connectors/metaMask";
import { ethers } from "ethers";
import { nftContractAddress, nftABI } from "../../config";

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } =
  hooks;

export default function Mint() {
  const accounts = useAccounts();
  const provider = useProvider();

  function Mint () {
    async function _mint() {

      if (provider === undefined || accounts === undefined) return;
      if (accounts.length <= 0) return;

      const nftContract = new ethers.Contract(
        nftContractAddress,
        nftABI,
        provider.getSigner(0)
      );

      const walletAddress = accounts[0];
      await nftContract.mint(walletAddress, 1, {value: 10000000000000000n});

    }

    _mint();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 lg:max-w-7xl lg:px-8">
      <button
        onClick={() => Mint()}
        disabled={true}
        className="right-2 text-xl bg-blue-600 rounded-lg px-10 py-2 hover:bg-blue-700"
      >
        Mint
      </button>
    </div>
  );
}
