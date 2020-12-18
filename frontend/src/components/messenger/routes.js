import { Redirect, Route } from "react-router-dom"

import ProtectedRoute from '../protectedRoute'

import Homepage from '../homepage'
import ChatRoom from './room'

export default ({match}) => {
    return (<>
        <Route exact path={match.url + '/'} component={props => <Redirect to={match.url + '/h'} />} />
        <ProtectedRoute path={match.url + '/h'} component={Homepage} />
        <ProtectedRoute path={match.url + '/chat-room'} component={ChatRoom} />
    </>)
}