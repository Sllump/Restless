import React, {useState, useEffect, useRef} from 'react'
import TextField from '@mui/material/TextField';
import BTN1 from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from "@material-ui/styles";
import { useRecoilState } from 'recoil';
import { 
  fontWhiteLaptopState, 
} from '../../../../store';

const STATIC_PRESET_BACKGROUNDS = [
  { name: "nopixel", url: "https://i.imgur.com/EEwTSk1.jpg" },
  { name: "Yung", url: "https://cdna.artstation.com/p/assets/images/images/026/919/896/large/mikhail-sharov-cyberpunk-1-1080.jpg" },
  { name: "Dirft", url: "https://cdna.artstation.com/p/assets/images/images/009/272/408/large/mikhail-sharov-2-4k.jpg" },
  { name: "GTR", url: "https://cdnb.artstation.com/p/assets/images/images/029/958/761/large/mikhail-sharov-vulcar-hachura-r-1440-3.jpg" },
  { name: "AMG", url: "https://cdna.artstation.com/p/assets/images/images/009/420/080/large/mikhail-sharov-r32-1080.jpg" },
  { name: "R34", url: "https://cdna.artstation.com/p/assets/images/images/020/247/914/large/mikhail-sharov-hellfire2-2k.jpg" },
  { name: "Lambo", url: "https://cdna.artstation.com/p/assets/images/images/021/250/100/large/mikhail-sharov-enus-paragon.jpg" },
  { name: "R342", url: "https://cdnb.artstation.com/p/assets/images/images/033/394/951/large/mikhail-sharov-1-2k-jpg.jpg" },
  { name: "MCLAREN", url: "https://cdnb.artstation.com/p/assets/images/images/011/247/167/large/mikhail-sharov-bmwf82-roller-1080-3.jpg" },
  { name: "bmw", url: "https://cdnb.artstation.com/p/assets/images/images/025/616/407/large/mikhail-sharov-r35-1080-4.jpg" },
  { name: "MCLAREN2", url: "https://cdna.artstation.com/p/assets/images/images/039/837/400/large/mikhail-sharov-jester-ls-meet2-v1-2k.jpg" },
  { name: "carrito", url: "https://imgur.com/WYtC6YK.jpg" },
]

const Settings = ({counter, setCounter, setWallpaper}: any) => {

    const ref: any = useRef()
    const ref2: any = useRef()
    const [Pop, setPop] = useState(() => (JSON.parse(localStorage.getItem("popaudio")) || {pop: true}));
    const [fontWhite, setfontWhite] = useRecoilState(fontWhiteLaptopState);
    const [imputValue, setimputValue] = useState("")
    const [OpenDefaultWallpaper, setOpenDefaultWallpaper] = useState(false)

    const SaveSettings = () => {
        //setCounter(false);
        //working on it when fivem is ready
    }

    const handleInputChange = (e: any) => {
        setimputValue(e.target.value)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (imputValue.trim().length > 10){
            setWallpaper(imputValue);
        }
    }

    const OpenPresets = () => {
        setCounter(false);
        setOpenDefaultWallpaper(true);
    }

    useEffect(() => {
      localStorage.setItem("popaudio", JSON.stringify(Pop));
    }, [Pop]);

    const handleChange = (event) => {
      setPop({pop: event.target.checked});
    };

    const WhiteFontChange = (event) => {
      setfontWhite(event.target.checked);
    };
    
    useEffect(() => {
        const checkIfClickedOutside = (e) => {
          if (counter && ref.current && !ref.current.contains(e.target)) {
            setCounter(false);
          }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [counter, setCounter])

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
          if (OpenDefaultWallpaper && ref2.current && !ref2.current.contains(e.target)) {
            setOpenDefaultWallpaper(false);
          }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [OpenDefaultWallpaper, setOpenDefaultWallpaper])

    const useStyles = makeStyles({
        root: {
          "& .MuiInput-underline:after": {
            borderBottomColor: "grey"
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: "grey"
          },
          "& .MuiInput-underline:hover:not(.Mui-focused):before": {
            borderBottomColor: "grey"
          },
          '& .MuiInputBase-root': {
            color: 'grey',
        },
          
        },
    });

    const classes = useStyles();

    return (   
        <div>
            <Slide direction="left" in={counter} mountOnEnter unmountOnExit timeout={250}>
                <div className='settingsContainer' ref={ref}>
                    <div className="texto settings-text">Settings</div>
                    <div className='inputContainer'>
                      <form onSubmit={handleSubmit } autoComplete="off">
                        <TextField
                            // className="textfix"
                            id="input-with-icon-textfield"
                            label="Enter Background (16:9)"
                            // classes={classes}
                            sx={{
                              width:'95%',
                              marginLeft:'2.5%',
                              "& .MuiInput-root": {
                                  color: "white !important",
                              },
                              "& label.Mui-focused": {
                                  color: "darkgray !important"
                              },
                              "& Mui-focused": {
                                  color: "darkgray !important"
                              },
                              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                  borderColor: "white !important"
                              },
                              "& .MuiInput-underline:before": {
                                  borderColor: "darkgray !important",
                                  color: "darkgray !important"
                              },
                              "& .MuiInput-underline:after": {
                                  borderColor: "white !important",
                                  color: "darkgray !important"
                              },
                              "& .Mui-focused:after": {
                                  color: "darkgray !important",
                              },
                              "& .MuiInputAdornment-root": {
                                  color: "darkgray !important",
                              }
                            }}
                            // InputLabelProps={{style : {color : 'white'}}} 
                            onChange={handleInputChange}
                            // key={handleInputChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                    <i className="fas fa-photo-video"></i>
                                </InputAdornment>
                              ),
                            }}
                            variant="standard"
                        />
                      </form>
                    </div>
                    <div className="btnfix">
                      <BTN1 size='small' variant="contained" component="span" sx={{bgcolor: '#1355A7', color:'white', fontSize: '0.8125rem', ':hover': { bgcolor: '#69a74f', color: 'white'}}} onClick={SaveSettings}>
                        SAVE
                      </BTN1>
                      <BTN1 size='small' variant="contained" component="span" sx={{bgcolor: '#1355A7', color:'white', fontSize: '0.8125rem', ':hover': { bgcolor: '#69a74f', color: 'white'}}} onClick={OpenPresets}>
                        PRESETS
                      </BTN1>
                    </div>
                    <div style={{display: 'flex', width: '90%', marginTop: '10px'}}>
                      <FormControlLabel control={
                      <Checkbox checked={fontWhite} onChange={WhiteFontChange} style={{ color: "#F2A365"}}/>
                      } color="primary" label={<span style={{ color: "white"}}>White Font</span>}/>
                    </div>
                    <div style={{display: 'flex', width: '90%', marginTop: '10px'}}>
                      <FormControlLabel control={
                      <Checkbox checked={Pop.pop} onChange={handleChange} style={{ color: "#F2A365"}}/>
                      } color="primary" label={<span style={{ color: "white"}}>Notification Audio</span>}/>
                    </div>
                </div>
            </Slide>
            <Slide direction="up" in={OpenDefaultWallpaper}>
                <div className='PresetsContainer' ref={ref2} style={{transition: 'all 300ms ease-in-out 0s '}}>
                    <div className="texto" style={{textAlign: 'center', fontSize: '20px'}}>Preset Backgrounds</div>
                    <div className="Presets">
                      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {STATIC_PRESET_BACKGROUNDS.map((bg, index) => (
                          <Grid item xs={2} sm={4} md={4} key={index}>
                              <div className="bgButton" onClick={() => setWallpaper(bg.url)}>
                                <div style={{background: `url(${bg.url}) 0% 0% / cover`}} className="bgcontainer"/>
                              </div>
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                </div>
            </Slide>

        </div>
    )
}

//
export default Settings
