import { ethers } from "ethers";
import { hooks } from "../../connectors/metaMask";
import { useState } from "react";
import { ROUTER_ADDRESS, getTokenAddr } from "../../config";
import CurrencySelect from "../../components/CurrencySelect";

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } =
  hooks;

function Swap() {
  const accounts = useAccounts();
  const provider = useProvider();

  const [swapType, setSwapType] = useState('Buy');
  const [amount, setAmount] = useState(0);

  return (
    <div
      className="text-black justify-center bd-black flex"
      style={{ margin: 20 }}
    >
      <select className="border-4 border-slate-500 p-1" onChange={(e) => setSwapType(e.target.value)}>
        <option>Buy</option>
        <option>Sell</option>
      </select>
      <div>
      <input className="border-4 " onChange={(e) => setAmount(e.target.value)} text={amount}></input>
      <h1>{amount}</h1>
      </div>
      <button className="border-4 ">
        Swap
      </button>
    </div>
  );
}

export default Swap;
