import { useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";
import { WeatherType } from "./WeatherAbstractor";

export type TileInfo = {
    temp: string;
    weather: WeatherType;
};

export const WeatherTile = (props: { infoFunc: Promise<TileInfo> }) => {
    const [info, setInfo] = useState<TileInfo | null>();

    useEffect(() => {
        async function fetchWeather() {
            setInfo(await props.infoFunc);
        }
        fetchWeather();
    }, [props.infoFunc]);

    return info ? (
        <div className="wtile">
            <span>{info.temp}</span>
            <p>{info.weather}</p>
        </div>
    ) : (
        <LoadingIcons.ThreeDots />
    );
};
