import { config } from "dotenv";
import axios from "axios";
config();

export async function getUSDToken(
  id: string
): Promise<{ data: number; err: Error }> {
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    if (data.err) throw new Error(data.err);
    const usdPrice = data.market_data.current_price.usd;
    return { data: usdPrice, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
}
