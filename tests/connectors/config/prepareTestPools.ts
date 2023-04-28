/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const _ = require('lodash');
import { checkParam } from "./checkParam";
function formatError(message) {
  console.log(
    '\x1b[31m',

    `
          
          ----------------------------------------------------
          
          `
  );
  console.log('\x1b[31m', ' ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ ERROR:');
  console.log('\x1b[31m', message);
  console.log(
    '\x1b[31m',

    `
        
        ----------------------------------------------------
        
        `
  );
}

export async function prepareTestPools(_) {
  try {
    const connectorParam = checkParam('connector');
    if (!connectorParam || connectorParam.err || !connectorParam.arg) {
      throw new Error(
        `You did not specify any name for your connector. 
         Run "npm run "test_name" -- --connector=name_of_your_connector"`
      );
    }
    const connector = connectorParam.arg;
    const poolParam = checkParam('pool');
    if (poolParam.err) throw new Error(poolParam.err.message);
    const pool = poolParam.arg;
    const chainParam = checkParam('chain');
    if (chainParam.err) throw new Error(chainParam.err.message);
    const chain = chainParam.arg;

    const path = `src/connectors/${connector}/pools`;
    const resultJS = fs.existsSync(`${path}/pools.js`);
    const resultTS = fs.existsSync(`${path}/pools.ts`);
    const file = resultJS ? 'pools.js' : resultTS ? 'pools.ts' : null;
    if (!file) {
      throw new Error(
        `⚠️⚠️⚠️ We did not find the file pools.js/ts for ${connector}. Make sure ${connector}/pools.js or ${connector}/pools.ts exist! ⚠️⚠️⚠️`
      );
    }
    const pathImport = `../../../src/connectors/${connector}/pools`;
    const { default: pools } = await import(`${pathImport}/${file}`);
    const result = await pools();
    let poolsToWrite = result;
    if (pool) {
      poolsToWrite = poolsToWrite.find( (elem) => {
        return elem.pool_address.toLowerCase() === pool.toLowerCase();
      });
      poolsToWrite = poolsToWrite ? [poolsToWrite] : null;
    }
    if (chain) {
      poolsToWrite = poolsToWrite.find((elem) => {
        return elem.chain.toLowerCase() === chain.toLowerCase();
      });
      poolsToWrite = poolsToWrite ? [poolsToWrite] : null;
    }

    if (!pool || !poolsToWrite) {
      poolsToWrite = result;
    }
    console.log("writing sync")

    fs.writeFileSync(
      'tests/connectors/config/testPools.ts',
      `
        import {Pool} from "../../../src/utils/types/connector-types"

        export const POOLS: Pool[] = ${JSON.stringify(poolsToWrite)}

      `
    );
  } catch (err) {
    formatError(err.message);
  }
}

module.exports = prepareTestPools;