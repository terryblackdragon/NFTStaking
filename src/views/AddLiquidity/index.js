import { ethers } from "ethers";
import { hooks } from "../../connectors/metaMask";
import { useState } from "react";
import { ROUTER_ADDRESS, getTokenAddr } from "../../config";
import { toBigInt } from "ethers";

import IPancakeRouter02ABI from "../../abi/Router.json";
import ERC20ABI from "../../abi/erc20.json";

import { SECONDS_FROM_NOW_DEADLINE } from "../../config";
import CurrencySelect from "../../components/CurrencySelect";

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } =
  hooks;

function AddLiquidity() {
  const accounts = useAccounts();
  const provider = useProvider();

  const [token1, setToken1] = useState("SAPE");
  const [token2, setToken2] = useState("TBNB");
  const [token1Desired, setToken1Desired] = useState(0);
  const [token2Desired, setToken2Desired] = useState(0);

  async function AddLiquidityAsync(
    token1Name,
    token2Name,
    token1Amount,
    token2Amount
  ) {

    if (!provider) {
      return;
    }

    const token1 = getTokenAddr(token1Name);

    let RouterContract = new ethers.Contract(
      ROUTER_ADDRESS,
      IPancakeRouter02ABI,
      provider.getSigner(0)
    );

    let token1Contract = new ethers.Contract(
      token1,
      ERC20ABI,
      provider.getSigner(0)
    );

    try {
      const deadline = toBigInt(Date.now()) + SECONDS_FROM_NOW_DEADLINE;
      const token1Desired = ethers.parseEther(token1Amount);
      const token2Desired = ethers.parseEther(token2Amount);

      console.log ('token1Desired', token1Desired);
      console.log ('token2Desired', token2Desired);

      await token1Contract.approve(ROUTER_ADDRESS, token1Desired);

      const estimateGas = await RouterContract.addLiquidityETH.estimateGas(
        token1,
        token1Desired,
        token1Desired, token2Desired,
        accounts[0],
        deadline,
        {
          value: token2Desired
        }
      );

      console.log("estimateGas", estimateGas);

      await RouterContract.addLiquidityETH(
        token1,
        token1Desired,
        token1Desired, token2Desired,
        accounts[0],
        deadline,
        {
          value: token2Desired,
          gasLimit: estimateGas.toString(),
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="text-black flex justify-center bd-black items-center" style={{ margin: 20 }}>
      <div className="flex-row items-center">
        <CurrencySelect
          token={token1}
          setToken={setToken1}
          handleTokenDesired={setToken1Desired}
        ></CurrencySelect>
        <CurrencySelect
          token={token2}
          setToken={setToken2}
          handleTokenDesired={setToken2Desired}
        ></CurrencySelect>
      </div>
      <div style={{ display: "flex", justifyContent: "center", padding: 10 }}>
        <button style={{ padding: 10, borderWidth: 1, borderColor: 'black' }} onClick={() => AddLiquidityAsync(token1, token2, token1Desired, token2Desired)}>
          Add Liquidity
        </button>
      </div>
    </div>
  );
}

export default AddLiquidity;
