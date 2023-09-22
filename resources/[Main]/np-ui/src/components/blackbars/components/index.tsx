import React from 'react';
import './index.css'
import { useRecoilState } from 'recoil';
import { 
    blackbarsEnabledState, 
    blackbarsValueState
} from '../../../../src/store';
import { Grid } from '@mui/material';
import useStyles from './index.styles';

const BlackBars: React.FC = () => {
    const classes = useStyles();
    const [blackbarsEnabled, setBlackbarsEnabled] = useRecoilState(blackbarsEnabledState)
    const [blackbarsValue, setBlackbarsValue] = useRecoilState(blackbarsValueState)

    return (
        <>
            <Grid container className={classes.root} style={{ display: blackbarsEnabled ? '' : 'none', zIndex: 1000000 }}>
                <div style={{ display: 'flex', width: '100vw', height: '100vh', position: 'absolute', left: '0px', top: '0px', flexDirection: 'column' }}>
                    <div style={{ backgroundColor: 'black', height: `${Number(blackbarsValue) >= 40 ? '40vh' : `${blackbarsValue}vh`}`, width: '100vw' }}></div>
                    <div style={{ flex: '1 1 0%', width: '100vw', height: '100%' }}></div>
                    <div style={{ backgroundColor: 'black', height: `${Number(blackbarsValue) >= 40 ? '40vh' : `${blackbarsValue}vh`}`, width: '100vw' }}></div>
                </div>
            </Grid>
        </>
    );
}

export default BlackBars;