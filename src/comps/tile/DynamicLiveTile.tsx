import { useEffect, useState } from 'react';
import { LiveTile } from './LiveTile';
import { useGeolocated } from 'react-geolocated';
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots';
import { UserSettings } from '../../storage/SettingsAbstractor';
import { BackgroundTheme } from '../../gfx/BackgroundThemes';
import { TileContainer } from './impl/TileContainer';
import { WeatherLocation } from '../../api/ext';
import React from 'react';

// TODO: Abstract geolocation away into GeolocationAbstractor
export function DynamicLiveTile() {
    function getInitialQuery(): WeatherLocation | undefined {
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

    function getStatusContent() {
        let inner = <ThreeDots />;
        if (!isGeolocationAvailable) {
            inner = <p>Geolocation is unsupported!</p>;
        } else if (!isGeolocationEnabled) {
            inner = <p>Geolocation is denied!</p>;
        }
        return inner;
    }

    function handleRefresh() {
        UserSettings().lastLocation = undefined;
    }

    const [liveQuery, setLiveQuery] = useState<WeatherLocation | undefined>(getInitialQuery);
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: { enableHighAccuracy: false },
        userDecisionTimeout: 30000,
        watchPosition: true,
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
        return <LiveTile query={liveQuery} buttonBehaviour={{ onRefresh: handleRefresh }} />;
    } else {
        return <TileContainer type={BackgroundTheme.Unknown}>{getStatusContent()}</TileContainer>;
    }
}
