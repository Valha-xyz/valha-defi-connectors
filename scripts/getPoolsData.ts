import { ethers } from "ethers";
import { stablePoolABI } from "./stablePool";
import axios from "axios";
import { stablePoolABI2 } from "./stablePool2";

const addrs = [
  //goood
  "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7",
  "0xDeBF20617708857ebe4F679508E7b7863a8A8EeE",

  "0x0Ce6a5fF5217e38315f87032CF90686C96627CAA",
  "0x4CA9b3063Ec5866A4B82E437059D2C43d1be596F",
  "0x2dded6Da1BF5DBdF597C45fcFaa3194e53EcfeAF",
  "0xF178C0b5Bb7e7aBF4e12A4838C7b7c5bA2C623c0",

  "0xF9440930043eb3997fc70e1339dBb11F341de7A8",
  "0xEB16Ae0052ed37f479f7fe63849198Df1765a733",

  "0xA96A65c051bF88B4095Ee1f2451C2A9d43F53Ae2",
  "0xc5424B857f758E906013F3555Dad202e4bdB4567",
  "0xDC24316b9AE028F1497c275EB9192a3Ea0f67022",
  "0x80466c64868E1ab14a1Ddf27A676C3fcBE638Fe5",
  "0x8925D9d9B4569D737a48499DeF3f67BaA5a144b9",

  //to see
  // "0x45F783CCE6B7FF23B2ab2D70e416cdb7D6055f51",
  // "0x45F783CCE6B7FF23B2ab2D70e416cdb7D6055f51",
  // "0x52EA46506B9CC5Ef470C5bf89f17Dc28bB35D85C",
  // "0xA5407eAE9Ba41422680e2e00537571bcC53efBfD",
  // "0x7fC77b5c7614E1533320Ea6DDc2Eb61fa00A9714",
  // "0x06364f10B501e868329afBc005b3492902d6C763",
  // "0x93054188d876f558f4a66B2EF1d97d16eDf0895B",

  // "0x79a8C46DeA5aDa233ABaFFD40F3A0A2B1e5A4F27",
  // "0xA2B47E3D5c44877cca798226B7B8118F9BFb7A56",
  // "0xeB21209ae4C2c9FF2a86ACA31E123764A3B6Bc06",
];
export interface Pool {
  name: string;
  chain: string;
  underlying_tokens: string[];
  pool_address: string;
  investing_address: string;
  staking_address: string;
  boosting_address?: string;
  distributor_address?: string;
  rewards_tokens?: string[];
  metadata?: {};
}

async function parse() {
  const etherscan = new ethers.providers.EtherscanProvider(
    "homestead",
    "56ZSQPZUZH68KD9Y59K2HE6XD7Y3P7Z2DJ"
  );

  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.g.alchemy.com/v2/i25CEzZu6JD-2uH08tSkKRJKzGts26PE"
  );
  const pools: Pool[] = new Array(addrs.length);
  for (let i = 0; i < addrs.length; i++) {
    console.log("trying ", addrs[i]);

    pools[i] = {} as Pool;
    pools[i].underlying_tokens = [];
    const pool = new ethers.Contract(addrs[i], stablePoolABI, provider);
    const coin1 = await pool.coins(0);
    pools[i].underlying_tokens.push(coin1);
    pools[i].underlying_tokens.push(await pool.coins(1));
    try {
      pools[i].underlying_tokens.push(await pool.coins(2));
    } catch (e) {}
    pools[i].chain = "ethereum";
    pools[i].pool_address = addrs[i];
    pools[i].staking_address = addrs[i];
    pools[i].investing_address = addrs[i];
    pools[i].boosting_address = null,
    pools[i].distributor_address = null,
    pools[i].rewards_tokens = ["0x0000000000000000000000000000000000000000"],
    pools[i].metadata =  {},
    // pools[i].rewards_token = addrs[i];
  }
  //   pools.forEach(async (addr) => {

  console.log(pools);
  //   });
}

parse();
