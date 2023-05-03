import { AppState, AppStates } from "./App";
import { StyledIcon } from "@styled-icons/styled-icon";
import { ReactElement } from "react";
import { StyledIconBase } from "@styled-icons/styled-icon";
import styled from "styled-components";
import { Settings } from "styled-icons/fluentui-system-filled";
import { Home } from "styled-icons/entypo";

type StateIcons = {
    [key in AppState]: ReactElement<StyledIcon>;
};

export const IconStyleWrapper = styled.div`
    ${StyledIconBase} {
        color: red;
    }
`;

const _icons: StateIcons = {
    Main: <Home />,
    Settings: <Settings />,
};

const MenuIcon = (props: { tooltip: string; icon: ReactElement<StyledIcon> }) => {
    return (
        <li className="group relative m-1 bg-blue-500 rounded-xl hover:rounded shadow-md transition-all">
            <div className="m-1 invert">{props.icon}</div>
            <span className="scale-0 group-hover:scale-100 absolute left-16 top-1 text-left bg-blue-900 text-white p-1 pl-2 pr-2 rounded-lg shadow-md transition-all">{props.tooltip}</span>
        </li>
    );
};

export const MenuBar = (props: { curState: AppState }) => {
    return (
        <ul className="fixed top-0 left-0 h-screen w-14 flex flex-col bg-blue-900">
            {AppStates.map((state) => (
                <MenuIcon tooltip={state} key={state} icon={_icons[state]} />
            ))}
        </ul>
    );
};
