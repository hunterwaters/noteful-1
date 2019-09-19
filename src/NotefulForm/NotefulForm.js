import React from 'react';
import './NotefulForm.css';

export default function NotefulForm(props) {
    const {className, ...otherProps} = props
    return (
        <form   
            className = {['notefulForm', className].join(' ')}
            action = '#'
            {...otherProps}
        />  
    )
}