import { useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";
import { getCurrentTemperature } from "./WeatherAbstractor";

type LiveInfo = {
    temp: number;
};

export const LiveInfo = (props: { city: string }) => {
    const [info, setInfo] = useState<LiveInfo | null>();

    useEffect(() => {
        async function fetchLiveInfo() {
            let live: LiveInfo = {
                temp: await getCurrentTemperature(props.city),
            };
            setInfo(live);
        }
        console.log("Loading live info");
        fetchLiveInfo();
    }, [props.city]);

    return (
        <div className="wlive">
            {info ? (
                <div>
                    <h2>Live weather info</h2>
                    <p>{info.temp}</p>
                </div>
            ) : (
                <LoadingIcons.BallTriangle />
            )}
        </div>
    );
};