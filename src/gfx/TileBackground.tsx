import { ReactNode } from "react";

export enum BGColor {
    Red,
    Blue,
    Yellow,
    Green,
    Gray,
}

const softest = 100;
const hardest = 300;

const BGColorValues = { // yikes
    [BGColor.Red]: `bg-gradient-to-t from-red-${hardest} to-red-${softest}`,
    [BGColor.Blue]: `bg-gradient-to-t from-blue-${hardest} to-blue-${softest}`,
    [BGColor.Yellow]: `bg-gradient-to-t from-yellow-${hardest} to-yellow-${softest}`,
    [BGColor.Green]: `bg-gradient-to-t from-green-${hardest} to-green-${softest}`,
    [BGColor.Gray]: `bg-gradient-to-t from-gray-${hardest} to-gray-${softest}`,
};

export const WeatherBackground = (props: { color?: BGColor; builderFunc: () => ReactNode }) => {
    const trueColor = props.color ? props.color : BGColor.Gray;
    return <div className={BGColorValues[trueColor]}>{props.builderFunc()}</div>;
};
