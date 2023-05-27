import { LiveWeather, OpenWeatherMap, WeatherLocation, getLiveWeather, getWeatherForecast } from './ext';

const _OpenWeather: OpenWeatherMap = {
    proxy: {
        customHost: 'http://localhost:3000',
        fallback: true,
    },
    apiKey: 'db6b3fff5256fe57907e84c800f2d027',
};

export async function searchWeather(query: WeatherLocation): Promise<LiveWeather | string> {
    // if github in url, don't use proxy (live web example)
    if (window.location.href.includes('github')) {
        _OpenWeather.proxy = undefined;
    }
    try {
        return await getLiveWeather(_OpenWeather, query);
    } catch (e) {
        return e.message;
    }
}

// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} 
export async function searchWeatherForecast(query: WeatherLocation): Promise<any> {
    // if github in url, don't use proxy (live web example)
    if (window.location.href.includes('github')) {
        _OpenWeather.proxy = undefined;
    }

    return await getWeatherForecast(_OpenWeather, query);
}
