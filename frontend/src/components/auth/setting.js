import react, { useEffect, useState } from 'react'
import axios from 'axios'

import Input from '../inputs/generic'
import PicInput from '../inputs/picInput'


export default props => {
    let called = false;
    const [loading, setLoading] = useState(true);

    // input field states
    const [pic, setPic] = useState()
    const [signiture, setSigniture] = useState()
    const [alias, setAlias] = useState()
    const [age, setAge] = useState()
    // only if they did not set up a password
    const [pwd, setPwd] = useState(false)

    // helper functions for this component only
    const setProfile = (profile=null) => {
        // input profile object of json data, and sets the state to the current
        // if profile is not passed in, then return the current assembled json
        if (profile) {
            setPic(profile.pic)
            setAge(profile.age)
            setAlias(profile.alias)
            setSigniture(profile.signiture)
            setPwd(profile.user.password)
        }
        // assemble the fields into json and return (do not assign to var if not submit)
        return {
            pic: pic,
            age: age,
            alias: alias, 
            signiture: signiture,
            password: pwd
        }
    }
    const handleInputChange = e => {
        const name = e.target.name
        const value = e.target.value

        switch (name) {
            case 'pic': {setPic(value)}
            case 'signiture': {setSigniture(value)}
            case 'age': {setAge(value)}
            case 'alias': {setAlias(value)}
            case 'pwd': {setPwd(value)}
        }
        console.log({
            pic: pic,
            age: age,
            alias: alias, 
            signiture: signiture,
            password: pwd
        })
    }

    // occurs after loading, 
    useEffect(() => {
        console.log('api call')
        if (!called){
            setLoading(false)
            const userId = localStorage.getItem('userId');
            if (userId) {
                // fetch data from api
                console.log(userId)
                axios.get(`/api/accounts/profile/${userId}`)
                    .then(response => {
                        const {data} = response
                        if (data.profile) {
                            // console.log('retrieved profile')
                            // profile found, set the state! 
                            setProfile(data.profile)
                            if (data.setPwd) setPwd(true)
                        } else {
                            console.log('profile obj got empty: ',data.profile)
                        }
                    })
            } else {
                window.location = '/accounts/login'
            }
        }
        called = true
    },[loading])
    
    if (loading) {
        return (<div>
            <h1>Loading...</h1>
        </div>)
    } else {
        return (<div>
            <h1>Set up your profile</h1>
            {pwd?
            <div><h3>Note: you had not setup your password yet: </h3>
            <Input label="Password" name={"pwd"} type="password"
            onChange={handleInputChange}
             /></div>:''}
            <Input label="Alias" name={"alias"}
            onChange={handleInputChange}
             />
            <Input label="Signiture" name={"signiture"}
            onChange={handleInputChange}
             />
            <Input label="Age" name={"age"} type="number"
            onChange={handleInputChange}
             />
        </div>)
    }
}