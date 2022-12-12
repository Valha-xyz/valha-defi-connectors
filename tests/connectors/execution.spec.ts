/// WIP

// import POOLS from './config/testPools';
// import _ from 'lodash';
// import axios from 'axios';
// import checkParam from './config/checkParam';

// const interactions = [
//   'deposit',
//   // 'deposit_and_stake',
//   // 'unlock',
//   // 'redeem',
//   // 'stake',
//   // 'unstake',
//   // 'boost',
//   // 'unboost',
//   // 'claim_rewards',
//   // 'claim_interests',
// ];

// async function executeForkTX(
//   POOL: any,
//   name: string,
//   path: string,
//   amountBN: string,
//   userAddress: string,
//   receiverAddress: string,
//   lockupTimestamp: string,
// ) {
//   try {
//     const URL = `http://localhost:5000/proxy/chain/${POOL.chain}`;
//     const { default: fn } = await import(path);
//     console.log(name);
//     if (fn[name]) {
//       const result = await fn[name](
//         POOL.name,
//         POOL.chain,
//         POOL.underlying_tokens,
//         POOL.pool_address,
//         POOL.investing_address,
//         POOL.staking_address,
//         POOL.boosting_address,
//         POOL.distributor_address,
//         POOL.rewards_tokens,
//         POOL.metadata,
//         amountBN,
//         userAddress,
//         receiverAddress,
//         lockupTimestamp,
//       );
//       const executionBool = await axios.post(URL, result);
//       return executionBool;
//     }
//     return true;
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// }

// describe('CONNECTOR - INTERACTIONS', () => {
//   let connector: string;
//   let interactionPATH: string;
//   let URL: string;

//   beforeAll(async () => {
//     const connectorParam = checkParam(
//       process.env.npm_lifecycle_script,
//       'connector',
//     );
//     if (connectorParam.err) throw new Error(connectorParam.err.message);
//     connector = connectorParam.arg;
//     if (!connector) {
//       throw new Error(
//         `
//         ⚠️⚠️⚠️ You did not specify any name for your connector. Run "npm run "test_name" -- --connector="name_of_your_connector"" ⚠️⚠️⚠️
//         `,
//       );
//     }
//     interactionPATH = `src/connectors/${connector}/interactions/index`;

//     const forkParam = checkParam(process.env.npm_lifecycle_script, 'url');
//     if (forkParam.err) throw new Error(forkParam.err.message);
//     URL = forkParam.arg;
//     console.log(URL);
//     if (!URL) {
//       throw new Error(
//         `
//         ⚠️⚠️⚠️ You did not specify any --URL for your connector. Run "npm run text-execution -- [..] --url="url_link"" ⚠️⚠️⚠️
//         `,
//       );
//     }
//   });

//   it(`Should have the function`, async () => {
//     console.log('done');
//   });

//   // //// LOOP THROUGH ALL THE SPECIFIED POOLS
//   // for (const POOL of POOLS) {
//   //   describe(`#### POOL ${POOL.name ? POOL.name : 'NULL'} - ${
//   //     POOL.chain ? POOL.chain : 'NULL'
//   //   } - ${POOL.pool_address ? POOL.pool_address : 'NULL'} ####`, () => {
//   //     describe(`-> INTERACTIONS/INDEX.JS RESPECT ALL THE NEEDED FUNCTIONS`, () => {
//   //       for (const interaction of interactions) {
//   //         const userAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
//   //         it(`Should have the ${interaction.toUpperCase()} function`, async () => {
//   //           const resultBOOL = await executeForkTX(
//   //             POOL,
//   //             interaction,
//   //             interactionPATH,
//   //             '10000',
//   //             userAddress,
//   //             userAddress,
//   //             '',
//   //           );
//   //           expect(resultBOOL).toBeTruthy();
//   //         });
//   //       }
//   //     });
//   //   });
//   // }
// });
