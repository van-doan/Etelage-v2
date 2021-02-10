import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/specific/App/App';
import { Router } from 'react-router-dom';
import BrowserRouter from './stores/App/BrowserRouter';

ReactDOM.render(
    <Router history={BrowserRouter.history}>
        <App/>
    </Router>,
  document.getElementById('root')
);

