import { init, get, set } from "node-cache-redis";
init({
    redisOptions: {

    },
    defaultTtlInS: parseInt(process.env.CACHE_TIME_IN_SECONDS ?? "0")
});

export function useCache<T>(getKey: ((T)=> string)){
    return {
        getCache: async (t:T)=> {
            if(process.env.USE_CACHE){
                return get(getKey(t))
            }
        },
        setCache: async (t:T, v: string)=> {
            if(process.env.USE_CACHE){
                return set(getKey(t), v)
            }
        }
    }
}