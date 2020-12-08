import { Redirect } from 'react-router-dom'
import axios from 'axios';
import GoogleLogin from 'react-google-login';

const responseSuccessGoogle = (res) => {
    console.log(`Information sent: `, res);
    const userData = {
        tokenId: res.tokenId
    }
    axios.post("/auth/accounts/signupwithgoogle", userData, {
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        console.log('Got TokenId from server: ', res)
        // store the tokenId as session
        sessionStorage.setItem("token", res.data.token)
        sessionStorage.setItem("user", res.data.user)
        // if the user is a first timer, then prompt to a setup profile page
        if (res.data.isFirstTimer === true) {
            window.location = '/accounts/profile'
        }
    }).catch(err => console.log(err))
}

const responseFailureGoogle = (res) => {
    console.log(`Error: ${res}`, res);
}

export default (props) => {
    return (<div>
        <h1>Login</h1>
        {/* <button onClick={e => console.log(e)}>Sign in with Google</button> */}
        <div className={'help-text'}>
            <p>To use the "login with google" button, 
                the gmail account must be within the SRCS organization, otherwise the OAuth2 Host will fail</p>
            <p>Email addresses ending with '@srcschools.org' is fine. </p>
        </div>
        <GoogleLogin
            clientId="716519267644-madtrjpocfpeea7bqple7gcg2prn0kns.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseFailureGoogle}
            cookiePolicy={'single_host_origin'}
        />
    </div>)
}