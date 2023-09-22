import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";
import { noop } from '../../../utils/misc';
import {DveXAlert} from '../../main/components';
import { Tooltip, Typography } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Showroom: React.FC = () => {
  const [show, setShow]: any = useState(false)
  const [cars, setCars]: any = useState([
    { model: "gtrc", label: "AMG GT Black Series", price: 650000, onStock: 1, category: 3 },
    { model: "gt63", label: "AMG GT63", price: 535000, onStock: 1, category: 3 },
    { model: "z2879", label: "Camaro Z28 1979", price: 565000, onStock: 1, category: 3 },
    { model: "exor", label: "Camaro ZL1", price: 580000, onStock: 1, category: 3 },
    { model: "fk8", label: "Civic Type-R", price: 415000, onStock: 1, category: 3 },
    { model: "delsoleg", label: "Civic Type-R EG", price: 330000, onStock: 1, category: 3 },
    { model: "contss18", label: "Continental SS", price: 590000, onStock: 1, category: 3 },
    { model: "c7", label: "Corvette C7", price: 545000, onStock: 1, category: 3 },
    { model: "esv", label: "Escalade", price: 560000, onStock: 1, category: 3 },
    { model: "srt8b", label: "Grand Cherokee SRT-8", price: 440000, onStock: 1, category: 3 },
    { model: "bluecunt", label: "HSV", price: 385000, onStock: 1, category: 3 },
    { model: "m5e60", label: "M5 E60", price: 540000, onStock: 1, category: 3 },
    { model: "na6", label: "MX5 NA", price: 330000, onStock: 1, category: 3 },
    { model: "lp670", label: "Lamborghini LP670", price: 780000, onStock: 1, category: 3 },
    { model: "66fastback", label: "Mustang 1965", price: 550000, onStock: 1, category: 3 },
    { model: "rmodmustang", label: "Mustang 2015", price: 470000, onStock: 1, category: 3 },
    { model: "mustang19", label: "Mustang GT 2019", price: 490000, onStock: 1, category: 3 },
    { model: "panamera17turbo", label: "Panamera Turbo", price: 595000, onStock: 1, category: 3 },
    { model: "r1", label: "R1", price: 315000, onStock: 1, category: 3 },
    { model: "r8v10", label: "R8 V1", price: 635000, onStock: 1, category: 3 },
    { model: "audirs6tk", label: "RS6", price: 485000, onStock: 1, category: 3 },
    { model: "fnfrx7", label: "RX7", price: 435000, onStock: 1, category: 3 },
    { model: "f150", label: "Raptor F150", price: 445000, onStock: 1, category: 3 },
    { model: "ap2", label: "S2000", price: 574000, onStock: 1, category: 3 },
    { model: "subwrx", label: "WRX", price: 674000, onStock: 1, category: 3 },
    { model: "ruiner6str", label: "6str Ruiner", price: 350000, onStock: 1, category: 3 },
    { model: "STRATUMC", label: "Widebody Stratum", price: 400000, onStock: 1, category: 3 },
])

  return (
    <>
      <div style={{position:'absolute', display: show ? '' : 'none'}} className="showroom-wrapper">
          <div className="spinner-container">
              <div className="spinner-wrapper">
                  <div className="lds-spinner">
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
          </div>
          <div className="start-container">
              <div className="rtl" style={{backgroundColor: 'rgb(153, 36, 36)'}}>
                  <h1 className="MuiTypography-root MuiTypography-h1 MuiTypography-colorTextPrimary">
                    Tuner Shop
                  </h1>
              </div>
              <div className="ltr" style={{backgroundColor: 'rgb(0, 0, 0)'}}>
                  <h2 className="MuiTypography-root MuiTypography-h2 MuiTypography-colorTextPrimary">
                    Customer Experience
                  </h2>
                  <div className="watermark">
                      <p className="MuiTypography-root MuiTypography-body1 MuiTypography-colorTextPrimary">
                        built with &nbsp;<span role="img" aria-label="heart">❤️</span>&nbsp; by DveX
                      </p>
                  </div>
              </div>
          </div>
          <div className="main">
              <div className="stats">
                  <div className="make-model">
                      <div className="brand-container">
                      </div>
                  </div>
                  <div className="breakdowns">
                      <div className="breakdown">
                          <div className="name">Acceleration</div>
                          <div  className="value">
                              <div  className="bg">
                                  <div className="fill" style={{width: '50%'}}></div>
                              </div>
                              <div className="actual">0</div>
                          </div>
                      </div>
                      <div className="breakdown">
                          <div className="name">Speed</div>
                          <div className="value">
                              <div className="bg">
                                  <div className="fill" style={{width: '50%'}}></div>
                              </div>
                              <div className="actual">0</div>
                          </div>
                      </div>
                      <div className="breakdown">
                          <div className="name">Handling</div>
                          <div className="value">
                              <div className="bg">
                                  <div className="fill" style={{width: '50%'}}></div>
                              </div>
                              <div className="actual">0</div>
                          </div>
                      </div>
                      <div className="breakdown">
                          <div className="name">Braking</div>
                          <div className="value">
                              <div className="bg">
                                  <div className="fill" style={{width: '50%'}}></div>
                              </div>
                              <div className="actual">0</div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="selector-container">
                  <div className="class-selector">
                      <div className="available-classes"></div>
                      <div className="price"><span></span>
                      <div id="purchase" className="btn" style={{
                        borderRadius: '5px', 
                        backgroundColor: 'green', 
                        marginTop: '8px', 
                        color: 'white', 
                        textAlign: 'center', 
                        fontSize: '80%', 
                        padding: '5px',
                      }}>Purchase</div>
                      <div id="testdrive" className="btn" style={{
                        borderRadius: '5px', 
                        backgroundColor: 'green', 
                        marginTop: '8px', 
                        color: 'white', 
                        textAlign: 'center', 
                        fontSize: '80%', 
                        padding: '5px',
                      }}>Test Drive</div>
                  </div>
                  </div>
                  <div className="selector-spacer"></div>
                  <div className="selector">
                      <div className="position-container"></div>
                      <div className="mclass-selector">
                          <div className="mclass mclass-selected">BBC Imports</div>
                          <div className="mclass ">C Class</div>
                          <div className="mclass ">B Class</div>
                          <div className="mclass ">A Class</div>
                          <div className="mclass ">S Class</div>
                          <div className="mclass ">M Class</div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="showcase">
          </div>
          <div className="actions">
              <div className="btn">Previous</div>
              <div className="btn">Next</div>
          </div>
      </div>
    </>
  );
}

export default Showroom;