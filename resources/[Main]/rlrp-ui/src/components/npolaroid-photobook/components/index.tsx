import React, { useRef, useState } from 'react';
import useStyles from './index.styles';
import { Slide, TextField, InputAdornment, Button, FormControl, Select, MenuItem, createTheme, ThemeProvider } from '@mui/material';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import HTMLFlipBook from 'react-pageflip';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const NpolaroidPhotoBook: React.FC = () => {
  const classes = useStyles();
  const ref = useRef()
  const BookRef = useRef()
  const width = window.innerWidth;
  const height = window.innerHeight;
  const WidthSize = width * 0.34;
  const HeightSize = height * 0.8;
  const [Binder, SetBinder] = useState(false);
  const [OpenPhotos, setOpenPhotos] = useState(false);
  const [PhotoInfo, SetPhotoInfo] = useState({ img: 'https://media.discordapp.net/attachments/1128134336332435576/1135690613438808085/16.png', date: 2142141241, msg: 'Test' });
  const [Text, SetText] = useState('')
  const [BDescrition, SetBDescrition] = useState(false);
  const [Esxmode, setEsxmode] = useState(false);
  const [GiveOther, setGiveOther] = useState(false);
  const [players, setplayers] = useState('');
  const [Photos, SetPhotos] = useState([])
  const [Album, SetAlbum] = useState([]);

  const NeedPrevPageButton = (number) => {
    if (number % 2 === 0) {
        return false
    } else {
        return true
    }
  }


  return (
    <>
              <Slide direction="up" in={Binder} mountOnEnter unmountOnExit>
            <div className={classes.wrapper}>
                <div className={classes.albumWrapper}>
                    <div className={classes.drawline} />
                    <div className={classes.album}>
                        <HTMLFlipBook
                width={WidthSize}
                height={HeightSize}
                showCover={true}
                clickEventForward={false}
                useMouseEvents={false}
                drawShadow={false}
                ref={BookRef} className={''} style={{}} startPage={0} size={'stretch'} minWidth={0} maxWidth={0} minHeight={0} maxHeight={0} flippingTime={0} usePortrait={false} startZIndex={0} autoSize={false} maxShadowOpacity={0} mobileScrollSupport={false} swipeDistance={0} showPageCorners={false} disableFlipByClick={false}                        >
                            {Album.map((id: any, index: any) => (
                                <div className={classes.comicPage}>
                                    <div className={classes.comicPageWrapper}>
                                        {id.part.map((data, index) => (
                                            <div className={`${Math.random() > 0.5 ? classes.photo : classes.photo2}`} key={index}>
                                                <span className={classes.date}>{data.date}</span>
                                                <div className={classes.realPhoto}>
                                                    <div className={classes.photoWrapper} style={{ backgroundImage: `URL(${data.img})` }}>
                                                    </div>
                                                    <span className={classes.photoFont}>{data.msg}</span>
                                                </div>
                                            </div>
                                        ))}
                                        <div className={classes.centerButtons}>
                                            {NeedPrevPageButton(index) && <div className={classes.centerButtonsAbs}>
                                                <Button variant="contained"
                                                    // onClick={() => { BookRef.current.pageFlip().flipPrev() }}
                                                    size="small"
                                                    sx={{ width: 'auto', height: '30px', bgcolor: '#eaa56e', color: 'black', margin: '10px 60% 10px 10px', pointerEvents: 'all', ':hover': { bgcolor: '#986c49' } }} >
                                                    {/* {langProvider.prevPage} */}
                                                </Button>
                                            </div>}
                                            {!NeedPrevPageButton(index) &&
                                                <>
                                                    <div className={classes.centerButtonsAbs}>
                                                        {/* <ThemeProvider theme={darkTheme}> */}
                                                            <FormControl variant="standard" sx={{ m: 1, width: '33%', pointerEvents: 'all' }}>
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    id="demo-simple-select-standard"
                                                                    // value={value}
                                                                    // onChange={(e) => BookRef.current.pageFlip().turnToPage(e.target.value)}
                                                                >
                                                                    {Album?.map((data, index) => (
                                                                        <MenuItem value={index} key={index}>{`Página ${index + 1}`}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        {/* </ThemeProvider> */}
                                                    </div>
                                                    <div className={classes.centerButtonsAbs}>
                                                        <Button variant="contained"
                                                            // onClick={() => { BookRef.current.pageFlip().flipNext() }}
                                                            size="small"
                                                            sx={{ width: 'auto', height: '30px', bgcolor: '#eaa56e', color: 'black', margin: '10px 10px 10px 60%', pointerEvents: 'all', ':hover': { bgcolor: '#986c49' } }} >
                                                            {/* {langProvider.nextPage} */}
                                                        </Button>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </HTMLFlipBook>
                    </div>
                </div>
                {OpenPhotos &&
                    <div className={classes.openPhoto}>
                        <span className={classes.date2}>{PhotoInfo.date}</span>
                        <div className={classes.marginPhoto} style={{ backgroundImage: `URL(${PhotoInfo.img})` }}>
                        </div>
                        {PhotoInfo.msg ?
                            <span className={classes.photoFontSize}>{PhotoInfo.msg}</span>
                            :
                            <>
                                <div className={classes.btnBottom}>
                                    {/* <Buttons variant={2} text={langProvider.addDesc} icon={'fas fa-pen-clip'} style={{ top: '-10px' }} onClick={() => { AddDesc(PhotoInfo) }} /> */}
                                </div>
                            </>
                        }
                        <div className={classes.buttons}>
                            {/* <Buttons variant={1} text={langProvider.showToOthers} icon={'fas fa-share'} onClick={() => { ShowToOther(PhotoInfo) }} /> */}
                        </div>
                    </div>
                }

                {BDescrition &&
                    <div className={classes.Screen}>
                        <div className={classes.SuperInput}>
                            <div className={classes.SuperInputFix}>
                                <TextField
                                    id="input-with-icon-textfield"
                                    label={"Write your beautiful message"}
                                    // classes={classes}
                                    // onChange={handleChangeText}
                                    InputLabelProps={{ style: { color: 'white' } }}
                                    autoComplete="off"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <i className={'fas fa-pen-clip'} style={{ color: "white", margin: '3px' }}></i>
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                />
                            </div>
                            <div className={classes.SuperBtnFix}>
                                {/* <Buttons variant={1} text={langProvider.submit} icon={'fas fa-share'} onClick={() => { HandleSubmit(PhotoInfo) }} />
                                <Buttons variant={2} text={langProvider.cancel} icon={'fas fa-xmark'} onClick={HandleCancel} /> */}
                            </div>
                        </div>
                    </div>
                }

                {GiveOther &&
                    <div className={classes.Screen}>
                        <div className={classes.SuperInput}>
                            <div className={classes.SuperInputFix}>
                                <TextField
                                    id="input-with-icon-textfield"
                                    label={"Players near : " + players}
                                    // classes={classes}
                                    // onChange={handleChangeText}
                                    InputLabelProps={{ style: { color: 'white' } }}
                                    autoComplete="off"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <i className={'fas fa-pen-clip'} style={{ color: "white", margin: '3px' }}></i>
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                />
                            </div>
                            <div className={classes.SuperBtnFix}>
                                {/* <Buttons variant={1} text={langProvider.submit} icon={'fas fa-share'} onClick={() => { HandleSubmitESX(PhotoInfo) }} />
                                <Buttons variant={2} text={langProvider.cancel} icon={'fas fa-xmark'} onClick={HandleCancel} /> */}
                            </div>
                        </div>
                    </div>

                }
            </div>
        </Slide>

    </>
  );
}

export default NpolaroidPhotoBook;