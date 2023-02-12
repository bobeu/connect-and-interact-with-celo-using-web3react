import React, { useMemo, Key } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Footer from "../components/Footer";
import { notification } from "antd";
import getContractData from "../components/apis/contractdata";
import { Address } from "./Address";
import { AppProps, MockProfile, NotificationProps, TransactionResultProp } from "../interfaces";
import { blue, green, purple } from "@mui/material/colors";
import sendtransaction from "./apis";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import { Spinner } from "./Spinner";
import Web3 from "web3";
import Image from "next/image";
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from "@ethersproject/providers";

const boxStyle = {
  profile_style: {
    display: 'flex',
    justifyContent: 'center',
    gap: 2,
    alignItems: 'center',
    // width: 'fit-content',
  },
  topButton: {
    color: 'whitesmoke',
    width: 'fit-content',
  }
}

const ZERO_ACCOUNT = `0x${'0'.repeat(40)}`;

function getTimeFromEpoch(onchainUnixTime:BigNumber) {
  const toNumber = onchainUnixTime? onchainUnixTime.toNumber() : 0;
  var newDate = new Date(toNumber * 1000);
  return `${newDate.toLocaleDateString("en-GB")} ${newDate.toLocaleTimeString("en-US")}`;
}

export default function App(props: AppProps) {
  const [functionName, setFunctionName] = React.useState<string>("stake");
  const [amountToStake, setAmountToStake] = React.useState<number>(0);
  const [tokenRewardBalance, setReward] = React.useState<any>(BigNumber('0.00'));
  const [response, setResponse] = React.useState<any>(MockProfile);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [accountFor, setAccount] = React.useState<string>('');

  const { logout } = props
  const { account, active, library  } = useWeb3React<Web3Provider>();

  const { vaultAbi } = getContractData();

  const handleAmountChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    e.preventDefault();
    setAmountToStake(Number(e.target.value));
  };

  const handleAccountChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    e.preventDefault();
    setAccount(e.target.value);
  };

  const cancelLoading = () => setLoading(false);

  React.useEffect(() => {
    const abortProcess = new AbortController();
    async function getTokenBalance() {
      if(account && library) {
        const res :TransactionResultProp = await sendtransaction({
          account: account, 
          functionName: 'balance', 
          cancelLoading: cancelLoading,
          provider: library
        });

        setReward(res.read);
      }
    }

    getTokenBalance();
    return () => abortProcess.abort();
  }, [response, account]);

  const handleContractFunction = (x: string) => setFunctionName(x);

  const displayContractFunctions = useMemo(() => {
    let filt: any;
    if (!vaultAbi) return [];
    filt = vaultAbi.filter(method => method["type"] === "function");
    return filt.filter(
      (method: { name: string }) => method.name === "stake" ||
        method.name === "unstake" || 
          method.name === "stakeOnBehalf" ||
            method.name === "compoundStaking" || 
              method.name === "getStakeProfile" ||
                method.name === "withdraw"
        );
  }, [vaultAbi]);

  const openNotification = (props: NotificationProps) => {
    const { message, description } = props;

    notification.open({
      placement: "bottomRight",
      message,
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      }
    });
  };

  async function stake(address?: string): Promise<TransactionResultProp> {
    if (amountToStake === 0) {
      const msg = "Please enter amount of Celo to stake in wei";
      cancelLoading();
      alert(msg);
      throw new Error(msg);
    }
    if(!library) alert('Wallet not ready');
    const amtInBigNumber = BigNumber(amountToStake);
    const value = ethers.utils.hexValue(ethers.utils.parseUnits(amtInBigNumber.toString()));
    
    return await sendtransaction({ 
      value: value, 
      functionName: functionName, 
      cancelLoading: cancelLoading,
      who: address,
      provider: library
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let result: TransactionResultProp;
    setLoading(true);

    switch (functionName) {
      case 'stake':
        result = await stake();
        break;

      case 'stakeOnBehalf':
        if(!accountFor) return null;
        result = await stake(accountFor);
        break;

      case 'compoundStaking':
        result = await stake();
        break;

      case "unstake":
        result = await sendtransaction({
          functionName: functionName,
          cancelLoading: cancelLoading,
          provider: library
        });
        break;

      case 'getStakeProfile':
        result = await sendtransaction({
          functionName: functionName,
          cancelLoading: cancelLoading,
          provider: library
        });
        break;

      default:
        result = await sendtransaction({
          functionName: "withdraw",
          cancelLoading: cancelLoading,
          provider: library
        });
        break;
    }
    if(result?.view === false) {
      openNotification({message: "Transaction completed with hash:", description: result?.receipt.transactionHash});
    } else {
      setResponse(result?.read);
    }
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" sx={{background:purple[900], }} elevation={2}>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: 2}}>
          <Box sx={boxStyle.profile_style}>
            <Button variant="text" style={boxStyle.topButton} startIcon='Vault Balance:' endIcon={`${response?.account ? Web3.utils.fromWei(response?.celoAmount?.toString()) : 0} ${' $Celo'}`} />
            <Button variant="text" style={boxStyle.topButton} startIcon='Staked time:' endIcon={getTimeFromEpoch(response?.depositTime)} />
            <Button variant="text" style={boxStyle.topButton} startIcon='RTK Reward:' >{Web3.utils.fromWei(tokenRewardBalance.toString())}</Button>
          </Box>
          <Box sx={boxStyle.profile_style}>
            <Button 
              sx={{
                color: 'white',
                '&:hover': {
                  color: purple[200],
                  transition: '0.2sec ease-in-out',
                  background: 'none'
                }
              }}
              startIcon='Disconnect'
              variant='text' 
              onClick={
                async() => {                                                                    
                  if(active) {
                    logout();
                  }
                }
              } 
              />
            <Address account={account ||undefined} size={6} copyable={true} display />
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth='md' component={'main'} sx={{placeItems: 'center'}}>
        <Typography className="marquee"> Mininum staking : 0.1 $CELO </Typography>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Avatar sx={{ m: 1,}}>
              <Image src='/celologopng.png' width={100} height={40} alt='celoLogo'/>
            </Avatar>
          </div>
        <Typography component="h1" variant="h5" sx={{display: 'flex',justifyContent: 'space-around'}}>
          <span style={{color: 'blue'}}>Stake $ Celo</span> <span style={{color: purple[300]}}> Earn $RTK</span>
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container xs={12} spacing={6} p={4}>
            <Grid item xs={12} md={6}>
              <Paper sx={{background: 'none'}}>
                <Box
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div className="funcDiv">
                  <Typography variant="h5" sx={{color: 'whitesmoke'}}>Select function handle</Typography>
                    {displayContractFunctions.map((item: any, id: Key) => (
                      <Button
                        sx={{
                          "&:hover": {
                            color: blue[900],
                            width: "fit-content",
                            border: `0.1em solid ${purple[900]}`
                          }
                        }}
                        onClick={() => handleContractFunction(item.name)}
                        key={id}
                        variant={"text"}
                      >
                        {item?.name}
                      </Button>
                    ))}
                  </div>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{background: 'none'}}>
                {
                  (
                    functionName === "stake" || 
                      functionName === "stakeOnBehalf" ||
                        functionName === "compoundStaking"
                    ) && <TextField margin="normal" required fullWidth id="text" label="Amount to stake" name="amount" autoComplete="amount" type={"number"} autoFocus sx={{ border: `0.1em solid ${blue[900]}`, borderRadius: "5px" }} style={{ color: "whitesmoke" }} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleAmountChange(e)} />}
                {functionName === "stakeOnBehalf" && <TextField margin="normal" required fullWidth id="text" label="Account to stake for" name="amount" autoComplete="account" type={"text"} autoFocus sx={{ border: `0.1em solid ${blue[900]}`, borderRadius: "5px" }} style={{ color: "whitesmoke" }} onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleAccountChange(e)} />}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    height: '100px',
                    fontWeight: "bold",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: purple[600],
                    '&:hover': {
                      background: 'whitesmoke',
                      color: purple[700]
                    }
                  }}
                >
                  { loading? <span>Trxn in Progress ... <Spinner color={'white'} /></span> : functionName }
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer sx={{ mt: 8, mb: 4 }} />
    </React.Fragment>
  );
}