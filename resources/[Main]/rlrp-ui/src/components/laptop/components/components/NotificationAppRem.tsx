import React, { useState } from 'react'
import Slide from '@mui/material/Slide';
const NotificationAppRem = ({props}: any) => {

    const [Remove, SetRemove] = useState(true)

    const removeNotification = () => {
        SetRemove(false)
    }
    
    setTimeout(removeNotification, 3500);

    return (
        <Slide direction="left" in={Remove} mountOnEnter unmountOnExit>
            <div className='NotificationBack2'>
                <div className='NotiText'>
                  <span><b>{`${props.app}`}</b></span>
                  <div style={{marginTop: '3px'}}>{ props.msg}</div>
                </div>
                <div className='NotiIcon'>
                  <img alt="img" src={props.img} height={32} width={32}/>
                </div>
            </div>
        </Slide>
    )
}

export default NotificationAppRem