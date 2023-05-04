import { useState } from "react";
import { WeatherQuery } from "../api/WeatherTypes";
import { LiveTile } from "../comps/tile/LiveTile";
import { DynamicLiveTile } from "../comps/tile/DynamicLiveTile";

export const MainState = () => {
    const [queries, setQueries] = useState<WeatherQuery[]>([]);

    return (
        <div>
            <DynamicLiveTile/>
            {
                queries.map((q) =>
                    <LiveTile key={q.cityName} query={q}></LiveTile>
                )
            }
            <LiveTile/>
        </div>);
}