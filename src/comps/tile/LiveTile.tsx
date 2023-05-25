import React, { useEffect, useState } from 'react';
import { getLocationKey, weatherLocationToString } from '../../api/WeatherTypes';
import { TileContainer } from './impl/TileContainer';
import { LiveTileInfo } from './impl/LiveTileInfo';
import { ThreeDots } from 'react-loading-icons';
import { ErrorCircleFilled } from '@fluentui/react-icons';
import { searchWeather } from '../../api/WeatherApi';
import { FetchResult, InfoFetcher } from '../utils/InfoFetcher';
import { TileButtons, ButtonBehaviour } from './impl/TileButtons';
import { BackgroundTheme, typeNameToTileBackground } from '../../gfx/BackgroundThemes';
import { LiveWeather, WeatherLocation } from '../../api/ext';

export function isValidLiveWeather(data: LiveWeather | any): boolean {
    if (data) {
        const cur = data as LiveWeather;
        return cur && cur.cod === 200;
    }
    return false;
}

export interface LiveTileProps {
    query: WeatherLocation;
    buttonBehaviour?: ButtonBehaviour;
}

export const LiveTile = (props: LiveTileProps) => {
    const [results, setResults] = useState<FetchResult>({});
    const [iteration, setIteration] = useState(0);
    const [bgTheme, setBgTheme] = useState<BackgroundTheme>(BackgroundTheme.Unknown);

    function parseWeatherType(data: any) {
        const cur = data as LiveWeather;
        return cur.weather?.[0].main !== undefined ? cur.weather[0].main : 'Unknown';
    }

    useEffect(() => {
        if (results.data) {
            const bg = typeNameToTileBackground(parseWeatherType(results.data));
            setBgTheme(bg);
        }
    }, [results]);

    function generateQueryKey() {
        return `live-info-${getLocationKey(props.query)}-${iteration}`;
    }

    function handleRefresh() {
        setResults({ isLoading: true, error: undefined, data: undefined });
        setIteration(iteration + 1);
    }

    function did404(data: any) {
        const res = data as LiveWeather;
        return res?.cod == 404;
    }

    function getInnerContent() {
        if (isValidLiveWeather(results.data)) {
            return <LiveTileInfo info={results.data as LiveWeather} />;
        } else if (results.error) {
            return (
                <div>
                    <ErrorCircleFilled />
                    <p>{'Could not load weather info!'}</p>
                    {results.error ? <p>{JSON.stringify(results.error)}</p> : <></>}
                </div>
            );
        } else if (results.isLoading) {
            return <ThreeDots />;
        } else if (did404(results.data)) {
            return <p>Could not find {weatherLocationToString(props.query)}</p>;
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
