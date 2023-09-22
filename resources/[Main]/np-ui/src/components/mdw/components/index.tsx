import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";
import { Grid } from '@mui/material';
import { noop } from '../../../utils/misc';
import useStyles from './index.styles';
import Tabs from './tabs';
import Header from './header';
import DashboardPage from './pages/dashboard';
import IncidentsPage from './pages/incidents';
import Loading from './loading';
import ModalContainers from './modal';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ConfigPage from './pages/config';

const Mdw: React.FC = () => {
  const classes = useStyles();

  const [ShowMdw, setShowMdw]: any = useState(false);
  const [hoverheader, sethoverheader]: any = useState(false);
  const [showLoading, setShowLoading]: any = useState(false);
  const [showAssignEvidence, setShowAssignEvidence]: any = useState(false);
  const [CurrentIncidentID, setCurrentIncidentID]: any = useState(0);
  const [currentTab, setcurrentTab]: any = useState(1)
  const [evidences, setevidences] = useState([])
  const [headerTabs, setheaderTabs] = useState([
    {
      key:1,
      tabId: 1,
      name: 'Dashboard',
      active: true,
    }
  ])
  const [thoverTabheader, sethoverTabheader]: any = useState(false);


  useEffect(() => {
    const handleEscapeKey = (event : any) => {
        if (event.code === 'Escape' && ShowMdw) {
            fetchNui('np-ui:closeApp', {}).then(function (firstdata) {
                if(true === firstdata.meta.ok){
                  setShowMdw(false)
                  fetchNui('np-ui:applicationClosed', {
                      name: 'mdt',
                      fromEscape: true,
                  }).then(function (data) {
                      if(true === data.meta.ok){
                        setShowMdw(false)
                      }
                  })
              }
          })
        }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [ShowMdw, setShowMdw])

  useNuiEvent('uiMessage', (data) => {
    var dvexdata = data.data
    if ('mdt' === data.app) {
      if (true === data.show) {
        setShowMdw(true)
      }
    }
  })

  

  return (
    <>
      <div style={{ visibility: ShowMdw ? 'visible' : 'hidden', top: 'auto', opacity: hoverheader ? !thoverTabheader ? '0.5' : '1' : '1' }} className={classes.mdwOuterContainer}>
        <div style={{top: ShowMdw ? '1.5%' : 'calc(100vh + 32px)'}} className={classes.mdwInnerContainer}>
          <Header setcurrentTab={setcurrentTab} sethoverheader={sethoverheader} sethoverTabheader={sethoverTabheader} currentTab={currentTab} hoverheader={hoverheader} thoverTabheader={thoverTabheader} headerTabs={headerTabs} setheaderTabs={setheaderTabs} />
          <div className={classes.mdwOuterBody}>
            <div style={{zIndex: 100}} className={classes.mdwInnerBody}>
            
              <Tabs currentTab={currentTab} setcurrentTab={setcurrentTab} />
              {currentTab === 1 ? 
                <DashboardPage /> 
                : currentTab === 2 ? 
                <IncidentsPage showLoading={setShowLoading} setShowAssignEvidence={setShowAssignEvidence} CurrentIncidentID={setCurrentIncidentID} evidences={evidences} setevidences={setevidences} /> 
                : currentTab === 12 ? 
                <ConfigPage /> 
              : <></>}
            </div>
          </div>
          <Loading show={showLoading} />
          <ModalContainers showAssignEvidence={showAssignEvidence} setShowAssignEvidence={setShowAssignEvidence} CurrentIncidentID={CurrentIncidentID} evidences={evidences} setevidences={setevidences} />
        </div>
      </div>
    </>
  );
}

export default Mdw;