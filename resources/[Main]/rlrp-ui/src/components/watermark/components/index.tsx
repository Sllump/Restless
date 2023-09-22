import React, { useState } from 'react';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import useStyles from './index.styles';

const Watermark: React.FC = () => {
  const classes = useStyles();
  const [show, setShow]: any = useState(false);
  const [watermarkPosition, setWatermarkPosition]: any = useState({left: '1vh', top: '3.5vh', filter: 'blur(1px)'});

  useNuiEvent('uiMessage', (data) => {
    var dvexdata = data.data
    if ('game' === data.app) {
      if (true === dvexdata.showWatermark) {
        setShow(true);
        setWatermarkPosition(dvexdata.watermarkPosition);
      }
    }
  })

  return (
    <div style={{display: show ? '' : 'none'}}>
      <div className={classes.watermarkContaner} style={watermarkPosition}>
        <img src="https://i.imgur.com/N4vNhB3.png" style={{width:'32px'}} alt="https://i.imgur.com/N4vNhB3.png" />
      </div>
    </div>
  );
}

export default Watermark;