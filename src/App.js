import SidebarContext from "./context/SidebarContext";
import Sidebar from "./views/Sidebar";
import Home from "./views/Home";
import Mint from "./views/Mint";
import AddLiquidity from "./views/AddLiquidity";
import Swap from "./views/Swap";
import { useState } from "react";

import { Web3ReactProvider } from "@web3-react/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { hooks as metaMaskHooks, metaMask } from "./connectors/metaMask";

const connectors = [[metaMask, metaMaskHooks]];

function App() {
  const [reload, setReload] = useState(false);

  return (
    <Web3ReactProvider connectors={connectors}>
      <SidebarContext.Provider
        value={{ reload: reload, handleReload: setReload }}
      >
        <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Mint />
                  <Home />
                </>
              }
            />
            <Route path="/swap" element={<Swap />} />
            <Route path="/add" element={<AddLiquidity />} />
          </Routes>
        </BrowserRouter>
      </SidebarContext.Provider>
    </Web3ReactProvider>
  );
}

export default App;
