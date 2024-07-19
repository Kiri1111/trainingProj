import React from 'react';

type ButtonProps = {
    title: string
    callBack: (data?: any) => void
}
export const Button = ({callBack, title}: ButtonProps) => {
    const onClickHandler = () => callBack()
    return (
        <div>
            <button onClick={onClickHandler}>{title}</button>
        </div>
    );
};

