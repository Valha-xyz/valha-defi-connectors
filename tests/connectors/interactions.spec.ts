import { POOLS } from './config/testPools';
import _ from 'lodash';
import { checkParam } from './config/checkParam';
import {
  type InteractionsReturnObject,
  type Interactions,
} from '../../src/utils/types/connector-types';
import { prepareTestPools } from './config/prepareTestPools';
import { Interface } from 'ethers/lib/utils';
import { getFunctionInterface } from './config/getFunctionInterface';
import { ethers } from 'ethers';
import { getNodeProvider } from 'src/utils/getNodeProvider';

const interactions = [
  'deposit',
  // 'deposit_and_stake',
  // 'unlock',
  'redeem',
  'stake',
  'unstake',
  // 'boost',
  // // 'unboost',
  'claim_rewards',
  // 'claim_interests',
];

function isEVMAddress(address: string) {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    // check if it has the basic requirements of an address
    return false;
  } else if (
    /^(0x)?[0-9a-f]{40}$/.test(address) ||
    /^(0x)?[0-9A-F]{40}$/.test(address)
  ) {
    // If it's all small caps or all all caps, return true
    return true;
  }
  return false;
}

async function checkFnExists(name: string, path: string) {
  const { default: fn } = await import(path);
  const result = fn[name];
  expect(result).toBeDefined();
}

async function checkFnCallableReturn(
  POOL: any,
  name: string,
  path: string,
  amountBN: string,
  amountsDesiredNotBN: string[],
  amountsMinimumNotBN: string[],
  ranges: string[],
  rangeToken: string,
  userAddress: string,
  receiverAddress: string,
  lockupTimestamp: string,
  deadline: number
) {
  try {
    const { default: fn }: { default: Interactions } = await import(path);
    if (fn[name]) {
      const result = await fn[name](
        POOL,
        {
          amount: amountBN,
          amountsDesired: amountsDesiredNotBN,
          amountsMinimum: amountsMinimumNotBN,
        },
        {
          userAddress,
          receiverAddress,
        },
        {
          ranges,
          rangeToken,
          lockupTimestamp,
          deadline,
        }
      );
      return result;
    }
    return null;
  } catch (err) {
    console.log(err);
  }
}

function checkArgType(arg: string, type: string): boolean {
  try {
    if (!type) return false;
    if (type.includes('uint')) {
      const num = parseInt(arg);
      if ((num !== 0 && !num) || num < 0) {
        throw new Error(
          `ERROR: We found a mismatch between the type of arg ${arg} and the type expected by the ABI ${type}. Please correct it.`
        );
      }
    } else if (type.includes('address')) {
      const isEVM = isEVMAddress(arg.toLowerCase());
      if (!isEVM) {
        throw new Error(
          `ERROR: We found a mismatch between the type of arg ${arg} and the type expected by the ABI ${type}. Please correct it.`
        );
      }
    } else if (type.includes('string')) {
      const check = typeof arg;
      if (check !== 'string') {
        throw new Error(
          `ERROR: We found a mismatch between the type of arg ${arg} and the type expected by the ABI ${type}. Please correct it.`
        );
      }
    } else if (type.includes('bytes')) {
      console.log(
        '\x1b[33m%s\x1b[0m',
        'WARNING: we are not checking if "Bytes" args are valid for the time being. Please be aware of this.'
      );
    } else if (type.includes('bool')) {
      const check = typeof arg;
      if (check !== 'boolean') {
        throw new Error(
          `ERROR: We found a mismatch between the type of arg ${arg} and the type expected by the ABI ${type}. Please correct it.`
        );
      }
    } else if (type.includes('tuple')) {
      console.log("Can't verify type when type is tuple");
    } else {
      throw new Error(
        `ERROR: we did not identify the type ${type} for the following arg: ${arg}. If the error persists, please contact us in the DISCORD!`
      );
    }
    return true;
  } catch (err) {
    console.log('\x1b[31m', err.message);
    return false;
  }
}

function doesArgTypeMatch(args: string[], ABIInputs: any[]): boolean {
  for (const i in ABIInputs) {
    let check = false;
    if (ABIInputs[i].type.includes('[]')) {
      const type = ABIInputs[i].type.slice(0, ABIInputs[i].type.length - 2);
      for (const arg of args[i]) {
        check = checkArgType(arg, type);
      }
    } else {
      check = checkArgType(args[i], ABIInputs[i].type);
    }
    if (!check) return false;
  }
  return true;
}

describe('CONNECTOR - INTERACTIONS', () => {
  let connector: string;
  let interactionPATH: string;

  beforeAll(async () => {
    const connectorParam = checkParam('connector');
    if (connectorParam.err) throw new Error(connectorParam.err.message);
    connector = connectorParam.arg;
    if (!connector) {
      throw new Error(
        `
        ⚠️⚠️⚠️ You did not specify any name for your connector. Run "npm run "test_name" -- --connector="name_of_your_connector"" ⚠️⚠️⚠️
        `
      );
    }
    interactionPATH = `src/connectors/${connector}/interactions/index`;
  });

  /// / LOOP THROUGH ALL THE SPECIFIED POOLS
  for (const POOL of POOLS) {
    describe(`#### POOL ${POOL.name ? POOL.name : 'NULL'} - ${
      POOL.chain ? POOL.chain : 'NULL'
    } - ${POOL.pool_address ? POOL.pool_address : 'NULL'} ####`, () => {
      describe('-> INTERACTIONS/INDEX.JS RESPECT ALL THE NEEDED FUNCTIONS', () => {
        for (const interaction of interactions) {
          it(`Should have the ${interaction.toUpperCase()} function`, async () => {
            await checkFnExists(interaction, interactionPATH);
          });
        }
      });

      describe('-> REQUESTED INFORMATION FROM INDEX.JS AVAILABLE', () => {
        for (const interaction of interactions) {
          it(`${interaction.toUpperCase()} should be callable and return the expected information`, async () => {
            const userAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
            const result = await checkFnCallableReturn(
              POOL,
              interaction,
              interactionPATH,
              '10000',
              ['10000', '10000', '10000', '10000'],
              ['8000', '8000', '8000', '8000'],
              ['7500', '10000'],
              '0x0000000000000000000000000000000000000000',
              userAddress,
              userAddress,
              '',
              0
            );

            if (result) {
              expect(result).toBeDefined();
              expect(result.txInfo.abi).toBeDefined();
              expect(result.txInfo.method_name).toBeDefined();
              expect(result.assetInfo).toBeDefined();
              expect(result.txInfo.interaction_address).toBeDefined();
              expect(result.txInfo.args).toBeDefined();
            }
          });

          it(`${interaction.toUpperCase()} should return a "valid" ABI`, async () => {
            const userAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
            const result = await checkFnCallableReturn(
              POOL,
              interaction,
              interactionPATH,
              '10000',
              ['10000', '10000', '10000', '10000'],
              ['8000', '8000', '8000', '8000'],
              ['7500', '10000'],
              '0x0000000000000000000000000000000000000000',
              userAddress,
              userAddress,
              '',
              0
            );
            if (result) {
              // We try to find the request via the ethers interface
              const functionInterface = getFunctionInterface(
                result.txInfo.abi,
                result.txInfo.method_name
              );
              expect(functionInterface).toBeDefined();

              expect(functionInterface.name).toBeDefined();
              expect(functionInterface.type).toBeDefined();
              expect(functionInterface.stateMutability).toBeDefined();
              expect(functionInterface.inputs).toBeDefined();
              expect(functionInterface.outputs).toBeDefined();
            }
          });

          it(`${interaction.toUpperCase()} should return a METHOD_NAME avalaible in the ABI provided`, async () => {
            const userAddress = '0x796052Bf2A527Df9B5465Eec243c39A07751E46F';
            const result: InteractionsReturnObject =
              await checkFnCallableReturn(
                POOL,
                interaction,
                interactionPATH,
                '10000',
                ['10000', '10000', '10000', '10000'],
                ['8000', '8000', '8000', '8000'],
                ['7500', '10000'],
                '0x0000000000000000000000000000000000000000',
                userAddress,
                userAddress,
                '',
                0
              );
            if (result) {
              const functionInterface = getFunctionInterface(
                result.txInfo.abi,
                result.txInfo.method_name
              );
              expect(functionInterface).toBeTruthy();
              expect(typeof result.txInfo.method_name).toBe('string');

              // We check we can populate the transaction
              const contract = new ethers.Contract(
                result.txInfo.interaction_address,
                result.txInfo.abi,
                getNodeProvider(POOL.chain)
              );

              await contract.populateTransaction[result.txInfo.method_name](
                ...result.txInfo.args
              );
            }
          });

          it(`${interaction.toUpperCase()} should return POSITION_TOKEN_TYPE in a valid format: 'ERC-20' or 'ERC-721'`, async () => {
            const userAddress = '0x796052Bf2A527Df9B5465Eec243c39A07751E46F';
            const result = await checkFnCallableReturn(
              POOL,
              interaction,
              interactionPATH,
              '10000',
              ['10000', '10000', '10000', '10000'],
              ['8000', '8000', '8000', '8000'],
              ['7500', '10000'],
              '0x0000000000000000000000000000000000000000',
              userAddress,
              userAddress,
              '',
              0
            );
            if (result && result.position_token_type) {
              expect(['ERC-20', 'ERC-721']).toContain(
                result.position_token_type
              );
            }
          });

          it(`${interaction.toUpperCase()} should return ARGS as an array`, async () => {
            const userAddress = '0x796052Bf2A527Df9B5465Eec243c39A07751E46F';
            const result = await checkFnCallableReturn(
              POOL,
              interaction,
              interactionPATH,
              '10000',
              ['10000', '10000', '10000', '10000'],
              ['8000', '8000', '8000', '8000'],
              ['7500', '10000'],
              '0x0000000000000000000000000000000000000000',
              userAddress,
              userAddress,
              '',
              0
            );
            if (result?.txInfo) {
              expect(Array.isArray(result.txInfo.abi)).toBeTruthy();
            }
          });

          it(`${interaction.toUpperCase()} should return ARGS with the same length than in the ABI`, async () => {
            const userAddress = '0x796052Bf2A527Df9B5465Eec243c39A07751E46F';
            const result = await checkFnCallableReturn(
              POOL,
              interaction,
              interactionPATH,
              '10000',
              ['10000', '10000', '10000', '10000'],
              ['8000', '8000', '8000', '8000'],
              ['7500', '10000'],
              '0x0000000000000000000000000000000000000000',
              userAddress,
              userAddress,
              '',
              0
            );
            if (result) {
              const functionInterface = getFunctionInterface(
                result.txInfo.abi,
                result.txInfo.method_name
              );
              expect(functionInterface.inputs.length).toBe(
                result.txInfo.args.length
              );
            }
          });

          it(`${interaction.toUpperCase()} should return ARGS with the same type than in the ABI`, async () => {
            const userAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
            const result = await checkFnCallableReturn(
              POOL,
              interaction,
              interactionPATH,
              '10000',
              ['10000', '10000', '10000', '10000'],
              ['8000', '8000', '8000', '8000'],
              ['7500', '10000'],
              '0x0000000000000000000000000000000000000000',
              userAddress,
              userAddress,
              '',
              0
            );
            if (result?.txInfo) {
              const functionInterface = getFunctionInterface(
                result.txInfo.abi,
                result.txInfo.method_name
              );

              expect(functionInterface).toBeTruthy();
              expect(
                doesArgTypeMatch(result.txInfo.args, functionInterface.inputs)
              ).toBeTruthy();
            }
          });

          it(`${interaction.toUpperCase()} should return INTERACTION_ADDRESS as a valid EVM address`, async () => {
            const userAddress = '0x796052Bf2A527Df9B5465Eec243c39A07751E46F';
            const result = await checkFnCallableReturn(
              POOL,
              interaction,
              interactionPATH,
              '10000',
              ['10000', '10000', '10000', '10000'],
              ['8000', '8000', '8000', '8000'],
              ['7500', '10000'],
              '0x0000000000000000000000000000000000000000',
              userAddress,
              userAddress,
              '',
              0
            );
            if (result && result.interaction_address) {
              expect(
                isEVMAddress(result.interaction_address.toLowerCase())
              ).toBeTruthy();
            }
          });

          it(`${interaction.toUpperCase()} should return POSITION_TOKEN as a valid EVM address`, async () => {
            const userAddress = '0x796052Bf2A527Df9B5465Eec243c39A07751E46F';
            const result = await checkFnCallableReturn(
              POOL,
              interaction,
              interactionPATH,
              '10000',
              ['10000', '10000', '10000', '10000'],
              ['8000', '8000', '8000', '8000'],
              ['7500', '10000'],
              '0x0000000000000000000000000000000000000000',
              userAddress,
              userAddress,
              '',
              0
            );

            if (result && result.position_token) {
              if (Array.isArray(result.position_token)) {
                for (const elem of result.position_token) {
                  expect(isEVMAddress(elem.toLowerCase())).toBeTruthy();
                }
              } else {
                expect(
                  isEVMAddress(result.position_token.toLowerCase())
                ).toBeTruthy();
              }
            }
          });
        }
      });
    });
  }
});
