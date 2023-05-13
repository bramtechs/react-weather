import { useEffect, useState } from 'react';
import { LiveTile } from './LiveTile';
import { WeatherQuery } from '../../api/WeatherTypes';
import { TileBackground, TileContainer } from './impl/TileContainer';
import { useGeolocated } from 'react-geolocated';
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots';
import React from 'react';
import { UserSettings } from '../../storage/SettingsAbstractor';
import { ButtonBehaviour } from './impl/TileButtons';

// TODO: Abstract geolocation away into GeolocationAbstractor
export function DynamicLiveTile() {
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

    function getStatusContent() {
        let inner = <ThreeDots />;
        if (!isGeolocationAvailable) {
            inner = <p>Geolocation is unsupported!</p>;
        } else if (!isGeolocationEnabled) {
            inner = <p>Geolocation is denied!</p>;
        }
        return inner;
    }

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
        const behaviour: ButtonBehaviour = {
            onRefresh: () => alert('TODO'),
        };
        return <LiveTile query={liveQuery} onConfigured={() => alert("Dynamic tile can't be modified!")} buttonBehaviour={behaviour} />;
    } else {
        return <TileContainer type={TileBackground.Unknown}>{getStatusContent()}</TileContainer>;
    }
}
