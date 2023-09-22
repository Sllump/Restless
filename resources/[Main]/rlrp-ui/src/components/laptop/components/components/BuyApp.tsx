import React, {useRef, useState, useEffect} from 'react'
import Draggable from 'react-draggable'
import {TextField, InputAdornment, Button} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { fetchNui } from '../../../../utils/fetchNui'

const BuyApp = ({counter, setCounter}) => {
  const [EnableApp, setEnableApp]: any = useState(true)
  const [FinancePage, setFinancePage]: any = useState({open: false, page: 'https://google.com', id: 'google'})
  const [imputValue, setimputValue]: any = useState("")
  const [Gne, setGne]: any = useState(0)
  const [GlobalGne, setGlobalGne]: any = useState(0)
  
  const CloseBuyApp = () => {
    setCounter(false);
  }

  const Provider = (data) => {
    if (data.action === "UpdateValueUI") {
      if (data.app === "SetBoostingLevel") {
        setGne(data.data.gne)
      } else if (data.app === "UpdateGnes"){
        setGlobalGne(data.data.gne)
      } else if (data.app === "EnableApps") {
        setEnableApp(data.data.BuyApp)
      }
    }
  }

  const handleInputChange = (e) => {
    setimputValue(e.target.value)
  }

  const handleSubmit = () => {
    if (imputValue !== "") {
      if (GlobalGne > imputValue || Gne === imputValue) {
        fetchNui('rlrp-purchaseGNE', {imputValue})
        setimputValue('')
      }
    }
  }

  useEffect(() => {
      const EventListener = (event) => {
          if (event.data) {
            Provider(event.data)
          }
      }
      window.addEventListener("message", EventListener)
  }, [])

  const OpenFinance = () => {
    if (EnableApp) {
      setFinancePage({open: true, page: 'https://gne.com', id: 'gne'})
    }
  }

  const useStyles = makeStyles({
    root: {
        "& .MuiInput-underline:after": {
          borderBottomColor: "white"
        },
        "& .MuiInput-underline:before": {
          borderBottomColor: "white"
        },
        "& .MuiInput-underline:hover:not(.Mui-focused):before": {
          borderBottomColor: "white"
        },
        '& .MuiInputBase-root': {
          color: 'white',
      },
        
    },
  });

  const classes = useStyles();

  return (
    <div>
    <Draggable defaultPosition={{x: -650, y: -400}} handle='.browser-b-buttons'>
        <div className={counter ? '' : 'hiddenComponent'}>
            <div className='GneFinance'>
                <div className='browser-b-buttons'>
                  <div className="browser_tab" onClick={OpenFinance}>
                    <img src='https://imgur.com/O10Rx0A.png' style={{marginRight: '0.5rem'}} alt='img' width='16px' height='16px'/>
                    <h1 className='gne_tab'>Finance Tab</h1>
                  </div>
                  <div className='boosting-close-container'>
                    <button className="btn min-btn" key={"cmin-btn"}/>
                    <button className="btn close-btn" key={"cclose-btn"} onClick={CloseBuyApp}/>
                  </div>
                </div>
                <div className='input_browser'>
                  <input className='inputStyles' type="text" name="name" value={FinancePage.page}/>
                </div>

                {FinancePage.id === 'google' &&
                  <div className='google'>
                    <img src='https://pngimg.com/uploads/google/google_PNG19644.png' alt='img' width={720} height={320}></img>
                  </div>
                }
                {FinancePage.open && FinancePage.id === 'gne' &&
                <div className='financePage'>
                  <div className='design'>
                    <img src='https://imgur.com/ihdYdZm.png' alt='img' width='202px' height='143px'/>
                      <span style={{color: '#505051', fontSize: '18px'}}>GNE available to buy</span>
                      <span style={{color: '#1a936f', fontSize: '30px'}}>{GlobalGne}<span style={{color: '#505051', fontSize: '18px'}}> credits</span></span>
                  </div>
                  <div className='design2'>
                    <span style={{color: 'white', fontSize: '18px'}}>You have <span style={{color: '#1a936f', fontSize: '18px'}}> {Gne}</span> credits</span>
                    <h3>GNE Checkout</h3>
                    <TextField
                        className="textfix"
                        id="input-with-icon-textfield"
                        label="How many units do you want to buy?"
                        classes={classes}
                        value={imputValue}
                        onChange={handleInputChange}
                        InputLabelProps={{style : {color : 'white'}}} 
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <i className="fa-brands fa-buy-n-large" style={{ color: "white"}}></i>
                            </InputAdornment>
                        ),
                        }}
                        variant="standard"
                    />
                    <div >
                      <Button variant="contained" onClick={handleSubmit} sx={{margin: '10px', bgcolor: '#169776', ':hover': { bgcolor: '#5a5a5a', color: 'white'}}}><i className="fa-solid fa-check" style={{marginRight: '3px' }}/>
                        Purchase
                      </Button>
                    </div>
                  </div>
                </div>
                }
            </div>
        </div>
    </Draggable>
</div>
  )
}

export default BuyApp