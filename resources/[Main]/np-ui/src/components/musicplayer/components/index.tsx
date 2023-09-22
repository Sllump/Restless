import React, { useState } from 'react';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { Button, Checkbox, FormControl, Stack, FormControlLabel, FormGroup, Slider, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';

const MusicPlayer: React.FC = () => {
  const classes = useStyles();
  const [show, setShow]: any = useState(false);
  const [minimized, setMinimized]: any = useState(false);
  const [url, setUrl]: any = useState('https://soundcloud.com/outtotunetyrone/down-bad-outto-tune-tyrone');
  const [iframeLoaded, setiframeLoaded]: any = useState(false);
  const [title, setTitle]: any = useState('');
  const [description, setDescription]: any = useState('');

  return (
    <div style={{display: show ? '' : 'none'}} className={classes.musicPlayerContainer}>
      <div className={classes.container}>
        <div className={classes.musicPlayer}>
          <iframe 
            title='music-player' 
            src={'https://w.soundcloud.com/player/?url='+url+'&amp;color=%2300f8b9&amp;auto_play=false&amp;amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;show_teaser=false&amp;visual=false'} 
            id='soundcloud-musicplayer' 
            scrolling='no' 
            frameBorder='no' 
            allow='autoplay' 
            style={{height: minimized ? '0%' : '100%', width: minimized ? '0%' : '100%'}}
            onLoad={iframeLoaded}
          ></iframe>
          <div className={classes.controlsBlocker1}></div>
          <div className={classes.controlsBlocker2}></div>
        </div>
        <div className={classes.musicControls}>
          {!minimized && (
            <div className={classes.volume}>
              <Grid container spacing='2' style={{height: '100%'}}>

              </Grid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;