import { AppState, AppStates } from "./App";
// TODO: only use fluentui
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

// TODO: Move tailwind css to index.css

const MenuIcon = (props: { tooltip: string; icon: ReactElement<StyledIcon> }) => {
    return (
        <li className="group menu-icon">
            <div className="m-1 invert">{props.icon}</div>
            <span className="group-hover:scale-100 menu-tooltip">{props.tooltip}</span>
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
