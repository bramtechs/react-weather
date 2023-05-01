import { ReactNode, useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";
import { WeatherType, WeatherInfo } from "./api/WeatherAbstractor";

const Gradients = {
    [WeatherType.Sunny]: `rounded-2xl bg-gradient-to-t from-sky-400 to-sky-300`,
    [WeatherType.Clouds]: `rounded-2xl bg-gradient-to-t from-gray-400 to-gray-300`,
    [WeatherType.Unknown]: `rounded-2xl bg-gradient-to-t from-gray-300 to-gray-200`,
};

const _extra = "text-white font-bold";

export const TileContainer = (props: { retriever: Promise<WeatherInfo>; builder: (info: WeatherInfo) => ReactNode }) => {
    const [info, setInfo] = useState<WeatherInfo | null>();

    useEffect(() => {
        async function fetchWeather() {
            setInfo(await props.retriever);
        }
        fetchWeather();
    }, [props.retriever]);

    const type: [WeatherType, string] = info ? info.weather : [WeatherType.Unknown, "Unknown"];
    return (
        <div className={_extra}>
            <div className={Gradients[type[0]]}>{info ? props.builder(info) : <LoadingIcons.ThreeDots />}</div>
        </div>
    );
};
