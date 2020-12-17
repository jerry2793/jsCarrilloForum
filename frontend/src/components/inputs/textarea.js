import {TextareaAutosize} from '@material-ui/core'
import { useState } from 'react'
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

import './genericPureDom.scss'


export default props => {
    const [firstTimeEdit, setFirstTimeEdit] = useState(true)
    const [msg, setMsg] = useState(String)
    const [value, setValue] = useState(String)

    return (<div><div className="form__group field">
    <TextareaAutosize onChange={e => {
        props.onChange(e)
        // the message jumps over the textarea - solved with changing css
        // setFirstTimeEdit(false)
        // if (firstTimeEdit) {
        //     setValue('\n' + e.target.value)
        // } else {
        //     setValue(e.target.value)
        // }

        setValue(e.target.value)
        
        // length check
        if (e.target.value.length < 50) {
            setMsg('Must be Longer than 50 Characters')
        } else {
            setMsg('')
        }
    }} value={value}
    type={props.type? props.type:"text"} 
    ref={props.ref}
    className="form__field" 
    placeholder={props.label} 
    name={props.name? props.name:"name"} 
    id='name' 
    rowsMin={1}
     />
    <label for="name" className="form__label">{props.label}</label>
</div>
<div className="error-msg-wrapper">
<small style={{color: 'red'}}>{msg? 
    <span><ErrorOutlineOutlinedIcon /> {msg}</span>:''}</small>
</div>
</div>)
}