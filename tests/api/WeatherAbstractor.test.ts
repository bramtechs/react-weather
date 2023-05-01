import { WeatherType } from "../../src/api/WeatherAbstractor";
import { stringToWeatherType } from "../../src/api/WeatherUtils";

describe("Test string to weather type", () => {
    test("Sunny weather type should be WeatherType.Sunny", () => {
        expect(stringToWeatherType("Sunny")).toBe(WeatherType.Sunny);
    });
    test("Clear weather type should be WeatherType.Sunny", () => {
        expect(stringToWeatherType("Clear")).toBe(WeatherType.Sunny);
    });
    test("Clouds weather type should be WeatherType.Clouds", () => {
        expect(stringToWeatherType("Clouds")).toBe(WeatherType.Clouds);
    });
    test("Rainy weather type should be WeatherType.Unknown", () => {
        expect(stringToWeatherType("Rainy")).toBe(WeatherType.Unknown);
    });
});
