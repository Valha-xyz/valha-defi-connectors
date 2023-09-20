import { ethers } from 'ethers';
import { getNodeProvider } from './getNodeProvider';
const { WSTETHABI } = require('../../src/connectors/lido/wsteth-V1/abi/WSTETH');

// function getSelectorHex(fnName: string): string {
//   const keccakResult = ethers.utils.keccak256(fnName);
//   const selector = keccakResult.slice(10);
//   return selector;
// }

function getEncodedData(abi: any, fnName: string, argsValue: any[]) {
  const iface = new ethers.utils.Interface(abi);
  const res = iface.encodeFunctionData(fnName, argsValue);
  return res;
}

export async function getDataAtBlock(
  chain: string,
  contractAddress: string,
  fnName: string,
  argsValue: any[],
  abi: any,
  blockNumber: number,
): Promise<any> {
  try {
    const provider = getNodeProvider(chain);
    let blockNum = blockNumber;
    if (!blockNumber) {
      blockNum = await provider.getBlockNumber();
    }
    const blockHex = '0x' + Number(blockNum).toString(16);
    const fnSelectorWithArgs = getEncodedData(abi, fnName, argsValue);
    const callParams = [
      {
        to: contractAddress,
        data: fnSelectorWithArgs, // The method signature and arguments for the call
      },
      blockHex,
    ];

    const data = await provider.send('eth_call', callParams);

    return { data: data, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}
