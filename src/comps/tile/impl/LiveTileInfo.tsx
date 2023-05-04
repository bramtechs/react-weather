import { capitalizeFirst, formatTemp, typeNameToTileBackground } from "../../../api/WeatherUtils";
import { CurrentResponse } from "openweathermap-ts/dist/types";

export const LiveTileInfo = (props: { info: CurrentResponse }) => {

    const cityName = props.info.name;
    const temp = formatTemp(props.info.main.temp);
    const desc = props.info.weather[0].description;

    // update parent tile background
    const type = typeNameToTileBackground(props.info.weather[0].main);

    return (
        <div>
            <h2>Live weather</h2>
            <h3>{cityName}</h3>
            <span>{temp}</span>
            <p>{capitalizeFirst(desc)}</p>
        </div>
    );
}