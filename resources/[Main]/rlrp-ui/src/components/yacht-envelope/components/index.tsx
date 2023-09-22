import React, { useState } from 'react';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Slider, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';

const YachtEnvelope: React.FC = () => {
  const classes = useStyles();
  const [show, setShow]: any = useState(false);
  const [clueIcon, setClueIcon]: any = useState('times-circle');
  const [secondaryIcon, setSecondaryIcon]: any = useState('minus-circle');
  const [icon, setIcon]: any = useState('pause-circle');
  const [opened, setOpened]: any = useState(false);
  const [gameFailed, setGameFailed]: any = useState(false);
  const [textOnly, setTextOnly]: any = useState(false);
  const [value, setValue]: any = useState('32, 34, 22');

  return (
    <div style={{display: show ? '' : 'none'}} className={classes.yachtEnvelopeContainer}>
        <div className={classes.wrapper}>
        {!textOnly && !opened && (
          <>
            <div className={classes.clueIcon}>
              <i style={{color: 'white'}} className={'fas fa-'+clueIcon+' fa-fw fa-4x'}></i>
              <i style={{color: 'white'}} className={'fas fa-'+icon+' fa-fw fa-4x'}></i>
              {!!secondaryIcon && (<i style={{color: 'white'}} className={'fas fa-'+secondaryIcon+' fa-fw fa-4x'}></i>)}
            </div>
            <div className={classes.openButton}>
              <Button size="small" color="success" variant="contained">Open</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default YachtEnvelope;