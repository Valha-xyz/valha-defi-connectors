import { ethers, providers } from 'ethers';
import { deepCopy, fetchJson } from 'ethers/lib/utils';
// import { useCache } from './init';

interface ChainCacheKey {
  url: string;
  key: string;
}

// const {
//     getCache,
//     setCache
// } = useCache(
//     ({url,key }: ChainCacheKey) => `scraping_cache_${url}_${key}`
// )

function getResult(payload: {
  error?: { code?: number; data?: any; message?: string };
  result?: any;
}): any {
  if (payload.error) {
    // @TODO: not any
    const error: any = new Error(payload.error.message);
    error.code = payload.error.code;
    error.data = payload.error.data;
    throw error;
  }

  return payload.result;
}

export class CachedJsonRpcProvider extends ethers.providers.JsonRpcProvider {
  async send(method: string, params: Array<any>): Promise<any> {
    const request = {
      method: method,
      params: params,
      id: this._nextId++,
      jsonrpc: '2.0',
    };

    this.emit('debug', {
      action: 'request',
      request: deepCopy(request),
      provider: this,
    });

    // We can expand this in the future to any call, but for now these
    // are the biggest wins and do not require any serializing parameters.
    // const simpleCache = (["eth_chainId", "eth_blockNumber"].indexOf(method) >= 0);
    let cacheKey = method;

    // For more complicated cache operations on eth_call
    let callCache = false;
    if (['eth_call'].indexOf(method) >= 0) {
      cacheKey = JSON.stringify(request.params);
      callCache = true;
    }

    // In case we have a cached value
    // const useCache = simpleCache || callCache
    // if (useCache) {
    //     const cache = await getCache({
    //         url: this.connection.url,
    //         key: cacheKey
    //     });
    //     if(cache){
    //         return cache
    //     }
    // }

    const result = fetchJson(
      this.connection,
      JSON.stringify(request),
      getResult,
    ).then(
      (result) => {
        this.emit('debug', {
          action: 'response',
          request: request,
          response: result,
          provider: this,
        });

        return result;
      },
      (error) => {
        this.emit('debug', {
          action: 'response',
          error: error,
          request: request,
          provider: this,
        });

        throw error;
      },
    );

    // Cache the fetch, but clear it after 20 minutes
    // if (useCache) {
    //     await setCache({
    //         url: this.connection.url,
    //         key: cacheKey
    //     }, JSON.stringify(await result));
    // }

    return result;
  }
}
