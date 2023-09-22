import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { Typography, TextField, InputAdornment, Menu, MenuItem, MenuList, Tooltip } from '@mui/material';
import './index'
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AceEditor from 'react-ace';
import * as monaco from 'monaco-editor';
import 'monaco-editor/esm/vs/language/typescript/monaco.contribution';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
function ConfigPage() {
  const classes = useStyles();
  const editorRef: any = useRef(null);

  useEffect(() => {
    // Initialize Monaco Editor
    monaco.editor.create(editorRef.current, {
      value: '',
      language: 'javascript',
    });
  }, []);
  
  return (
    <>
      <div className={classes.mdwDashboardOuterContent}>
        <div className={classes.mdwDashboardInnerContent}>
          <div className={classes.mdwDashboardInnerContentLeft}>
            <div className={classes.mdwDashboardInnerContentLeftHeader}>
              <div className='mdw-dashboard-inner-content-left-header-text-left'>
                <Typography 
                  style = {{
                    color: '#fff',
                    wordBreak: 'break-word',
                  }}
                  variant={'h6'}
                  gutterBottom={true}
                >
                  Departments
                </Typography>
              </div>
              <div className={classes.mdwInnerContentLeftHeaderTextRight}>
                <div className='input-wrapper'>
                  <TextField
                    id="input-with-icon-textfield"
                    label='Search'
                    type='text'
                    // onChange={event =>
                    //   setPasswordInput(event.target.value)
                    // }
                    // value={Password}
                    sx={{
                      '& .MuiInput-root': {
                        color: 'white !important',
                      },
                      '& label.Mui-focused': {
                        color: 'darkgray !important',
                      },
                      '& Mui-focused': {
                        color: 'darkgray !important',
                      },
                      '& .MuiInput-underline:hover:not(.Mui-disabled):before':
                        {
                          borderColor:
                            'white !important',
                        },
                      '& .MuiInput-underline:before':
                        {
                          borderColor:
                            'darkgray !important',
                          color:
                            'darkgray !important',
                        },
                      '& .MuiInput-underline:after': {
                        borderColor:
                          'white !important',
                        color: 'darkgray !important',
                      },
                      '& .Mui-focused:after': {
                        color: 'darkgray !important',
                      },
                      '& .MuiInputAdornment-root': {
                        color: 'darkgray !important',
                      },
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><i className="fas fa-search fa-w-16 fa-fw"></i></InputAdornment>,
                    }}
                    variant="standard"
                  />   

                </div>
              </div>
            </div>
            <div className={classes.mdwInnerContentLeftBody}>
              {/* <Menu id="fade-menu" MenuListProps={{'aria-labelledby': 'fade-button' }} anchorEl={dx} open={dm} onClose={function () {
                dA(null);
                dE('');
              }}>
                <MenuItem onClick={function(){return du()}}>
                  <MenuList>

                  </MenuList>
                </MenuItem>
              </Menu> */}

                {/* <AceEditor
                    mode="json"
                    theme="ambiance"
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                />   */}

                <div ref={editorRef} style={{ width: '800px', height: '600px' }} />
          
            </div>
          </div>
          <div className={classes.mdwInnerContentDivider}></div>
          <div className={classes.mdwDashboardInnerContentMiddle}>
            <div className={classes.mdwDashboardInnerContentMiddleHeader}>
              <div className='mdw-dashboard-inner-content-middle-header-text-left'>
                <Typography 
                  style = {{
                    color: '#fff',
                    wordBreak: 'break-word',
                  }}
                  variant={'h6'}
                  gutterBottom={true}
                >
                  BOLO
                </Typography>
              </div>
              <div className='input-wrapper'>
                <TextField
                  id="input-with-icon-textfield"
                  label='Search'
                  type='text'
                  // onChange={event =>
                  //   setPasswordInput(event.target.value)
                  // }
                  // value={Password}
                  sx={{
                    '& .MuiInput-root': {
                      color: 'white !important',
                    },
                    '& label.Mui-focused': {
                      color: 'darkgray !important',
                    },
                    '& Mui-focused': {
                      color: 'darkgray !important',
                    },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before':
                      {
                        borderColor:
                          'white !important',
                      },
                    '& .MuiInput-underline:before':
                      {
                        borderColor:
                          'darkgray !important',
                        color:
                          'darkgray !important',
                      },
                    '& .MuiInput-underline:after': {
                      borderColor:
                        'white !important',
                      color: 'darkgray !important',
                    },
                    '& .Mui-focused:after': {
                      color: 'darkgray !important',
                    },
                    '& .MuiInputAdornment-root': {
                      color: 'darkgray !important',
                    },
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><i className="fas fa-search fa-w-16 fa-fw"></i></InputAdornment>,
                  }}
                  variant="standard"
                />   

              </div>
            </div>
            <div className={classes.mdwDashboardInnerContentMiddleBody}></div>
          </div>
          <div className={classes.mdwInnerContentDivider}></div>
          <div className={classes.mdwDashboardInnerContentRight}>
            <div className={classes.mdwDashboardInnerContentRightHeader}>
              <div className='mdw-dashboard-inner-content-right-header-text-left'>
                <Typography 
                  style = {{
                    color: '#fff',
                    wordBreak: 'break-word',
                  }}
                  variant={'h6'}
                  gutterBottom={true}
                >
                  Bulletin Board
                </Typography>
              </div>
              <div className={classes.mdwDashboardInnerContentRightHeaderTextRight}>
                <div className='input-wrapper'>
                  <TextField
                    id="input-with-icon-textfield"
                    label='Search'
                    type='text'
                    // onChange={event =>
                    //   setPasswordInput(event.target.value)
                    // }
                    // value={Password}
                    sx={{
                      '& .MuiInput-root': {
                        color: 'white !important',
                      },
                      '& label.Mui-focused': {
                        color: 'darkgray !important',
                      },
                      '& Mui-focused': {
                        color: 'darkgray !important',
                      },
                      '& .MuiInput-underline:hover:not(.Mui-disabled):before':
                        {
                          borderColor:
                            'white !important',
                        },
                      '& .MuiInput-underline:before':
                        {
                          borderColor:
                            'darkgray !important',
                          color:
                            'darkgray !important',
                        },
                      '& .MuiInput-underline:after': {
                        borderColor:
                          'white !important',
                        color: 'darkgray !important',
                      },
                      '& .Mui-focused:after': {
                        color: 'darkgray !important',
                      },
                      '& .MuiInputAdornment-root': {
                        color: 'darkgray !important',
                      },
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><i className="fas fa-search fa-w-16 fa-fw"></i></InputAdornment>,
                    }}
                    variant="standard"
                  />
                </div>
              </div>
            </div>
            <div className={classes.mdwDashboardInnerContentRight}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfigPage;