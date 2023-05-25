import { proxyURL } from './proxy.js';

interface CachedReponse {
    data: string;
    fetchTime: number;
}

// 30 minute cache time
const CACHE_TIME = 1000 * 60 * 30;
const cached = new Map<string, CachedReponse>();

export async function fetchCached(url: string) {
    if (cached.has(url)) {
        const result = cached.get(url)!;
        if (result.fetchTime + CACHE_TIME < Date.now()) {
            cached.delete(url);
        }
        return result;
    }
    const proxiedURL = proxyURL(url);
    const data = await fetch(proxiedURL);
    const response: CachedReponse = {
        data: await data.text(),
        fetchTime: Date.now(),
    };
    cached.set(url, response);
    return response;
}

export function printCache() {
    console.log(cached);
}
