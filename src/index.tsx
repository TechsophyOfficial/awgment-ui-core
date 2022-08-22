import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'formiojs/dist/formio.full.min.css';

fetch('../public/config.json')
    .then((r) => r.json())
    .then((config) => {
        ReactDOM.render(
            <React.StrictMode>
                <App config={config} />
            </React.StrictMode>,
            document.getElementById('root'),
        );
    });

    