import React from "react";
import { useState, useEffect } from "react";
import './index.css';
import { Dispatch } from "./Dispatch.jsx";
import Unit from "./Unit.jsx";
import CreateCall from "./CreateCall.jsx";
import Map from "./Map"
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";

function DispatchApp() {
  const [display, setDisplay]: any = useState(false)
  const [notifications, setNotifications]: any = useState([
    {
      id: 1,
      label:'Store Robbery',
      options:[
        {
          label:'Test'
        }
      ]
    }
  ])
  const [log, setLog]: any = useState([
    {
      id: 1,
      label:'Store Robbery',
      options:[
        {
          label:'Test'
        },
      ]
    },
    {
      id: 1,
      label:'Fleeca Robbery',
      urgent: true,
      options:[
        {
          label:'Test'
        },
      ]
    },

  ])
  const [calls, setCalls]: any = useState([
    {
      id: 1,
      label:'Fleeca Robbery',
      // urgent: true,
      options:[
        {
          label:'Test'
        },
      ]
    },
    {
      id: 1,
      label:'Fleeca Robbery',
      // urgent: true,
      options:[
        {
          label:'Test'
        },
      ]
    },
    {
      id: 1,
      label:'Fleeca Robbery',
      // urgent: true,
      options:[
        {
          label:'Test'
        },
      ]
    },
    {
      id: 1,
      label:'Fleeca Robbery',
      // urgent: true,
      options:[
        {
          label:'Test'
        },
      ]
    },
    {
      id: 1,
      label:'Fleeca Robbery',
      // urgent: true,
      options:[
        {
          label:'Test'
        },
      ]
    },
    {
      id: 1,
      label:'Fleeca Robbery',
      // urgent: true,
      options:[
        {
          label:'Test'
        },
      ]
    },
    {
      id: 1,
      label:'Fleeca Robbery',
      // urgent: true,
      options:[
        {
          label:'Test'
        },
      ]
    },
    {
      id: 1,
      label:'Fleeca Robbery',
      // urgent: true,
      options:[
        {
          label:'Test'
        },
      ]
    },
    {
      id: 1,
      label:'Fleeca Robbery',
      // urgent: true,
      options:[
        {
          label:'Test'
        },
      ]
    },
  ])

  useNuiEvent("createCall", (data) => {
    setCalls([...calls, data])
  })

  useNuiEvent("SendNotification", (data) => {
    const id = notifications.length + 1
    setNotifications([...notifications, data])
    setLog([...log, data])
    
    setTimeout(() => {
      setNotifications((v) => {
        return v.splice(id, 1)
      })
    }, 6000)
  })

  useNuiEvent("dismissDispatch", (data) => {
    log.splice(data.id-1, 1)
  })

  useNuiEvent("openDispatch", setDisplay)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
  }, [])

  const handleKeyPress = (e) => {
   if (e.key === "Escape") {
      setDisplay(false)
      fetchNui('escapeNui')
    }
  };

  return (
    <>
      <div style={{ display: display ? 'flex' : 'none', position:'absolute', top:'0', flexDirection: 'row', width: '100vw', height: '100vh', padding: '4px', paddingRight: '0' }}>
        <div id="map" style={{ flex: '1', width: '100%', height:'100%', maxHeight:'100%', minHeight:'100%' }}>
          <Map />
        </div>
        <div style={{ width: '50%', display: 'flex' }}>
          <div style={{ width: '25%', height: '98.9%', display: 'flex', flexDirection: 'column', margin:'0.3%', top:'0', position: 'absolute', right:'0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2', maxHeight:'70%', width: '100%', overflowY: 'auto' }}>
              {!display ? notifications.map(data => <Dispatch visibility={false} data={data} />) : ''}
              {display ? log?.map(data => <Dispatch visibility={true} data={data} />) : ''}
            </div>
            {display ? <Unit visibility={display} /> : ''}
          </div>
          <div style={{ height: '100%', width:'48.5%', overflow: 'hidden', overflowY: 'auto', marginLeft: '0.4%' }}>
            {calls?.map(data => <CreateCall visibility={display} data={data} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default DispatchApp;