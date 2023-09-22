import React, {useEffect, useRef, useState} from "react";
import FlipPage from "react-pageflip";
import useStyles from './index.styles';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";

function Book() {
  const [show, setShow] = useState(false)
  const [state, setState] = useState({
    pages: ['https://imgur.com/rjdCy5w.png', 'https://imgur.com/PEdkyzp.jpg', 'https://imgur.com/PEdkyzp.jpg', 'https://imgur.com/PEdkyzp.jpg', 'https://imgur.com/PEdkyzp.jpg', 'https://imgur.com/PEdkyzp.jpg', 'https://imgur.com/PEdkyzp.jpg'],
    width: 1200,
    height: 1500,
  })
  const classes = useStyles();
  const refBook: any = useRef();

  useNuiEvent('uiMessage', (data) => {
    var dvexdata = data.data
    if ('book' === data.app) {
      if (true === data.show) {
        setShow(false)
        setState(dvexdata)
      }
    }
  })

  

  useEffect(() => {
    const handleEscapeKey = (event : any) => {
      if (event.code === 'Escape' && show) {
        fetchNui('np-ui:closeApp', {}).then(function (firstdata) {
          if(true === firstdata.meta.ok){
            fetchNui('np-ui:applicationClosed', {
              name: 'books',
              fromEscape: true,
            }).then(function (data) {
              if(true === data.meta.ok){
                setShow(false) 
                setState({
                  pages: ['https://imgur.com/rjdCy5w.png', 'https://imgur.com/PEdkyzp.jpg'],
                  width: 1200,
                  height: 1500,
                }) 
              }
            })
          }
        })
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [show, setShow])

  return (
    <div style={{display: show ? '' : 'none'}} className={classes.bookContainer}>
      <FlipPage
        className={classes.bookInnerContainer}
        style={{}}
        width={800}
        height={800}
        startPage={0}
        size="stretch"
        minWidth={800}
        maxWidth={800}
        minHeight={800}
        maxHeight={800}
        drawShadow={true}
        flippingTime={500}
        usePortrait={false}
        startZIndex={500}
        autoSize={true}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true} 
        clickEventForward={true} 
        useMouseEvents={true} 
        swipeDistance={0} 
        showPageCorners={false} 
        disableFlipByClick={false}         
      >
        {state.pages.map((page, index) => (
          <img
            height={state.height}
            width={state.width}
            src={page}
            alt={
              index === 0 ? "title" : `pages ${index * 2 - 1}-${index * 2}`
            }
          />
        ))}
      </FlipPage>
    </div>
  );
};

export default Book;