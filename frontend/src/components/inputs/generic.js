import { TextField } from '@material-ui/core';


export default props => {
    return (<div style={{
        margin: '20px'
    }}>
        <TextField onChange={e => props.onChange(e)}
        id='outlined-basic'
        fullWidth
        {...props.required}
        variant="outlined"
        label={props.label}
        type={props.type}
        placeholder={props.label}
        />
    </div>)
}