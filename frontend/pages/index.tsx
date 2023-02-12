import React from "react";
import App from "../components/App";
import LandingPage from "../components/LandingPage";
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import useApp from "../components/useApp";

export default function Home() {
  const { activate, active, deactivate } = useWeb3React<Web3Provider>();
  const injected = new InjectedConnector({supportedChainIds: [44787],});
  const { switchNetwork, addNativeToken } = useApp();

  async function handleConnect() {
    if (active) return;
    try {
      await activate(injected, (error) => {
        console.log('Error', error);
      }, true).then(async() => {
        const switched = await switchNetwork();
        if(switched) {
          await addNativeToken();
        }
      })
      // library?.waitForTransaction(txnHash, 3, 10000);
      // library?.perform("", param)
    } catch (error) {
      console.log("Connect Error", error);
    }
  }

  function logout() {
    if (!active) {
      alert("User not authenticated");
      return ;
    }
    deactivate();
  }

  return <>{!active ? <LandingPage isUserAuthenticated={active} handleConnect={handleConnect} /> : <App logout={logout} />}</>;
}
