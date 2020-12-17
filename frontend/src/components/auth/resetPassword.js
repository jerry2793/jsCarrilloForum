import axios from 'axios'
import { Alert, Button } from 'react-bootstrap';
import React, { useState, useEffect, useCallback } from 'react';

import Input from '../inputs/pwd'


axios.defaults.headers['authorization'] = localStorage.getItem('token')


export default props => {
    const [msg, setMsg] = useState(String)
    const [alertType, setAlertType] = useState('success')
    
    const [pwd,setPwd] = useState()
    const [validatePwd, setValidatePwd] = useState()

    useEffect(() => {
        console.log('mounted')
        if (sessionStorage.getItem("reset-pwd-msg")) {setMsg(sessionStorage.getItem("reset-pwd-msg")); sessionStorage.removeItem('reset-pwd-msg')} 
    },[])

    return (<div>
        <h1>New Password</h1>
        {/* <p>{msg}</p> */}
        {msg?<Alert variant={alertType}>{msg}</Alert>:''}
        <Input onChange={useCallback(e => setPwd(e.target.value))}
        label="New Password" type="password" />
        <Input onChange={useCallback(e => setValidatePwd(e.target.value))}
        label="Retype New Password" type="password" />
        <Button onClick={() => {
            // console.log('button clicked')
            // console.log(pwd)
            if (pwd === validatePwd) {
                const resetPostMsg = {
                    password: pwd,
                    user: localStorage.getItem("userId")
                }
                // console.log(resetPostMsg)
                axios.post('/api/accounts/update-pwd',resetPostMsg)
                    .then(res => {
                        console.log('successful')
                        sessionStorage.removeItem('reset-pwd-msg')
                        setMsg('')
                        console.log(res)
                        window.location = '/accounts/profile'
                    })
                    .catch(err => {setMsg("sorry, here is the error code: ", err); setAlertType("danger")})
            } else {
                setMsg("Passwords does not match")
                setAlertType('danger')
            }
        }}
        variant='primary' size="lg">Set New Password</Button>
    </div>)
}