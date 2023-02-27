/* eslint-disable @typescript-eslint/no-var-requires */
import { getNodeProvider } from "../../../../../utils/getNodeProvider";
import { ethers } from "ethers";
import { ATokenABI } from "../../abi/AToken";
import ERC20ABI from "../../../../../utils/abi/ERC20.json";
import { getGeckoTokenPrice } from "../../../../../utils/prices/getGeckoTokenPrice";

async function checkAaveV3Liquidity(chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error("No provider was found.");
    const AToken = new ethers.Contract(poolAddress, ATokenABI, provider);
    const underlyingTokenAddress = await AToken.UNDERLYING_ASSET_ADDRESS();
    const { data, err } = await getGeckoTokenPrice(
      chain,
      underlyingTokenAddress
    );
    if (err) {
      throw new Error(`Error while getting the price for ${poolAddress}`);
    }
    const tokenPrice = data;
    const Token = new ethers.Contract(
      underlyingTokenAddress,
      ERC20ABI,
      provider
    );
    const decimals = await Token.decimals();
    const totalBalanceBN = await Token.balanceOf(poolAddress);
    const totalBalance = totalBalanceBN / 10 ** decimals;
    const liquidityUSD = totalBalance * tokenPrice;
    return { data: liquidityUSD, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}

export default checkAaveV3Liquidity;
