import { ReactNode } from "react";
import { TileContainer } from "./TileContainer";
import { getLiveWeather, WeatherType } from "./WeatherAbstractor";
import { WeatherTile } from "./WeatherTile";

export const LiveInfo = (props: { city: string }) => {
    return (
        <div className="wlive">
            <div>
                <TileContainer
                    type={WeatherType.Sunny}
                    builderFunc={(): ReactNode => (
                        <div>
                            <h2>Live weather</h2>
                            <h3>{props.city}</h3>
                            <WeatherTile infoFunc={getLiveWeather(props.city)}></WeatherTile>
                        </div>
                    )}
                ></TileContainer>
            </div>
        </div>
    );
};
