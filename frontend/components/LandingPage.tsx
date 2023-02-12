import React from 'react';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { PageProps } from "@/interfaces";
import { green, purple } from "@mui/material/colors";
import Footer from "./Footer";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';

export default function LandingPage(props: PageProps) {
  const [connecting, setConnecting] = React.useState<boolean>(false);
  const { handleConnect } = props;

  return (
    <React.Fragment>
      <Container maxWidth='md'>
        <div className="topDiv">
          <Stack className="divHeader" textAlign={"revert-layer"} >
            <Typography component={"main"} variant="h2">Celo StakeVerse <span style={{color: green[600]}}>V3</span></Typography>
            <Typography component={"main"} variant="h4">Stake Celo - Earn RTK Token</Typography>
            <Typography component={"main"} variant="h6">Made by <span>
              <Link color="inherit" href="https://github.com/bobeu" style={{color: green[600]}}>
                Isaac Jesse 
              </Link> a.k.a Bobelr for Celosage</span>
            </Typography>
            <Link color="inherit" href="https://github.com/bobeu/stakingdapp-on-celo" style={{color: green[600]}}>
              Source code
            </Link>
          </Stack>
          <div className="divHeader"></div>
          <div className="lowerDiv">
            <Button 
              disabled={connecting} 
              sx={{
                width: '50%',
                height: '120px',
                border: '0.1em solid green',
                color: green[400],
                borderRadius: '6px',
                textAnchor: 'start',
              }} 
              variant="text" onClick={
                async() => { 
                setConnecting(true);
                await handleConnect().then(() => {
                  setConnecting(false);
                }) 
                }
              }
              className='connectButton'
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </Container>
      <Footer sx={{ mt: 8, mb: 4 }} />
    </React.Fragment>
  );
}
