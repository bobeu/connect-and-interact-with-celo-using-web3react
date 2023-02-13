import React from "react";
import App from "../components/App";
import LandingPage from "../components/LandingPage";
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import useApp from "../components/useApp";

const chainId :number = 44787;
const rpcUrl : string = "https://alfajores-forno.celo-testnet.org"

const Injected = new InjectedConnector({supportedChainIds: [chainId,]});
const WalletConnect = new WalletConnectConnector({
  rpc: rpcUrl,// Use infura url with Id
  qrcode: true,
  bridge: "https://bridge.wallet.org",
  chainId: chainId,
  supportedChainIds: [chainId,]
})

const connectors = Array.from([Injected, WalletConnect]);

export default function Home() {
  const { activate, active, deactivate } = useWeb3React<Web3Provider>();
  // const injected = new InjectedConnector({supportedChainIds: [44787],});
  const { switchNetwork, addNativeToken } = useApp();

  async function trySwitchNetwork() {
    const switched = await switchNetwork();
    if(switched) {
      await addNativeToken();
    }
  }

  async function handleConnect(index:number) {
    if (active) return;
    try {
      console.log("Connectors", connectors);
      const selected = connectors[index];
      console.log('selected', selected);
      await activate(Injected).then(async() => {
        await trySwitchNetwork()
      }).catch(async(error) => {
        if(error) {
          await trySwitchNetwork();
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
