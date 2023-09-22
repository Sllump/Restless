import React, { useState, useEffect } from 'react';
import '../../index.css';
import { fetchNui } from '../../../../../utils/fetchNui';
import { Button, Checkbox, FormControl, List, ListItemText, StepContent, Box, Stepper, Step, StepLabel, CircularProgress, Divider, ListItem, IconButton, FormControlLabel, FormGroup, Slider, FormHelperText, Grid, Tooltip, Stack, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, colors } from '@mui/material';
import useStyles from './index.styles';
import { useNuiEvent } from "../../../../../hooks/useNuiEvent";
import AppContainer from '../../components/app-container';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


const CalendarApp: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div style={{zIndex: 500}} className='app-dvex-container'>
        <div style={{ position:'absolute', padding:'0', marginTop:'2vh', marginLeft:'-20px', height:'10%'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar sx={{color:'white'}} disabled />
          </LocalizationProvider>
        </div>
        <div className={classes.actions}>
          <Button size="small" color="success" variant="contained">Create Event</Button>
          <Button size="small" color='info' variant="contained">Join Event</Button>

        </div>
      </div>
    </>
  );
}

export default CalendarApp;