import { useState } from "react";
import { WeatherQuery } from "../api/WeatherTypes";
import { LiveTile } from "../comps/tile/LiveTile";
import { DynamicLiveTile } from "../comps/tile/DynamicLiveTile";
import { generateKeyFromQuery } from "../comps/utils/InfoFetcher";
import { UserSettings } from "../storage/SettingsAbstractor";

export const MainState = () => {

    const [queries, setQueries] = useState<(WeatherQuery|undefined)[]>([...UserSettings().tiles, undefined]);

    function handleTileConfigured(query: WeatherQuery, index: number){
        const copy = [...queries];
        copy[index] = query;

        if (copy[copy.length-1]){
            copy.push(undefined);
        }
        setQueries(copy);

        UserSettings((data) => data.tiles = copy.filter(c => c) as WeatherQuery[]);
    }

    return (
        <div className="flex flex-wrap justify-between">
            <DynamicLiveTile/>
            {
                queries.map((query, index) =>
                    <LiveTile key={(query && generateKeyFromQuery("live-info",query)) || "add"} query={query} onConfigured={(newQuery) => handleTileConfigured(newQuery, index)}></LiveTile>
                )
            }
        </div>);
}
