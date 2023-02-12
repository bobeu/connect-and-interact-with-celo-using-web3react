import vault from "../../../foundry/out/Vault.sol/Vault.json";
import token from "../../../foundry/out/RewardToken.sol/RewardToken.json";

export default function getContractData() {
  return {
    vaultAbi: vault.abi,
    tokenAbi: token.abi,
    vaultAddr: "0x066F3BF47Eff52235b188c505E6C4e2aB5cbbaBf",
    tokenAddr: "0x116a6a86AA7DaA2320969d30BA10cA18E0DE21e4"
  }
}