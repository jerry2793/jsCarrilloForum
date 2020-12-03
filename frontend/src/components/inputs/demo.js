import react from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import TextArea from './textarea';
import Input from './input';


function HandleDifferentUrlParamsToComponent (props) {
    let {componentName} = useParams();
    componentName = eval(componentName)
    return (<div>
        <componentName />
    </div>)
}

function InputDemoRouter(props) {
    let { path, url } = useRouteMatch();
    return (<div>
        <Router>
            <div>
                
                <ul>
                    <li><Link to={`${url}/Input`}>Input</Link></li>
                    <li><Link to={`${url}/TextArea`}>TextArea</Link></li>
                </ul>
                
                <Switch>
                    <Route exact_path={`${path}`}><h3>Please Select a Demo Component</h3></Route>
                    <Route path={`${path}/:componentName`} component={HandleDifferentUrlParamsToComponent} />
                </Switch>

            </div>
        </Router>
    </div>)
}

export default (props) => {
    return (<div>
        <h1>Demonstrating input widgets</h1>
        <InputDemoRouter homeScreen={this} />
    </div>)
}