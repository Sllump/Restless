import React, { useState } from 'react';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { Typography } from '@mui/material';
import useStyles from './index.styles';

const NewsCam: React.FC = () => {
  const classes = useStyles();
  const [show, setShow]: any = useState(false);
  const [overlayText, setOverlayText]: any = useState('DveX Dev');

  return (
    <div style={{display: show ? '' : 'none'}} className={classes.newsCamContainer}>
      <div className={classes.container}>
        <video className={classes.video} autoPlay loop src='https://gta-assets.nopixel.net/videos/LSBN.webm'></video>
        <div className={classes.bb}></div>
        <div className={classes.bbMiddle}>
          <Typography style={{color:'white'}} variant='body1'>
            <div className={classes.overlayText}>{overlayText}</div>
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default NewsCam;