import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";
import { noop } from '../../../utils/misc';
import { Typography, Grid } from '@mui/material';
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const MemoryGame: React.FC = () => {
  const classes = useStyles();
  
  const [show, setShow] = useState(false);
  const [showSquares, setShowSquares] = useState(false);
  const [coloredSquares, setColoredSquares] = useState(16);
  const [clicksTotal, setClicksTotal] = useState(0);
  const [clicksFailed, setClicksFailed] = useState(0);
  const [gameFinishedEndpoint, setGameFinishedEndpoint] = useState('np-ui:heistsThermiteMinigameResult');
  const [gameFinished, setGameFinished] = useState(false);
  const [gameTimeoutDuration, setGameTimeoutDuration] = useState(20000);
  const [gameWon, setGameWon] = useState(false);
  const [gameFailed, setGameFailed] = useState(false);
  const [ailedSquareNumber, setFailedClicksAllowed] = useState(2);
  const [introShown, setIntroShown] = useState(false);
  const [squares, setSquares]: any = useState([]);
  const [gridSizes, setGridSizes] = useState({
    5: ['20%'],
    6: ['16.6%'],
    7: ['14%'],
    8: ['12.3%'],
    9: ['10.9%'],
    10: ['9.7%'],
  });  
  
  
  const createSquares = (grid, coloredSquares) => {
    const totalSquares = grid * grid;
    const squareIndices = Array.from({ length: totalSquares }, (_, i) => i);
    const selectedIndices: any = [];
  
    while (selectedIndices.length < coloredSquares) {
      const randomIndex = Math.floor(Math.random() * squareIndices.length);
      const selectedIndex = squareIndices.splice(randomIndex, 1)[0];
      selectedIndices.push(selectedIndex);
    }
  
    const squaresArray = Array.from({ length: totalSquares }, (_, i) => ({
      gridSize: gridSizes[grid],
      isClick: false,
      isFailed: selectedIndices.includes(i) ? false  : true,  
      isTrue: selectedIndices.includes(i),
    }));
  
    setSquares(squaresArray);
  };

  // useEffect(()=>{
  //   setColoredSquares(5)
  //   createSquares(5, 5)
  //   setShowSquares(true)
  //   setIntroShown(true)
  //   setTimeout(()=>{
  //     setIntroShown(false)
  //     setTimeout(()=>{
  //       setShowSquares(false)
  //     }, 2000)
  //   }, 1500)
  // }, [])
  
  useNuiEvent('uiMessage', (data) => {
    var dvexdata: any = data.data
    if ('memorygame' === data.app) {
      if (true === data.show) {
        setShow(true)
        setGameTimeoutDuration(dvexdata.gameTimeoutDuration)
        setColoredSquares(dvexdata.coloredSquares)
        setGameFinishedEndpoint(dvexdata.gameFinishedEndpoint)
        createSquares(dvexdata.gridSize, dvexdata.coloredSquares)
        setShowSquares(true)
        setIntroShown(true)
        setTimeout(()=>{
          setIntroShown(false)
          setTimeout(()=>{
            setShowSquares(false)
          }, 2000)
        }, 1500)
      }
    }
  })

  useEffect(() => {
    if (clicksTotal === coloredSquares) {
      setGameFinished(true)
      setGameWon(true)
      setTimeout(()=>{
        fetchNui('np-ui:closeApp', {}).then(function (firstdata) {
          if(true === firstdata.meta.ok){
            setShow(false)
            fetchNui('np-ui:applicationClosed', {
              name: 'memory-game',
              fromEscape: false,
            }).then(function (data) {
              if(true === data.meta.ok){
                fetchNui(gameFinishedEndpoint, {success:true}).then(function (data) {
                  if(data.meta.ok){
                    setShow(false);
                    setClicksTotal(1);
                    setClicksFailed(0);
                    setShowSquares(false);
                    setGameFinished(false);
                    setGameWon(false);
                    setGameFailed(false);
                    setIntroShown(false);
                  }
                });
                }
            })
          }
        })
      }, 1500)
    }else if (clicksFailed === ailedSquareNumber) {
      setGameFailed(true)
      setTimeout(()=>{
        setGameFinished(true)
        setGameWon(false)
        setTimeout(()=>{
          setShow(false)
          fetchNui('np-ui:closeApp', {}).then(function (firstdata) {
            if(true === firstdata.meta.ok){
              setShow(false)
              fetchNui('np-ui:applicationClosed', {
                name: 'memory-game',
                fromEscape: false,
              }).then(function (data) {
                if(true === data.meta.ok){
                  fetchNui(gameFinishedEndpoint, {success:false}).then(function (data) {
                    if(data.meta.ok){
                      setShow(false);
                      setClicksTotal(1);
                      setClicksFailed(0);
                      setShowSquares(false);
                      setGameFinished(false);
                      setGameWon(false);
                      setGameFailed(false);
                      setIntroShown(false);
                    }
                  });
                  }
              })
            }
          })
        }, 1500)
      }, 1500)
    }
  }, [clicksTotal, clicksFailed]);


  const clickSquare = (index) => {
    if(!gameFailed && !showSquares){
      let g = squares[index];
      if(g.isFailed){
        setClicksFailed(clicksFailed + 1)
      }else if(g.isTrue){
        setClicksTotal(clicksTotal + 1);
      }
      g.isClick = true;
  
      setSquares([...squares.slice(0, index), g, ...squares.slice(index + 1)]);
    }

  }


  

  return (
    <Grid container className={classes.root} style={{ display: show ? '' : 'none', justifyContent: 'center', alignItems: 'center' }}>
      <div className={classes.MemoryGameOuterContainer}>
        <div className={classes.container}>
            {!gameFinished && introShown && <div className={classes.introBox}>
              <i style={{color: 'white', marginBottom: '3vh', fontSize:'6vh'}} className='fas fa-user-secret fa-fw fa-4x'></i>
              <Typography style={{color: 'white', fontSize:'1.5vh'}} variant="body1">
                Remote Sequencing Required
              </Typography>
            </div>}
            {!gameFinished && !introShown && <div className={classes.boxClickBox}>
              {squares && squares.map(function (data, index) {
                return (
                  <div onClick={()=>{clickSquare(index)}} 
                  style={{
                    width:data.gridSize[0], 
                    minWidth:data.gridSize[0], 
                    maxWidth:data.gridSize[0], 
                    height:data.gridSize[0], 
                    minHeight:data.gridSize[0], 
                    maxHeight:data.gridSize[0]
                  }} className={
                    gameFailed && !showSquares 
                    ? data.isClick
                    ? data.isTrue
                    ? classes.clickSquareShouldClickTrue
                    : classes.clickSquareShouldClickFailed
                    : data.isTrue
                    ? classes.clickSquareShouldClickTrue
                    : classes.clickSquare
                    : showSquares && !gameFailed
                    ? data.isClick
                    ? data.isTrue
                    ? classes.clickSquareShouldClick
                    : classes.clickSquareShouldClickFailed
                    : data.isTrue
                    ? classes.clickSquareShouldClick
                    : classes.clickSquare
                    : data.isClick
                    ? data.isFailed
                    ? classes.clickSquareShouldClickFailed
                    : classes.clickSquareShouldClick
                    : classes.clickSquare
                  }></div>
                );
              })}
            </div>}
            {gameFinished && <div className={classes.introBox}>
              <i style={{color: 'white', marginBottom: '3vh', fontSize:'6vh'}} className='fas fa-user-secret fa-fw fa-4x'></i>
              <Typography style={{color: 'white', fontSize:'1.5vh'}} variant="body1">
                Remote Sequencing {gameWon ? 'Complete' : 'Failed'}
              </Typography>
            </div>}
        </div>
      </div>
    </Grid>
  );
};

export default MemoryGame;