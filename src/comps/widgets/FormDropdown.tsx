import React from "react";


export function FormDropdown(props: { name: string; value: string; options: string[]; onChange: (choosen: string) => void; }) {
    return (
        <label className="block m-3">
            {props.name}
            <select
                className="m-5"
                defaultValue={props.value}
                onChange={(e) => {
                    props.onChange(e.target.value);
                }}
            >
                {props.options.map((o) => (
                    <option key={o}>{o}</option>
                ))}
            </select>
        </label>
    );
}
