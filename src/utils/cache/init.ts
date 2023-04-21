import { init, get, set } from "node-cache-redis";
require("dotenv").config()

init({
    redisOptions: {
        URL: process.env.REDIS_URL
    },
    defaultTtlInS: parseInt(process.env.CACHE_TIME_IN_SECONDS ?? "1")
});

export function useCache<T>(getKey: ((T) => string)){
    return {
        getCache: async (t:T) => {
            if(process.env.USE_CACHE || process.env.USE_DECIMALS_CACHE){
                return get(getKey(t))
            }
        },
        setCache: async (t:T, v: string)=> {
            if(process.env.USE_CACHE || process.env.USE_DECIMALS_CACHE){
                return set(getKey(t), v)
            }
        }
    }
}