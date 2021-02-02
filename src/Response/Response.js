import React from 'react';
import './Response.css';

const Response = ({ response, onClick, iscolor }) => (
    <button className={iscolor} onClick={() => onClick(response)}>
        {response}
    </button >
)

export default Response