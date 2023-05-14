import React, { useEffect } from 'react';
import { useState } from 'react';
import { WeatherQuery, getQueryKey, isQueryValid, weatherQueryToString } from '../../api/WeatherTypes';
import { TileBackground, TileContainer } from './impl/TileContainer';
import { LiveTileInfo } from './impl/LiveTileInfo';
import { ThreeDots } from 'react-loading-icons';
import { ErrorCircleFilled } from '@fluentui/react-icons';
import { searchWeather } from '../../api/WeatherApi';
import { CurrentResponse } from 'openweathermap-ts/dist/types';
import { typeNameToTileBackground } from '../../api/WeatherUtils';
import { FetchResult, InfoFetcher } from '../utils/InfoFetcher';
import { TileButtons, ButtonBehaviour } from './impl/TileButtons';

export function isValidCurrentResponse(data: CurrentResponse | any): boolean {
    if (data) {
        const cur = data as CurrentResponse;
        return cur && cur.cod === 200;
    }
    return false;
}

export interface LiveTileProps {
    query: WeatherQuery;
    buttonBehaviour?: ButtonBehaviour;
}

export const LiveTile = (props: LiveTileProps) => {
    const [results, setResults] = useState<FetchResult>({});
    const [iteration, setIteration] = useState(0);
    const [bgTheme, setBgTheme] = useState<TileBackground>(TileBackground.Unknown);

    function parseWeatherType(data: any) {
        const cur = data as CurrentResponse;
        return cur.weather?.[0].main !== undefined ? cur.weather[0].main : 'Unknown';
    }

    useEffect(() => {
        if (results.data) {
            const bg = typeNameToTileBackground(parseWeatherType(results.data));
            setBgTheme(bg);
        }
    }, [results]);

    function generateQueryKey() {
        return `live-info${getQueryKey(props.query)}-${iteration}`;
    }

    function handleRefresh() {
        setResults({ isLoading: true, error: undefined, data: undefined });
        setIteration(iteration + 1);
    }

    function did404(data: any) {
        const res = data as CurrentResponse;
        return res?.cod == 404;
    }

    function getInnerContent() {
        if (isValidCurrentResponse(results.data)) {
            return <LiveTileInfo info={results.data as CurrentResponse} />;
        } else if (results.error) {
            return (
                <div>
                    <ErrorCircleFilled />
                    <p>{'Could not load weather info!'}</p>
                    {results.error ? <p>JSON.stringify(status.error)</p> : <></>}
                </div>
            );
        } else if (results.isLoading) {
            return <ThreeDots />;
        } else if (did404(results.data)) {
            return <p>Could not find {weatherQueryToString(props.query)}</p>;
        } else {
            return <p>{JSON.stringify(results.data)}</p>;
        }
    }

    const behaviour: ButtonBehaviour = {
        onRefresh: () => {
            handleRefresh();
            props.buttonBehaviour?.onRefresh?.();
        },
        onEdit: props.buttonBehaviour?.onEdit,
        onRemove: props.buttonBehaviour?.onRemove,
    };

    return (
        <TileContainer type={bgTheme}>
            <InfoFetcher queryKey={generateQueryKey()} fetchCall={() => searchWeather(props.query!)} onStatusChanged={setResults} />
            <TileButtons className="scale-0 group-hover:scale-100 transition-all" behaviour={behaviour} />
            {getInnerContent()}
        </TileContainer>
    );
};
