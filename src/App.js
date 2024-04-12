import SidebarContext from "./context/SidebarContext";
import Sidebar from "./views/Sidebar";
import Home from "./views/Home";
import Mint from "./views/Mint";
import { useState } from "react";

import { Web3ReactProvider } from "@web3-react/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { hooks as metaMaskHooks, metaMask } from "./connectors/metaMask";

const connectors = [[metaMask, metaMaskHooks]];

function App() {
  const [menu, setMenu] = useState(0);

  return (
    <Web3ReactProvider connectors={connectors}>
      <SidebarContext.Provider
        value={{ selected: menu, handleSelect: setMenu }}
      >
        <Sidebar />
        <Mint />
        <Home />
      </SidebarContext.Provider>
    </Web3ReactProvider>
  );
}

export default App;
