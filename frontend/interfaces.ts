import React, { CSSProperties } from "react";
import BigNumber from "bignumber.js";
import { ContractReceipt, ethers, Event } from "ethers";
import { Web3Provider } from "@ethersproject/providers";


export interface NotificationProps {
  message: string | JSX.Element;
  description: string | JSX.Element;
}

export interface PageProps {
  isUserAuthenticated?: boolean;
  handleConnect: (x:number) => Promise<void>;
}

export interface AddressProp {
  account?: string;
  isAuthenticated?: boolean;
  styleAvatarLeft?: CSSProperties;
  styleAvatarRight?: CSSProperties;
  style?: CSSProperties;
  copyable?: boolean;
  styleCopy?: CSSProperties;
  avatar?: 'right' | 'left';
  display?: boolean;
  textStyle?: CSSProperties;
  size?: number;
  chainId?: SVGStringList;
}

export interface Explorer {
  address: string | null | undefined;
  chainId: any;
} 

export interface Profile {
  0: BigNumber;
  1: BigNumber;
  2: string;
  celoAmount: BigNumber;
  depositTime: BigNumber;
  account: string;
}

export const MockProfile = {
  0: BigNumber(0),
  1: BigNumber(0),
  2: "",
  3: "",
  depositTime: BigNumber(0),
  celoAmount: BigNumber(0),
  account: ""
}

export interface AppProps {
  logout: () => void;
}

interface Receipt {
  blockHash: string;
  blockNumber: number;
  byzantium: boolean;
  confirmations: number;
  contractAddress: string;
  cumulativeGasUsed: ethers.BigNumber;
  effectiveGasPrice: ethers.BigNumber;
  from: string;
  gasUsed: ethers.BigNumber;
  logs: Array<any>;
  logsBloom: string;
  to: string;
  transactionHash: string;
  transactionIndex: number
  type: number;
  events?: Event[] | undefined;
  root?: string | undefined;
  status?: number | undefined;
}

export interface TransactionResultProp {
  view: boolean;
  receipt: Receipt;
  read: ethers.BigNumber | Profile | string | number | Profile;
}

export const transactionResult : TransactionResultProp = {
  view: false,
  receipt: {
    blockHash: '',
    blockNumber: 0,
    byzantium: false,
    confirmations: 0,
    contractAddress: '',
    cumulativeGasUsed: ethers.BigNumber.from(0),
    effectiveGasPrice: ethers.BigNumber.from(0),
    from: '',
    gasUsed: ethers.BigNumber.from(0),
    logs: [],
    logsBloom: '',
    to: '',
    transactionHash: '',
    transactionIndex: 0,
    type: 0,
    events: [],
    root: '',
    status: 0
  },
  read: ethers.BigNumber.from(0)
}

export interface SpinnerProps {
  color: string;
  rest?: React.CSSProperties
}

export type SwitchChainReturn = number;

export interface ChainParams {
  key: number;
  icon: JSX.Element | string;
  chainIdStr: string;
  rpcUrls: Array<string>;
  chainName: string;
  nativeCurrency: { name: string, decimals: number, symbol: string };
  blockExplorerUrls: Array<string>;
  iconUrls: Array<string>;
  callback?: (arg0: SwitchChainReturn) => void;
}

export interface ConnectButtonProp {
  connect: () => Promise<void>;
}

export interface InstanceProps {
  vaultAbi: any;
  tokenAbi: any;
  vaultAddr: string,
  tokenAddr: string;
  provider: Web3Provider | undefined;
}

export interface OptionProps {
  cancelLoading?: () => void;
  provider: Web3Provider | undefined;
  functionName?: string;
  value?: BigNumber | string;
  who?: string;
  account?: string;
}
