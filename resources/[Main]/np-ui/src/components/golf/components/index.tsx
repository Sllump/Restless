import React, { useState } from 'react';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Slider, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';

const Golf: React.FC = () => {
  const classes = useStyles();
  const [show, setShow]: any = useState(false);
  const [powerBarProgress, setPowerBarProgress]: any = useState(50);

  return (
    <div style={{display: show ? '' : 'none'}} className={classes.golfContainer}>
      <div style={{visibility: show ? 'visible' : 'hidden'}} id='powerbar_container' className={classes.container}>
        <div id='powerbar_text' className={classes.text}>
          Swing Power
        </div>
        <div id='powerbar_power' style={{width: powerBarProgress+'%'}} className={classes.power}></div>
      </div>
    </div>
  );
}

export default Golf;