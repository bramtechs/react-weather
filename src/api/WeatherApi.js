// FIXME: Don't include directly in here!
const API_KEY = "db6b3fff5256fe57907e84c800f2d027";

function addQueryString(url, key, value) {
    return url + `&${key}=${value}`;
}

// Get coordinates from geolocation
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
async function getGeoCoordinates(query) {
    let url = "https://api.openweathermap.org/geo/1.0/direct?q=" + query;
    url = addQueryString(url, "limit", 1);
    url = addQueryString(url, "appid", API_KEY);
    console.debug("Fetching: ", url);

    let json = undefined;
    let response = await fetch(url);
    if (response.ok) {
        json = await response.json();
        if (json.length === 0) {
            json = undefined;
        }
    } else {
        throw `Failed to fetch geolocation ${response.statusText}`;
    }

    return json;
}

// Get weather from coordinates
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
async function getWeatherFromCoords(coords) {
    let url = "https://api.openweathermap.org/data/2.5/weather?lat=" + coords.lat;
    url = addQueryString(url, "lon", coords.lon);
    url = addQueryString(url, "units", "metric");
    url = addQueryString(url, "appid", API_KEY);

    let json = undefined;
    let response = await fetch(url);
    if (response.ok) {
        json = await response.json();
    } else {
        throw "Failed to get weather from coordinates!";
    }

    return json;
}

// Get weather from location
export default async function getWeatherFromLocation(location) {
    const coords = await getGeoCoordinates(location);
    console.log(coords[0]);
    const info = getWeatherFromCoords(coords[0]);
    return info;
}
