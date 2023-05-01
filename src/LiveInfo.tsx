import { ReactNode } from "react";
import { TileContainer } from "./TileContainer";
import { getLiveWeather, WeatherInfo, WeatherType } from "./api/WeatherAbstractor";

export const LiveInfo = (props: { city: string }) => {
    return (
        <div className="wlive">
            <div>
                <TileContainer
                    retriever={getLiveWeather(props.city)}
                    builder={(info: WeatherInfo): ReactNode => (
                        <div>
                            <h2>Live weather</h2>
                            <h3>{props.city}</h3>
                            <span>{info.temp}</span>
                            <p>{info.weather[1]}</p>
                        </div>
                    )}
                ></TileContainer>
            </div>
        </div>
    );
};
