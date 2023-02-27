import checkParam from './config/checkParam'
import { POOLS } from './config/testPools'
import fs from 'fs'

const chains = ['ethereum', 'bsc', 'polygon', 'arbitrum', 'optimism']

function isEVMAddress (address: string) {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    // check if it has the basic requirements of an address
    return false
  } else if (
    /^(0x)?[0-9a-f]{40}$/.test(address) ||
    /^(0x)?[0-9A-F]{40}$/.test(address)
  ) {
    // If it's all small caps or all all caps, return true
    return true
  }
}

describe('CONNECTOR - ANALYTICS', () => {
  let connector: string
  let analyticsPATH: string

  beforeAll(async () => {
    const connectorParam = checkParam(
      process.env.npm_lifecycle_script,
      'connector'
    )
    if (connectorParam.err) throw new Error(connectorParam.err.message)
    connector = connectorParam.arg
    if (!connector) {
      throw new Error(
        `
        ⚠️⚠️⚠️ You did not specify any name for your connector. Run "npm run "test_name" -- --connector="name_of_your_connector"" ⚠️⚠️⚠️
        `
      )
    }
    analyticsPATH = `src/connectors/${connector}/analytics/index`
  })

  /// / LOOP THROUGH ALL THE SPECIFIED POOLS
  for (const POOL of POOLS) {
    describe(`#### POOL ${POOL.name ? POOL.name : 'NULL'} - ${
      POOL.chain ? POOL.chain : 'NULL'
    } - ${POOL.pool_address ? POOL.pool_address : 'NULL'} ####`, () => {
      describe('-> REQUESTED INFORMATION FROM POOL.JS', () => {
        /// check if pools have all the requested informations (check interface)
        it('Pool should have a name defined', async () => {
          expect(POOL.name).toBeDefined()
        })

        it('Pool should have a chain defined', async () => {
          expect(POOL.chain).toBeDefined()
        })

        it('Pool should have specified an available chain in LOWERCASE', async () => {
          const check = chains.includes(POOL.chain)
          expect(check).toBeTruthy()
        })

        it('Pool should have underlying_tokens defined', async () => {
          expect(POOL.underlying_tokens).toBeDefined()
        })

        it('Pool should have an investing address defined', async () => {
          expect(POOL.investing_address).toBeDefined()
        })

        it('Pool should have a valid EVM investing address', async () => {
          if (POOL.investing_address) {
            const check = isEVMAddress(POOL.investing_address.toLowerCase())
            expect(check).toBeTruthy()
          } else {
            console.log('No investing address defined.')
          }
        })

        it('Pool should have a staking address defined', async () => {
          expect(POOL.staking_address).toBeDefined()
        })

        it('Pool should have a valid EVM staking address', async () => {
          if (POOL.staking_address) {
            const check = isEVMAddress(POOL.investing_address.toLowerCase())
            expect(check).toBeTruthy()
          } else {
            console.log('No staking address defined.')
          }
        })

        it('Pool should have a boosting address defined', async () => {
          expect(POOL.boosting_address).toBeDefined()
        })

        it('Pool should have a valid EVM boosting address', async () => {
          if (POOL.boosting_address) {
            const check = isEVMAddress(POOL.investing_address.toLowerCase())
            expect(check).toBeTruthy()
          } else {
            console.log('No boosting address defined.')
          }
        })

        it('Pool should have a distributor address', async () => {
          expect(POOL.distributor_address).toBeDefined()
        })

        it('Pool should have a valid EVM distributor address', async () => {
          if (POOL.distributor_address) {
            const check = isEVMAddress(POOL.investing_address.toLowerCase())
            expect(check).toBeTruthy()
          } else {
            console.log('No distributor address defined.')
          }
        })

        it('Pool should have rewards token defined', async () => {
          expect(POOL.rewards_tokens).toBeDefined()
        })

        it('Pool should have metadata defined', async () => {
          expect(POOL.rewards_tokens).toBeDefined()
        })
      })

      describe('-> FUNCTION FROM ANALYTICS/INDEX.JS CAN BE CALLED', () => {
        /// check that we have access to the url of the app
        it('Should be able to retrieve the URL of the protocol', async () => {
          try {
            const { default: fn } = await import(analyticsPATH)
            const result = fn.url
            expect(result).toBeTruthy()
          } catch (err) {
            console.log(err)
          }
        })

        /// check when we call the function we have the information needed on this POOL
        it('Should be able to call MAIN function to get analytics information', async () => {
          try {
            const { default: fn } = await import(analyticsPATH)
            const result = fn.main(POOL.chain, POOL.pool_address)
            expect(result).toBeTruthy()
          } catch (err) {
            console.log(err)
          }
        })
      })

      describe('-> REQUESTED INFORMATION FROM INDEX.JS AVAILABLE', () => {
        /// check when we call the function the information needed are in the good data type and in the good range
        it('Should be able to call MAIN function to get analytics information', async () => {
          const { default: fn } = await import(analyticsPATH)
          const info = await fn.main(POOL.chain, POOL.pool_address)
          /// ALL DEFINED
          expect(info).toBeDefined()
          expect(info.status).toBeDefined()
          expect(info.tvl).toBeDefined()
          expect(info.liquidity).toBeDefined()
          expect(info.outloans).toBeDefined()
          expect(info.losses).toBeDefined()
          expect(info.capacity).toBeDefined()
          expect(info.apy).toBeDefined()
          expect(info.activity_apy).toBeDefined()
          expect(info.rewards_apy).toBeDefined()
          expect(info.boosting_apy).toBeDefined()
          expect(info.share_price).toBeDefined()
          /// SOME NEED TO HAVE THE RIGHT TYPE
          expect(typeof info.tvl).toBe('number')
          expect(typeof info.liquidity).toBe('number')
          expect(typeof info.apy).toBe('number')
          expect(typeof info.activity_apy).toBe('number')
          expect(typeof info.rewards_apy).toBe('number')
          expect(
            info.share_price > 0 || info.share_price === null
          ).toBeTruthy()
        })
      })
    })
  }
})
