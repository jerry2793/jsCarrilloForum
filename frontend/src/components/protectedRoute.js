import { Redirect } from "react-router-dom"

export default props => {
    const Component = props.component
    const isAuth = localStorage.getItem('token')

    return (
        isAuth? (
            <Component />
        ) : (<Redirect to={{pathname:'/accounts/login'}} />)
    )
}