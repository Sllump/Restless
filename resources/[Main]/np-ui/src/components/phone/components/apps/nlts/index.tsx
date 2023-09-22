import React from 'react';
import { Typography, Tooltip } from '@mui/material';
import { useRecoilState } from 'recoil';
import { 
    activeHoverIdState,
    phoneNltsDrivers
} from '../../../../../../src/store';

import '../../index.css';

const NltsApp: React.FC = () => {
    const [hoverId, setHoverId] = useRecoilState(activeHoverIdState)
    const [nltsDriver, setNltsDrivers]: any = useRecoilState(phoneNltsDrivers)

    const handleHoverActive = (e: any) => {
        setHoverId(e.currentTarget.id)
    }
    
    const handleHoverNotActive = () => {
        setHoverId("")
    }
    return (
        <>
            <div className='nltstaxi-container'>
                <div className="nltstaxi-driverslist" style={{ zIndex: 500 }}>
                    <img className='logo' src="https://dvexdev.github.io/DveX.Images/top_logo.png" alt="logo" />
                    <div className='banner'><Typography style={{color: '#fff',wordBreak: 'break-word'}} variant='body1'>Available Teslas</Typography></div>
                    <div className='drivers'>
                        {nltsDriver.map((data) => {
                            return (
                                <div className='driver'>
                                    <div id={data.name} style={{padding:'20px'}} className='component-paper cursor-pointer' onMouseEnter={handleHoverActive} onMouseLeave={handleHoverNotActive}>
                                        <div className='main-container'>  
                                            <div className='details'>
                                                <div className='title'>
                                                    <Typography style={{ color: '#fff', wordBreak: 'break-word', fontSize:'15px', fontWeight:'bold'}} variant="body2">
                                                        {data.name}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div className='image'>
                                                <Typography style={{ color: '#fff', wordBreak: 'break-word'}} variant="body2">
                                                    <span className={'status '+data.status}>{data.status}</span>
                                                </Typography>
                                            </div>
                                            <div className={hoverId?.toString() === data?.name?.toString() ? "actions actions-show" : "actions"}>
                                                <Tooltip title="Call Driver" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                                                    <div>
                                                    <i className="fas fa-phone fa-w-16 fa-fw fa-lg"></i>
                                                    </div>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default NltsApp;