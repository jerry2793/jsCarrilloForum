import { Redirect, Route, withRouter } from "react-router-dom"

import ProtectedRoute from '../protectedRoute'

import Home from './home'
import Detail from './detail'
import Add from './add'


export default ({match}) => {
    return (<>
        <Route exact path={match.url + '/'} component={props => <Redirect to={match.url + '/h'} />} />
        <Route exact path={match.url + '/h'} component={Home} />
        <ProtectedRoute path={match.url + '/add'} component={Add} />
        <Route path={match.url + '/:id'} component={Detail} />
    </>)
}