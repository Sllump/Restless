import React, { useState } from 'react';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Slider, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';

const TextPopup: React.FC = () => {
  const classes = useStyles();
  const [show, setShow]: any = useState(false);
  const [mode, setMode]: any = useState('');

  return (
    // <div style={{display: show ? '' : 'none'}} className={classes.textPopupContainer}>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          {'youtube' === mode && (
            <div className={classes.statusBox}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                
              </div>
            </div>
          )}
        </div>
      </div>
    // </div>
  );
}

export default TextPopup;