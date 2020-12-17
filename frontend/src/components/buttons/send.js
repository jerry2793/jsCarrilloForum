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
    const classes = useStyles();

    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const handleClick = (e) => {
        setLoading(true)
        setDisabled(true)
        // setTimeout(() => {}, 200000)
        console.log(setError)
        props.onClick(e, setError)
        setLoading(false)
        if (!props.sendOnce) setDisabled(false)
    }

    return (<div style={{
      marginTop: '20px',
      marginBottom: '50px'
    }}>
        <Button 
        onClick={e => handleClick(e)}
        disabled={disabled}
        disableRipple
        fullWidth
        size='large'
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
      >
        {loading? 'Sending': props.children || 'Send'}
      </Button>
      <div>
        <strong><small style={{color: 'red'}}>{error? error:''}</small></strong>
      </div>
    </div>)
}


 function IconLabelButtons() {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
      >
        Send
      </Button>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button>
      <Button
        variant="contained"
        disabled
        color="secondary"
        className={classes.button}
        startIcon={<KeyboardVoiceIcon />}
      >
        Talk
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
    </div>
  );
}
