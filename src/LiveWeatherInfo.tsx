import {CurrentResponse} from "openweathermap-ts/dist/types";

const LiveWeatherInfo = (props: { resp: CurrentResponse }) => {
    return (
        <div className="wlive">
            <h2>Live weather info</h2>
            <p>{props.resp.main.temp}</p>
        </div>
    );
};
