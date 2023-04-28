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

fetch(`https://demo1691447.mockable.io/api/awgment/v1/tenants${window.location.pathname.slice(0, -1)}`)
    .then(async (r) => r.json())
    .then((config) => {
        ReactDOM.render(
            <React.StrictMode>
                <App config={config} />
            </React.StrictMode>,
            document.getElementById('root'),
        );
    });
