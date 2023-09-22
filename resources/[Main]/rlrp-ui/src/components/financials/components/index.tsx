import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";
import { noop } from '../../../utils/misc';
import { Button, Divider, Grid, ThemeProvider, Box, Stack, InputAdornment, TextField, Typography } from '@mui/material';
import Moment from "react-moment";
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Financials: React.FC = () => {
    const classes = useStyles();

    const [ShowFinancials, setShowFinancials]: any = useState(false)
    const [ShowFinancialsLoader, setShowFinancialsLoader]: any = useState(false)
    const [ShowModal, setShowModal]: any = useState(false)
    const [TypeBtn, setTypeBtn]: any = useState('')
    const [ShowModalLoader, setShowModalLoader]: any = useState(false)
    const [Atm, SetAtm]: any = useState(false)
    const [Account, SetAccount]: any = useState([
        
        // {
        //     id:'11112412',
        //     name:'DveX',
        //     type:'Persinal',
        //     owner_last_name:'Dev',
        //     owner_first_name:'DveX',
        //     balance:222222222222222
        // },
    ])
    const [Transactions, SetTransactions]: any = useState([
        // {
        //     direction:'out',
        //     from_account_name:'DveX Dev',
        //     from_account_id:'11112412',
        //     type:'Persinal',
        //     from_civ_name:'DveX Dev',
        //     date:111111,
        //     to_civ_name:'DveX Dev',
        //     comment:'Test',
        //     id:1,
        //     amount:111111
        // },
    ])
    const [MyCash, SetMyCash]: any = useState(0)
    const [CurrentAccountId, SetCurrentAccountId]: any = useState(0)
    const [CurrentAccountType, SetCurrentAccountType]: any = useState('')
    const [Amount, SetAmount]: any = useState(0)
    const [StateId, SetStateId]: any = useState(0)
    const [AccountID, SetAccountID]: any = useState(0)
    const [Comment, SetComment]: any = useState('')
    const [SelectAccount, SetSelectAccount]: any = useState('')

    useEffect(() => {
        const handleEscapeKey = (event : any) => {
            if (event.code === 'Escape' && ShowFinancials) {
                fetchNui('rlrp-ui:closeApp', {}).then(function (firstdata) {
                    if(true === firstdata.meta.ok){
                    fetchNui('rlrp-ui:applicationClosed', {
                        name: 'atm',
                        fromEscape: true,
                    }).then(function (data) {
                        if(true === data.meta.ok){
                            setShowFinancials(false) 
                            setShowFinancialsLoader(false) 
                            setShowModal(false)
                            setTypeBtn('')
                            SetAccount([])
                            SetTransactions([])
                            SetMyCash(0)
                        }
                    })
                  }
              })
            }
        }
    
        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
      }, [ShowFinancials, setShowFinancials])

    useNuiEvent('uiMessage', (data) => {
      var dvexdata = data.data
      if ('atm' === data.app) {
        if (true === data.show) {
            setShowFinancials(true)
            if(true === dvexdata.isAtm){
                SetAtm(true)
                setShowFinancialsLoader(true)
                
                
                fetchNui('rlrp-ui:getCash', {}).then(function (data) {
                    SetMyCash(data)
                });
                fetchNui('rlrp-ui:getAccounts', {}).then(function (data) {
                    setShowFinancialsLoader(false)
                    SetAccount(data.data.accounts)
                });
            }else if(false === dvexdata.isAtm){
                SetAtm(false)
                setShowFinancialsLoader(true)
                
                fetchNui('rlrp-ui:getAccounts', {}).then(function (data) {
                    setShowFinancialsLoader(false)
                    SetAccount(data.data.accounts)
                });
            }
        } else {
          if(false === data.show) {
            SetAtm(false) 
            setShowFinancials(false) 
            setShowFinancialsLoader(false) 
            SetAccount([]) 
          }
        }
      }
    })


    return (
        <>
            <div style={{ display: ShowFinancials ? '' : 'none' }} className={classes.financialsOuterContainer}>
                <div style={{ height: ShowFinancialsLoader ? '200px' : '75%', minHeight: ShowFinancialsLoader ? '200px' : '75%', maxHeight: ShowFinancialsLoader ? '200px' : '75%' }} className={classes.financialsInnerContainer}>
                    <div style={{ display: ShowFinancialsLoader ? '' : 'none'}} className='spinner-wrapper'>
                        <div className='lds-spinner'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className={classes.accountWrapper}>
                        <div className={classes.accountHeader}>
                            <Typography style={{color: '#fff'}} variant="h5" component='div' gutterBottom>
                                Accounts
                            </Typography>
                            <div className={classes.accountScroll}>
                                {Account.length ?
                                    Account.map(function (data, dvex) {
                                        return (
                                            <div id={data.id} onClick={function() {
                                                SetCurrentAccountId(data.id)
                                                SetCurrentAccountType(data.type)
                                                fetchNui('rlrp-ui:getAccountTransactions', {
                                                    account_id: data.id
                                                }).then(function (data) {
                                                    SetTransactions(data.data)
                                                })
                                            }} className={CurrentAccountId === data.id ? classes.activeAccountBox : classes.accountBox}>
                                                <div className={classes.accountInnerWrapper}>
                                                    <div className={classes.accountLeft}>
                                                        <Typography style={{color: '#fff'}} variant="body1" component="div" mb="0px" gutterBottom>
                                                            {data.name} / {data.id}
                                                        </Typography>
                                                        <Typography style={{color: '#fff'}} variant="body1" component="div" mb="0px" gutterBottom>
                                                            {data.type}
                                                        </Typography>
                                                        <Typography style={{color: '#fff'}} variant="body1" component="div" mb="0px" gutterBottom>
                                                            {data.owner_first_name} {data.owner_last_name}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <div className={classes.accountInnerWrapper}>
                                                    <div className={classes.accountRight}>
                                                        <div style={{textAlign:'right'}}>
                                                        <Typography style={{color: '#fff'}} mb='0px' variant='h6'>
                                                            ${data.balance.toLocaleString()}.00
                                                        </Typography>
                                                        </div>
                                                        <Typography style={{color: '#fff'}} mb='0px' variant='body1' >
                                                            Available Balance
                                                        </Typography>
                                                    </div>
                                                    <Stack direction='row' justifyContent='space-between' mt='25px' alignItems='flex-end' spacing='1.75'>
                                                        <Button
                                                            onClick={function() {
                                                            setShowModalLoader(false)
                                                            setShowModal(true)
                                                            setTypeBtn('WITHDRAW')
                                                            }}
                                                            style={{ margin:'3.5px' }}
                                                            color="warning"
                                                            size="small"
                                                            variant="contained"
                                                        >
                                                            WITHDRAW
                                                        </Button>
                                                        <Button
                                                            onClick={function() {
                                                            setShowModalLoader(false)
                                                            setShowModal(true)
                                                            setTypeBtn('DEPOSIT')
                                                            }}
                                                            style={{ margin:'3.5px', display: Atm ? 'none' : '', }}
                                                            color="success"
                                                            size="small"
                                                            variant="contained"
                                                        >
                                                            DEPOSIT
                                                        </Button>
                                                        <Button
                                                            onClick={function() {
                                                            setShowModalLoader(false)
                                                            setShowModal(true)
                                                            setTypeBtn('TRANSFER')
                                                            }}
                                                            style={{ margin:'3.5px' }}
                                                            color="error"
                                                            size="small"
                                                            variant="contained"
                                                        >
                                                            TRANSFER
                                                        </Button>
                                                    </Stack>
                                                </div>
                                            </div>
                                        )
                                    }
                                ): <></>} 
                                
                            </div>
                        </div>
                    </div>
                    <div style={ { display: ShowFinancialsLoader ? 'none' : '' }} className={classes.transactionWrapper}>
                        <div className={classes.transactionHeader}>
                            <Typography style={{color: '#fff'}} variant="h5" component='div' gutterBottom>
                                Transaction History
                            </Typography>
                            <div className={classes.transactionScroll}>
                                    {Transactions.length ?
                                        Transactions.map(function (data, dvex) {
                                            return (
                                                <div className={classes.transactionBox}>
                                                    <div className={classes.transactionInnerWrapper}>
                                                        <div className={classes.transactionLeft}>
                                                            <Typography style={{color: '#fff'}} variant="subtitle1" component='div'>
                                                                {data.from_account_name} / {data.from_account_id} [{data.type.toUpperCase()}]
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div className={classes.transactionInnerWrapper}>
                                                        <div className={classes.transactionRight}>
                                                            <Typography style={{color: '#fff'}} variant="subtitle1" component='div'>
                                                                {data.id}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <Divider 
                                                        variant='middle'
                                                        sx={{
                                                            width: '99%',
                                                            borderColor: 'rgba(255, 255, 255, 255)',
                                                            marginRight: '3%',
                                                            marginLeft: '0.5%',
                                                            marginTop:'1%'
                                                        }}
                                                    />
                                                    <div className={classes.transactionSecondInnerWrapper}>
                                                        <div className={classes.transactionMiddleLeft}>
                                                            <Typography 
                                                                sx={{ color: 'out' === data.direction ? 'rgb(242, 163, 101)' : 'rgb(149, 239, 119)' }}
                                                                mb='0px'
                                                                variant='h6'
                                                                gutterBottom
                                                                component='div'
                                                            >
                                                                {/* 'pos' === YC.type ? '' : '-',
                                                                YC.amount.toLocaleString('en-Us', {
                                                                style: 'currency',
                                                                currency: 'USD',
                                                                }), */}
                                                                {'out' === data.direction ? '-' : ''} ${data.amount.toLocaleString()}.00
                                                            </Typography>
                                                        </div>
                                                        <div className={classes.transactionMiddleMiddle}>
                                                            <Typography 
                                                                style={{color: '#fff'}}
                                                                mb='0px'
                                                                variant='h6'
                                                                gutterBottom
                                                                component='div'
                                                            >
                                                                {data.from_civ_name}
                                                            </Typography>
                                                        </div>
                                                        <div className={classes.transactionMiddleRight}>
                                                            <Typography 
                                                                style={{color: '#fff'}}
                                                                mb='0px'
                                                                variant='h6'
                                                                gutterBottom
                                                                component='div'
                                                            >
                                                                <Moment fromNow>{data.date}</Moment>
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div className={classes.transactionThirdInnerWrapper}>
                                                        <div className={classes.transactionSecondMiddleRight}>
                                                            <Typography 
                                                                style={{color: '#fff'}}
                                                                variant='h6'
                                                            >
                                                                {data.to_civ_name}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div style={{position:'relative', width:'100%', bottom:'25%'}} className={classes.transactionFourthInnerWrapper}>
                                                        <div className={classes.transactionThirdMiddle}>
                                                            <TextField
                                                                disabled
                                                                // fullWidth
                                                                // sx={{ width: '1021px' }}
                                                                id='standard-disabled'
                                                                label='Message'
                                                                defaultValue={data.comment}
                                                                variant='standard'
                                                            >

                                                            </TextField>
                                                        </div>
                                                    </div>
                                                </div>
                                        )}
                                    ): <></>} 

                            </div>
                        </div>
                    </div>
                    <div style={{display: ShowFinancialsLoader ? 'none' : '', color: '#fff', position:'absolute', bottom:'14px', left:'-4%'}} className={classes.cashWrapper}>
                        <Typography mb='0px' variant="body1" component='div' gutterBottom>
                            Cash: ${MyCash.toLocaleString()}.00
                        </Typography>
                    </div>

                    <div style={{ display: ShowFinancialsLoader ? 'none' : '', position:'absolute', top:'0', right:'1%' }} className={classes.chafeBankWrapper}>
                        <Typography style={{color: '#fff'}} variant="h5" component='div' gutterBottom>
                            Chafe Bank
                        </Typography>
                    </div>
                    <div style={{display: ShowModal ? '' : 'none'}} className={classes.modal}>
                        {/* <Grid sx={{display:'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}> */}
                            <Box className={classes.modal_mainBox} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                <div style={{ display: ShowModalLoader ? '' : 'none', margin:'15%'}} className='spinner-wrapper'>
                                    <div className='lds-spinner'>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                                <Typography style={{display: ShowModalLoader ? 'none' : '', color: '#fff'}} variant="h5" component='div' gutterBottom>
                                    {CurrentAccountType} / <br /> {CurrentAccountId}
                                </Typography>
                                <Grid container
                                    style={{display: ShowModalLoader ? 'none' : ''}}
                                    sx={{
                                    justifyContent: 'center',
                                    marginTop: '31px',
                                    marginBottom: '25px',
                                }}>
                                    <TextField
                                        label="Amount"
                                        type="number"
                                        id="standard-start-adornment"
                                        // className={classes.root}
                                        InputLabelProps={{
                                            shrink: true,
                                            classes:{
                                                root: classes.inputLabel,
                                                focused: 'focused',
                                            }
                                        }}
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
                                        variant="standard"
                                        style={{ width: 300 }}
                                        onChange={function (event) {
                                            SetAmount(event.target.value)
                                        }}
                                    />                                        
                                </Grid>
                                <Grid container 
                                style={{display: ShowModalLoader ? 'none' : ''}}
                                sx={{
                                    justifyContent: 'center',
                                }}>
                                    <TextField
                                        label="Comment"
                                        id="standard-start-adornment"
                                        // className={classes.root}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">//</InputAdornment>,
                                        }}
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
                                        variant="standard"
                                        style={{ width: 300 }}
                                        onChange={function (event) {
                                            SetComment(event.target.value)
                                        }}
                                    />                                        
                                </Grid>
                                {TypeBtn === "TRANSFER" &&
                                <Grid container 
                                style={{display: ShowModalLoader ? 'none' : ''}}
                                sx={{
                                    justifyContent: 'center',
                                    marginTop: '31px',
                                }}>
                                    <TextField
                                        label="State ID"
                                        id="standard-start-adornment"
                                        // className={classes.root}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">#</InputAdornment>,
                                        }}
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
                                        variant="standard"
                                        style={{ width: 300 }}
                                        onChange={function (event) {
                                            SetStateId(event.target.value)
                                        }}
                                    />                                        
                                </Grid> 

                                }
                                {TypeBtn === "TRANSFER" &&
                                <Grid container 
                                style={{display: ShowModalLoader ? 'none' : ''}}
                                sx={{
                                    justifyContent: 'center',
                                    marginTop: '31px',
                                }}>
                                    <TextField
                                        label="...or Account ID"
                                        id="standard-start-adornment"
                                        // className={classes.root}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">#</InputAdornment>,
                                        }}
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
                                        variant="standard"
                                        style={{ width: 300 }}
                                        onChange={function (event) {
                                            SetAccountID(event.target.value)
                                        }}
                                    />                                        
                                </Grid>
                                }
                                <div
                                    style={{
                                        display: ShowModalLoader ? 'none' : '',
                                        justifyContent:'center',
                                        // marginBottom:'63px',
                                        margin:'20px',
                                        alignItems:'flex-end',
                                    }}
                                >
                                {TypeBtn === "WITHDRAW" ?
                                    <div>
                                    <Button
                                        size="small"
                                        color='warning'
                                        variant='contained'
                                        style={{ marginRight: '140px' }}
                                        onClick={function() {
                                            setShowModalLoader(false)
                                            setShowModal(false)
                                            setTypeBtn('')
                            
                                        }}
                                    >
                                        CANCEL
                                    </Button>
                                    <Button
                                        onClick={function() {
                                            setShowModalLoader(true)
                                            fetchNui('rlrp-ui:accountWithdraw', {
                                                account_id: CurrentAccountId,
                                                amount: Amount,
                                                comment: Comment,
                                            }).then(function (data) {
                                                if (data.meta.ok === true) {
                                                    setShowModalLoader(false)
                                                    setShowModal(false)
                                                    setTypeBtn('')
                                                    fetchNui('rlrp-ui:getAccountTransactions', {
                                                        account_id: CurrentAccountId
                                                    }).then(function (data) {
                                                        SetTransactions(data.data)
                                                    })
                                                    fetchNui('rlrp-ui:getAccounts', {}).then(function (data) {
                                                        SetAccount(data.data.accounts)
                                                    });
                                                }else{
                                                    setShowModalLoader(false)
                                                    console.log(data.meta.message)
                                                }
                                            });
                            
                                        }}
                                        size='small'
                                        color='success'
                                        variant='contained'
                                    >
                                        WITHDRAW
                                    </Button>
                                    </div>
                                    : TypeBtn === "DEPOSIT" ?
                                    <div>
                                    <Button
                                        size="small"
                                        color='warning'
                                        variant='contained'
                                        style={{ marginRight: '150px' }}
                                        onClick={function() {
                                            setShowModalLoader(false)
                                            setShowModal(false)
                                            setTypeBtn('')
                            
                                        }}
                                    >
                                        CANCEL
                                    </Button>
                                    <Button
                                        onClick={function() {
                                            setShowModalLoader(true)
                                            fetchNui('rlrp-ui:accountDeposit', {
                                                account_id: CurrentAccountId,
                                                amount: Amount,
                                                comment: Comment,
                                            }).then(function (data) {
                                                if (data.meta.ok === true) {
                                                    setShowModalLoader(false)
                                                    setShowModal(false)
                                                    setTypeBtn('')
                                                    fetchNui('rlrp-ui:getAccountTransactions', {
                                                        account_id: CurrentAccountId
                                                    }).then(function (data) {
                                                        SetTransactions(data.data)
                                                    })
                                                    fetchNui('rlrp-ui:getAccounts', {}).then(function (data) {
                                                        SetAccount(data.data.accounts)
                                                    });
                                                }else{
                                                    setShowModalLoader(false)
                                                    console.log(data.meta.message)
                                                }
                                            });
                            
                                        }}
                                        size='small'
                                        color='success'
                                        variant='contained'
                                    >
                                        DEPOSIT
                                    </Button>
                                    </div>
                                    : TypeBtn === "TRANSFER" ?
                                    <div>
                                    <Button
                                        size="small"
                                        color='warning'
                                        variant='contained'
                                        style={{ marginRight: '140px' }}
                                        onClick={function() {
                                            setShowModalLoader(false)
                                            setShowModal(false)
                                            setTypeBtn('')
                            
                                        }}
                                    >
                                        CANCEL
                                    </Button>
                                    <Button
                                        onClick={function() {
                                            setShowModalLoader(true)
                                            fetchNui('rlrp-ui:accountTransfer', {
                                                account_id: CurrentAccountId,
                                                target_account_id: AccountID,
                                                target_state_id: StateId,
                                                amount: Amount,
                                                comment: Comment,
                                            }).then(function (data) {
                                                if (data.meta.ok === true) {
                                                    setShowModalLoader(false)
                                                    setShowModal(false)
                                                    setTypeBtn('')
                                                    fetchNui('rlrp-ui:getAccountTransactions', {
                                                        account_id: CurrentAccountId
                                                    }).then(function (data) {
                                                        SetTransactions(data.data)
                                                    })
                                                    fetchNui('rlrp-ui:getAccounts', {}).then(function (data) {
                                                        SetAccount(data.data.accounts)
                                                    });
                                                }else{
                                                    setShowModalLoader(false)
                                                    console.log(data.meta.message)
                                                }
                                            });
                            
                                        }}
                                        size='small'
                                        color='success'
                                        variant='contained'
                                    >
                                        TRANSFER
                                    </Button>
                                    </div>
                                : null
                                }
                                    
                                
                                    
                                </div>
                            </Box>
                    </div>
                </div>
            </div>
        </>
    );}

export default Financials;