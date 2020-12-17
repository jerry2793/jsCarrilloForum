// login component

/*
renders the login page, just a small widget like form, 
but you can specify a background for it and put a image
but it is the designer's choice
*/

import { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import GoogleLogin from 'react-google-login';

import { Alert, Button } from  'react-bootstrap'

import Input from '../inputs/generic'

import './login.css'


const clientId = "916981270436-in4iaee07656rvnn6uo9b42vvpt7kngh.apps.googleusercontent.com"


const responseSuccessGoogle = (res) => {
    console.log(`Information sent: `, res);
    const userData = {
        tokenId: res.tokenId
    }
    axios.post("/api/accounts/signwithgoogle", userData, {
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        console.log('Got TokenId from server: ', res)
        // store the tokenId as session
        localStorage.setItem("token", res.data.token)
        // console.log(res.data.user._id)
        localStorage.setItem("userId", res.data.user._id)

        const userId = localStorage.getItem('userId');
        console.log(userId)

        // if the user is a first timer, then prompt to a setup profile page
        if (res.data.isFirstTimer === true) {
            sessionStorage.setItem("reset-pwd-msg", "Hello, thanks for registering! Time to set up your password")
            window.location = '/accounts/reset-pwd'
        }
    }).catch(err => console.log(err))
}

const responseFailureGoogle = (res) => {
    console.log(`Error: ${res}`, res);
}


const InvalidMsg = props => {
    return (<>
        <Alert variant="danger">
            <Alert.Heading>Oops, the Form is not valid! </Alert.Heading>
            <p>Please fill out <strong>{props.missingField}</strong>!</p>
        </Alert>
    </>)
}


export default props => {
    const [email, setEmail] = useState()
    const [pwd, setPwd] = useState()

    const [formValid, setFormValid] = useState(true);
    const [missingField, setMissingField] = useState();
    const emailRef = useRef(null)
    const pwdRef = useRef(null)

    useEffect(() => {
        if (emailRef.current){
            emailRef.current.focus()
        }
    })

    const handleInputChange = (e) => {
        let value = e.target.value;
        let field = e.target.name;
        if (field === 'email') {
            setEmail(value)
        } else {
            setPwd(value)
        }
        console.log(email, pwd)
    }
    return (<div className={"login-wrapper"}>
        <h1>Login Page</h1>
        <GoogleLogin className={"login-with-google-btn"}
            clientId={clientId}
            buttonText="Continue with Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseFailureGoogle}
            cookiePolicy={'single_host_origin'}
        />
        {formValid? '': <InvalidMsg missingField={missingField} />}
        <div className={"login-form-wrapper"}>
            <Input ref={emailRef}
            name={'email'} 
            label={'Email'} 
            onChange={handleInputChange}
             />
            <Input ref={pwdRef}
            name={'password'} 
            label={'Password'} 
            type={"password"} 
            onChange={handleInputChange}
             />

            <Button variant={"primary"} size={"lg"} block onClick={e => {
                // submit the form with axios here
                // check if the email, pwd is being filled out
                setFormValid(true)
                if (email && pwd) {
                    console.log(email, pwd)
                    const data = {email: email, password: pwd}
                    // send to the backend to verify
                    axios.post("/api/accounts/login", data, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(res => {
                        // make sure to change this
                        console.log(`result returned to axios: ${res}`, res)
                        if (res.err) {
                            // display the error message

                        }
                    })
                } else {
                    // focus the missing input field
                    setFormValid(false)
                    if (email) {
                        setMissingField('password')
                    } else {
                        setMissingField('email')
                    }
                }
            }}>Login</Button>
        </div>
    </div>)
}