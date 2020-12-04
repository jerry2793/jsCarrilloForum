import react, {useState} from 'react';
import {withRouter} from 'react-router-dom';

import './input.css'

export default withRouter( (props) => {
    return (
        <div className={"input-wrapper"}>
            <input />
            <span className={"placeholder"}>{props.label}</span>
        </div>
    )
} )