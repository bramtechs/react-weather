import React from 'react';
import { TileContainer } from './impl/TileContainer';
import { BackgroundTheme } from '../../gfx/BackgroundThemes';

// TODO: Abstract geolocation away into GeolocationAbstractor
export function DynamicLiveTile() {
    return (
        <TileContainer type={BackgroundTheme.Unknown}>
            <div>REIMPLEMENTING</div>
        </TileContainer>
    );
}
