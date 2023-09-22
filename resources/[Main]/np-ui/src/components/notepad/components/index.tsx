import React, { useEffect, useState } from 'react';
import useStyles from './index.styles';
import { Button } from '@mui/material';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { fetchNui } from '../../../utils/fetchNui';

const Notepad: React.FC = () => {
  const classes = useStyles();

  const [show, setShow]: any = useState(false)
  const [canSave, setCanSave]: any = useState(false)
  const [content, setContent]: any = useState('')

  useNuiEvent('uiMessage', (data) => {
    var dvexdata = data.data
    if ('notepad' === data.app) {

      // if(data.close) {
      //   setShow(false)
      //   setCanSave(false)
      //   setContent('')
      //   return
      // }

      if(true === data.show) {
        setShow(true)
        if(true === dvexdata.canSave){
          setCanSave(true)
        }else{
          setCanSave(false)
          setContent(dvexdata.content)
        }
      }else{
        setShow(false)
        setCanSave(false)
        setContent('')
      }
    }
  })

  useEffect(() => {
    const handleEscapeKey = (event : any) => {
        if (event.code === 'Escape' && show) {
            setShow(false)
            fetchNui('np-ui:closeApp', {}).then(function (firstdata) {
                if(true === firstdata.meta.ok){
                fetchNui('np-ui:applicationClosed', {
                    name: 'notepad',
                    fromEscape: true,
                }).then(function (data) {
                    if(true === data.meta.ok){
                      setShow(false)
                      setCanSave(false)
                      setContent('')
                    }
                })
              }
          })
        }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [show, setShow, setCanSave, setContent])

  const handleChange = (event) => {
    setContent(event.target.value)
  }

  const handleClicked = () => {
    fetchNui('np-ui:createNotepadNote', {content: content})
  }

  return (
    <>
      <div style={{display: show ? '' : 'none'}} className={classes.notepadContainer}>
        <div className={classes.notepadInnerConainer}>
          <div style={{display: canSave ? '' : 'none'}} className={classes.notepadSaveContainer}>
            <Button onClick={handleClicked} size='small' color='success' variant='contained'>Save</Button>         
          </div>
          <div style={{display: canSave ? '' : 'none'}}>
            <textarea value={content} onChange={handleChange} id='notepad-content' className={classes.notepadTextArea} spellCheck={false} readOnly={false}></textarea>
          </div>
          <div style={{display: canSave ? 'none' : ''}}>
            <textarea value={content} id='notepad-content' className={classes.notepadTextArea} spellCheck={false} readOnly={true}></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notepad;