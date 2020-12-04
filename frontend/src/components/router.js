import react from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import HomePage from './homepage'
import Login from './auth/login'
import InputDemoRouter from './inputs/demo'


export default (props) => {
    return (
        <div>
            <Router>
                <div>

                <h1>Nav Bar</h1>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/InputsDemo">Inputs Demo</Link></li>
                </ul>

                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/InputsDemo" component={InputDemoRouter} />
                    <Route exact path="/login" component={Login} />
                </Switch>

                </div>
            </Router>
        </div>
    )
}