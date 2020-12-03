import react from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import InputDemoRouter from './inputs/demo'


export default (props) => {
    return (
        <div>
            <Router>
                <div>

                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/InputsDemo">Inputs Demo</Link></li>
                </ul>

                <Switch>
                    <Route path="/" component={props.homepage} />
                    <Route path="/InputsDemo" component={InputDemoRouter} />
                </Switch>

                </div>
            </Router>
        </div>
    )
}