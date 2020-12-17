import { Route } from "react-router-dom"

import Threads from './thread'
import Courses from './courses'

export default ({match}) => {
    return (<>
        <Route path={match.url + '/courses'} component={Courses} />
        <Route path={match.url + '/threads'} component={Threads} />
    </>)
}
