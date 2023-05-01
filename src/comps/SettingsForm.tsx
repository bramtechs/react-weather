import { useEffect, useState } from "react";
import { DefaultSettings } from "../storage/SettingsAbstractor";

export type DisplayedFields = {
    [key: string]: string;
};

export type FormTarget = {
    [key: string]: string | number;
};

export const SettingsForm = (props: { target: FormTarget; fields: DisplayedFields }) => {
    const [state, setState] = useState<FormTarget>(props.target);

    function onInputChanged(key: string, value: string) {
        const copy: FormTarget = {};
        Object.assign(copy, state);
        copy[key] = value;
        setState(copy);
    }

    return (
        <form>
            {Object.entries(props.fields)
                .filter((e) => props.target[e[0]])
                .map((e) => {
                    const key = e[0];
                    const displayName = e[1];
                    const value = state[key];
                    console.log(value);
                    return (
                        <div key={key}>
                            <label>
                                {displayName}
                                <input onChange={(e) => onInputChanged(key, e.target.value)} value={value} />
                            </label>
                        </div>
                    );
                })}
        </form>
    );
};
