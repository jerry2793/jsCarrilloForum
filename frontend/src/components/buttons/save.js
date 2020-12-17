import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));


export default props => {
    const [err, setError] = useState(String)
    const classes = useStyles();
    
    const handleClick = e => {
        props.onClick(e, setError)
    }
    
    return (<div>
        <Button onClick={e => handleClick}
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        fullWidth={props.fullWidth}
      >
        {props.label? props.label: 'save'}
      </Button>
      <small style={{color: 'red'}}>{err}</small>
    </div>)
}