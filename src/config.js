export const SECONDS_FROM_NOW_DEADLINE = 120n;
export const DEFAULT_TOKEN_DECIMAL = 18;
export const ROUTER_ADDRESS = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"; //testnet
export const FACTORY_ADDRESS = "0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc";

export const nftContractAddress = "0x3F3d677c0d8E8c3e88407A73aa00110E4c47bCB2";
export const rwtokenContractAddress =
  "0x95f55f444dC8C52A4b8f43E3f86fD0c207183217";
export const stakeContractAddress =
  "0x55bb720ff38cf9CfFe969A877a30D151c844f7Cd";


export const tokenAddresses = [
  // {
  //   name: "BNB",
  //   address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
  // },
  {
    name: "SAPE",
    address: rwtokenContractAddress,
  },
  {
    name: "TBNB",
    address: "",
  },
];

export const getTokenAddr = (tokenName) =>
  tokenAddresses.find((token) => token.name === tokenName).address;
