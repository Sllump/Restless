import React, { useState } from 'react';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Slider, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';
import Stack from '@mui/material/Stack';


const VehicleMenu: React.FC = () => {
  const classes = useStyles();
  const [show, setShow]: any = useState(false);
  const [text, setText]: any = useState('');

  return (
    <div style={{display: show ? '' : 'none'}} className={classes.vehicleMenuContainer}>
      <Stack direction={'row'} spacing={2}>
        <div className={classes.wrapper}>
          <div className={classes.item}>
            <div className={classes.icon}>
              <i className="fa-solid fa-arrows-up-down"></i>
            </div>
            <div className={classes.status}></div>
          </div>
        </div>
        <div className={classes.wrapper}>
        </div>
        <div className={classes.wrapper}>
        </div>
      </Stack>
    </div>
  );
}

export default VehicleMenu;