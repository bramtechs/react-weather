export const PROXY_DEST = 'https://api.openweathermap.org';
export const PROXY_HOST = 'http://localhost:3000';
export const API_KEY = 'db6b3fff5256fe57907e84c800f2d027';

export function proxyURL(url: string) {
    // add query string appID with API_KEY to url
    url += url.includes('?') ? '&' : '?';
    url += 'appid=' + API_KEY;
    return url.replace(PROXY_HOST, PROXY_DEST);
}
