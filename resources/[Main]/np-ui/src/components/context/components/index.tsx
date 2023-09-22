import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";
import { noop } from '../../../utils/misc';
import { Typography } from '@mui/material';
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Context: React.FC = () => {
    const classes = useStyles();

    const [show, setShow]: any = useState(false)
    const [menus, setMenus]: any = useState([])
    const [oldMenus, setOldMenus]: any = useState([])
    const [position, setPosition]: any = useState('right')


    useEffect(() => {
      const handleEscapeKey = (event : any) => {
          if (event.code === 'Escape' && show) {
              fetchNui('np-ui:closeApp', {}).then(function (firstdata) {
                  if(true === firstdata.meta.ok){
                    setShow(false) 
                    fetchNui('np-ui:applicationClosed', {
                        name: 'contextmenu',
                        fromEscape: true,
                    }).then(function (data) {
                      if(true === data.meta.ok){
                        setShow(false) 
                        setMenus([]) 
                        setOldMenus([])
                        setPosition('right')
                      }
                  })
                }
            })
          }
      }
  
      document.addEventListener('keydown', handleEscapeKey)
      return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [show, setShow])

    useNuiEvent('uiMessage', (data) => {
      if ('contextmenu' === data.app) {
        if (true === data.show){
          setMenus([])
          setOldMenus([])
          setShow(data.show)
          setPosition(data.data.position)
          setMenus(data.data.options)
          setOldMenus(data.data.options)
        }
      }
    })

    var handleActionClick = function (action: string, key: any, disabled: any, children: ConcatArray<{ title: string; backButton: boolean; }>, backButton: boolean, extraAction: string) {
      if (true === backButton) {
        setShow(false);
        setTimeout(function () {
          setMenus(oldMenus);
          setShow(true);
        }, 100);
        return;
      }
      if (action) {
        if (!disabled) {
          fetchNui('np-ui:closeApp', {}).then(function (cb) {
            if (true === cb.meta.ok) {
              fetchNui(action, { key: key }).then(function (cH) {
                if (true === cH.meta.ok) {
                  fetchNui('np-ui:applicationClosed', {
                    name: 'contextmenu',
                    fromEscape: false,
                  }).then(function (data) {
                    if (true === data.meta.ok) {
                      setShow(false);
                      setOldMenus([]);
                      setMenus([]);
                    }
                  });
                }
              });
            }
          });
        }
      } else if (children) {
        // setOldMenus(menus)
        setShow(false);
        setTimeout(function () {
          if (extraAction) {
            fetchNui(extraAction, { key: key });
          }
          if (0 === oldMenus.length) {
            setMenus(oldMenus);
          }
          var firstChildren: any = [
            {
              title: 'Go Back',
              backButton: true,
            },
          ].concat(children);
          setMenus(firstChildren);
          setShow(true);
        }, 100);
      }
    }
    
    return (
      <div style={{position:'absolute', top:'0', left:'0', width: '100vw', height: '100vh', display: 'flex', pointerEvents: 'all'}}>
        <div style={{paddingLeft: '120px'}} className={classes.contextFlexContainer}>
          <div className={classes.contextLeftInnerContainer}>
            {'left' === position && menus && menus.length > 0 ? menus.map((data)=>{
              return (
                <div onClick={()=>{handleActionClick(data.action, data.key, data.disabled, data.children, data.backButton, data.extraAction)}} style={{opacity: show ? '1' : '0', paddingRight: void 0 !== data.children ? '0px' : '8px', paddingLeft: void 0 !== data.backButton ? '0px' : '8px', marginBottom: void 0 !== data.backButton ? '16px' : '8px', transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'}} className={void 0 !== data.disabled && true === data.disabled ? classes.contextButtonDisabled : classes.contextButton}>
                  <div style={{display: void 0 !== data.icon ? '' : 'none', margin: 'auto 0px', width: '10%'}}>
                    <i style={{color: '#fff'}} className={'fas fa-'+data.icon+' fa-w-14 fa-fw'}></i>
                  </div>
                  <div className={classes.contextButtonFlex}>
                    <div style={{display: void 0 !== data.backButton ? '' : 'none'}} className={classes.contextButtonChevron}>
                      <i style={{color: '#fff'}} className='fas fa-chevron-left fa-w-10 fa-fw'></i>
                    </div>
                    <div>
                      <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="body1">
                        {void 0 !== data.title ? data.title : ''}
                      </Typography>
                      <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="body2">
                        {void 0 !== data.description ? data.description : ''}
                      </Typography>
                    </div>
                  </div>
                  <div style={{display: void 0 !== data.children ? '' : 'none'}} className={classes.contextButtonChevron}>
                    <i style={{color: '#fff'}} className='fas fa-chevron-right fa-w-10 fa-fw'></i>
                  </div>
                </div>
              );
            }) : <></>}
          </div>
        </div>
        <div style={{paddingLeft: '120px'}} className={classes.contextFlexContainer}>
          <div className={classes.contextRightInnerContainer}>
            {'right' === position && menus && menus.length > 0 ? menus.map((data)=>{
              return (
                <div onClick={()=>{handleActionClick(data.action, data.key, data.disabled, data.children, data.backButton, data.extraAction)}} style={{opacity: show ? '1' : '0', paddingRight: void 0 !== data.children ? '0px' : '8px', paddingLeft: void 0 !== data.backButton ? '0px' : '8px', marginBottom: void 0 !== data.backButton ? '16px' : '8px', transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'}} className={void 0 !== data.disabled && true === data.disabled ? classes.contextButtonDisabled : classes.contextButton}>
                  <div style={{display: void 0 !== data.icon ? '' : 'none', margin: 'auto 0px', width: '10%'}}>
                    <i style={{color: '#fff'}} className={'fas fa-'+data.icon+' fa-w-14 fa-fw'}></i>
                  </div>
                  <div className={classes.contextButtonFlex}>
                    <div style={{display: void 0 !== data.backButton ? '' : 'none'}} className={classes.contextButtonChevron}>
                      <i style={{color: '#fff'}} className='fas fa-chevron-left fa-w-10 fa-fw'></i>
                    </div>
                    <div>
                      <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="body1">
                        {void 0 !== data.title ? data.title : ''}
                      </Typography>
                      <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="body2">
                        {void 0 !== data.description ? data.description : ''}
                      </Typography>
                    </div>
                  </div>
                  <div style={{display: void 0 !== data.children ? '' : 'none'}} className={classes.contextButtonChevron}>
                    <i style={{color: '#fff'}} className='fas fa-chevron-right fa-w-10 fa-fw'></i>
                  </div>
                </div>
              );
            }) : <></>}
          </div>
        </div>
      </div>
        // <>
        //   {position === 'left' && menus && menus.length > 0 &&
        //     <div className="context-outer-container">
        //       <div className={classes.contextFlexContainer} style={{paddingLeft: '120px'}}>
        //             <div className={classes.contextLeftInnerContainer}>
        //                     {menus.map((option) => {
        //                       return (
        //                         <>
        //                           <div 
        //                             onClick={function () { 
        //                               return Action(
        //                                   option.action, 
        //                                   option.key, 
        //                                   option.disabled, 
        //                                   option.children, 
        //                                   option.backButton, 
        //                                   option.extraAction
        //                               ) 
        //                           }}
        //                             className={classes.contextButton}
        //                             style={{
        //                                 opacity: show ? '1' : '0',
        //                                 paddingRight: option.children ? '0px' : '8px',
        //                                 paddingLeft: option.backButton ? '0px' : '8px',
        //                                 marginBottom: option.backButton ? '16px' : '8px',
        //                                 transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        //                             }}>
        //                                   <div style={{
        //                                       display:
        //                                       option.icon ? 'block' : 'none',
        //                                       margin: 'auto 0px',
        //                                       width: '10%',
        //                                   }}>
        //                                     <i className={'fas fa-' + option.icon + ' fa-w-14 fa-fw'} style={{ color: '#fff' }}></i>
        //                                   </div>
        //                                   <div className={classes.contextButtonFlex}>
                                           
        //                                       <div className={classes.contextButtonChevron} style={{
        //                                           display:
        //                                             option.backButton
        //                                               ? ''
        //                                               : 'none',
        //                                         }}>
        //                                           <i className='fas fa-chevron-left fa-w-10 fa-fw' style={{ color: '#fff' }}></i>
        //                                       </div>
        //                                       <div>
        //                                       <Typography
        //                                           style={{ color: '#fff', wordBreak: 'break-word' }}
        //                                           variant="body1"
        //                                           >
        //                                           {option.title}
        //                                       </Typography>

        //                                       <Typography
        //                                           style={{ color: '#fff', wordBreak: 'break-word' }}
        //                                           variant="body2"
        //                                           >
        //                                           {option.description}
        //                                       </Typography>
        //                                       </div>

        //                               </div>
        //                                     <div className={classes.contextButtonChevron} style={{display: option.children ? '' : 'none'}}>
        //                                       <i className='fas fa-chevron-right fa-w-10 fa-fw' style={{ color: '#fff' }}></i>
        //                                     </div>
        //                             </div>


        //                         </>
        //                       )
        //                     })}
        //             </div>
        //         </div>
        //         </div>
        //           }
        //   {position === 'right' && menus && menus.length > 0 &&
        //     <div className="context-outer-container">
        //       <div className={classes.contextFlexContainer} style={{paddingLeft: '1220px'}}>
        //             <div className={classes.contextRightInnerContainer}>
        //                     {menus.map((option) => {
        //                       return (
        //                         <>

        //                             <div 
        //                             onClick={function () { 
        //                               return Action(
        //                                   option.action, 
        //                                   option.key, 
        //                                   option.disabled, 
        //                                   option.children, 
        //                                   option.backButton, 
        //                                   option.extraAction
        //                               ) 
        //                           }}
        //                             className={classes.contextButton}
        //                             style={{
        //                                 opacity: show ? '1' : '0',
        //                                 paddingRight: option.children ? '0px' : '8px',
        //                                 paddingLeft: option.backButton ? '0px' : '8px',
        //                                 marginBottom: option.backButton ? '16px' : '8px',
        //                                 transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        //                             }}>
        //                                 <div style={{
        //                                     display:
        //                                     option.icon ? 'block' : 'none',
        //                                     margin: 'auto 0px',
        //                                     width: '10%',
        //                                 }}>
        //                                   <i className={'fas fa-' + option.icon + ' fa-w-14 fa-fw'} style={{ color: '#fff' }}></i>
        //                                   </div>
        //                                   <div className={classes.contextButtonFlex}>
                                           
        //                                       <div className={classes.contextButtonChevron} style={{
        //                                           display:
        //                                             option.backButton
        //                                               ? ''
        //                                               : 'none',
        //                                         }}>
        //                                           <i className='fas fa-chevron-left fa-w-10 fa-fw' style={{ color: '#fff' }}></i>

        //                                       </div>
        //                                       <div>
        //                                         <Typography
        //                                             style={{ color: '#fff', wordBreak: 'break-word' }}
        //                                             variant="body1"
        //                                             >
        //                                             {option.title}
        //                                         </Typography>

        //                                         <Typography
        //                                             style={{ color: '#fff', wordBreak: 'break-word' }}
        //                                             variant="body2"
        //                                             >
        //                                             {option.description}
        //                                         </Typography>
        //                                       </div>
                                       
                                        
        //                               </div>
        //                                   <div className={classes.contextButtonChevron} style={{display: option.children ? '' : 'none'}}>
        //                                     <i className='fas fa-chevron-right fa-w-10 fa-fw' style={{ color: '#fff' }}></i>
        //                                   </div>
        //                             </div>


        //                         </>
        //                       )
        //                     })}
        //             </div>
        //         </div>
        //         </div>
        //           }
        // </>
    );
  }

export default Context;