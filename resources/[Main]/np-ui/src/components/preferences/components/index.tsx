import React, { useState, useEffect } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { useExitListener } from "../../../hooks/useExitListener";
import { fetchNui } from "../../../utils/fetchNui";
import { isEnvBrowser } from '../../../utils/misc';
import { useRecoilState } from 'recoil';
import { 
    hudShowHealth, 
    hudShowArmor, 
    hudShowHunger, 
    hudShowThirst, 
    hudShowOxygen, 
    hudShowStress, 
    hudDefaultMinimap, 
    hudMinimapEnabled, 
    hudMinimapOutline, 
    hudHideEnhancements, 
    hudCircleTaskbarEnabled, 
    radioChannelVisibilityState, 
    blackbarsEnabledState, 
    compassStreetNamesEnabledState, 
    compassShowTime, 
    compassEnabledState, 
    blackbarsValueState, 
    compassFpsState, 
    hudSpeedometerFps, 
    hudShowCrosshair, 
    radioClicksOutgoingState, 
    radioClicksIncomingState, 
    radioClicksVolumeState, 
    radioVolumeState, 
    phoneVolumeState, 
    buffedOxygenState,
    buffedHungerState,
    buffedStressState,
    phoneEmbeddedImagesState, 
    phoneReceiveEmailState, 
    phoneNewTweetState, 
    phoneReceiveSMSState, 
    phoneBackgroundState, 
    phoneBrandState
} from '../../../../src/store';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Slider, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';

const Preferences: React.FC = () => {
    const classes = useStyles();
    
    const [curTab, setCurTab] = useState(1)
    const [showSettings, setShowSettings] = useState(false)
    const [showCrosshair, setShowCrosshair] = useRecoilState(hudShowCrosshair)
    const [showHealth, setShowHealth] = useRecoilState(hudShowHealth)
    const [showArmor, setShowArmor] = useRecoilState(hudShowArmor)
    const [showHunger, setShowHunger] = useRecoilState(hudShowHunger)
    const [showThirst, setShowThirst] = useRecoilState(hudShowThirst)
    const [showOxygen, setShowOxygen] = useRecoilState(hudShowOxygen)
    const [showStress, setShowStress] = useRecoilState(hudShowStress)
    const [compassFps, setCompassFps] = useRecoilState(compassFpsState)
    const [speedometerFps, setSpeedometerFps] = useRecoilState(hudSpeedometerFps)
    const [blackbarsValue, setBlackbarsValue] = useRecoilState(blackbarsValueState)
    const [compassEnabled, setCompassEnabled] = useRecoilState(compassEnabledState)
    const [streetNamesEnabled, setStreetNamesEnabled] = useRecoilState(compassStreetNamesEnabledState)
    const [compassShowTime_, setCompassShowTime] = useRecoilState(compassShowTime)
    const [blackbarsEnabled, setBlackbarsEnabled] = useRecoilState(blackbarsEnabledState)
    const [phoneBrand, setPhoneBrand] = useRecoilState(phoneBrandState);
    const [phoneBackground, setPhoneBackground] = useRecoilState(phoneBackgroundState);
    const [phoneReceiveSMS, setPhoneReceiveSMS] = useRecoilState(phoneReceiveSMSState);
    const [phoneReceiveEmail, setPhoneReceiveEmail] = useRecoilState(phoneReceiveEmailState);
    const [phoneEmbeddedImages, setPhoneEmbeddedImages] = useRecoilState(phoneEmbeddedImagesState);
    const [phoneNewTweet, setPhoneNewTweet] = useRecoilState(phoneNewTweetState);
    const [circleTaskbarEnabled, setCircleTaskbarEnabled] = useRecoilState(hudCircleTaskbarEnabled)
    const [hideEnhancements, setHideEnhancements] = useRecoilState(hudHideEnhancements)
    const [minimapEnabled, setMinimapEnabled] = useRecoilState(hudMinimapEnabled)
    const [defaultMinimap, setDefaultMinimap] = useRecoilState(hudDefaultMinimap)
    const [minimapOutline, setMinimapOutline] = useRecoilState(hudMinimapOutline)
    const [RadioClicksOutgoing, setRadioClicksOutgoing] = useRecoilState(radioClicksOutgoingState)
    const [RadioClicksIncoming, setRadioClicksIncoming] = useRecoilState(radioClicksIncomingState)
    const [RadioVolume, setRadioVolume] = useRecoilState(radioVolumeState)
    const [RadioClicksVolume, setRadioClicksVolume] = useRecoilState(radioClicksVolumeState)
    const [PhoneVolume, setPhoneVolume] = useRecoilState(phoneVolumeState)
    const [radioChannelVisibility, setRadioChannelVisibility] = useRecoilState(radioChannelVisibilityState)
    const [buffedOxygen, setBuffedOxygen] = useRecoilState(buffedOxygenState)
    const [buffedHunger, setBuffedHunger] = useRecoilState(buffedHungerState)
    const [buffedStress, setBuffedStress] = useRecoilState(buffedStressState)











    const saveHudSettings = () => {
        fetchNui('np-ui:hudSetPreferences', {
            "hud.misc.circle.taskbar.enabled": circleTaskbarEnabled,
            "hud.status.health.enabled": showHealth,
            "hud.status.armor.enabled": showArmor,
            "hud.status.hunger.enabled": showHunger,
            "hud.status.thirst.enabled": showThirst,
            "hud.status.oxygen.enabled": showOxygen,
            "hud.status.stress.enabled": showStress,
            'hud.crosshair.enabled': crosshair,
            "hud.status.enhancements.enabled": hideEnhancements,
            "hud.status.health.hideValue": healthValue,
            "hud.status.armor.hideValue": armorValue,
            "hud.status.hunger.hideValue": hungerValue,
            "hud.status.thirst.hideValue": thirstValue,
            "hud.status.radio.channel.visibility": radioChannelVisibility,
            "hud.vehicle.minimap.enabled": minimapEnabled,
            "hud.vehicle.minimap.default": defaultMinimap,
            "hud.vehicle.minimap.outline": minimapOutline,
            "hud.vehicle.speedometer.fps": 64, //speedometerFps,
            "hud.compass.enabled": compassEnabled,
            "hud.compass.fps": compassFps,
            "hud.compass.roadnames.enabled": streetNamesEnabled,
            "hud.blackbars.enabled": blackbarsEnabled,
            "hud.blackbars.value": blackbarsValue,
        })
        fetchNui('np-ui:setKVPValue', {
            key: "np-preferences",
            value: {
                "hud.misc.circle.taskbar.enabled": circleTaskbarEnabled,
                "hud.status.health.enabled": showHealth,
                "hud.status.armor.enabled": showArmor,
                "hud.status.hunger.enabled": showHunger,
                "hud.status.thirst.enabled": showThirst,
                "hud.status.oxygen.enabled": showOxygen,
                'hud.crosshair.enabled': crosshair,
                "hud.status.stress.enabled": showStress,
                "hud.status.enhancements.enabled": hideEnhancements,
                "hud.status.health.hideValue": healthValue,
                "hud.status.armor.hideValue": armorValue,
                "hud.status.hunger.hideValue": hungerValue,
                "hud.status.thirst.hideValue": thirstValue,
                "hud.status.radio.channel.visibility": radioChannelVisibility,
                "hud.vehicle.minimap.enabled": minimapEnabled,
                "hud.vehicle.minimap.default": defaultMinimap,
                "hud.vehicle.minimap.outline": minimapOutline,
                "hud.vehicle.speedometer.fps": 64, //speedometerFps,
                "hud.compass.enabled": compassEnabled,
                "hud.compass.fps": compassFps,
                "hud.compass.roadnames.enabled": streetNamesEnabled,
                "hud.compass.time.enabled": compassShowTime_,
                "hud.blackbars.enabled": blackbarsEnabled,
                "hud.blackbars.value": blackbarsValue,
                "phone.misc.brand": phoneBrand,
                "phone.misc.background": phoneBackground,
                "phone.misc.receive.sms": phoneReceiveSMS,
                "phone.misc.new.tweet": phoneNewTweet,
                "phone.misc.receive.email": phoneReceiveEmail,
                "phone.misc.embedded.images": phoneEmbeddedImages,
                'phone.volume': PhoneVolume,
                'radio.clicks.incoming.enabled': RadioClicksIncoming,
                'radio.clicks.outgoing.enabled': RadioClicksOutgoing,
                'radio.clicks.volume': RadioClicksVolume,
                'radio.volume': RadioVolume
            }
        })
    }

    const updateShowHealth = (bool: boolean) => {
        if (bool === true) {
            setShowHealth(true)
            setHealthDisplay(true)
            setHealthOpacity(1)
        } else {
            setShowHealth(false)
            setHealthOpacity(0)
            setTimeout(() => {
                setHealthDisplay(false)
            }, 2000)
        }
    }

    const updateShowArmor = (bool: boolean) => {
        if (bool === true) {
            setShowArmor(true)
            setArmorDisplay(true)
            setArmorOpacity(1)
        } else {
            setShowArmor(false)
            setArmorOpacity(0)
            setTimeout(() => {
                setArmorDisplay(false)
                setShowArmor(false)
            }, 2000)
        }
    }

    const updateShowHunger = (bool: boolean) => {
        if (bool === true) {
            setShowHunger(true)
            setHungerDisplay(true)
            setHungerOpacity(1)
        } else {
            setShowHunger(false)
            setHungerOpacity(0)
            setTimeout(() => {
                setHungerDisplay(false)
            }, 2000)
        }
    }

    const updateShowThirst = (bool: boolean) => {
        if (bool === true) {
            setShowThirst(true)
            setThirstDisplay(true)
            setThirstOpacity(1)
        } else {
            setShowThirst(false)
            setThirstOpacity(0)
            setTimeout(() => {
                setThirstDisplay(false)
            }, 2000)
        }
    }

    const updateShowOxygen = (bool: boolean) => {
        if (bool === true) {
            setShowOxygen(true)
            setOxygenDisplay(true)
            setOxygenOpacity(1)
        } else {
            setShowOxygen(false)
            setOxygenOpacity(0)
            setTimeout(() => {
                setOxygenDisplay(false)
            }, 2000)
        }
    }

    const updateShowStress = (bool: boolean) => {
        if (bool === true) {
            setShowStress(true)
            setStressDisplay(true)
            setStressOpacity(1)
        } else {
            setShowStress(false)
            setStressOpacity(0)
            setTimeout(() => {
                setStressDisplay(false)
            }, 2000)
        }
    }

    const updateHideEnhancements = (bool: boolean) => {
        if (bool === true) {
            setHideEnhancements(true)
            if (buffedHunger) {
                if (hungerDisplay && realHungerValue >= hungerValue) {
                    setHungerOpacity(0)
                    setTimeout(() => {
                        setHungerDisplay(false)
                    }, 2000)
                }
            }
            if (buffedStress) {
                if (stressDisplay && realStressValue <= 1) {
                    setStressOpacity(0)
                    setTimeout(() => {
                        setStressDisplay(false)
                    }, 2000)
                }
            }
        } else {
            setHideEnhancements(false)
            if (buffedHunger) {
                // console.log("hunger is buffed")
                // console.log("hungerDisplay", hungerDisplay)
                // console.log("realHungerValue", realHungerValue)
                // console.log("hungerValue", hungerValue)
                // console.log("realHunger is less than hungerValue", realHungerValue <= hungerValue)
                if (!hungerDisplay) {
                    setHungerDisplay(true)
                    setHungerOpacity(1)
                }
            }
            if (buffedStress) {
                if (!stressDisplay) {
                    setStressDisplay(true)
                    setStressOpacity(1)
                }
            }
        }
    }

    const updateHealthValue = (e: any, fromKeydown: boolean) => {
        let value = 0
        if (fromKeydown) {
            value = Number(e.target.value)
            // if (e.key !== 'Enter') return;
        } else {
            value = Number(e)
        }
        setHealthValue(value)
        setInputHealthValue(value)
        if (realHealthValue >= value && value !== 100) {
            setHealthOpacity(0)
            setHealthRed(false)
            setTimeout(() => {
                setHealthDisplay(false)
            }, 2000)
        } else {
            if (showHealth === true) {
                setHealthDisplay(true)
                setHealthOpacity(1)
            }
        }
    }

    const updateArmorValue = (e: any, fromKeydown: boolean) => {
        let value = 0
        if (fromKeydown) {
            value = Number(e.target.value)
            // if (e.key !== 'Enter') return;
        } else {
            value = Number(e)
        }
        setArmorValue(value)
        setInputArmorValue(value)
        if (realArmorValue >= value && value !== 100) {
            setArmorOpacity(0)
            setArmorRed(false)
            setTimeout(() => {
                setArmorDisplay(false)
            }, 2000)
        } else {
            if (showArmor === true) {
                setArmorDisplay(true)
                setArmorOpacity(1)
            }
        }
    }

    const updateHungerValue = (e: any, fromKeydown: boolean) => {
        let value = 0
        if (fromKeydown) {
            value = Number(e.target.value)
            // if (e.key !== 'Enter') return;
        } else {
            value = Number(e)
        }
        setHungerValue(value)
        setInputHungerValue(value)
        if (realHungerValue >= value && value !== 100) {
            setHungerOpacity(0)
            setHungerRed(false)
            setTimeout(() => {
                setHungerDisplay(false)
            }, 2000)
        } else {
            if (showHunger === true) {
                setHungerDisplay(true)
                setHungerOpacity(1)
            }
        }
    }

    const updateThirstValue = (e: any, fromKeydown: boolean) => {
        let value = 0
        if (fromKeydown) {
            value = Number(e.target.value)
            if (e.key !== 'Enter') return;
        } else {
            value = Number(e)
        }
        setThirstValue(value)
        setInputThirstValue(value)
        if (realThirstValue >= value && value !== 100) {
            setThirstOpacity(0)
            setThirstRed(false)
            setTimeout(() => {
                setThirstDisplay(false)
            }, 2000)
        } else {
            if (showThirst === true) {
                setThirstDisplay(true)
                setThirstOpacity(1)
            }
        }
    }

    /* Voice */
    const [realHealthValue, setRealHealthValue] = useState(0)
    const [healthValue, setHealthValue] = useState(99)
    const [inputHealthValue, setInputHealthValue] = useState(99)
    const [healthRed, setHealthRed] = useState(false)
    const [healthDisplay, setHealthDisplay] = useState(true)
    const [healthOpacity, setHealthOpacity] = useState(1)
    const [realArmorValue, setRealArmorValue] = useState(0)
    const [armorValue, setArmorValue] = useState(99)
    const [inputArmorValue, setInputArmorValue] = useState(99)
    const [armorRed, setArmorRed] = useState(false)
    const [armorDisplay, setArmorDisplay] = useState(true)
    const [armorOpacity, setArmorOpacity] = useState(1)
    const [realHungerValue, setRealHungerValue] = useState(0)
    const [hungerValue, setHungerValue] = useState(99)
    const [inputHungerValue, setInputHungerValue] = useState(99)
    const [hungerRed, setHungerRed] = useState(false)
    const [hungerDisplay, setHungerDisplay] = useState(true)
    const [hungerOpacity, setHungerOpacity] = useState(1)
    const [realThirstValue, setRealThirstValue] = useState(0)
    const [thirstValue, setThirstValue] = useState(99)
    const [inputThirstValue, setInputThirstValue] = useState(99)
    const [thirstRed, setThirstRed] = useState(false)
    const [thirstDisplay, setThirstDisplay] = useState(true)
    const [thirstOpacity, setThirstOpacity] = useState(1)
    const [oxygenDisplay, setOxygenDisplay] = useState(true)
    const [oxygenOpacity, setOxygenOpacity] = useState(1)
    const [realStressValue, setRealStressValue] = useState(0)
    const [stressDisplay, setStressDisplay] = useState(true)
    const [stressOpacity, setStressOpacity] = useState(1)

    /* CrossHair */
    const [crosshair, setCrosshair] = useState(false)


    type AppData = {
        action: string,
        buffedBikeStats: undefined | number | boolean,
        buffedOxygen: undefined | boolean,
        buffedHunger: undefined | boolean,
        buffedStress: undefined | boolean,
        buffedInt: undefined | number | boolean,
        buffedStrength: undefined | number | boolean,
        buffedJobpay: undefined | boolean,
        buffedAlertness: undefined | boolean,
        displayRadioChannel: undefined | boolean,
        displayAllForce: undefined | boolean,
        display: undefined | boolean,
        voiceRange: undefined | number,
        health: undefined | number,
        armor: undefined | number,
        hunger: undefined | number,
        thirst: undefined | number,
        oxygen: undefined | number,
        stress: undefined | number,
        fuel: undefined | number,
        altitudeShow: undefined | boolean,
        voiceActive: undefined | boolean,
        voiceActiveRadio: undefined | boolean,
        hasRadio: undefined | boolean,
        carHudShow: undefined | boolean,
        waypointActive: undefined | boolean,
        waypointDistance: undefined | number,
        beltShow: undefined | boolean,
        engineDamageShow: undefined | boolean,
        harnessDurability: undefined | number,
        showWeaponFireRate: undefined | boolean,
        showPing: undefined | boolean,
        pursuit: undefined | number,
        pursuitShow: undefined | boolean,
        harnessShow: undefined | boolean,
        nos: undefined | number,
        nosEnabled: undefined | boolean,
        nosShow: undefined | boolean,
        modeDev: undefined | boolean,
        modeGod: undefined | boolean,
        inVehicle: undefined | boolean,
        radioChannel: undefined | string,
        showCompass: undefined | boolean,
        showRoadNames: undefined | boolean,
        alt: undefined | number,
        area: undefined | string,
        street: undefined | string,
        heading: undefined | number,
        speed: undefined | number,
    }

    interface IUIMessage {
        data: AppData;
        app: string;
    }

    useNuiEvent<IUIMessage>('uiMessage', ({ data, app }) => {
        let appData = data

        if (app === "preferences") {
            if (appData["hud.misc.circle.taskbar.enabled"] !== undefined) {
                setCircleTaskbarEnabled(appData["hud.misc.circle.taskbar.enabled"])
            }
            if (appData["hud.status.health.enabled"] !== undefined) {
                setShowHealth(appData["hud.status.health.enabled"])
            }
            if (appData["hud.status.armor.enabled"] !== undefined) {
                setShowArmor(appData["hud.status.armor.enabled"])
            }
            if (appData["hud.status.hunger.enabled"] !== undefined) {
                setShowHunger(appData["hud.status.hunger.enabled"])
            }
            if (appData["hud.status.thirst.enabled"] !== undefined) {
                setShowThirst(appData["hud.status.thirst.enabled"])
            }
            if (appData["hud.status.oxygen.enabled"] !== undefined) {
                setShowOxygen(appData["hud.status.oxygen.enabled"])
            }
            if (appData["hud.status.stress.enabled"] !== undefined) {
                setShowStress(appData["hud.status.stress.enabled"])
            }
            if (appData["hud.status.enhancements.enabled"] !== undefined) {
                setHideEnhancements(appData["hud.status.enhancements.enabled"])
            }
            if (appData["hud.status.health.hideValue"] !== undefined) {
                updateHealthValue(appData["hud.status.health.hideValue"], false)
            }
            if (appData["hud.status.armor.hideValue"] !== undefined) {
                updateArmorValue(appData["hud.status.armor.hideValue"], false)
            }
            if (appData["hud.status.hunger.hideValue"] !== undefined) {
                updateHungerValue(appData["hud.status.hunger.hideValue"], false)
            }
            if (appData["hud.status.thirst.hideValue"] !== undefined) {
                updateThirstValue(appData["hud.status.thirst.hideValue"], false)
            }
            if (appData["hud.status.radio.channel.visibility"] !== undefined) {
                setRadioChannelVisibility(appData["hud.status.radio.channel.visibility"])
            }
            if (appData["hud.vehicle.minimap.enabled"] !== undefined) {
                setMinimapEnabled(appData["hud.vehicle.minimap.enabled"])
            }
            if (appData["hud.vehicle.minimap.default"] !== undefined) {
                setDefaultMinimap(appData["hud.vehicle.minimap.default"])
            }
            if (appData["hud.vehicle.minimap.outline"] !== undefined) {
                setMinimapOutline(appData["hud.vehicle.minimap.outline"])
            }
            if (appData["hud.vehicle.speedometer.fps"] !== undefined) {
                //setSpeedometerFps(appData["hud.vehicle.speedometer.fps"])
                setSpeedometerFps("64")
            }
            if (appData["hud.compass.enabled"] !== undefined) {
                setCompassEnabled(appData["hud.compass.enabled"])
            }
            if (appData["hud.compass.fps"] !== undefined) {
                setCompassFps(appData["hud.compass.fps"])
            }
            if (appData["hud.compass.roadnames.enabled"] !== undefined) {
                setStreetNamesEnabled(appData["hud.compass.roadnames.enabled"])
            }
            if (appData["hud.compass.time.enabled"] !== undefined) {
                setCompassShowTime(appData["hud.compass.time.enabled"])
            }
            if (appData["hud.blackbars.enabled"] !== undefined) {
                setBlackbarsEnabled(appData["hud.blackbars.enabled"])
            }
            if (appData["hud.blackbars.value"] !== undefined) {
                setBlackbarsValue(appData["hud.blackbars.value"])
            }
            if (appData["phone.misc.brand"] !== undefined) {
                setPhoneBrand(appData["phone.misc.brand"])
            }
            if (appData["phone.misc.background"] !== undefined) {
                setPhoneBackground(appData["phone.misc.background"])
            }
            if (appData["phone.misc.receive.sms"] !== undefined) {
                setPhoneReceiveSMS(appData["phone.misc.receive.sms"])
            }
            if (appData["phone.misc.new.tweet"] !== undefined) {
                setPhoneNewTweet(appData["phone.misc.new.tweet"])
            }
            if (appData["phone.misc.receive.email"] !== undefined) {
                setPhoneReceiveEmail(appData["phone.misc.receive.email"])
            }
            if (appData["phone.misc.embedded.images"] !== undefined) {
                setPhoneEmbeddedImages(appData["phone.misc.embedded.images"])
            }
        }
    })

    useNuiEvent<any>('toggleSettings', (data) => {
        if (data.show) {
            setCurTab(1)
            setShowSettings(true)
        }
    })

    useNuiEvent<any>('toggleCrosshair', (data) => {
        if (data.show) {
            if(crosshair){
                setShowCrosshair(true)
            }else{
                setShowCrosshair(false)
            }
        }else{
            setShowCrosshair(false)
        }
    })

    useEffect(() => {
        const handleEscapeKey = (event : any) => {
            if (event.code === 'Escape' && showSettings) {
                setShowSettings(false)
                fetchNui('np-ui:closeApp', {}).then(function (firstdata) {
                    if(true === firstdata.meta.ok){
                    fetchNui('np-ui:applicationClosed', {
                        name: 'preferences',
                        fromEscape: true,
                    }).then(function (data) {
                        if(true === data.meta.ok){
                            setShowSettings(false) 
                        }
                    })
                    }
                })
            }
        }
    
        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
      }, [showSettings, setShowSettings])


    return (
        <>
            <Grid container className={classes.root} style={{ display: showCrosshair ? '' : 'none', position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>
                <div className={classes.crosshairStyle}></div>
            </Grid>

            <Grid container className={classes.root} style={{ display: showSettings ? '' : 'none', justifyContent: 'center', alignItems: 'center' }}>
                <div className="hud-settings-container">
                    <div className="hud-settings-sidebar">
                        <div onClick={() => setCurTab(1)} className="hud-settings-sidebar-tab" style={{ backgroundColor: curTab === 1 ? 'rgb(34, 40, 49)' : 'rgb(48, 71, 94)' }}>
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1">HUD
                            </Typography>
                        </div>
                        <div onClick={() => setCurTab(2)} className="hud-settings-sidebar-tab null" style={{ backgroundColor: curTab === 2 ? 'rgb(34, 40, 49)' : 'rgb(48, 71, 94)' }}>
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1">Phone
                            </Typography>
                        </div>
                        <div onClick={() => setCurTab(3)} className="hud-settings-sidebar-tab null" style={{ backgroundColor: curTab === 3 ? 'rgb(34, 40, 49)' : 'rgb(48, 71, 94)' }}>
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1">Audio
                            </Typography>
                        </div>
                        <div onClick={() => setCurTab(4)} className="hud-settings-sidebar-tab null" style={{ backgroundColor: curTab === 4 ? 'rgb(34, 40, 49)' : 'rgb(48, 71, 94)' }}>
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1">Help
                            </Typography>
                        </div>
                    </div>
                    <div className="hud-settings-body">
                        <div className="hud-settings-hud-container" style={{ display: curTab === 1 ? 'flex' : 'none' }}>
                            <div>
                                <div className="hud-row-double">
                                    <div className="hud-row">
                                        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6">Preset
                                        </Typography>
                                        <FormControl className="formControlClass" variant="standard" fullWidth>
                                            <InputLabel id="demo-simple-select-label">Number</InputLabel>
                                            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Number"
                                                defaultValue="3"
                                                value={radioChannelVisibility}
                                                onChange={(e) => setRadioChannelVisibility(e.target.value)}
                                            >
                                                <MenuItem sx={{background:'#434243'}} value="1">1</MenuItem>
                                                <MenuItem value="2">2</MenuItem>
                                                <MenuItem value="2">3</MenuItem>
                                                <MenuItem value="2">4</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Typography sx={{width:'200%', marginTop:'20px'}} style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2">
                                            Save setting for the selected preset, and then use <span style={{background:'#CCCACA', color:'black'}}>/hud [:number]</span> where number is the selected presetm Currently <span style={{background:'#CCCACA', color:'black'}}>/hud 2</span>,
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <div>
                                            <Button onClick={saveHudSettings} size="small" color="success" variant="contained">Save</Button>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6">Farmers Market
                                </Typography>
                                <div className="hud-row">
                                    <FormGroup style={{marginTop: 16}} className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" checked={circleTaskbarEnabled} onChange={(e) => setCircleTaskbarEnabled(e.target.checked)} />} label="Disable dynamic banners (GREATLY improves performance)" />
                                    </FormGroup>
                                </div>
                            </div>
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6">World
                                </Typography>
                                <div className="hud-row">
                                    <FormGroup style={{marginTop: 16}} className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" checked={circleTaskbarEnabled} onChange={(e) => setCircleTaskbarEnabled(e.target.checked)} />} label="Disable Interact Prompts (Improves performance)" />
                                    </FormGroup>
                                    <FormGroup style={{marginTop: 16}} className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" checked={circleTaskbarEnabled} onChange={(e) => setCircleTaskbarEnabled(e.target.checked)} />} label="Disable Large Scene Text" />
                                    </FormGroup>
                                    <FormGroup style={{marginTop: 16}} className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" checked={circleTaskbarEnabled} onChange={(e) => setCircleTaskbarEnabled(e.target.checked)} />} label="Only Show Scenes While Peeking" />
                                    </FormGroup>
                                </div>
                            </div>
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word'}} variant="h6">Misc
                                </Typography>
                                <div className="hud-row">
                                    <FormGroup style={{marginTop: 16}} className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" checked={circleTaskbarEnabled} onChange={(e) => setCircleTaskbarEnabled(e.target.checked)} />} label="Enable Circle Taskbar" />
                                    </FormGroup>
                                    <FormGroup style={{marginTop: 16}} className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" checked={circleTaskbarEnabled} onChange={(e) => setCircleTaskbarEnabled(e.target.checked)} />} label="Enable /outfits Preview" />
                                    </FormGroup>
                                    <FormGroup style={{marginTop: 16}} className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" checked={circleTaskbarEnabled} onChange={(e) => setCircleTaskbarEnabled(e.target.checked)} />} label="Enable /outfits Camera" />
                                    </FormGroup>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6">Status
                                </Typography>
                                <div className="hud-row">
                                    <div className="hud-row-double">
                                        <div style={{ maxWidth: '35%' }}>
                                            <FormGroup className="hud-worppperrdvex">
                                                <FormControlLabel control={<Checkbox color="warning" checked={showHealth} onChange={(e) => updateShowHealth(e.target.checked)} />} label="Show Health" />
                                            </FormGroup>
                                        </div>
                                        <div className="input-wrapper" style={{ display: showHealth ? '' : 'none' }}>
                                            <FormControl fullWidth sx={{ width: '100%' }}>
                                                <TextField
                                                    sx={{
                                                        "& .MuiInput-root": {
                                                            color: "white !important",
                                                        },
                                                        "& label.Mui-focused": {
                                                            color: "darkgray !important"
                                                        },
                                                        "& Mui-focused": {
                                                            color: "darkgray !important"
                                                        },
                                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                            borderColor: "white !important"
                                                        },
                                                        "& .MuiInput-underline:before": {
                                                            borderColor: "darkgray !important",
                                                            color: "darkgray !important"
                                                        },
                                                        "& .MuiInput-underline:after": {
                                                            borderColor: "white !important",
                                                            color: "darkgray !important"
                                                        },
                                                        "& .Mui-focused:after": {
                                                            color: "darkgray !important",
                                                        },
                                                        "& .MuiInputAdornment-root": {
                                                            color: "darkgray !important",
                                                        }
                                                    }}
                                                    id="input-with-icon-textfield"
                                                    label="Hide when more than... (100 = never hide)"
                                                    variant="standard"
                                                    value={inputHealthValue}
                                                    onChange={(e) => setInputHealthValue(Number(e.target.value))}
                                                    onKeyDown={(e) => updateHealthValue(e, true)}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <i className="fas fa-percent"></i>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                                <div className="hud-row">
                                    <div className="hud-row-double">
                                        <div style={{ maxWidth: '35%' }}>
                                            <FormGroup className="hud-worppperrdvex">
                                                <FormControlLabel control={<Checkbox color="warning" checked={showArmor} onChange={(e) => updateShowArmor(e.target.checked)} />} label="Show Armor" />
                                            </FormGroup>
                                        </div>
                                        <div className="input-wrapper" style={{ display: showArmor ? '' : 'none' }}>
                                            <FormControl fullWidth sx={{ width: '100%' }}>
                                                <TextField
                                                    sx={{
                                                        "& .MuiInput-root": {
                                                            color: "white !important",
                                                        },
                                                        "& label.Mui-focused": {
                                                            color: "darkgray !important"
                                                        },
                                                        "& Mui-focused": {
                                                            color: "darkgray !important"
                                                        },
                                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                            borderColor: "white !important"
                                                        },
                                                        "& .MuiInput-underline:before": {
                                                            borderColor: "darkgray !important",
                                                            color: "darkgray !important"
                                                        },
                                                        "& .MuiInput-underline:after": {
                                                            borderColor: "white !important",
                                                            color: "darkgray !important"
                                                        },
                                                        "& .Mui-focused:after": {
                                                            color: "darkgray !important",
                                                        },
                                                        "& .MuiInputAdornment-root": {
                                                            color: "darkgray !important",
                                                        }
                                                    }}
                                                    id="input-with-icon-textfield"
                                                    label="Hide when more than... (100 = never hide)"
                                                    variant="standard"
                                                    value={inputArmorValue}
                                                    onChange={(e) => setInputArmorValue(Number(e.target.value))}
                                                    onKeyDown={(e) => updateArmorValue(e, true)}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <i className="fas fa-percent"></i>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                                <div className="hud-row">
                                    <div className="hud-row-double">
                                        <div style={{ maxWidth: '35%' }}>
                                            <FormGroup className="hud-worppperrdvex">
                                                <FormControlLabel control={<Checkbox color="warning" checked={showHunger} onChange={(e) => updateShowHunger(e.target.checked)} />} label="Show Food" />
                                            </FormGroup>
                                        </div>
                                        <div className="input-wrapper" style={{ display: showHunger ? '' : 'none' }}>
                                            <FormControl fullWidth sx={{ width: '100%' }}>
                                                <TextField
                                                    sx={{
                                                        "& .MuiInput-root": {
                                                            color: "white !important",
                                                        },
                                                        "& label.Mui-focused": {
                                                            color: "darkgray !important"
                                                        },
                                                        "& Mui-focused": {
                                                            color: "darkgray !important"
                                                        },
                                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                            borderColor: "white !important"
                                                        },
                                                        "& .MuiInput-underline:before": {
                                                            borderColor: "darkgray !important",
                                                            color: "darkgray !important"
                                                        },
                                                        "& .MuiInput-underline:after": {
                                                            borderColor: "white !important",
                                                            color: "darkgray !important"
                                                        },
                                                        "& .Mui-focused:after": {
                                                            color: "darkgray !important",
                                                        },
                                                        "& .MuiInputAdornment-root": {
                                                            color: "darkgray !important",
                                                        }
                                                    }}
                                                    id="input-with-icon-textfield"
                                                    label="Hide when more than... (100 = never hide)"
                                                    variant="standard"
                                                    value={inputHungerValue}
                                                    onChange={(e) => setInputHungerValue(Number(e.target.value))}
                                                    onKeyDown={(e) => updateHungerValue(e, true)}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <i className="fas fa-percent"></i>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                                <div className="hud-row">
                                    <div className="hud-row-double">
                                        <div style={{ maxWidth: '35%' }}>
                                            <FormGroup className="hud-worppperrdvex">
                                                <FormControlLabel control={<Checkbox color="warning" checked={showThirst} onChange={(e) => updateShowThirst(e.target.checked)} />} label="Show Water" />
                                            </FormGroup>
                                        </div>
                                        <div className="input-wrapper" style={{ display: showThirst ? '' : 'none' }}>
                                            <FormControl fullWidth sx={{ width: '100%' }}>
                                                <TextField
                                                    sx={{
                                                        "& .MuiInput-root": {
                                                            color: "white !important",
                                                        },
                                                        "& label.Mui-focused": {
                                                            color: "darkgray !important"
                                                        },
                                                        "& Mui-focused": {
                                                            color: "darkgray !important"
                                                        },
                                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                            borderColor: "white !important"
                                                        },
                                                        "& .MuiInput-underline:before": {
                                                            borderColor: "darkgray !important",
                                                            color: "darkgray !important"
                                                        },
                                                        "& .MuiInput-underline:after": {
                                                            borderColor: "white !important",
                                                            color: "darkgray !important"
                                                        },
                                                        "& .Mui-focused:after": {
                                                            color: "darkgray !important",
                                                        },
                                                        "& .MuiInputAdornment-root": {
                                                            color: "darkgray !important",
                                                        }
                                                    }}
                                                    id="input-with-icon-textfield"
                                                    label="Hide when more than... (100 = never hide)"
                                                    variant="standard"
                                                    value={inputThirstValue}
                                                    onChange={(e) => setInputThirstValue(Number(e.target.value))}
                                                    onKeyDown={(e) => updateThirstValue(e, true)}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <i className="fas fa-percent"></i>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                                <div className="hud-row">
                                    <div className="hud-row-double">
                                        <div style={{ maxWidth: '35%' }}>
                                            <FormGroup className="hud-worppperrdvex">
                                                <FormControlLabel control={<Checkbox color="warning" checked={showHealth} onChange={(e) => updateShowHealth(e.target.checked)} />} label="Body Health (Hardcore)" />
                                            </FormGroup>
                                        </div>
                                        <div className="input-wrapper" style={{ display: showHealth ? '' : 'none' }}>
                                            <FormControl fullWidth sx={{ width: '100%' }}>
                                                <TextField
                                                    sx={{
                                                        "& .MuiInput-root": {
                                                            color: "white !important",
                                                        },
                                                        "& label.Mui-focused": {
                                                            color: "darkgray !important"
                                                        },
                                                        "& Mui-focused": {
                                                            color: "darkgray !important"
                                                        },
                                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                            borderColor: "white !important"
                                                        },
                                                        "& .MuiInput-underline:before": {
                                                            borderColor: "darkgray !important",
                                                            color: "darkgray !important"
                                                        },
                                                        "& .MuiInput-underline:after": {
                                                            borderColor: "white !important",
                                                            color: "darkgray !important"
                                                        },
                                                        "& .Mui-focused:after": {
                                                            color: "darkgray !important",
                                                        },
                                                        "& .MuiInputAdornment-root": {
                                                            color: "darkgray !important",
                                                        }
                                                    }}
                                                    id="input-with-icon-textfield"
                                                    label="Hide when more than... (100 = never hide)"
                                                    variant="standard"
                                                    value={inputHealthValue}
                                                    onChange={(e) => setInputHealthValue(Number(e.target.value))}
                                                    onKeyDown={(e) => updateHealthValue(e, true)}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <i className="fas fa-percent"></i>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                                <div className="hud-row">
                                    <div className="hud-row-double">
                                        <FormGroup className="hud-worppperrdvex">
                                            <FormControlLabel control={<Checkbox color="warning" checked={showStress} onChange={(e) => updateShowStress(e.target.checked)} />} label="Show Stress when relevant" />
                                        </FormGroup>
                                        <FormGroup className="hud-worppperrdvex">
                                            <FormControlLabel control={<Checkbox color="warning" checked={showOxygen} onChange={(e) => updateShowOxygen(e.target.checked)} />} label="Show Oxygen when relevant" />
                                        </FormGroup>
                                        <FormGroup className="hud-worppperrdvex">
                                            <FormControlLabel control={<Checkbox color="warning" checked={hideEnhancements} onChange={(e) => updateHideEnhancements(e.target.checked)} />} label="Hide Enhancements" />
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="hud-row">
                                    <FormControl className="formControlClass" variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Radio Channel Visibility</InputLabel>
                                        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Radio Channel Visibility"
                                            defaultValue="3"
                                            value={radioChannelVisibility}
                                            onChange={(e) => setRadioChannelVisibility(e.target.value)}
                                        >
                                            <MenuItem value="1">Never</MenuItem>
                                            <MenuItem value="2">Always</MenuItem>
                                            <MenuItem value="3">Relevant</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6">Vehicle
                                </Typography>
                                <div className="hud-row">
                                    <div className="jss1417 hud-row-double">
                                        <div>
                                            <FormGroup className="hud-worppperrdvex">
                                                <FormControlLabel control={<Checkbox color="warning" checked={minimapEnabled} onChange={(e) => setMinimapEnabled(e.target.checked)} />} label="Minimap Enabled" />
                                            </FormGroup>
                                        </div>
                                        <div style={{ display: minimapEnabled ? '' : 'none' }}>
                                            <FormControl className="formControlClass" variant="standard" fullWidth>
                                                <InputLabel id="demo-simple-select-label">Speedometer FPS</InputLabel>
                                                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Speedometer FPS"
                                                    defaultValue="16"
                                                    value={speedometerFps}
                                                    onChange={(e) => setSpeedometerFps(e.target.value)}
                                                >
                                                    <MenuItem value="64">15</MenuItem>
                                                    <MenuItem value="32">30</MenuItem>
                                                    <MenuItem value="24">45</MenuItem>
                                                    <MenuItem value="16">60</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2">The higher the FPS, the more demanding this is on your
                                                machine
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="jss1418 hud-row">
                                        <FormGroup className="hud-worppperrdvex">
                                            <FormControlLabel control={<Checkbox color="warning" checked={defaultMinimap} onChange={(e) => setDefaultMinimap(e.target.checked)} />} label="Use Default Minimap (may require game restart)" />
                                        </FormGroup>
                                    </div>
                                    <div className="jss1418 hud-row">
                                        <FormGroup className="hud-worppperrdvex">
                                            <FormControlLabel control={<Checkbox color="warning" checked={minimapOutline} onChange={(e) => setMinimapOutline(e.target.checked)} />} label="Show Minimap Outline" />
                                        </FormGroup>
                                    </div>
                                </div>
                                
                                <div className="hud-row">
                                    <FormGroup className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" />} label="Show Harness durability" />
                                    </FormGroup>
                                </div>
                               
                                
                                <div className="hud-row">
                                    <div className="jss1417 hud-row-double">
                                        <FormGroup className="hud-worppperrdvex">
                                            <FormControlLabel control={<Checkbox color="warning" />} label="Show Nitrous levels" />
                                        </FormGroup>
                                        <FormGroup className="hud-worppperrdvex">
                                            <FormControlLabel control={<Checkbox color="warning" />} label="Show Nitrous trail" />
                                        </FormGroup>
                                    </div>
                                </div>
                               
                            </div>
                            <hr />
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6">Compass
                                </Typography>
                                <div className="hud-row">
                                    <div className="jss1417 hud-inner-row">
                                        <div>
                                            <FormGroup className="hud-worppperrdvex">
                                                <FormControlLabel control={<Checkbox color="warning" checked={compassEnabled} onChange={(e) => setCompassEnabled(e.target.checked)} />} label="Enabled" />
                                            </FormGroup>
                                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2">Disabling the compass entirely can vastly improve
                                                performance
                                            </Typography>
                                        </div>
                                        <div style={{ display: compassEnabled ? '' : 'none' }}>
                                            <FormControl className="formControlClass" variant="standard" fullWidth>
                                                <InputLabel id="demo-simple-select-label">Compass FPS</InputLabel>
                                                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Compass FPS"
                                                    defaultValue="16"
                                                    value={compassFps}
                                                    onChange={(e) => setCompassFps(e.target.value)}
                                                >
                                                    <MenuItem value="64">15</MenuItem>
                                                    <MenuItem value="32">30</MenuItem>
                                                    <MenuItem value="24">45</MenuItem>
                                                    <MenuItem value="16">60</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2">The higher the FPS, the more demanding this is on your
                                                machine
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                                {/*
                                <div className="hud-row">
                                    <FormGroup className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" />} label="Show the current time with the compass" />
                                    </FormGroup>
                                </div>
                                */}
                                <div className="hud-row">
                                    <FormGroup className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" checked={compassShowTime_} onChange={(e) => setCompassShowTime(e.target.checked)} />} label="Show the current time with the compass" />
                                    </FormGroup>
                                </div>
                                <div className="hud-row">
                                    <FormGroup className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" checked={streetNamesEnabled} onChange={(e) => setStreetNamesEnabled(e.target.checked)} />} label="Show street names when in a vehicle" />
                                    </FormGroup>
                                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2">Disabling this can help improve performance
                                    </Typography>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6">Black Bars
                                </Typography>
                                <div className="hud-row">
                                    <FormGroup className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" checked={blackbarsEnabled} onChange={(e) => setBlackbarsEnabled(e.target.checked)} />} label="Enabled" />
                                    </FormGroup>
                                </div>
                                <div className="hud-row">
                                    <div className="input-wrapper">
                                        <FormControl fullWidth sx={{ width: '100%' }}>
                                            <TextField
                                                sx={{
                                                    "& .MuiInput-root": {
                                                        color: "white !important",
                                                    },
                                                    "& label.Mui-focused": {
                                                        color: "darkgray !important"
                                                    },
                                                    "& Mui-focused": {
                                                        color: "darkgray !important"
                                                    },
                                                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                        borderColor: "white !important"
                                                    },
                                                    "& .MuiInput-underline:before": {
                                                        borderColor: "darkgray !important",
                                                        color: "darkgray !important"
                                                    },
                                                    "& .MuiInput-underline:after": {
                                                        borderColor: "white !important",
                                                        color: "darkgray !important"
                                                    },
                                                    "& .Mui-focused:after": {
                                                        color: "darkgray !important",
                                                    },
                                                    "& .MuiInputAdornment-root": {
                                                        color: "darkgray !important",
                                                    }
                                                }}
                                                id="input-with-icon-textfield"
                                                label="Percentage of screen"
                                                variant="standard"
                                                value={blackbarsValue}
                                                onChange={(e) => setBlackbarsValue(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <i className="fas fa-mask fa-w-20 fa-fw"></i>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6">Crosshair
                                </Typography>
                                <div className="hud-row">
                                    <FormGroup className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" checked={crosshair} onChange={(e) => setCrosshair(e.target.checked)} />} label="Enabled" />
                                    </FormGroup>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6">Golf Ball Camera
                                </Typography>
                                <div className="hud-row">
                                    <FormGroup className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" checked={crosshair} onChange={(e) => setCrosshair(e.target.checked)} />} label="Enabled" />
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                        <div className="hud-settings-phone-container" style={{ display: curTab === 2 ? 'flex' : 'none' }}>
                            <div>
                                <div className="hud-row-double">
                                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6">Misc
                                    </Typography>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <div>
                                            <Button onClick={saveHudSettings} size="small" color="success" variant="contained">Save</Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="hud-row">
                                    <FormControl className="formControlClass" variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                                        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Brand"
                                            defaultValue="android"
                                            value={phoneBrand}
                                            onChange={(e) => setPhoneBrand(e.target.value)}
                                        >
                                            <MenuItem value="ios">iOS</MenuItem>
                                            <MenuItem value="android">Android</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="hud-row">
                                    <div className="input-wrapper">
                                        <FormControl fullWidth sx={{ width: '100%' }}>
                                            <TextField
                                                sx={{
                                                    "& .MuiInput-root": {
                                                        color: "white !important",
                                                    },
                                                    "& label.Mui-focused": {
                                                        color: "darkgray !important"
                                                    },
                                                    "& Mui-focused": {
                                                        color: "darkgray !important"
                                                    },
                                                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                        borderColor: "white !important"
                                                    },
                                                    "& .MuiInput-underline:before": {
                                                        borderColor: "darkgray !important",
                                                        color: "darkgray !important"
                                                    },
                                                    "& .MuiInput-underline:after": {
                                                        borderColor: "white !important",
                                                        color: "darkgray !important"
                                                    },
                                                    "& .Mui-focused:after": {
                                                        color: "darkgray !important",
                                                    },
                                                    "& .MuiInputAdornment-root": {
                                                        color: "darkgray !important",
                                                    }
                                                }}
                                                id="input-with-icon-textfield"
                                                label="Background URL (1:2.2 res)"
                                                variant="standard"
                                                value={phoneBackground}
                                                onChange={(e) => setPhoneBackground(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <i className="fas fa-images fa-w-20 fa-fw"></i>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6">Notifications
                                </Typography>
                                <div className="hud-row">
                                    <FormGroup className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" checked={phoneReceiveSMS} onChange={(e) => setPhoneReceiveSMS(e.target.checked)} />} label="Receive SMS" />
                                    </FormGroup>
                                </div>
                                <div className="hud-row">
                                    <FormGroup className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" checked={phoneNewTweet} onChange={(e) => setPhoneNewTweet(e.target.checked)} />} label="New Tweet" />
                                    </FormGroup>
                                </div>
                                <div className="hud-row">
                                    <FormGroup className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" checked={phoneReceiveEmail} onChange={(e) => setPhoneReceiveEmail(e.target.checked)} />} label="Receive Email" />
                                    </FormGroup>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6">Images
                                </Typography>
                                <div className="hud-row">
                                    <FormGroup className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" checked={phoneEmbeddedImages} onChange={(e) => setPhoneEmbeddedImages(e.target.checked)} />} label="Embedded Images Enabled" />
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                        <div className="hud-settings-phone-container" style={{ display: curTab === 3 ? 'flex' : 'none' }}>
                            <div className="hud-row-double">
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6">Misc
                                </Typography>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <div>
                                        <Button onClick={saveHudSettings} size="small" color="success" variant="contained">Save</Button>
                                    </div>
                                </div>
                            </div>
                            <div>

                                <div className="hud-row">
                                    <FormGroup className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" checked={RadioClicksOutgoing} onChange={(e) => setRadioClicksOutgoing(e.target.checked)} />} label="VoIP: Radio Clicks (Outgoing)" />
                                    </FormGroup>
                                </div>
                                <div className="hud-row">
                                    <FormGroup className="hud-worppperrdvex">
                                        <FormControlLabel control={<Checkbox color="warning" checked={RadioClicksIncoming} onChange={(e) => setRadioClicksIncoming(e.target.checked)} />} label="VoIP: Radio Clicks (Incoming)" />
                                    </FormGroup>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6">Volume
                                </Typography>

                                <Typography style={{ color: '#fff', fontWeight: 'normal', fontSize: '15px', wordBreak: 'break-word' }} variant="h6">Radio
                                </Typography>
                                <Slider
                                    size="small"
                                    defaultValue={RadioVolume}
                                    onChange={(event: Event, newValue: number | number[]) => {
                                        if (typeof newValue === 'number') {
                                            setRadioVolume(newValue)
                                        }
                                      }}
                                    step={10}
                                    min={0}
                                    max={100}                                  
                                />
                            
                                <Typography style={{ color: '#fff', fontWeight: 'normal', fontSize: '15px', wordBreak: 'break-word' }} variant="h6">Radio Clicks
                                </Typography>
                                <Slider
                                    size="small"
                                    defaultValue={RadioClicksVolume}
                                    onChange={(event: Event, newValue: number | number[]) => {
                                        if (typeof newValue === 'number') {
                                            setRadioClicksVolume(newValue)
                                        }
                                      }}
                                    step={10}
                                    min={0}
                                    max={100}                                  
                                />
                                <Typography style={{ color: '#fff', fontWeight: 'normal', fontSize: '15px', wordBreak: 'break-word' }} variant="h6">Phone
                                </Typography>
                                <Slider
                                    size="small"
                                    defaultValue={PhoneVolume}
                                    onChange={(event: Event, newValue: number | number[]) => {
                                        if (typeof newValue === 'number') {
                                          setPhoneVolume(newValue)
                                        }
                                      }}
                                    step={10}
                                    min={0}
                                    max={100}                                  
                                />
                            </div>
                        </div>
                        <div className="hud-settings-phone-container" style={{ display: curTab === 4 ? 'flex' : 'none' }}>
                            <div>
                                <div style={{
                                    padding: 16,
                                    backgroundColor: '#30475e',
                                    marginBottom: 16,
                                }}>
                                    <Typography style={{ color: '#fff', fontWeight: 'normal', fontSize: '15px', wordBreak: 'break-word' }} variant="h6">
                                        FPS Capping for UI lag:
                                        <br />
                                        <br />
                                        https://www.nopixel.net/upload/index.php?threads/fps-capping-for-improved-ui-performance.158070/
                                    </Typography>
                                </div>
                            </div>
                            <div>
                                <div style={{
                                    padding: 16,
                                    backgroundColor: '#30475e',
                                    marginBottom: 16,
                                }}><Typography style={{ color: '#fff', fontWeight: 'normal', fontSize: '15px', wordBreak: 'break-word' }} variant="h6">
                                    Finding your Windows Communication Device
                                    <br />
                                    <br />
                                    https://www.nopixel.net/upload/index.php?threads/proper-mic-settings-for-nopixel-3-0-radio-phone.158075/
                                </Typography></div>
                            </div>
                            
                           
                        </div>
                    </div>
                </div>
            </Grid>
        </>
    );
}

export default Preferences;