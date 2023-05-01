import { ReactNode } from "react";

export enum BGColor { // yikes
    Red = `bg-gradient-to-t from-red-200 to-red-50`,
    Blue = "bg-gradient-to-t from-blue-200 to-blue-50",
    Yellow = `bg-gradient-to-t from-yellow-200 to-yellow-50`,
    Green = `bg-gradient-to-t from-green-200 to-green-50`,
    Gray = `bg-gradient-to-t from-gray-200 to-gray-50`,
}

export const WeatherBackground = (props: { color?: BGColor; builderFunc: () => ReactNode }) => {
    return <div className={props.color ? props.color : BGColor.Gray}>{props.builderFunc()}</div>;
};
