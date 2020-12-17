import React from 'react';

import './egfieldOutlined.css'

// might need to upgrade to class based due to ref support
export default props => {
    return (
        <div class="page">
        <label class="field field_v1">
            <input onChange={props.onChange}
             class="field__input" placeholder={props.example? props.example:'Field Required'} />
            <span class="field__label-wrap">
            <span class="field__label">{props.label}</span>
            </span>
        </label>
        </div>
    )
}