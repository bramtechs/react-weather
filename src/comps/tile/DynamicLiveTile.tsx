import { useEffect, useState } from 'react';
import { LiveTile } from './LiveTile';
import { WeatherQuery } from '../../api/WeatherTypes';
import { TileBackground, TileContainer } from './impl/TileContainer';
import { useGeolocated } from 'react-geolocated';
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots';
import React from 'react';
import { UserSettings } from '../../storage/SettingsAbstractor';

// TODO: Abstract geolocation away into GeolocationAbstractor

function getInitialQuery(): WeatherQuery | undefined {
    const loc = UserSettings().lastLocation;
    if (loc) {
        return {
            coords: {
                lat: loc.lat,
                lon: loc.lon,
            },
        };
    }
}

export const DynamicLiveTile = () => {
    const [liveQuery, setLiveQuery] = useState<WeatherQuery | undefined>(getInitialQuery);
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: { enableHighAccuracy: false },
        userDecisionTimeout: 30000,
    });

    useEffect(() => {
        if (coords) {
            setLiveQuery({
                coords: {
                    lat: coords.latitude,
                    lon: coords.longitude,
                },
            });
            UserSettings((s) => {
                s.lastLocation = { lat: coords.latitude, lon: coords.longitude };
            });
        }
    }, [coords]);

    if (liveQuery) {
        return <LiveTile query={liveQuery} onConfigured={() => alert("Dynamic tile can't be modified!")} />;
    }

    let inner = <ThreeDots />;
    if (!isGeolocationAvailable) {
        inner = <p>Geolocation is unsupported!</p>;
    } else if (!isGeolocationEnabled) {
        inner = <p>Geolocation is denied!</p>;
    }

    return <TileContainer type={TileBackground.Unknown}>{inner}</TileContainer>;
};
