import { proxyURL } from './proxy.js';

interface CachedReponse {
    data: string;
    fetchTime: number;
}

// 30 minute cache time
const CACHE_TIME = 1000 * 60 * 30;
const cached = new Map<string, CachedReponse>();

async function fetchData(proxiedURL: string) {
    try {
        const data = await fetch(proxiedURL);
        return {
            data: await data.text(),
            fetchTime: Date.now(),
        };
    } catch (e) {
        console.warn(`Failed to fetch ${proxiedURL}!`);
        console.debug(e);
        return undefined;
    }
}

export async function fetchCached(url: string): Promise<CachedReponse | undefined> {
    if (cached.has(url)) {
        const result = cached.get(url)!;
        if (result.fetchTime + CACHE_TIME < Date.now()) {
            cached.delete(url);
        }
        return result;
    }

    const proxiedURL = proxyURL(url);
    const response = await fetchData(proxiedURL);
    if (response) {
        cached.set(url, response);
    }
    return response;
}

export function printCache() {
    console.log(cached);
}
