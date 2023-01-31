import { erc20Decimals } from "../../../../../utils/ERC20Decimals";
import VaultABI from "../../abi/vault.json";
import { ethers } from "ethers";
import { getNodeProvider } from "../../../../../utils/getNodeProvider";

export async function checkYearnSharePrice(chain, poolAddress) {
  try {
    const provider = await getNodeProvider(chain);
    if (!provider) throw new Error("No provider was found.");
    const POOL = new ethers.Contract(
      poolAddress,
      JSON.stringify(VaultABI),
      provider
    );

    /// TVL function ///
    const pricePerShare = await POOL.pricePerShare();

    const decimals = await erc20Decimals(provider, poolAddress);
    const finalPricePerShare = pricePerShare / 10 ** decimals;
    return { data: finalPricePerShare, err: null };
  } catch (err) {
    return { data: null, err: err };
  }
}
