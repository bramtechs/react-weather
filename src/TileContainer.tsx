import {ReactElement} from "react";
import { WeatherType, WeatherInfo } from "./api/WeatherAbstractor";

const Gradients = {
    [WeatherType.Sunny]: `rounded-2xl bg-gradient-to-t from-sky-400 to-sky-300`,
    [WeatherType.Clouds]: `rounded-2xl bg-gradient-to-t from-gray-400 to-gray-300`,
    [WeatherType.Unknown]: `rounded-2xl bg-gradient-to-t from-gray-300 to-gray-200`,
};

const _extra = "text-white dark:text-black font-bold";

// Background graphic to put weather info in
export const TileContainer = (props: { children: ReactElement, type: WeatherType }) => {
    return (
        <div className={_extra}>
            <div className={Gradients[props.type]}>
                {props.children}
            </div>
        </div>
    );
};
