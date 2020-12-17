import './notes.css'

import Button from '../buttons/save'
import { useCallback, useState } from 'react'


/* 
notes: 
when saving clicking the save button, save to a cloud db where it is temp holders for 
the drafts, and then when they submit, post data to the actual route you want it to be
make sure the cloud deletes the instance after 7 days of not editing
*/


export default props => {
    const [msg, setMsg] = useState(String)

    // the internal container for what is entered here
    const [data,setData] = useState(String)
    
    return (<div style={{
        width: '80%',
        margin: 'auto',
        textAlign: 'center',
    }}>
        <h3>{props.label}</h3>
        <p>{props.helpText}<br/>
            Tips: <br />
            1. You can expand the input box however you want at the bottom of the widget<br />
            2. Remember to save the draft to our database, so you can access it later (auto saving is going to take a huge toll on our server)<br />
            3. The cloud will automatically delete drafts after 7 days of not editing
        </p>
        <small style={{color:'red', marginBottom: '10px'}}>{msg}</small>

        <Button fullWidth label="Save to edit later"
        onClick={useCallback((e, setError) => {
            console.log('button clicked')
            if (!data) {
                setError('Are you sure to upload nothing?')
            } 
        })} />
        
        <textarea onChange={e => {
            props.onChange(e)
            if (e.target.value.length < 100) {
                setMsg("Must be longer than 100 characters")
            }
        }}
        style={{padding: '0px 10px'}}
        rows="15" class="notes"></textarea>
    </div>)
}