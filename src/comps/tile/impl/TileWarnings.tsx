import React from 'react';
import { LiveWeather } from '../../../api/ext';
import { Info32Filled } from '@fluentui/react-icons';

export function TileWarnings(props: { info: LiveWeather }) {
    return (
        <div className="absolute bottom-5 left-5">
            <Info32Filled/>
        </div>
    );
}
