import { _config } from "../Config";

import OpenWeatherMap from "openweathermap-ts";
import { CurrentResponse } from "openweathermap-ts/dist/types";
import { makeTaggedUnion, MemberType, none } from "safety-match";

const openWeather = new OpenWeatherMap({
    // FIXME: Don't include directly in here!
    apiKey: "db6b3fff5256fe57907e84c800f2d027",
});

// NOTE: Rust-like enums
export const WeatherResponse = makeTaggedUnion({
    Nothing: () => none,
    Error: (msg: string) => msg,
    Info: (resp: CurrentResponse) => resp,
});
export type WeatherResponse = MemberType<typeof WeatherResponse>;

export type WeatherQuery = {
    city: string;
};

export const EmptyQuery: WeatherQuery = {
    city: "",
};

export async function searchWeather(query: WeatherQuery): Promise<WeatherResponse> {
    if (query.city === _testData.name && _config.testMode) {
        return WeatherResponse.Info(_testData);
    }
    try {
        const result = await openWeather.getCurrentWeatherByCityName({
            cityName: query.city,
        });
        return WeatherResponse.Info(result);
    } catch (exc: any) {
        return WeatherResponse.Error(exc.toString());
    }
}

const _testData: CurrentResponse = {
    coord: {
        lon: 3.2268,
        lat: 51.2086,
    },
    weather: [
        {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10n",
        },
    ],
    base: "stations",
    main: {
        temp: 8.13,
        feels_like: 4.25,
        temp_min: 7.28,
        temp_max: 8.99,
        pressure: 1008,
        humidity: 85,
    },
    visibility: 10000,
    wind: {
        speed: 7.98,
        deg: 189,
    },
    clouds: {
        all: 100,
    },
    dt: 1681244758,
    sys: {
        type: 2,
        id: 2006961,
        country: "BE",
        sunrise: 1681189275,
        sunset: 1681238087,
    },
    timezone: 7200,
    id: 2800931,
    name: "Bruges",
    cod: 200,
};
