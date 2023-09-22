import React, { useState, useEffect } from 'react'
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from "@material-ui/styles";
import { fetchNui } from '../../../../utils/fetchNui'

const Contracts = (props) => {
    const [Remove, setRemove] = useState(true);
    const [Transfer, setTransfer] = useState(false);
    const [Start, setStart] = useState(false);
    const [step, setstep] = useState(false);
    const [step2, setstep2] = useState(false);
    const [step3, setstep3] = useState(false);
    const [IsVin, setIsVin] = useState(false);
    const [IsInProgress, setIsInProgress] = useState(false);
    const [imputValue, setimputValue] = useState("")
    const [counter, setCounter] = useState(props.expires || 30);
    const [update, setUpdate] = useState(99999);
    const [freezetimer, setfreezetimer] = useState(false);

    const sendExpireEvent = () => {
        fetchNui('arp-boosting:DeclineContract', { props, IsInProgress })
        setRemove(false);
    }

    const updateTimer = (updates) => {
        clearInterval(updates);
        fetchNui('arp-boosting:updateTime', { props, counter })
    }

    useEffect(() => {
        const timer = counter > 0 && !freezetimer && Remove && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    useEffect(() => {
        if (counter === 0) {
            sendExpireEvent()
        }
    }, [counter])

    useEffect(() => {
        const updates = update > 0 && !freezetimer && Remove && setInterval(() => setUpdate(update - 1), 120000);
        return () => updateTimer(updates);
    }, [update]);



    useEffect(() => {
        const EventListener = (event) => {
            if (event.data) {
                Provider(event.data)
            }
        }
        window.addEventListener("message", EventListener)
    }, [])


    const cancelContract = () => {
        fetchNui('arp-boosting:cancelContract', { props, IsInProgress })
        setRemove(false);
    }

    const DeclineContract = () => {
        fetchNui('arp-boosting:DeclineContract', { props, IsInProgress })
        setRemove(false);
    }


    const Provider = (data) => {
        if (data.action === "UpdateValueUI") {
            if (data.app === "SetDisableButtons") {
                setIsInProgress(false)
            } else if (data.app === "RemoveContractInfo") {
                if (data.data.IdToRemove === props.id) {
                    setRemove(false);
                }
            }
        }
    }

    const startContract = () => {
        setTransfer(false);
        setStart(true);
        setstep3(false)
        setfreezetimer(true)
        setTimeout(() => {
            setstep(false)
            setStart(false);
            fetchNui('arp-boosting:startContract', {
                props, IsVin
            }).then((resp) => {
                if (resp.Contract) {
                    setIsInProgress(true)
                    props.AffectArray(props.id)
                } else {
                    setfreezetimer(false)
                    setIsInProgress(false)
                }
            });
        }, 3000);
    }

    const handleInputChange = (e: any) => {
        setimputValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (imputValue.trim().length > 0) {
            setTransfer(false);
            setRemove(false);
            fetchNui('arp-boosting:transferContract', { props, imputValue })
        }
    }

    const transferContract = () => {
        setstep(true)
        setTransfer(true)
    }

    const vinOrScratch = () => {
        setstep2(true)
        setstep(true)
    }

    const ResetContractBtn = () => {
        setstep(false)
        setstep2(false)
        setstep3(false)
        setIsVin(false)
        setTransfer(false)
    }

    const enableStartC = (bool) => {
        setstep2(false)
        setstep(true)
        setstep3(true)
        setIsVin(bool)
    }

    const useStyles = makeStyles({
        root: {
            "& .MuiInput-underline:after": {
                borderBottomColor: "white"
            },
            "& .MuiInput-underline:before": {
                borderBottomColor: "white"
            },
            "& .MuiInput-underline:hover:not(.Mui-focused):before": {
                borderBottomColor: "white"
            },
            '& .MuiInputBase-root': {
                color: 'white',
            },

        },
    });
    const classes = useStyles();
    return (
        <>
            {Remove &&
                <div className='ContractsInformationContainter'>
                    <Slide direction="down" in={Transfer} mountOnEnter unmountOnExit>
                        <div className='setInputZone'>

                            <div className='closeremoveContainer'>
                                <button className='closeRemove' onClick={ResetContractBtn}><i className="fas fa-times" style={{ color: "white" }}></i></button>
                            </div>

                            <div className='transferinfo'>Are you sure you want to transfer the contract?</div>
                            <div className='submitfix'>
                                <form onSubmit={handleSubmit} autoComplete="off">
                                    <TextField
                                        className="textfix"
                                        id="input-with-icon-textfield"
                                        label="Enter ID"
                                        classes={classes}
                                        onChange={handleInputChange}
                                        // key={handleInputChange}
                                        InputLabelProps={{ style: { color: 'white' } }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <i className="fas fa-people-arrows" style={{ color: "white" }}></i>
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                    />
                                </form>
                            </div>
                        </div>
                    </Slide>
                    <Slide direction="down" in={Start} mountOnEnter unmountOnExit>
                        <div className='startContracZone'>
                            <h1 style={{ fontSize: '1.2rem' }}>Starting Contract...</h1>
                            <img alt="img" src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" width="64" height="64" />
                        </div>
                    </Slide>

                    {step ?
                        <></>
                        :
                        <>
                            <div className='typeContainer' style={{ marginTop: '10px' }}>
                                <span className='typeReal'>{`${props.type}`}</span>
                            </div>

                            <div className='infoContainer1'>
                                <div style={{ marginTop: '4%' }}>{`${props.owner}`}</div>
                                <div style={{ marginTop: '4%' }}><b>{`${props.vehicle}`}</b></div>
                                <div style={{ marginTop: '4%' }}>{`Buy in: ${props.units} GNE`}</div>
                                <div style={{ marginTop: '4%' }}>Expires in:<span style={{ color: 'green' }}>
                                    <span> {`${Math.floor(Math.round(counter) / (60 * 60))}h ${Math.floor(Math.round(counter) % (60 * 60) / 60)}m ${Math.ceil(Math.round(counter) % (60 * 60) % 60)}s`}</span>
                                </span>
                                </div>
                            </div>
                            <div className='buttonContractsInformationContainer'>
                                {props.status ?

                                    <>
                                        <button disabled={true} onClick={vinOrScratch} className='DisabledButtons'>Contract In Progress</button>
                                        <button disabled={true} onClick={transferContract} className='DisabledButtons'>Transfer Contract</button>
                                        <button onClick={cancelContract} className='CancelButton'>Cancel Contract</button>
                                    </>
                                    :
                                    <>
                                        <button disabled={props.disableButtons} onClick={vinOrScratch} className='ContractsButon'>Start Contract</button>
                                        <button disabled={props.disableButtons} onClick={transferContract} className='ContractsButon'>Transfer Contract</button>
                                        <button disabled={props.disableButtons} onClick={DeclineContract} className='ContractsButon'>Decline Contract</button>
                                    </>
                                }
                            </div>
                        </>
                    }
                    {!step2 ?
                        <>
                        </>
                        :
                        <>
                            <div className='closeremoveContainer'>
                                <button className='closeRemove' onClick={ResetContractBtn}><i className="fas fa-times" style={{ color: "white" }}></i></button>
                            </div>

                            <div className='infoContainer1'>
                                <div style={{ marginTop: '4%', fontSize: '20px' }}><b>{`Select Type`}</b></div>
                                <div style={{ marginTop: '4%', fontSize: '0.9rem', color: '#a1a1a1' }}>{`If you choose vin scratch it will cost and additional ${props.ExtraVin} GNE to claim ownership.`}</div>
                                <button onClick={() => { enableStartC(true) }} className='ContractsButon' style={{ top: '25px', left: '0%' }}>Vin Scratch</button>
                                <button onClick={() => { enableStartC(false) }} className='ContractsButon' style={{ top: '25px', left: '0%' }}>Normal Dropoff</button>
                            </div>
                        </>
                    }
                    {!step3 ?
                        <>
                        </>
                        :
                        <>
                            <div className='infoContainer1' style={{marginTop: '70px'}}>
                                <div style={{ marginTop: '4%', fontSize: '20px' }}><b>{`Start Contract?`}</b></div>
                                <button onClick={startContract} className='ContractsButon' style={{ top: '25px', left: '0%' }}>Continue</button>
                                <button onClick={ResetContractBtn} className='ContractsButon' style={{ top: '25px', left: '0%' }}>Cancel</button>
                            </div>
                        </>
                    }
                </div>
            }
        </>
    )
}

export default Contracts
