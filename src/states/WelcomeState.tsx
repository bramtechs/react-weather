import {
    Warning28Regular,
    WarningFilled,
    WeatherPartlyCloudyDay48Regular,
    WeatherRainShowersNight48Regular,
} from '@fluentui/react-icons';
import React, { useEffect } from 'react';

export function WelcomeState() {
    const [shown, setShown] = React.useState<boolean>(false);

    useEffect(() => {
        setShown(true);
    }, []);

    return (
        <div className={shown ? 'scale-1 transition-all' : 'scale-0 transition-all'}>
            <div className="w-full flex justify-center select-none">
                <div className="text-center mt-40 bg-slate-200 rounded-lg w-2/7 p-10 opacity-70">
                    <WeatherPartlyCloudyDay48Regular />
                    <h1 className="ml-auto mr-auto w-2/3 border-black border-b-2 border-solid text-4xl mb-5 pb-2">
                        React Weather
                    </h1>
                    <h2 className="text-2xl mb-2">A slick way to receive the latest weather info.</h2>
                    <div className="p-3 border-solid border-2 border-black/20">
                        <p>This site is in heavy development so features might be broken or missing entirely.</p>
                        <p>A mobile app is planned in the future that will be released on the Play Store.</p>
                        <p className="mb-10">
                            Check out the source code on{' '}
                            <a className="text-red-400" href="https://www.github.com/bramtechs/react-weather">
                                Github
                            </a>
                            .
                        </p>

                        <p className="italic">Please let me know what you think, and have fun!</p>
                        <p className="pt-3 text-sm ">
                            Programmed with React, Typescript and Tailwind CSS. Data fetched from OpenweatherAPI.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
