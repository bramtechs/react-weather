export type WeatherInfo = {
    temp: string;
    weather: [WeatherType, string];
    city: string;
};

export type WeatherQuery = {
    cityName?: string;
    coords?: {
        lat: number;
        lon: number;
    };
};

export enum WeatherType {
    Unknown,
    Clouds,
    Sunny,
}
