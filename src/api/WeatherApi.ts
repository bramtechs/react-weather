import { LiveWeather, OpenWeatherMap, WeatherLocation, getLiveWeather } from './ext';

const _OpenWeather: OpenWeatherMap = {
    proxy: {
        customHost: 'localhost:3000',
        fallback: true,
    },
    apiKey: 'db6b3fff5256fe57907e84c800f2d027',
};

export function searchWeather(query: WeatherLocation): Promise<LiveWeather> {
    return getLiveWeather(_OpenWeather, query);
}
