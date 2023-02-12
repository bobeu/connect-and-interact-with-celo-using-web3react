import React from 'react'
import '@/styles/globals.css';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import type { AppProps } from 'next/app';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers';

function fetchLibrary (provider:any) {
  const lib = new Web3Provider(provider);
  lib.pollingInterval = 12000;
  return lib;
}

export default function App({ Component, pageProps }: AppProps) {
  return(
    <React.Fragment>
      <Head>
        <title>Celo staking tutorial</title>
        <meta name="description" content="generic staking dapp on Celo blockchain" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Web3ReactProvider getLibrary={fetchLibrary} >
          <Component {...pageProps} />
        </Web3ReactProvider>
      </main>
    </React.Fragment>
  );
}
