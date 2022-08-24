import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'formiojs/dist/formio.full.min.css';
import configFile from '../public/config.json'

ReactDOM.render(
    <React.StrictMode>
        <App config={configFile} />
    </React.StrictMode>,
    document.getElementById('root'),
)

    