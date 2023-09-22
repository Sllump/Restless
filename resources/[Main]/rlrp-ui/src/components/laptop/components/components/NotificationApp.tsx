
import React, {useEffect, useRef, useState} from 'react'
import Slide from '@mui/material/Slide';
import NotificationAppRem from './NotificationAppRem';



const Notification = ({counter, setCounter}) => {
    const pop = 'https://freesound.org/data/previews/434/434379_6965625-lq.mp3'
    const audioTune = new Audio(pop);
    const ref: any = useRef()
    const [Notifications, setNotifications] = useState([])
    const [OutNotifications, setOutNotifications] = useState([])
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

    const Provider = (data) => {
      if (data.action === "UpdateValueUI") {
          if (data.app === "BoostingNotification") {
            if (JSON.parse(localStorage.getItem("popaudio")).pop) {
              audioTune.play()
            }
            setNotifications(cats => [...cats, data.data.notify])
            setOutNotifications(cats => [...cats, data.data.notify])
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

  return (   
    <div>
      <Slide direction="left" in={counter} mountOnEnter unmountOnExit timeout={250}>
          <div className='notificationContainer' ref={ref}>
              <div className="texto notification-text">Notifications</div>
                <div className='nContainer'>
                  {Notifications.map( (bg) => (
                    <div className='NotificationBack'>
                      <div className='NotiText'>
                        <span><b>{`${bg.app}`}</b></span>
                        <div style={{marginTop: '3px'}}>{bg.msg}</div>
                      </div>
                      <div className='NotiIcon'>
                        <img alt="img" src={bg.img} height={32} width={32}/>
                      </div>
                    </div>
                  ))}
                </div>
          </div>
      </Slide>
      <div className='remove'>
        {OutNotifications.map( (bg) => (
          <NotificationAppRem props={bg} OutNotifications={OutNotifications} setOutNotifications={setOutNotifications}/>
        ))}
      </div>
    </div>
  )
}

export default Notification
