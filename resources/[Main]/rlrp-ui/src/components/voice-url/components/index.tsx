import React, { useState } from 'react';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Slider, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';

const VoiceURL: React.FC = () => {
  const classes = useStyles();
  const [show, setShow]: any = useState(false);
  const [copied, setcopied]: any = useState(false);

  return (
    <div style={{display: show ? '' : 'none'}} className={classes.voiceURLContainer}>
      <div style={{opacity: copied ? '0' : '1'}} className={classes.wrapper}>
       {!copied && (
        <Typography style={{color: 'white'}} variant="body1">
          Your Voice URL: <i style={{color: 'white'}} className='fas fa-copy fa-fw fa-lg'></i>
        </Typography>
       )}
    </div>
    </div>
  );
}

export default VoiceURL;