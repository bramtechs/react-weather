import { useState } from "react";
import { WeatherQuery } from "../../api/WeatherTypes";
import { TileBackground, TileContainer } from "./impl/TileContainer";
import { WeatherEntryCreator } from "./impl/TileCreator";
import { LiveTileInfo } from "./impl/LiveTileInfo";
import { ThreeDots } from "react-loading-icons";
import { ErrorCircleFilled } from "@fluentui/react-icons";
import { searchWeather } from "../../api/WeatherApi";
import { CurrentResponse } from "openweathermap-ts/dist/types";
import { typeNameToTileBackground } from "../../api/WeatherUtils";
import { FetchResult, InfoFetcher, generateKeyFromQuery } from "../utils/InfoFetcher";

export function isValidCurrentResponse(data: CurrentResponse | any): boolean {
    if (data) {
        const cur = (data as CurrentResponse)
        return cur && cur.cod === 200;
    }
    return false;
}

export const LiveTile = (props: { query?: WeatherQuery, onConfigured: (query: WeatherQuery) => void }) => {
    const [results, setResults] = useState<FetchResult>({});

    function getInnerContent() {
        if (isValidCurrentResponse(results.data)) {
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
        <TileContainer type={isValidCurrentResponse(results.data) ? typeNameToTileBackground((results.data as CurrentResponse).weather[0].main) : TileBackground.Unknown}>
            {props.query ? <InfoFetcher queryKey={generateKeyFromQuery("live-info", props.query)} fetchCall={() => searchWeather(props.query!)} onStatusChanged={setResults} /> : <template></template>}
            {props.query ? getInnerContent() : <WeatherEntryCreator onFormSubmit={props.onConfigured} />}
        </TileContainer>
    );
};