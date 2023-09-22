import React, {useState} from "react"
import useStyles from './index.styles';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";


function MinigameNumbers(){
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [gameFinishedEndpoint, setGameFinishedEndpoint] = useState('rlrp-ui:heistsMinigameNumbersEndpoint');
    const [gameFinished, setGameFinished] = useState(false);
    const [gameTimeoutDuration, setGameTimeoutDuration] = useState(20000);
    const [gameWon, setGameWon] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [numberOfDigits, setNumberOfDigits] = useState(12);
    const [requiredPassword, setRequiredPassword] = useState('1512515216');
    const [introShown, setIntroShown] = useState(false);
    
    return (
        <div style={{display: show ? '' : 'none'}} className={classes.minigameNumbersContainer}>
            <div className={classes.container}>
                {!gameFinished && !introShown && (
                    <div className={classes.introBox}>
                        <i style={{color: 'white', marginBottom: '3vh', fontSize:'6vh'}} className='fas fa-user-secret fa-fw fa-4x'></i>
                        <Typography style={{color: 'white', fontSize:'1.5vh'}} variant="body1">
                            Input password as shown
                        </Typography>
                    </div>
                )}
                {!gameFinished && !passwordShown && introShown && (
                    <div className={classes.introBox}>
                        <Typography style={{color: 'white', fontSize: '5vh'}} variant="h3">
                            {requiredPassword}
                        </Typography>
                    </div>
                )}
                {!gameFinished && passwordShown && introShown && (
                    <div style={{width:'50%', marginLeft:'25%'}} className={classes.introBox}>
                        <TextField
                            autoFocus
                            variant="standard"
                            label='Password'
                            type="number"
                            InputProps={{startAdornment: <InputAdornment position="start"><i className="fas fa-user-secret"></i></InputAdornment>}}
                            sx={{'& .MuiInput-root': {color: 'white !important',},'& label.Mui-focused': {color: 'darkgray !important',},'& Mui-focused': {color: 'darkgray !important',},'& .MuiInput-underline:hover:not(.Mui-disabled):before':{    borderColor:    'white !important',},'& .MuiInput-underline:before':{    borderColor:    'darkgray !important',    color:    'darkgray !important',},'& .MuiInput-underline:after': {borderColor:    'white !important',color: 'darkgray !important',},'& .Mui-focused:after': {color: 'darkgray !important',},'& .MuiInputAdornment-root': {color: 'darkgray !important',},}}
                        />
                    </div>
                )}
                {gameFinished && (
                    <div className={classes.introBox}>
                        <i style={{color: 'white', marginBottom: '3vh', fontSize:'6vh'}} className='fas fa-user-secret fa-fw fa-4x'></i>
                        <Typography style={{color: 'white', fontSize:'1.5vh'}} variant="body1">
                            Password Input {gameWon ? 'Complete' : 'Failed'} 
                        </Typography>
                    </div>
                )}
            </div>
        </div>
    );
}


export default MinigameNumbers