import { AppState, AppStates } from '../App';
import { ReactElement } from 'react';
import { HomeFilled, SettingsFilled } from '@fluentui/react-icons';
import { FluentIcon } from '@fluentui/react-icons/lib/utils/createFluentIcon';

type StateIcons = {
    [key in AppState]: ReactElement<FluentIcon>;
};

const _icons: StateIcons = {
    Main: <HomeFilled />,
    Settings: <SettingsFilled />,
};

type MenuIconProps = { isOpen?: boolean; tooltip: string; onClick: () => void; icon: ReactElement<FluentIcon> };

const MenuIcon = (props: MenuIconProps) => {
    return (
        <li
            onClick={props.onClick}
            className={
                props.isOpen
                    ? 'group relative m-2 mb-1 p-2 bg-blue-300 rounded-xl hover:rounded shadow-md transition-all text-center'
                    : 'group relative m-2 mb-1 p-2 bg-blue-500 rounded-xl hover:rounded shadow-md transition-all text-center'
            }
        >
            <div className="mb-1 invert">{props.icon}</div>
            <span className="group-hover:scale-100 scale-0 absolute left-16 top-1 text-left bg-blue-900 text-white p-1 pl-2 pr-2 rounded-lg shadow-md transition-all">
                {props.tooltip}
            </span>
        </li>
    );
};

export const MenuBar = (props: { curState: AppState; onStateChange?: (state: AppState) => void }) => {
    return (
        <ul className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-blue-900">
            {AppStates.map((state) => (
                <MenuIcon
                    key={state}
                    isOpen={state === props.curState}
                    tooltip={state}
                    onClick={() => {
                        props.onStateChange && props.onStateChange(state);
                    }}
                    icon={_icons[state]}
                />
            ))}
        </ul>
    );
};
