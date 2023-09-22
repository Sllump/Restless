import React, { useState } from 'react';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Slider, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';

const Gopros: React.FC = () => {
  const classes = useStyles();
  const [show, setShow]: any = useState(false);
  const [switchingViews, setSwitchingViewse]: any = useState(false);
  const [dashcams, setDashcams]: any = useState([]);
  const [selectedType, setSelectedType]: any = useState('');

  return (
    <div style={{display: show ? '' : 'none'}} className={classes.goprosContainer}>
      <div className={classes.container}>
        <div className={classes.bb}></div>
        <div style={{backgroundColor: switchingViews ? 'black' : 'unset'}} className={classes.bbMiddle}>
          <div>
            <div className={classes.camChooserContent}>
              <div className={classes.camSelector}>
                <TextField id="select" variant='standard' onChange={(event)=>{setSelectedType(event.target.value)}} label="Choose POV" value={selectedType} select sx={{
                    '& .MuiInput-root': {
                      color: 'white !important',
                    },
                    '& label.Mui-focused': {
                      color: 'darkgray !important',
                    },
                    '& Mui-focused': {
                      color: 'darkgray !important',
                    },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before':
                      {
                        borderColor:
                          'white !important',
                      },
                    '& .MuiInput-underline:before':
                      {
                        borderColor:
                          'darkgray !important',
                        color:
                          'darkgray !important',
                      },
                    '& .MuiInput-underline:after': {
                      borderColor:
                        'white !important',
                      color: 'darkgray !important',
                    },
                    '& .Mui-focused:after': {
                      color: 'darkgray !important',
                    },
                    '& .MuiInputAdornment-root': {
                      color: 'darkgray !important',
                    },
                  }}>
                  {dashcams.map((data)=>{
                    <MenuItem id={data.id} value={data.id}>{data.name}</MenuItem>
                  })}
                </TextField>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.bb}></div>
      </div>
    </div>
  );
}

export default Gopros;