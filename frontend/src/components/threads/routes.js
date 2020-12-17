import { Route } from "react-router-dom"

import Home from './home'
import Detail from './detail'

export default ({match}) => {
    return (<>
        <Route path={match.url + '/'} component={Home} />
        <Route path={match.url + '/:id'} component={Detail} />
    </>)
}