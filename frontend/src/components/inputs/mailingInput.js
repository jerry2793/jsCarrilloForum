import { useCallback, useState } from 'react'
import axios from 'axios'

import Button from '../buttons/send'
import Input from "./egfieldOutlined";

import './mailingInput.scss'


const MailingInput = props => {
    const [email, setEmail] = useState(String)

    // const handleSubmitMailAddr = 
    
    return (<div className="mailing-list-input">
    <input className="c-checkbox" type="checkbox" id="checkbox" />
        <div className="c-formContainer">
      <form className="c-form" action="http://localhost:9090/api/mailing-list/add" method="POST">
        <input value={email}
        onChange={e => {
            setEmail(e.target.value)
        }}
        className="c-form__input" 
        placeholder="E-mail" 
        type="email" 
        pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" required />
        <label className="c-form__buttonLabel" for="checkbox">
        <button onClick={e => {
                // console.log('submitted: ',email)
                if (email.split('@')[1]){
                    console.log('sending to backend')
                    const url = `/api/mailing-list/add/${email}`
                    console.log(url)
                    axios.get(url)
                        .then(response => {
                            console.log('response: ', response)
                        })
                        .catch(err => console.log('error sending email', err))
                } else {
                    console.log('invalid addr')
                }
            }}
          className="c-form__button" 
          type="button">Send</button>
        </label>
        <label className="c-form__toggle" for="checkbox" data-title="Notify me"></label>
    </form>
    </div>
    </div>)
}

export default props => {
    const [email, setEmail] = useState(String)

    return(<div style={{
        margin: '20px 10%',
        width:'80%',
        padding: '0px 20%',
        textAlign:'center'
    }}>

        <h1>Get our latest notifications!</h1>

        {/* <form class="input-group" style={{display:'block'}}> */}
        <Input label={"Subscribe Mailing List"}
                example="address@domain.com"
                onChange={useCallback(e => setEmail(e.target.value))}
                value={email}
            />
        {/* <div class="input-group-append"> */}
            
        <Button block
         onClick={(e, setError) => {
            console.log(email)
            if (email.includes('@')) {
                setError('')
                axios.get(`/api/mailing-list/add/${email}`)
                .then(response => {
                    console.log(response)
                })
            } else {
                setError("Must Have a valid email input")
            }
        }
        }>Subscribe</Button>

        {/* </div> */}
        {/* </form> */}

    </div>)
}