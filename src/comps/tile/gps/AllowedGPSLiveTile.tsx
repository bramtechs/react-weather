import React from 'react';
import { GPSContext, GPSContextInterface } from '../GPSLiveTile';
import { useGeolocated } from 'react-geolocated';
import LoadingIcons from 'react-loading-icons';

export function AllowedGPSLiveTile() {
    const geo = useGeolocated();
    const gps = React.useContext<GPSContextInterface | undefined>(GPSContext);

    React.useEffect(() => {
        if (geo?.coords) {
            gps?.provideQuery({
                coords: {
                    lat: geo.coords.latitude,
                    lon: geo.coords.longitude,
                },
            });
        }
    }, [geo]);

    return <LoadingIcons.TailSpin />;
}
