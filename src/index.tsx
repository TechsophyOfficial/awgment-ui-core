import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'formiojs/dist/formio.full.min.css';

// fetch('../model/config.json')
//     .then(async (r) => r.json())
//     .then((config) => {
//         ReactDOM.render(
//             <React.StrictMode>
//                 <App config={config} />
//             </React.StrictMode>,
//             document.getElementById('root'),
//         );
//     });

fetch(`${window.location.origin}${window.location.pathname}.json`)
    .then(async (r) => r.json())
    .then((config) => {
        ReactDOM.render(
            <React.StrictMode>
                <App config={config} />
            </React.StrictMode>,
            document.getElementById('root'),
        );
    });
