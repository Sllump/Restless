    import React, {useState, useEffect, useRef} from 'react'
    import Slide from '@mui/material/Slide';
    import { ProgressBar } from './ProgressBar';
    import Contracts from './Contracts';
    import {fetchNui} from '../../../../utils/fetchNui'
    import Draggable from "react-draggable";
    const BoostingApp = React.memo(({counter, setCounter}: any) => {
        const ref = useRef()
        const [ContractsInformation, setContractsInformation] = useState([
            {
                expires: 100000,
                type: 'A',
                vehicle: 'test',
                owner: 'test test',
                units: 200,
                ExtraVin: 'test',
            }
        ])
        const [disableButtons, SetdisableButtons] = useState(false)
        const [IsInQueue, SetIsInQueue] = useState(false)
        const [Level, setLevel] = useState(80)
        //const [Gne, setGne] = useState(0)
        const [ExtraVin, SetExtraVin] = useState(0)
        const [Type1, serType1] = useState('A')
        const [Type2, serType2] = useState('B')

        const CloseApp = () => {
            setCounter(false);
        }

        const AffectArray = (id) => {
            const array: any = [...ContractsInformation]
            const indexOfTaskToDelete = array.findIndex(
                (task: any) => task.id === id
            );
            array[indexOfTaskToDelete].status = true;
            setContractsInformation(array);
        }

        const Provider = (data) => {
            if (data.action === "UpdateValueUI") {
                if (data.app === "ContractsBoosting") {
                    setContractsInformation(cats => [...cats, data.data.contracts])
                }else if (data.app === "SetBoostingLevel") {
                    serType1(data.data.type1)
                    serType2(data.data.type2)
                    setLevel(data.data.level)
                    //setGne(data.data.gne)
                }else if (data.app === "SetDisableButtons") {
                    SetdisableButtons(data.data.enableButtons)
                }else if (data.app === "SetExtraVin") {
                    SetExtraVin(data.data.ExtraVin)
                }
            }
        }
        
        useEffect(() => {
            const EventListener = (event) => {
                if (event.data) {
                Provider(event.data)
                }
            }
            window.addEventListener("message", EventListener)
        }, [])
        
        const QueueFunction = (bool) => {
            SetIsInQueue(bool)
            fetchNui('arp-boosting:JoinQueue', {queue: bool})
        }

        return (
            <div>
                <Draggable defaultPosition={{x: -650, y: -400}} ref={ref} handle=".boosting-b-buttons">
                    <div className={counter ? '' : 'hiddenComponent'}>
                        <div className='browser1' ref={ref}>
                            <div className='boosting-b-buttons'>
                                <div className="texto boosting-text" style={{fontWeight: 600}}>Boosting Contracts</div>
                                <div className='boosting-close-container'>
                                    <button className="btn min-btn" key={"cmin-btn"}/>
                                    <button className="btn close-btn" key={"cclose-btn"} onClick={CloseApp}/>
                                </div>
                            </div>
                            <div className='boostin-buttons'>
                                <button disabled={disableButtons} className='butMycontracts'  key='ContractOpen1'>MY CONTRACTS</button>
                                { IsInQueue ?
                                    <button onClick={() => QueueFunction(false)} className='butMyqueue' key='ContractOpen2'>LEAVE QUEUE</button>
                                    :
                                    <button onClick={() => QueueFunction(true)} disabled={disableButtons} className='butMyqueue' key='ContractOpen3'>JOIN QUEUE</button>
                                }
                            </div>

                            <div className='gholsi'>
                                <div className='contracts_container'>
                                    <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                                        <div className='levelProggres1'>{Type1}</div>
                                        <ProgressBar completed={Level}/>
                                        <div className='levelProggres1'>{Type2}</div>
                                    </div>
                                    <div className='centerContainer'>
                                        <div className='contractsContainers'>
                                            {ContractsInformation.map( (bg: any) => (
                                                <Contracts 
                                                    disableButtons={disableButtons} 
                                                    id={bg.id} 
                                                    vehicle={bg.vehicle} 
                                                    type={bg.type} 
                                                    owner={bg.owner} 
                                                    expires={bg.expires} 
                                                    units={bg.units} 
                                                    coords={bg.coords} 
                                                    identifier={bg.identifier} 
                                                    status={bg.status} 
                                                    ExtraVin={ExtraVin} 
                                                    AffectArray={AffectArray}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <p className='GNE'>{`Your GNE ${Gne}`}</p> */}
                        </div>
                    </div>
                </Draggable>
            </div>
        )
    })

    export default BoostingApp