import { ReactNode } from "react";
import { WeatherType } from "./WeatherAbstractor";

const Gradients = {
    [WeatherType.Sunny]: `rounded-2xl bg-gradient-to-t from-sky-400 to-sky-300`,
    [WeatherType.Clouds]: `rounded-2xl bg-gradient-to-t from-gray-400 to-gray-300`,
    [WeatherType.Unknown]: `rounded-2xl bg-gradient-to-t from-gray-300 to-gray-200`,
};

const _extra = "text-white font-bold";

export const TileContainer = (props: { type?: WeatherType; builderFunc: () => ReactNode }) => {
    const actualType = props.type ? props.type : WeatherType.Unknown;
    return (
        <div className={_extra}>
            <div className={Gradients[actualType]}>{props.builderFunc()}</div>
        </div>
    );
};
