import React, { useState, useEffect, useRef } from 'react';
import { Typography } from '@mui/material';
import '../index'
import useStyles from '../index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function Header({sethoverheader, sethoverTabheader, setheaderTabs, setcurrentTab, currentTab, hoverheader, thoverTabheader, headerTabs}: any) {
  const classes = useStyles();
  const getnamefortab = (currentTab) => {
    if(currentTab == 1){
      return 'Dashboard'
    } else if(currentTab == 2){
      return 'Incidents'
    } else if(currentTab == 3){
      return 'Profiles'
    } else if(currentTab == 4){
      return 'DMV'
    } else if(currentTab == 5){
      return 'Reports'
    } else if(currentTab == 6){
      return 'Evidence'
    } else if(currentTab == 7){
      return 'Properties'
    } else if(currentTab == 8){
      return 'Charges'
    } else if(currentTab == 9){
      return 'Staff'
    } else if(currentTab == 10){
      return 'Legislation'
    } else if(currentTab == 11){
      return 'Businesses'
    }
  }
  
  const setTabActive = (index) => {
    let oldIndex = headerTabs.findIndex((x) => x.active == true);
    if (oldIndex !== -1) {
      let x = headerTabs[oldIndex];
      x.active = false;

      setheaderTabs([
        ...headerTabs.slice(0, oldIndex),
        x,
        ...headerTabs.slice(oldIndex + 1),
      ]);
    }
    // if (oldIndex) nw[oldIndex].isActive = ;
    let g = headerTabs[index];
    g.active = true;

    setheaderTabs([...headerTabs.slice(0, index), g, ...headerTabs.slice(index + 1)]);
  };

  const selectTab = (tabId, key, index, active) => {
    if(active){
      DeleteHeaderTab(key);
      return;
    }
    setcurrentTab(tabId);
    setTabActive(index);
  }

  const DeleteHeaderTab = (key) => {
    if(headerTabs.length !== 1){
      setheaderTabs((tabs) => tabs.filter((tab) => tab.key !== key));

      // setcurrentTab(1);
      // setTabActive(0);  

    }
  };

  const CreateHeaderTab = () => {
    if(headerTabs.length !== 5 && currentTab !== 12){
      const newKeyID = (headerTabs.length + 1)
      setheaderTabs([
        ...headerTabs,
        {
          key: newKeyID,
          tabId: currentTab,
          name: getnamefortab(currentTab),
          active: false,
        }
      ])
      setTimeout(() => {
        for (let index = 0; index < headerTabs.length; index++) {
          const element = headerTabs[index];
          if(element.key === newKeyID){
            console.log(element.key, newKeyID)
            selectTab(currentTab, newKeyID, index, false)
            // break;
          }
        }
    }, 1000);
    }
  }
  return (
    <>
      <div onMouseEnter={function(){return sethoverheader(true)}} onMouseLeave={function(){return sethoverheader(false)}} className={classes.mdwHeader}>
        <div className='mdw-header-logo'>
          {/* 
          
                  children: Object(PZ.jsx)('img', {
                        alt: '',
                        src:
                          'police' === hZ
                            ? 'https://gta-assets.nopixel.net/images/mdw-lspd.png'
                            : 'sheriff' === hZ
                            ? 'https://gta-assets.nopixel.net/images/mdw-bcso.png'
                            : 'state' === hZ
                            ? 'https://gta-assets.nopixel.net/images/mdw-troopers.png'
                            : 'ranger' === hZ
                            ? 'https://gta-assets.nopixel.net/images/mdw-ranger.png'
                            : 'judge' === hZ
                            ? 'https://i.imgur.com/LnMPAZH.png'
                            : 'https://gta-assets.nopixel.net/imag 0xes/mdw-generic.png',
                      }),

          */}
          <img src="https://gta-assets.nopixel.net/images/mdw-generic.png" alt="" />
        </div>
        <div onMouseEnter={function(){return sethoverTabheader(true)}} onMouseLeave={function(){return sethoverTabheader(false)}} className={classes.mdwHeaderTabs}>
          {headerTabs && headerTabs.length > 0 ? headerTabs.map((tab, index) => {
            return (
              <div style={{border: tab.active ? '2px solid rgb(228, 63, 90)' : ''}} onClick={function(){selectTab(tab.tabId, tab.key, index, tab.active)}} className={'mdw-header-tab'}>
                <Typography 
                  style = {{
                    color: '#fff',
                    wordBreak: 'break-word',
                  }}
                  variant={'body1'}
                >
                  {tab.name}
                </Typography>
                {tab.active ? <>
                  <div className='mdw-header-active-bottom'></div>
                </>:<></>}
              </div>
            );
          }) : <>
            <div style={{border: '2px solid rgb(228, 63, 90)'}} onClick={function(){setcurrentTab(1)}} className={'mdw-header-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                }}
                variant={'body1'}
              >
                Dashboard
              </Typography>
              <div className='mdw-header-active-bottom'></div>
            </div>
          </>}

          <div onClick={CreateHeaderTab} className={'mdw-header-tab'} style={{minWidth: 'unset'}}>
            <i style={{color:'white'}} className='fas fa-plus'></i>
          </div>
        </div>
        <div className={classes.mdwHeaderText}>
          <div>
            <Typography 
              style = {{
                color: '#fff',
                wordBreak: 'break-word',
              }}
              variant={'h6'}
            >
              Quote of the Day
            </Typography>
          </div>
          <div>
            <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                  textAlign: 'right'
                }}
                variant={'body1'}
              >
                - be Like PFOP a GIGACHAD
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;