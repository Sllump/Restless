import React, { useState } from 'react';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Slider, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';

const Ballot: React.FC = () => {
  const classes = useStyles();
  const [show, setShow]: any = useState(false);
  const [ballotSaved, setBallotSaved]: any = useState(false);
  const [loading, setLoading]: any = useState(false);
  const [options, setOptions]: any = useState([
    {
      id:1,
      name:'DveX',
      description:'Teeeeeeeeest',
      party:'Test',
      // icon: 'circle',
    },
    {
      id:2,
      name:'Ojx',
      description:'',
      party:'Test',
      // icon: 'chess-king',
    },
  ]);
  const [selectedID, setSelectedID]: any = useState(0);

  return (
    <div style={{display: show ? '' : 'none'}} className={classes.ballotContainer}>
      <div style={{height: loading || ballotSaved ? '300px' : 'calc(75vh + 193px)'}} className={classes.wrapper}>
        <div className={classes.flexRow}>
          {!loading && !ballotSaved && (
            <Typography style={{color:'white'}} variant='h5'>Voting for:</Typography>
            )}
          <div className={classes.title}>
            <i style={{color: 'white'}} className='fas fa-poll fa-fw fa-2x'></i>
            <Typography style={{color:'white', marginLeft: 8}} variant='h5'>#ElectionSZN</Typography>
          </div>
        </div>
        {loading && (
          <div style={{height: '100%', width: '100%', margin: '64px 0'}} className={classes.flexCenter}>

          </div>
        )}
        {ballotSaved && (
          <div style={{flexDirection: 'column'}} className={classes.flexCenter}>
            <Typography style={{color:'white'}} variant='body1'>YOUR BALLOT OPTIONS HAVE BEEN SAVED</Typography>
            <Typography style={{color:'white', marginTop: 64}} variant='h5'>THANK YOU FOR VOTING!</Typography>
          </div>
        )}
        
        {/* {!loading && !ballotSaved && !!options.length && ( */}

        {!loading && !ballotSaved  && (
          <div className={classes.optionsWrapper}>
            <div className={classes.optionsTitle}>
              <Typography style={{color:'white', fontWeight: 'bold'}} variant='subtitle1'>DveX</Typography>
              <Typography style={{color:'white', textTransform: 'uppercase'}} variant='subtitle1'>Select At Least One</Typography>
            </div>
            {!loading && options.length == 0 && (
              <Typography style={{color:'white', marginTop: 64, textAlign: 'center'}} variant='h5'>THERE ARE CURRENTLY NO ACTIVE BALLOTS</Typography>
            )}
            <div className={classes.options}>
              {options && options.length > 0 && options.map(function (data) {
                return (
                  <div className={classes.option}>
                    <div className={classes.info}>
                      <Typography style={{color:'white'}} variant='h5'>{data.name}</Typography>
                      <Typography style={{color:'white'}} variant='body2'>{data.description}</Typography>
                      <Typography style={{color:'white'}} variant='subtitle1'>{data.party}</Typography>
                    </div>
                    {data.icon && (
                      <div className={classes.icon}>
                        <i className={'fas fa-'+data.icon+' fa-fw fa-2x'}></i>
                      </div>
                    )}
                    <div onClick={()=>{setSelectedID(data.id)}} className={classes.icon}>
                      <i className={selectedID === data.id ? 'fas fa-check-square fa-fw fa-5x' : 'fas fa-square fa-fw fa-5x'}></i>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={classes.actions}>
              <Typography style={{color: 'white', width: '100%', textAlign: 'center', textTransform: 'uppercase'}} variant='body1'>You must select a ballot option to continue</Typography>
              <Button size="small" color='warning' variant='contained'>Previous Ballot</Button>
              <Button size="small" color='success' variant='contained'>Next Ballot</Button>
              {selectedID !== 0 && (<Button size="small" color='success' variant='contained'>Submit Ballot</Button>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Ballot;