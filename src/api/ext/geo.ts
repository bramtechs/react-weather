import { DEFAULT_HOST, multiFetch, proxify } from "./net";
import { Coordinate, OpenWeatherMap, WeatherLocation } from "./types";
import { formUrl } from "./net";

export function locationCSV(location: WeatherLocation | string) {
    if (typeof location === "string") {
        return location;
    }

    let result = "";
    if (location.city){
        result += `${location.city},`;
    }
    if (location.state){
        result += `${location.state},`;
    }
    if (location.country){
        result += `${location.country},`;
    }
    return result.slice(0, Math.max(0,result.length-1));
}

export async function getCoordinates(settings: OpenWeatherMap, location: WeatherLocation | string): Promise<Coordinate> {
    const locURL = proxify(formUrl(DEFAULT_HOST, ["geo", "1.0", "direct"], { q: locationCSV(location), appid: settings.apiKey }));
    const res = await multiFetch(locURL);
    const json = await res.json();
    if (json.cod) {
        throw new Error(`Code ${json.cod} when retrieving coordinates`);
    }
    return { lat: json[0].lat, lon: json[0].lon };
}
