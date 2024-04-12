import { menuItems } from "../../config";
import SidebarContext from "../../context/SidebarContext";
import { useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { hooks } from "../../connectors/metaMask";
import { ethers } from "ethers";
import { stakeContractAddress, stakeABI } from "../../config";

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } =
  hooks;

function ListItem(props) {
  return (
    <li
      style={{
        display: "unset",
        padding: 10,
        cursor: "pointer",
        background: props.checked ? "#e5e5e5" : "#eee",
      }}
      onClick={() => {
        props.handleSelect();
      }}
    >
      {props.children}
    </li>
  );
}

function Sidebar() {
  const context = useContext(SidebarContext);
  const { connector } = useWeb3React();
  const provider = useProvider();

  const accounts = useAccounts();
  const isActivating = useIsActivating();
  const isActive = useIsActive();

  const [sapeOwned, setSAPEOwned] = useState(0);

  function handleConnect() {
    if (!isActive && !isActivating) connector.activate(97);
    else if (!isActivating) {
      if (connector?.deactivate) {
        void connector.deactivate();
      } else {
        void connector.resetState();
      }
    }
  }

  function getConnectionStateAsString() {
    if (isActivating)
      return ('Connecting...')
    else if (!isActive)
      return ('Connect wallet')
    else
      return ('Disconnect')
  }

  const [connectionState, setConnectionState] = useState(getConnectionStateAsString())

  useEffect(() => {
    setConnectionState (getConnectionStateAsString());
  }, [isActivating, isActive])

  useEffect(() => {
    async function getOwnedSAPE() {
      if (provider === undefined || accounts === undefined) return;
      if (accounts.length <= 0) return;

      const stakeContract = new ethers.Contract(
        stakeContractAddress,
        stakeABI,
        provider.getSigner(0)
      );

      const walletAddress = accounts[0];
      const count = await stakeContract.balanceOf(walletAddress);

      console.log ('count', count)

      setSAPEOwned (ethers.formatEther(count));
    }

    getOwnedSAPE();
  }, [provider, accounts])

  return (
    <div className="bg-zinc-900">
			<div className="flex flex-row justify-center">
				<h1 className=" text-2xl mt-20 sm:mt-2 sm:text-3xl ">
					Stake your APE!
				</h1>

				<button
					onClick={handleConnect}
					className="absolute mt-2 right-2 text-xl bg-orange-600 rounded-lg px-3 py-2 hover:bg-orange-700 bounce"
				>
					{connectionState}
				</button>
			</div>
			<div className="mt-8 pb-4 text-xl ml-4 mr-4 text-center flex flex-col justify-center items-center sm:text-2xl">
				<div>Earn 5 reward coins a day! </div>
        <div>SAPE owned: {sapeOwned}</div>
			</div>
		</div>
  );
}

export default Sidebar;
