import React from 'react';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import { UserSettings } from '../../storage/SettingsAbstractor';
import { weatherLocationToString } from '../../api/WeatherTypes';

function getDropdownOptions() {
    const options = Object.values(UserSettings().tiles).map((query) => weatherLocationToString(query));

    let live = UserSettings().lastLocation as any;
    if (live){
        live = live.lat + ", " + live.lon;
    }else{
        live = "Live weather";
    }
    options.unshift(live);

    return options;
}

export function ForecastDropdown(props: { onSelected: (arg: Option) => void }) {
    const options = getDropdownOptions();
    return <Dropdown options={options} onChange={props.onSelected} value={options[0]} placeholder="Select an option" />;
}
