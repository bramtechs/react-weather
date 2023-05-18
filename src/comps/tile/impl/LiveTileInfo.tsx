import React from 'react';
import { capitalizeFirst, formatTemp } from '../../../api/WeatherUtils';
import { LiveWeather } from '../../../api/ext';

export const LiveTileInfo = (props: { info: LiveWeather }) => {
    const cityName = props.info.name;
    const temp = formatTemp(props.info.main.temp);
    const desc = props.info.weather[0].description;

    return (
        <div className="h-full flex flex-col justify-center">
            <h3>{cityName}</h3>
            <span>{temp}</span>
            <p>{capitalizeFirst(desc)}</p>
        </div>
    );
};
