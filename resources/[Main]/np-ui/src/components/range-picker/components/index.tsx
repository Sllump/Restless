import React, { useState, useEffect, useRef } from 'react';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";
import { noop } from '../../../utils/misc';
import { Button, Slider, Stack } from '@mui/material';
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const RangePicker: React.FC = () => {
  const classes = useStyles();

  const [Show, setShow]: any = useState(false);
  const [ranageValue, setValue]: any = useState(0);
  const [ranageValue2, setValue2]: any = useState(0);
  const [ranageValue3, setValue3]: any = useState(0);
  const [tempSubmitUrl, setSubmitUrl]: any = useState('');


  useEffect(() => {
    const handleEscapeKey = (event : any) => {
        if (event.code === 'Escape' && Show) {
          setShow(true)
          fetchNui('rlrp-ui:closeApp', {}).then(function (firstdata) {
            if(true === firstdata.meta.ok){
              fetchNui('rlrp-ui:applicationClosed', {
                name: 'range-picker',
                fromEscape: true,
              }).then(function (data) {
                if(true === data.meta.ok){
                  setShow(false);
                  setValue(0);
                  setValue2(0);
                  setValue3(0);
                  setSubmitUrl('');
                }
              })
            }
        })
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [Show, setShow])

  const SubmitButton = () => {
    fetchNui('rlrp-ui:closeApp', {}).then(function (firstData) {
      if(true === firstData.meta.ok) {
        setShow(false);
        fetchNui('rlrp-ui:applicationClosed', {
          name: 'range-picker',
          fromEscape: false,
        }).then(function (data) {
          fetchNui(tempSubmitUrl, {
            ranges: [ranageValue, ranageValue2, ranageValue3],
          })
          if(true === data.meta.ok){
            setShow(false);
            setValue(0);
            setValue2(0);
            setValue3(0);
            setSubmitUrl('');
          }
        })
      }
    })
  }


  useNuiEvent('uiMessage', (data) => {
    var dvexdata = data.data
    if ('range-picker' === data.app) {
      if (true === data.show) {
        setShow(true);
        setSubmitUrl(dvexdata.submitUrl);
      } else {
        if(false === data.show) {
          setShow(false);
          setValue(0);
          setValue2(0);
          setValue3(0);
          setSubmitUrl('');
        }
      }
    }
  })

  return (
    <>
      <div style={{display: Show ? '' : 'none'}} className={classes.rangePickerOuterContainer}>
        <div className={classes.rangePickerInnerContainer}>
          <div className={classes.rangePickerSliderWrapper}>
            <Stack sx={{height: '100%'}} direction="row" spacing={0.1}>
              <Slider color='primary' size='small' orientation='vertical' defaultValue={0} onChange={function(e, newValue){setValue(newValue)}} />
              <Slider color='primary' size='small' orientation='vertical' defaultValue={0} onChange={function(e, newValue){setValue2(newValue)}} />
              <Slider color='primary' size='small' orientation='vertical' defaultValue={0} onChange={function(e, newValue){setValue3(newValue)}} />
            </Stack>
          </div>
          <div className={classes.rangePickerButtonWrapper}>
            <Button size='small' color='success' variant='contained' onClick={SubmitButton}>Submit</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RangePicker;