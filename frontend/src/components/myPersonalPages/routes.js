// url root: /my

import { Route } from "react-router-dom"
import ProtectedRoute from '../protectedRoute'

import Home from './home'
import Courses from './courses'
import Threads from './threads'

export default ({match}) => {
    return (<>
        <Route path={match.url + '/'} component={Home} />
        <ProtectedRoute path={match.url + '/courses'} component={Courses} />
        <ProtectedRoute path={match.url + '/threads'} component={Threads} />
    </>)
}