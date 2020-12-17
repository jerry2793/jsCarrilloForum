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
        <Route exact path={match.url + '/login'} component={Login} />
        <Route exact path={match.url + '/reset-pwd'} component={PasswordReset} />
        <Route exact path={match.url + '/signup'} component={Signup} />
        <Route exact path={match.url + '/profile'} component={Settings} />
    </div>)
}