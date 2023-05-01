import { ReactNode, useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";
import { BGColor, WeatherBackground } from "./gfx/TileBackground";
import { getLiveWeather } from "./WeatherAbstractor";
import { WeatherTile } from "./WeatherTile";

export const LiveInfo = (props: { city: string }) => {
    return (
        <div className="wlive">
            <div>
                <WeatherBackground
                    color={BGColor.Red}
                    builderFunc={(): ReactNode => (
                        <div>
                            <h2>Live weather info in {props.city}</h2>
                            <WeatherTile infoFunc={getLiveWeather(props.city)}></WeatherTile>
                        </div>
                    )}
                ></WeatherBackground>
            </div>
        </div>
    );
};
