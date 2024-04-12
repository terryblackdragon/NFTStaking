import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { hooks } from "../connectors/metaMask";
import { tokenAddresses } from "../config";
import ERC20ABI from "../abi/erc20.json";

const { useAccounts, useProvider } = hooks;

function CurrencySelect(props) {
  const accounts = useAccounts();
  const provider = useProvider();

  const [token, setToken] = useState(props.token);
  const [tokenBalance, setTokenBalance] = useState("--");

  const handleSelectChange = (event) => {
    setToken(event.target.value);

    props.setToken (event.target.value);
  };

  useEffect(() => {
    const getBalances = async () => {
      if (provider && accounts) {
        const tokenAddress = tokenAddresses.find(
          (t) => t.name === token
        ).address;

        const tokenContract = new ethers.Contract(
          tokenAddress,
          ERC20ABI,
          provider
        );

        await tokenContract.balanceOf(accounts[0]).then((bc) => {
          setTokenBalance(ethers.formatEther(bc.toString()));
        });
      } else setTokenBalance("--");
    };

    getBalances();
  }, [provider, accounts, token]);

  return (
    <div>
      <select
        style={{
          padding: "5px 10px 5px 10px",
          margin: "5px",
          borderRadius: "10px",
        }}
        value={token}
        onChange={handleSelectChange}
      >
        {tokenAddresses.map((token, index) => (
          <option key={index}>{token.name}</option>
        ))}
      </select>
      <input
        style={{ padding: "5px" }}
        onChange={(e) => {props.handleTokenDesired(e.target.value)}}
        placeholder={"Max: " + tokenBalance}
      ></input>
    </div>
  );
}

export default CurrencySelect;
