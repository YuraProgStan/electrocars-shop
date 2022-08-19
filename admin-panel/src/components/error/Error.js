import React from 'react';
import './error.scss';

const Error = ({children}) => {
    return (
        <span className={'error'}>
            {children}
        </span>
    );
};

export default Error;