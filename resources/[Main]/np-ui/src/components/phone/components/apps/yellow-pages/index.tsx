import React, { useState, useEffect } from 'react';
import '../../index.css';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Checkmark } from 'react-checkmark';
import Button from '@mui/material/Button';
import { fetchNui } from '../../../../../utils/fetchNui';
import { useNuiEvent } from "../../../../../hooks/useNuiEvent";
import { Divider } from '@mui/material';
import useStyles from "./index.styles";
import AppContainer from '../../components/app-container';
import { callsDataState, filteredCallsDataState } from '../../../../../store';
import moment from 'moment';
import { useRecoilState } from 'recoil';

const YellowPagesApp: React.FC = () => {
  const classes = useStyles();

  const [adData, setAdData] = useState([])
  const [filteredAds, setFilteredAds] = useState([])
  const [callsData, setCallsData] = useRecoilState(callsDataState);
  const [filteredCalls, setFilteredCalls] = useRecoilState(filteredCallsDataState);
  const [isLoading, setLoading] = useState(false)
  const [checkmark, setCheckmark] = useState(false)
  const [preparing, setPreparing] = useState(false)
  const [adModal, setAdModal] = useState(false)
  const [adMessage, setAdMessage] = useState("")
  const [hasAd, setHasAd] = useState(false)

  useEffect(() => {
    fetchNui('np-ui:getYellowPages', {}).then(res => {
      setAdData(res.data)
      setFilteredAds(res.data)
      // setHasAd(res.hasAd)
    })
  }, []);

  const openAdModal = (e: any) => {
    setAdModal(true)
  }

  const handleRemoveAd = () => {
    fetchNui('removeYp', {}).then(resData => {
      if (resData.meta.ok) {
        setAdData(resData.data)
        setFilteredAds(resData.data)
        // setHasAd(resData.hasAd)
      }
    })
  }

  const closeAdModal = () => {
    setAdModal(false)
    setAdMessage("")
  }

  const updateAdMessage = (e: any) => {
    setAdMessage(e.target.value)
  }

  const handleAdPost = async () => {
    setLoading(true)
    setPreparing(true)
    const resultChar = await fetchNui('np-ui:getCharacter', {});
    fetchNui('np-ui:addYellowPagesEntry', { character: resultChar.data, text: adMessage }).then(res => {
      if (res.meta.ok) {
        setAdMessage("")
        setAdData(res.data)
        setFilteredAds(res.data)
        // setHasAd(res.hasAd)
        setLoading(false)
        setCheckmark(true)
        setTimeout(() => {
          setCheckmark(false)
          setAdModal(false)
          setPreparing(false)
        }, 1000)
      } else {
        setLoading(false)
        setPreparing(false)
        setAdMessage("")
      }
    })
  }

  const handleCallNumber = (number) => {
    fetchNui('np-ui:callStart', {
      number: number
    })

    let randId = genNumbers(4)
    //let contactName = formatPhoneNumber(name)
    let unix = moment().unix()

    let arr = callsData

    let array = {
      id: randId,
      number: number,
      name: number,
      date: unix,
      state: "out"
    }

    let newArr = [...(arr || []), array]

    setCallsData(newArr)
    setFilteredCalls(newArr)
  }

  const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
  }
  
  const genNumbers = (length) => {
    let result = '';
    let characters = '0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <>
      <div className={classes.ypPostModalContainer} style={{ display: adModal ? '' : 'none' }}>
        <div className={classes.ypPostModalInnerContainer}>
          <div className="spinner-wrapper" style={{ display: isLoading ? '' : 'none' }}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="spinner-wrapper" style={{ display: checkmark ? '' : 'none' }}>
            <Checkmark size="56px" color='#009688' />
          </div>

          <div className="component-simple-form" style={{ display: preparing ? 'none' : '' }}>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Ad"
                    variant="standard"
                    onChange={updateAdMessage}
                    value={adMessage}
                    multiline
                    maxRows={10}
                    inputProps={{ maxLength: 255 }}
                    helperText={`${adMessage.length}/255`}
                  />
                </FormControl>
              </div>
            </div>
            <div className="buttons">
              <div>
                <Button onClick={closeAdModal} size="small" color="warning" variant="contained">Cancel</Button>
              </div>
              <div>
                <Button onClick={handleAdPost} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppContainer
        emptyMessage={filteredAds.length === 0}
        primaryActions={[
          {
            type: "icon",
            title: "Create Ad",
            placement: "left",
            icon: "fas fa-plus fa-w-16",
            action: openAdModal,
            show: !hasAd, //hasAd === false
          },
          {
            type: "icon",
            title: "Remove Ad",
            placement: "left",
            icon: "fas fa-times fa-w-16",
            action: handleRemoveAd,
            show: hasAd, //hasAd === true
          }
        ]}
        search={{
          filter: ['phonenr', 'message', 'number'],
          list: adData,
          onChange: setFilteredAds,
        }}
      >
        {filteredAds && filteredAds.length > 0 ? (
          filteredAds.map((ad) => (
            <div className={classes.ypComponentContainer}>
              <Typography style={{ textAlign:'center', paddingBottom: '0.5vh',  color: '#000', wordBreak: 'break-word' }} variant="body1" gutterBottom>{ad.text}</Typography>
              <Divider style={{position:'absolute', left:'-16px', borderColor:'black'}} variant='middle'></Divider>
              <div style={{ fontSize: '13px', display: 'flex', paddingBottom: '2vh' }}>
                <Tooltip title="Call" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                  <Typography onClick={() => handleCallNumber(ad.number)} style={{ color: '#000', backgroundColor: 'transparent', wordBreak: 'break-word', position: 'absolute', float: 'left', bottom: '1%' }} variant="body2" gutterBottom>{formatPhoneNumber(ad.number)}</Typography>
                </Tooltip>
                <Typography style={{ color: '#000', wordBreak: 'break-word', position: 'absolute', float: 'right', right: '5%', bottom: '1%' }} variant="body2" gutterBottom>{ad.first_name + ' ' + ad.last_name}</Typography>
              </div>
            </div>
          ))
        ) : (
          <>
          </>
        )}
      </AppContainer>
    </>
  );
}

export default YellowPagesApp;