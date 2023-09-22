import React, { useState, useEffect } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { useExitListener } from "../../../hooks/useExitListener";
import { fetchNui } from "../../../utils/fetchNui";
import { isEnvBrowser } from '../../../utils/misc';
import { useRecoilState } from 'recoil';
import { 
    compassStreetNamesEnabledState, 
    compassEnabledState,
    compassShowTime,
} from '../../../../src/store';

import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Slider, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';

const Compass: React.FC = () => {
    const classes = useStyles();
    const [compassEnabled, setCompassEnabled] = useRecoilState(compassEnabledState);
    const [streetNamesEnabled, setStreetNamesEnabled] = useRecoilState(compassStreetNamesEnabledState);
    const [showTime, setShowTime] = useRecoilState(compassShowTime);
    const [time, setTime] = useState('12:00');
    const [showCompass, setShowCompass] = useState(false);
    const [showRoadNames, setShowRoadNames] = useState(false);
    const [area, setArea] = useState("Pillbox Hill");
    const [street, setStreet] = useState("Pillbox Hill");
    const [direction, setDirection] = useState(0);
    useNuiEvent('uiMessage', (data) => {
        let appData = data.data
        if (data.app === "hud.compass") {
            if (appData.showCompass !== undefined) {
                setShowCompass(appData.showCompass)
            }
            if (appData.showRoadNames !== undefined) {
                setShowRoadNames(appData.showRoadNames)
            }
            if (appData.area !== undefined) {
                setArea(appData.area)
            }
            if (appData.street !== undefined) {
                setStreet(appData.street)
            }
            if (appData.heading !== undefined) {
                const heading = Number(appData.heading) + 90
                if(appData.heading === 360) {
                    setDirection(0)
                } else {
                    setDirection(-heading)
                }
            }
        }
        if(data.app === 'game') {
            if(appData.time !== undefined) {
                setTime(appData.time);
            }
        }
    })


    return (
        <>
            <Grid container className={classes.root}>
                <div className="hud.compass-app-wrapper" style={{ display: showCompass && compassEnabled ? 'flex' : 'none', position: 'absolute', top: '0px', left: '0px', width: '100vw', height: '32px', pointerEvents: 'none', placeContent: 'center', color: 'white' }}>
                    <div style={{ width: '100vw', height: '52px', display: 'flex', justifyContent: 'unset', flexDirection: 'column' }}>
                        <div style={{ width: '100vw', height: '32px', display: 'flex', justifyContent: 'center' }}>
                            <div style={{ flex: '1 1 0%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px 16px', textAlign: 'right', opacity: showRoadNames ? '1' : '0' }}>
                                <Typography style={{ textShadow: 'rgb(55, 71, 79) -1px 1px 0px, rgb(55, 71, 79) 1px 1px 0px, rgb(55, 71, 79) 1px -1px 0px, rgb(55, 71, 79) -1px -1px 0px', fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '0px', fontWeight: 600, textDecoration: 'none', fontStyle: 'normal', fontVariant: 'small-caps', textTransform: 'none', width: '100%' }} variant="body1" gutterBottom>{area}</Typography>
                            </div>

                            <div style={{ width: '180px', position: 'relative', overflow: 'hidden', backgroundImage: 'url(https://dvexdev.github.io/DveX.Images/compass.png)', backgroundRepeat: 'repeat', backgroundSize: '360px 32px', display: 'flex', justifyContent: 'center', backgroundPositionX: direction }}><img src="https://dvexdev.github.io/DveX.Images/compass-marker.png" alt="" style={{ height: '12px' }}></img></div>

                            <div style={{ flex: '1 1 0%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px 16px', textAlign: 'left', opacity: showRoadNames && streetNamesEnabled ? '1' : '0' }}>
                                <Typography style={{ textShadow: 'rgb(55, 71, 79) -1px 1px 0px, rgb(55, 71, 79) 1px 1px 0px, rgb(55, 71, 79) 1px -1px 0px, rgb(55, 71, 79) -1px -1px 0px', fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '0px', fontWeight: 600, textDecoration: 'none', fontStyle: 'normal', fontVariant: 'small-caps', textTransform: 'none', width: '100%' }} variant="body1" gutterBottom>{street}</Typography>
                            </div>
                            <div style={{position:'absolute', top:'100%', width: '100vw', height: '20px', display: 'flex', justifyContent: 'center', opacity: showTime ? '1' : '0'}}>
                                <Typography style={{ textAlign: 'center', textShadow: 'rgb(55, 71, 79) -1px 1px 0px, rgb(55, 71, 79) 1px 1px 0px, rgb(55, 71, 79) 1px -1px 0px, rgb(55, 71, 79) -1px -1px 0px', fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '0px', fontWeight: 600, textDecoration: 'none', fontStyle: 'normal', fontVariant: 'small-caps', textTransform: 'none', width: '100%' }} variant="body1" gutterBottom>{time}</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
        </>
    );
}

export default Compass;