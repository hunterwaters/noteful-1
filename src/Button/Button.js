import React from 'react';
import './Button.css';

export default function Button(props) {
    const {button, className, children, ...otherProps} = props;
    return React.createElement(
        props.button,
        {
            className: ['button', props.className].join(' '),
            ...otherProps
        },
        props.children
    )
}

Button.defaultProps = {
    button: 'button',
}