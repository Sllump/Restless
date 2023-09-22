import { useState, useEffect } from 'react';
import './BoostingApp-styles.css';
import BoostingInsideApp  from './components/BoostingInsideApp';
import Notification from './components/NotificationApp';
import Settings from './components/Settings'
import BennysApp from './components/BennysApp'
import DodoApp from './components/DodoApp'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";
import ConfigIcon from './static/cog.svg'
import NotiIcon from './static/comment.svg'
import WifiIcon from './static/wifi.svg'
import BuyApp from './components/BuyApp';
import { Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { 
  fontWhiteLaptopState, 
} from '../../../store';

// export const isEnvBrowser = () => !(window).invokeNative


function BoostingTablet() {
  const [App1, setApp1] = useState(false);
  const [App2, setApp2] = useState(false);
  const [App3, setApp3] = useState(false);
  const [App4, setApp4] = useState(false);
  const [Setting, setSetting] = useState(false);
  const [Notifi, setNotifi] = useState(false);
  const [EnableApp, setEnableApp] = useState(true)
  const [Wallpaper, setWallpaper] = useState("https://i.imgur.com/EEwTSk1.jpg");
  const [ToBrowser, setToBrowser] = useState(false);
  const [showBoosting, setshowBoosting] = useState({visible: false});
  const [DataBoosting, setDataBoosting] = useState({time: "00:00 12/12/2022"});
  const [fontWhite, setfontWhite] = useRecoilState(fontWhiteLaptopState);

  const Provider = (data) => {
    if (data.action === "openApplication") {
        if (data.app === "OpenBoostingApp") {
          setshowBoosting({
            visible: data.show
          })
        }
    } else if (data.action === "UpdateValueUI") {
        if (data.app === 'BoostingApp') {
          setDataBoosting({time: data.data.time})
        } else if (data.app === "EnableApps") {
          setEnableApp(data.data.BennysApp)
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

  useEffect(() => {
    localStorage.setItem("boostingLaptop", JSON.stringify(Wallpaper));
  }, [Wallpaper]);

  // useEffect(() => {
  //   function handleEscapeKey(event) {
  //     if (event.code === 'Escape') {
  //       setshowBoosting({visible: false})
  //       fetchNui('arp-boosting:closeBoostingApp', {})
  //     }
  //   }
  
  //   document.addEventListener('keydown', handleEscapeKey)
  //   return () => document.removeEventListener('keydown', handleEscapeKey)
  // }, [showBoosting, setshowBoosting])

  const openBoosting = () => {
    setApp1(true);
  }

  const openDodo = () => {
    setApp4(true);
  }

  const openBennys = () => {
    setApp2(true);
  }
  const openDarkWeb = () => {
    setApp3(true);
  }

  const openSettings = () => {
    setSetting(true);
  }

  const OpenNotifications = () => {
    setNotifi(true);
  }

  const openFinance = () => {
    setToBrowser(true)
  }

  const apps = [
    {
      app: 'Orter',
      icon: 'fa-solid fa-joint',
      color: '#086c4e',
      open: () => {
        setshowBoosting({visible: true})
      }
    },
    {
      app: 'Tow Service',
      icon: 'fa-solid fa-tower-observation',
      color: '#981334',
      open: () => {
        setshowBoosting({visible: true})
      }
    },
    {
      app: 'Unkown',
      icon: 'fa-solid fa-user-secret',
      color: '#040006',
      open: () => {
        setshowBoosting({visible: true})
      }
    },
    {
      app: 'Dodo',
      icon: 'fa-solid fa-crow',
      color: '#20304e',
      open: () => {
        setshowBoosting({visible: true})
      }
    },
  ]


  return (
    
    
    <div style={{display: showBoosting.visible ? '' : 'none'}} className='BoostingContainer'>
      <div className="rectangule">
        <div className="container" style={{backgroundImage: `URL('${Wallpaper}')`}}>
          <div className="windows_apps">
            <div className="win_apps">
              <img style={{height: '50px'}}  alt="img" src="https://imgur.com/6RPZ0KP.png"/>
              <Typography style={{ color: fontWhite ? 'rgb(255, 255, 255)' : 'black', wordBreak: 'break-word' }} variant='caption'>
                Recycle Bin
              </Typography>
            </div>
            <div className="win_apps">
              <img style={{height: '50px'}} alt="img" src="https://imgur.com/X1kbasV.png"/>
              <Typography style={{ color: fontWhite ? 'rgb(255, 255, 255)' : 'black', wordBreak: 'break-word' }} variant='caption'>
                Stuff
              </Typography>
            </div>
            <div onClick={openBoosting} className="win_apps" >
              <img style={{height: '50px'}} alt="img" src="https://imgur.com/FEPqpLc.png"/>
              <Typography style={{ color: fontWhite ? 'rgb(255, 255, 255)' : 'black', wordBreak: 'break-word' }} variant='caption'>
                Boosting
              </Typography>
            </div>
            {EnableApp && <div onClick={openBennys} className="win_apps" >
              <img style={{height: '50px'}} alt="img" src="https://imgur.com/kGxkXTk.png"/>
              <Typography  style={{ color: fontWhite ? 'rgb(255, 255, 255)' : 'black', wordBreak: 'break-word' }} variant='caption'>
                Bennys Parts
              </Typography>
            </div>}
            <div onClick={openDodo} className="win_apps" >
              <img style={{height: '50px'}} alt="img" src="https://i.imgur.com/5iJpfNS.png"/>
              <Typography style={{ color: fontWhite ? 'rgb(255, 255, 255)' : 'black', wordBreak: 'break-word' }} variant='caption'>
                Dodo
              </Typography>
            </div>
            <div onClick={openBoosting} className="win_apps" >
              <img style={{height: '50px'}} alt="img" src="https://i.imgur.com/Drh6VhF.png"/>
              <Typography style={{ color: fontWhite ? 'rgb(255, 255, 255)' : 'black', wordBreak: 'break-word' }} variant='caption'>
                SecureGuard
              </Typography>
            </div>
            <div onClick={openBoosting} className="win_apps" >
              <img style={{height: '50px'}} alt="img" src="https://i.imgur.com/RpiMnBp.png"/>
              <Typography style={{ color: fontWhite ? 'rgb(255, 255, 255)' : 'black', wordBreak: 'break-word' }} variant='caption'>
                Casino
              </Typography>
            </div>
          </div>
          <BuyApp counter={ToBrowser} setCounter={setToBrowser} />
          <BennysApp counter={App2} setCounter={setApp2} />
          <DodoApp counter={App4} setCounter={setApp4} />
          {/* <openDarkWeb counter={App2} setCounter={setApp3} /> */}
          <BoostingInsideApp counter={App1} setCounter={setApp1} />
          <Notification counter={Notifi} setCounter={setNotifi} />
          <Settings counter={Setting} setCounter={setSetting} setWallpaper={setWallpaper} />
          <div className="windows_bar">
              <div className='fix_bar'>
                <button className="color4" style={{}}><img alt="img" src="https://dvexdev.github.io/DveX.Images/nopixel-logo-white.png" width="24" height="24"/></button>
                <button className="color4" style={{}}><img alt="img" src="https://imgur.com/QFOk7B1.png"width="24" height="24" /></button>
                <button className={ToBrowser ? "OpenedButton" : "color4"} style={{}} onClick={openFinance}><img alt="img"src="https://dvexdev.github.io/DveX.Images/download (2).png" width="24" height="24"/></button> 
                {App1 && <button className="OpenedButton" style={{}}><img alt="img"src="https://imgur.com/FEPqpLc.png" height={24} width={24}/></button>}
                {App2 && <button className="OpenedButton" style={{}}><img alt="img"src="https://imgur.com/kGxkXTk.png" height={24} width={24}/></button>}
                {App3 && <button className="OpenedButton" style={{}}><img alt="img"src="https://imgur.com/HNyPZK7.png" height={24} width={24}/></button>}
                {App4 && <button className="OpenedButton" style={{}}><img alt="img"src="https://i.imgur.com/5iJpfNS.png" height={24} width={24}/></button>}
              </div>
              <button onClick={openSettings} className="color"><img alt="img"src={ConfigIcon} className="filter-white" style={{color: "white"}} height={17} width={17}/></button>
              <button className="color"><img alt="img" src={WifiIcon} style={{color: "white"}} className="filter-white" height={17} width={17}/></button>
              <div className="textohora">{DataBoosting.time}</div>
              <button onClick={OpenNotifications} className="color"><img alt="img"src={NotiIcon} style={{color: "white"}} className="filter-white" height={17} width={17}/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoostingTablet;
