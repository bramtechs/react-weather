import { ReactNode } from "react";
import { TileContainer } from "./TileContainer";
import { getLiveWeather, WeatherInfo, WeatherQuery } from "./api/WeatherAbstractor";

export const LiveInfo = (props: { query: WeatherQuery }) => {

    return (
        <div className="wlive">
            <div>
                <TileContainer
                    retriever={getLiveWeather(props.query)}
                    builder={(info: WeatherInfo): ReactNode => (
                        <div>
                            <h2>Live weather</h2>
                            <h3>{info.city}</h3>
                            <span>{info.temp}</span>
                            <p>{info.weather[1]}</p>
                        </div>
                    )}
                ></TileContainer>
            </div>
        </div>
    );
};
