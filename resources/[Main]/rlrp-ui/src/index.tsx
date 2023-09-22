import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components';
import { RecoilRoot } from 'recoil'
import {BrowserRouter as Router} from 'react-router-dom';


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


ReactDOM.render(
    <Router basename="/">
        <RecoilRoot>
          <App />
        </RecoilRoot>
    </Router>,
  document.getElementById('root')
);