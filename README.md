# Connect and interact with Celo using web3Onboard library 

- Backend
  - Stacks
    - Foundry
    - Solidity

For full understanding of the backend, follow **[this tutorial](https://docs.celo.org/blog/tutorials/connect-and-interact-with-celo-using-web3onboard-library)**

- Frontend
  - Stacks
    - React
    - NextJs
    - MaterialUi
    - etherJs
    - We3Js

**How to run**
> Note : Be sure to have either of the following browser wallet extension installed.

- **[Coinbase wallet](https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=en)**

- **[Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)**

```bash
git clone https://github.com/bobeu/connect-to-celo-using-web3onboard-library.git/
```

```bash
cd connect-to-celo-using-web3onboard-library/frontend
```

```bash
yarn install
```

```bash
yarn run dev
```

<!-- **[Watch this video to know how to do that](https://youtu.be/8H-tctoES3Q)** -->

# Smart contracts

- Compiling

```bash
forge build
```

- Testing

```bash
forge test
```

- Deployment

_Deploying Vault.sol_

```bash 
forge create --rpc-url https://alfajores-forno.celo-testnet.org --constructor-args 10000000000000000000 --private-key <paste your private key here> src/Vault.sol:Vault
```

Output
```bash
[⠢] Compiling 2 files with 0.8.17
[⠰] Solc 0.8.17 finished in 3.04s
Compiler run successful
# Deployer: 0x85AbBd0605F9C725a1af6CA4Fb1fD4dC14dBD669
Vault Deployed to: 0x066F3BF47Eff52235b188c505E6C4e2aB5cbbaBf
Transaction hash: 0x58eef469142ffe24082b4ba4956a678c4c757137d8b7094160e5788369c88b3e    
```

_Deploying RewardToken.sol_

```bash 
forge create --rpc-url https://alfajores-forno.celo-testnet.org --constructor-args 500000000--private-key <paste your private key here> src/RewardToken.sol:RewardToken
```

Output

```bash
[⠔] Compiling 1 files with 0.8.17
[⠃] Solc 0.8.17 finished in 4.67s
Compiler run successful
# Deployer: 0x85AbBd0605F9C725a1af6CA4Fb1fD4dC14dBD669
Token Deployed to: 0x116a6a86AA7DaA2320969d30BA10cA18E0DE21e4
Transaction hash: 0x341584db0df918849a36ed606feb7ab4f0d66142faa6261a15b7ebd0abd761a5
```

- Demo

**[Click to interact with Dapp](https://connect-to-celo-using-web3onboard-library.vercel.app/)**
