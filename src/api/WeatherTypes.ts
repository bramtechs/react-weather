export type WeatherQuery = {
    cityName?: string;
    coords?: {
        lat: number;
        lon: number;
    };
};