import react, { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

import Input from '../inputs/generic'
import PwdInput from '../inputs/pwd'
import { Alert, Button } from 'react-bootstrap'


export default props => {
    const [msg, setMsg] = useState(String)
    
    const [email, setEmail] = useState(String)
    const [password, setPassword] = useState(String)
    const [passwordAgain, setPasswordAgain] = useState(String)
    const [firstName, setFirstName] = useState(String)
    const [lastName, setLastName] = useState(String)
    
    const fieldChange = e => {
        if (e) {
            const val = e.target.value
            switch(e.target.name){
                case 'email': setEmail(val)
                case 'password': setPassword(val)
                case 'password2': setPasswordAgain(val)
                case 'firstName': setFirstName(val)
                case 'lastName': setLastName(val)
        }}

        return {
            email: email,
            password:password,
            name: `${firstName} ${lastName}`
        }
    }
    
    return (<div>
        <h1>Sign Up Today!</h1>
        {msg? <Alert variant="danger">{msg}</Alert>:''}
        <Input label="Email" name="email" onChange={useCallback(e => fieldChange(e))} />
        <PwdInput label="Password" name="password" type="password" onChange={useCallback(e => fieldChange(e))} />
        <PwdInput label="Password Again" name="password2" type="password" onChange={useCallback(e => fieldChange(e))} />
        <Input label="First Name" name="firstName" onChange={useCallback(e => fieldChange(e))} />
        <Input label="Last Name" name="lastName" onChange={useCallback(e => fieldChange(e))} />
        <Button variant="primary" onClick={() => {
            let jsonData = fieldChange()
            console.log(jsonData)
            if (password === passwordAgain){
                console.log('sending request')
                axios.post('/api/accounts/signup',jsonData)
                    .then(res => {
                        localStorage.setItem('token',res.data.tokenId)
                        localStorage.setItem('userId',res.data.userId)
                        window.location = '/accounts/profile'
                    })
                    .catch(err => console.log(err))
            } else {
                console.log('pwd not match')
                setMsg("Passwords do not match... ")
            }
        }}>Sign Up</Button>
    </div>)
}