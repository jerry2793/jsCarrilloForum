import react, {useState} from 'react';
import {withRouter} from 'react-router-dom';

import './input.css'

export default withRouter( (props) => {
    return (
        <div className={"input-wrapper"}>
            <input type={props.type || 'text'} />
            <span className={"placeholder"}>{props.label}</span>
        </div>
    )
} )