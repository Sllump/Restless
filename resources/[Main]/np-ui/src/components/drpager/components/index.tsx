import React, { useState } from 'react';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import useStyles from './index.styles';

const Drpager: React.FC = () => {
  const classes = useStyles();
  const [show, setShow]: any = useState(false);
  const [hospital, sethospital]: any = useState('pillbox');

  const curHospitol = () => {
    switch (hospital) {
      case 'pillbox':
        return classes.pagerPillbox;
        break;
      case 'sandy':
        return classes.pagerSandy;
        break;
      case 'central':
        return classes.pagerCentral;
        break;
      }
  }

  return (
    <div style={{display: show ? '' : 'none'}} className={classes.wrapper}>
      <div className={classes.pager +' '+ curHospitol()}></div>
    </div>
  );
}

export default Drpager;