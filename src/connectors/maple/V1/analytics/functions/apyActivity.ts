import axios from 'axios'

export async function checkMapleV3APY (poolAddress: string): Promise<any> {
  try {
    let LM = 0

    const query = `query 
      PoolData($poolContractAddress: String!) {  
        results: pool(contractAddress: $poolContractAddress) {    
          ...PoolFields    
          __typename  
        }
      }
      fragment PoolFields on Pool {  
        _id  
        id  
        currentLoaned  
        defaultsTotal  
        delegateFee
        lendingApy
        farmingApy
      }
      `
    const variables = {
      poolContractAddress: poolAddress.toLowerCase()
    }

    const { data } = await axios.post('https://api.maple.finance/v1/graphql', {
      query,
      variables
    })
    const result = data.data.results
    if (!result) {
      throw new Error(`Data from Maple indexer not ok for ${poolAddress}`)
    }
    LM = result.lendingApy / 100
    return { data: LM, err: null }
  } catch (err) {
    console.log(err)
    return { data: null, err }
  }
}
