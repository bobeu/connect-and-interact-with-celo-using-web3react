import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';

export default function Footer(props: any) {
  return (
    <Typography variant="body2" sx={{color: "whitesmoke"}} align="center" {...props}>
      {'Copyright © '}
      <Link style={{color: green[600]}} color="inherit" href="https://celo.org">
        Made by Bobeu : For Celo developers
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
