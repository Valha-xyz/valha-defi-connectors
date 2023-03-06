import { getNodeProvider } from './getNodeProvider'

export async function getCurrentBlock (): Promise<any> {
  try {
    const provider = getNodeProvider('ethereum')
    if (!provider) throw new Error('No provider was found.')
    const block = await provider.getBlock('latest')
    return { data: block, err: null }
  } catch (err) {
    console.log('ERROR -------------------------')
    console.log(err.response.data)
    return { data: null, err }
  }
}
