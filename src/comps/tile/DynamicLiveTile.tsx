import { useEffect, useState } from "react";
import { LiveTile } from "./LiveTile"
import { WeatherQuery } from "../../api/WeatherTypes";
import { TileBackground, TileContainer } from "./impl/TileContainer";
import { useGeolocated } from "react-geolocated";
import ThreeDots from "react-loading-icons/dist/esm/components/three-dots";

export const DynamicLiveTile = () => {
    const [liveQuery, setLiveQuery] = useState<WeatherQuery>();
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({ positionOptions: { enableHighAccuracy: false }, userDecisionTimeout: 5000 });

    useEffect(() => {
        if (coords) {
            setLiveQuery({
                coords: {
                    lat: coords.latitude,
                    lon: coords.longitude,
                }
            })
        }
    }, [coords])

    if (coords && liveQuery) {
        return (<LiveTile query={liveQuery} />);
    }

    let inner;
    if (!isGeolocationAvailable) {
        inner = <p>Geolocation is unsupported!</p>
    } else if (!isGeolocationEnabled) {
        inner = <p>Geolocation is denied!</p>
    } else {
        inner = <ThreeDots />;
    }

    return (
        <TileContainer type={TileBackground.Unknown}>
            {inner}
        </TileContainer>
    );
}