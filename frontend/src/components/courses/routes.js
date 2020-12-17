import { Route } from "react-router-dom"

import Home from './home'

export default ({match}) => {
    return (<>
        <Route path={match.url + '/'} component={Home} />
    </>)
}