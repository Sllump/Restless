import React, { useState } from 'react';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Slider, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';

const Bugs: React.FC = () => {
  const classes = useStyles();
  const [show, setShow]: any = useState(false);
  const [type, setType]: any = useState('');
  const [title, setTitle]: any = useState('');
  const [description, setDescription]: any = useState('');
  const [urls, setUrls]: any = useState('');

  return (
    <div style={{display: show ? '' : 'none'}} className={classes.bugsContainer}>
      <div className={classes.container}>
        <Typography style={{color: 'white'}} variant="h6">
          Bug Report
        </Typography>
        <Typography style={{color: 'white'}} variant="h6">
          Be descriptive, succinct, and provide enough information that someone can reproduce and verify your issue.
        </Typography>
        <Typography style={{color: 'white'}} variant="h6">
          The report will be uploaded to the forums @ nopixel.net
        </Typography>
        <Typography style={{color: 'white'}} variant="h6">
          We reserve the right to close your ticket with no reply if its total dogshit.
        </Typography>
        <Typography style={{color: 'white'}} variant="h6">
          **Updated** Select a report type before submitting, please pick the category that is the best fit.
        </Typography>
        <hr />
        <div style={{textAlign: 'left', marginTop: 16}}>
          <TextField id="select" variant='standard' onChange={(event)=>{setType(event.target.value)}} label="Type" value={type} select sx={{
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
            <MenuItem id='scuff' value={'scuff'}>General Scuff</MenuItem>
            <MenuItem id='lost' value={'lost'}>Lost Item or Reward</MenuItem>
            <MenuItem id='3d' value={'3d'}>3D Models or Clothing</MenuItem>
            <MenuItem id='exploit' value={'exploit'}>Exploit</MenuItem>
          </TextField>
        </div>
        <div style={{marginTop: 16}}>
          <TextField variant='standard' onChange={(event)=>{setTitle(event.target.value)}} label="Title" value={title} sx={{
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
                }} InputProps={{startAdornment: <InputAdornment position="start"><i className="fas fa-info-circle"></i></InputAdornment>}}></TextField>

        </div>
        <div style={{textAlign: 'left', marginTop: 16}}>
          <TextField variant='standard' onChange={(event)=>{setDescription(event.target.value)}} label="Description" value={description} sx={{
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
                }} InputProps={{startAdornment: <InputAdornment position="start"><i className="fas fa-barcode"></i></InputAdornment>}}></TextField>

        </div>
        <div style={{textAlign: 'left', marginTop: 16}}>
          <TextField variant='standard' onChange={(event)=>{setUrls(event.target.value)}} label="VOD / Clip / Screenshot URLs (separated by new line) - include scrolling of F8 window if possible" value={urls} sx={{
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
                }} InputProps={{startAdornment: <InputAdornment position="start"><i className="fas fa-barcode"></i></InputAdornment>}}></TextField>

        </div>
        <div style={{marginTop: 32}}>
          <Button size="small" color="success" variant="contained">Submit</Button>
        </div>
      </div>
    </div>
  );
}

export default Bugs;