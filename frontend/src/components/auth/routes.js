import react from 'react'
import axios from 'axios'

import {
    Route,
} from 'react-router-dom'

import Login from './login'
import PasswordReset from './resetPassword'
import Signup from './signup'
import Settings from './setting'


export default ({match}) => {
    // console.log(match.url)
    return (<div>
        <Route path={match.url + '/login'} component={Login} />
        <Route path={match.url + '/reset-pwd'} component={PasswordReset} />
        <Route path={match.url + '/signup'} component={Signup} />
        <Route path={match.url + '/profile'} component={Settings} />
    </div>)
}