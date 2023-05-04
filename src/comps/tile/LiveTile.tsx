import { useEffect, useState } from "react";
import { WeatherQuery } from "../../api/WeatherTypes";
import { TileBackground, TileContainer } from "./impl/TileContainer";
import { WeatherEntryCreator } from "./impl/TileCreator";
import { LiveTileInfo } from "./impl/LiveTileInfo";
import { ThreeDots } from "react-loading-icons";
import { ErrorCircleFilled } from "@fluentui/react-icons";
import { searchWeather } from "../../api/WeatherApi";
import { QueryFunction, useQuery } from "@tanstack/react-query";
import { CurrentResponse } from "openweathermap-ts/dist/types";
import { stringToWeatherType } from "../../api/WeatherUtils";

const InfoQuery = (props: { queryKey: string, fetchCall: QueryFunction<unknown, string[]>, onLoadStart: (on: boolean) => void, onError: (e: unknown) => void, onData: (data: unknown) => void }) => {
    const { isLoading, error, data } = useQuery({ queryKey: [props.queryKey], queryFn: props.fetchCall });

    useEffect(() => {
        props.onLoadStart(true);
    }, [isLoading]);

    useEffect(() => {
        props.onError(error);
    }, [error]);

    useEffect(() => {
        props.onData(data);
    }, [data]);

    return (<template></template>)
}

function generateKeyFromQuery(prefix: string, query: WeatherQuery) {
    if (query.cityName) {
        return `${prefix}-${query.cityName}`;
    }
    else if (query.coords) {
        return `${prefix}-${query.coords.lat}-${query.coords.lon}`;
    } else {
        return `${prefix}-???`;
    }
}

export const LiveTile = (props: { query?: WeatherQuery }) => {
    const [query, setQuery] = useState<WeatherQuery | undefined>(props.query);

    // TODO: combine into one
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>();
    const [data, setData] = useState<CurrentResponse>();

    function getInnerContent() {
        if (!data && loading) {
            return (
                <ThreeDots />
            );
        } else if (data && data.cod === 200) {
            return (<LiveTileInfo info={data} />);
        } else {
            return (
                <div>
                    <ErrorCircleFilled />
                    <p>{"Could not load weather info!"}</p>
                    {error ? <p>JSON.stringify(error)</p> : <div></div>}
                </div>
            );
        }
    }

    return (
        <div>
            {query ? <InfoQuery queryKey={generateKeyFromQuery("live-info",query)} fetchCall={() => searchWeather(query)} onLoadStart={setLoading} onData={(data) => setData(data as CurrentResponse)} onError={setError}  /> : <template></template>}
            <TileContainer type={data ? stringToWeatherType(data.weather[0].main) : TileBackground.Unknown}>
                {query ? getInnerContent() : <WeatherEntryCreator onFormSubmit={setQuery} />}
            </TileContainer>
        </div>
    );
};