// renders the profile setup or change page
// path of this component: hostname/accounts/profile

import react, { useEffect, useState } from 'react';
import axios from 'axios';

import Input from '../inputs/input'
import TextArea from '../inputs/textarea'


export default props => {
    // grab existing user data from api, let server set null too
    // axios client also need to set null of some fields are not given

    const jwt = sessionStorage.getItem('token')

    useEffect(() => {
        // only run once bc no one should change any data,
        // however, if so add another effect and debug
        // anyway, put the axios fetch here and set var: 
        // initData: to the json that was returned
        // remember to use the jwt in the header
        axios.get('/api/auth/profile', {headers: {token: jwt}})
            .then(data => {
                const initData = data
                console.log(data)
            })
            .catch(err => console.log('axios error: ',err))
    })
    let {data, setData} = useState(initData)
    return (<div>
        <Input label={'Your Name'} value={data.name} />
        <button onClick={e => {
            console.log(data)
        }}>Submit My New Profile! </button>
    </div>)
}