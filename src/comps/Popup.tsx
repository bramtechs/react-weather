import { ReactElement, useEffect, useState } from 'react';
import { DismissRegular } from '@fluentui/react-icons';
import { StyledButton } from './StyledButton';
import React from 'react';

type PopupProps = {
    title: string;
    children: ReactElement;
    confirmText?: string;
    cancellable?: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
};

export const Popup = (props: PopupProps) => {
    const [initialized, setInit] = useState<boolean>(false);
    useEffect(() => {
        setInit(true);
    }, [initialized]);

    return (
        <div className="fixed flex flex-col justify-center left-0 top-0 w-full h-full bg-black/70 transition-all text-black">
            <div
                className={
                    initialized
                        ? 'scale-100 relative bg-gray-100 h-1/2 w-2/3 self-center transition-all'
                        : 'scale-0 relative bg-gray-100 h-1/2 w-2/3 self-center transition-all'
                }
            >
                <h3>{props.title}</h3>
                {props.children.props}
                <div className="absolute right-3 bottom-3">
                    <StyledButton onClick={props.onConfirm}>{props.confirmText || 'Confirm'}</StyledButton>
                </div>
                {props.onCancel && <DismissRegular onClick={props.onCancel} className="absolute right-3 top-3" />}
            </div>
        </div>
    );
};
