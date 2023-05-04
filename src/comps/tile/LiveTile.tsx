import { useState } from "react";
import { WeatherQuery } from "../../api/WeatherTypes";
import { TileBackground, TileContainer } from "./impl/TileContainer";
import { WeatherEntryCreator } from "./impl/TileCreator";
import { LiveTileInfo } from "./impl/LiveTileInfo";
import { ThreeDots } from "react-loading-icons";
import { ErrorCircleFilled } from "@fluentui/react-icons";
import { searchWeather } from "../../api/WeatherApi";
import { CurrentResponse } from "openweathermap-ts/dist/types";
import { stringToWeatherType } from "../../api/WeatherUtils";
import { FetchResults, InfoFetcher, generateKeyFromQuery } from "../utils/InfoFetcher";

export const LiveTile = (props: { query?: WeatherQuery }) => {
    const [query, setQuery] = useState<WeatherQuery | undefined>(props.query);
    const [results, setResults] = useState<FetchResults>({});

    function getInnerContent() {
        if (results.data && (results.data as CurrentResponse).cod === 200) {
            return (<LiveTileInfo info={results.data as CurrentResponse} />);
        }
        else if (results.isLoading) {
            return (
                <ThreeDots />
            );
        } else {
            return (
                <div>
                    <ErrorCircleFilled />
                    <p>{"Could not load weather info!"}</p>
                    {results.error ? <p>JSON.stringify(status.error)</p> : <div></div>}
                </div>
            );
        }
    }

    return (
        <div>
            {query ? <InfoFetcher queryKey={generateKeyFromQuery("live-info", query)} fetchCall={() => searchWeather(query)} onStatusChanged={setResults} /> : <template></template>}
            <TileContainer type={results.data ? stringToWeatherType((results.data as CurrentResponse).weather[0].main) : TileBackground.Unknown}>
                {query ? getInnerContent() : <WeatherEntryCreator onFormSubmit={setQuery} />}
            </TileContainer>
        </div>
    );
};