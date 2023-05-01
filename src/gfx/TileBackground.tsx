import { ReactNode } from "react";

export const WeatherBackground = (props: { builderFunc: () => ReactNode }) => {
    return (
        <div style={{ background: "darkred" }} className="background">
            {props.builderFunc()}
        </div>
    );
};
