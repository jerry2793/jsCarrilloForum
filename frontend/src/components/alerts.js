import react, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));


export const GenericAlert = props => {
    const classes = useStyles();
    const [open, setOpen] = react.useState(true);
    const [iconOpen, setIconOpen] = useState(false)

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert severity={props.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                if (!props.severity === 'danger'){
                    setOpen(false);
                }
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {props.children}
        </Alert>
      </Collapse>
      <IconButton hidden={true}
        aria-label="open"
        color="inherit"
        size="small"
        onClick={() => {
            setOpen(!open)
            setIconOpen(!iconOpen)
        }}
    >
        <KeyboardArrowDownIcon fontSize="inherit" />
    </IconButton>
      </div>)
}

export const DangerAlert = props => {
    return (<react.Fragment>

        <GenericAlert severity="danger">
            {props.children}
        </GenericAlert>
        
    </react.Fragment>)
}

export const WarningAlert = props => {
    return (<react.Fragment>

        <GenericAlert severity="warning">
            {props.children}
        </GenericAlert>
        
    </react.Fragment>)
}
