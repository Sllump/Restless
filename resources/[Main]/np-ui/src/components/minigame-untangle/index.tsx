import React, {useEffect, useRef, useState} from "react"
import useStyles from './index.styles';
import './index.css';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";




function MinigameUntangle(){
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [gameFinishedEndpoint, setGameFinishedEndpoint] = useState('rlrp-ui:untangleMinigameResult');
    const [gameFinished, setGameFinished] = useState(false);
    const [gameTimeoutDuration, setGameTimeoutDuration] = useState(20000);
    const [gameWon, setGameWon] = useState(false);
    const [numPoints, setNumPoints] = useState(7);
    const [introShown, setIntroShown] = useState(false);
    return (
        <div style={{display: show ? '' : 'none'}} className={classes.minigameUntangleContainer}>
            <div className="minigame">
                {/* <div className="splash"><div className="fa hacker">&#xf233;</div>Firewall active... Decryption required...</div> */}
                <canvas className="untanglecanvas"></canvas>
            </div>
        </div>
    );
}


export default MinigameUntangle