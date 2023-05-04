import { TileContainer } from "./TileContainer";
import { WeatherQuery, WeatherType } from "./api/WeatherAbstractor";
import { useQuery } from "@tanstack/react-query";
import { genQueryKeyName, searchWeather } from "./api/WeatherApi";
import { ThreeDots } from "react-loading-icons";
import { capitalizeFirst, formatTemp, stringToWeatherType } from "./api/WeatherUtils";
import { ErrorCircleFilled } from "@fluentui/react-icons";

export const LiveInfo = (props: { query: WeatherQuery }) => {
    const { isLoading, error, data } = useQuery({ queryKey: [genQueryKeyName("live-info", props.query)], queryFn: () => searchWeather(props.query) });

    if (isLoading) {
        return (
            <TileContainer type={WeatherType.Unknown}>
                <ThreeDots />
            </TileContainer>
        );
    } else if (data && data.cod === 200) {
        const cityName = data.name;
        const temp = formatTemp(data.main.temp);
        const type = stringToWeatherType(data.weather[0].main);
        const desc = data.weather[0].description;

        return (
            <TileContainer type={type}>
                <div>
                    <h2>Live weather</h2>
                    <h3>{cityName}</h3>
                    <span>{temp}</span>
                    <p>{capitalizeFirst(desc)}</p>
                </div>
            </TileContainer>
        );
    } else {
        return (
            <TileContainer type={WeatherType.Unknown}>
                <div>
                    <ErrorCircleFilled />
                    <p>{"Could not load weather info!"}</p>
                    {error ? <p>JSON.stringify(error)</p> : <div></div>}
                </div>
            </TileContainer>
        );
    }
};
