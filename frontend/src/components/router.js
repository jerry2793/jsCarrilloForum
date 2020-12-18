import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

import { fade, makeStyles } from '@material-ui/core/styles';

import HomePage from './homepage'
import AuthRoutes from './auth/routes'
import InputDemoRouter from './inputs/demo'
import Messenger from './messenger/routes'
import Courses from './courses/routes'
import Threads from './threads/routes'
import Popular from './popular/routes'
import MyPersonalPages from './myPersonalPages/routes'

import NavBar from './appBar/index'

  
export default (props) => {
    
    return (
        <div>
            <Router>
                <div>

                <NavBar />

                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/InputsDemo" component={InputDemoRouter} />
                    <Route path="/accounts" component={AuthRoutes} />
                    <Route path="/messenger" component={Messenger} />
                    <Route path="/courses" component={Courses} />
                    <Route path="/threads" component={Threads} />
                    <Route path="/popular" component={Popular} />
                    <Route path="/my" component={MyPersonalPages} />
                </Switch>

                </div>
            </Router>
        </div>
    )
}