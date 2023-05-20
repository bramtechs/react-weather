import { OpenWeatherMap, WeatherMapProxy } from './types';

export const DEFAULT_HOST = 'https://api.openweathermap.org';

export async function multiFetch(urls: string[]): Promise<Response> {
    let lastError = null;
    for (const url of urls) {
        try {
            return await fetch(url);
        } catch (e) {
            lastError = e;
            console.error(`${url} failed to connect, using fallback!`, e);
        }
    }
    throw lastError || new Error('No urls passed to multifetch!');
}

export function proxify(url: string, proxy?: WeatherMapProxy): string[] {
    let urls = [url];
    if (proxy) {
        const proxyUrl = url.replace(DEFAULT_HOST, proxy.customHost);
        // remove appid query string from proxy url
        const proxyUrlNoAppid = proxyUrl.replace(/&?appid=[^&]+/, '');
        urls.unshift(proxyUrlNoAppid);
    }
    return urls;
}

function startsWithProtocol(url: string): boolean {
    return url.startsWith('https://') || url.startsWith('http://');
}

function formHost(url?: string): string {
    if (url) {
        if (!url.endsWith('/')) {
            url += '/';
        }
        if (startsWithProtocol(url)) {
            return url;
        }
        return 'https://' + url;
    }
    return DEFAULT_HOST + '/';
}

function formSubdirs(subs: string[]): string {
    let url = '';
    for (let i = 0; i < subs.length; i++) {
        url += subs[i];
        if (i < subs.length - 1) {
            url += '/';
        }
    }
    return url;
}

function formArguments(args: QueryStrings): string {
    const formattedArgs: [string, string][] = Object.entries(args)
        .filter(([_, value]) => value !== undefined && value.toString().length > 0)
        .map(([key, value]) => {
            return [key, value!.toString()];
        });
    return '?' + new URLSearchParams(formattedArgs).toString();
}

type QueryStrings = {
    [key: string]: string | number | undefined;
};

export function formUrl(host?: string, subs?: string[], args?: QueryStrings): string {
    let url: string = formHost(host);
    if (subs) {
        url += formSubdirs(subs);
    }
    if (args) {
        url += formArguments(args);
    }
    return url;
}
