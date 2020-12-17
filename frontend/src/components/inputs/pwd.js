import Input from './generic'
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';



export default props => {
    const sensitiveChars = '()*&^%$#@!{}[]|\\/><\'\"+=?,.'
    
    const [firstChange, setFirstChange] = useState(true)
    const [pwd, setPwd] = useState(String)
    const [error, setError] = useState(false)
    const [helperText, setHelperText] = useState(String)
    
    const testFirstLetterUpper = val => {
        if (val) {
            if (!val[0] === val[0].toUpperCase()){
                setError(true)
                setHelperText('The first letter must be Upper case')
            }
        }   
    }
    
    return (<div style={{
        margin: '20px',
    }}>
        <TextField
        name={props.name}
        label={props.label}
        placeholder="Password must be AlphaNumeric with only - and _ allowed"
        id="outlined-error-helper-text"
        fullWidth
        variant="outlined"
        {...{
                error: error,
                helperText: helperText
            }}
        type={'password'}
        // too many re-renders error with the onclick statement
        // onClick={setFirstChange(false)}
        onChange={e => {
            setFirstChange(false)
            const val = e.target.value
            // if (val === undefined) {val = 'nothing'}
            
            setPwd(val)
            props.onChange(e)

            // validate if password has sensitive characters
            for (let i=0; i<sensitiveChars.length; i++){
                let sensitiveChar = sensitiveChars[i]
                // console.log(sensitiveChar)
                if ( val.includes(sensitiveChar) ) {
                    setError(true)
                    setHelperText("Password contains sensitive characters, only numbers and letters are allowed plus - and _")
                    console.log("invalid char detected")
                    break
                } else {
                    // validate if pwd is among 8-16 characters
                    if (true) { // if it is the first time of edit, but cannot do this since it is onchange but not onclick, but onclick gives error
                        if (val.length > 7 && val.length < 17) {
                            setError(false); 
                            setHelperText('')
                            // check if password has a uppercase letter
                            testFirstLetterUpper(val)
                        } else {
                            setError(true); 
                            setHelperText('Must be 8-16 Alphanumeric Characters')
                            testFirstLetterUpper(val)
                        }
                    }
                } 
            }
        }}
        />
    </div>)
}