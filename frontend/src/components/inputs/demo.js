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
    const componentNames = {
        'Input':Input,
        'TextArea':TextArea
    }
    // componentName = componentNames[componentName]
    return (<div>
        <componentName />
    </div>)
}

function InputDemoRouter(props) {
    let { path, url } = useRouteMatch();
    console.log(path)
    return (<div>
        <Router>
            <div>

                {/* <p>{path}, {url}</p> */}
                <ul>
                    <li><Link to={`${url}/Input`}>Input</Link></li>
                    <li><Link to={`${url}/TextArea`}>TextArea</Link></li>
                </ul>
                
                <Switch>
                    <Route exact path={`${path}`}><h3>Please Select a Demo Component</h3></Route>
                    <Route exact path={`${path}/Input`}>
                        <Input label={"Label Name"} />
                    </Route>
                    <Route exact path={`${path}/TextArea`}>
                        <TextArea label={"Label Name"} />
                    </Route>
                    {/* <Route path={`${path}/:componentName`} component={HandleDifferentUrlParamsToComponent} /> */}
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

// export default InputDemoRouter;
