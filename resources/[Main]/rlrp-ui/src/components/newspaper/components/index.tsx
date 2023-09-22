import React, { useEffect, useState } from 'react';
import '../../index.css';
import { useNuiEvent } from '../../../hooks/useNuiEvent';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { fetchNui } from '../../../utils/fetchNui';

const NewsPaper: React.FC = () => {

  const [show, setShow]: any = useState(false)

  useNuiEvent('uiMessage', function (data) {
    if ('newspaper' === data.app) {
      if (true === data.show) {
        setShow(true);
      }else{
        setShow(false);
      }
    }
  })

  useEffect(() => {
    const handleEscapeKey = (event : any) => {
        if (event.code === 'Escape' && show) {
            fetchNui('rlrp-ui:closeApp', {}).then(function (firstdata) {
                if(true === firstdata.meta.ok){
                  setShow(false)
                  fetchNui('rlrp-ui:applicationClosed', {
                      name: 'newspaper',
                      fromEscape: true,
                  }).then(function (data) {
                      if(true === data.meta.ok){
                        setShow(false)
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
    <>
      <div className='newspaper-container'>
        <div style={{display: show ? '' : 'none'}} className='newspaper-wrapper'>
          <div className='newspaper'>
            <div className='content'>
              <div className='header'>
                <div className='alert-box'>
                  City Alert: We have had multiple reports of injuries from spinning newspapers. Be careful!
                </div>
                <div className='title'>
                  Los Santos Post
                </div>
              </div>
              <div className='subhead'>
                <span>Edition: 49,726</span>
                <span>The Second Best Selling Newspaper in the World</span>
                <span>Current News</span>
              </div>
              <div className='columns'>
                <div className='column'>
                  <div className='headline'>Upcoming Elections</div>
                  <div className='subheadline'>GIVE THEM HOPE</div>
                  <div className='column-content'></div>
                </div>
                <div className='column'>
                  <div className='headline'>Recent Elections</div>
                  <div className='subheadline'>DESTROY THEIR HOPE</div>
                  <div className='column-content'></div>
                </div>
                <div className='column'>
                  <div className='headline'>Lockups</div>
                  <div className='subheadline'>PD Gang W's</div>
                  <div className='column-content'></div>
                </div>
                <div className='column column-dbl'>
                  <div className='dbl'>
                    <div className='headline'>Drugs</div>
                    <div className='subheadline'>by Joe Mama</div>
                    <div className='column-content'></div>
                  </div>
                  <div className='dbl'>
                    <div className='headline'>Stonks</div>
                    <div className='subheadline'>On The Rise?</div>
                    <div className='column-content'></div>
                  </div>
                </div>
              </div>
              <div className='subhead'>
                <div className='taxes'>Recent Tax Changes:</div>
                <div className='taxes'>nopixel X pfop</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsPaper;