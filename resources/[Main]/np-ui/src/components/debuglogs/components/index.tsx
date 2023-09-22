import React, { useState } from 'react';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Slider, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';

const TextPopup: React.FC = () => {
  const classes = useStyles();
  const [show, setShow]: any = useState(false);
  const [text, setText]: any = useState('');

  return (
    <div style={{display: show ? '' : 'none'}} className={classes.textPopupContainer}>
      <div className={classes.wrapper}>
        <div className={classes.inputs}>
          <pre className={classes.text}>{text}</pre> 
        </div>
        <div className={classes.button}>
          <Button size="small" color="success" variant="contained">Copy</Button>
        </div>
      </div>
    </div>
  );
}

export default TextPopup;