import { Route } from "react-router-dom"

import Homepage from '../homepage'

export default ({match}) => {
    return (<>
        <Route path={match.url + '/'} component={Homepage} />
    </>)
}