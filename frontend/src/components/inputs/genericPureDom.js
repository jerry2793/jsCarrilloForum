import './genericPureDom.scss'


export default props => {
    return (<div>
    <div className="form__group field">
        <input onChange={e => props.onChange(e)} 
        type={props.type? props.type:"text"} 
        ref={props.ref}
        className="form__field" 
        placeholder={props.label} 
        name={props.name? props.name:"name"} 
        id='name' 
         />
        <label for="name" className="form__label">{props.label}</label>
    </div>
    </div>)
}