import { BigNumber, type BigNumberish } from 'ethers'
import axios from 'axios'
import { getChainId } from '../../../utils/getChainId'
import { SwapOptions, type GetSwapCalldataFunction } from '../../../utils/types/liquidityProviders'
// DOC is located here : https://www.okx.com/id/web3-docs/dex/dex_api

const oneInchAPI = axios.create({
  baseURL: 'https://www.okx.com/api/v5/dex/aggregator'
})

const ROUTERS = {
  "ethereum":"0x3b3ae790Df4F312e745D270119c6052904FB6790",
  "optimism":"0xf332761c673b59B21fF6dfa8adA44d78c12dEF09",
  "arbitrum": "0xf332761c673b59B21fF6dfa8adA44d78c12dEF09"
}

import { GetSwapRouterAddressFunction } from '../../../utils/types/liquidityProviders'


export const getSwapRouterAddress: GetSwapRouterAddressFunction = async (
  chain: string
): Promise<string> => {
  if(!ROUTERS[chain]){
    throw new Error(`OKX router not registered on ${chain}`)
  }
  return ROUTERS[chain];
}