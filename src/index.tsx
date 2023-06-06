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

if (sessionStorage.getItem('react-token')) {
    let envs: any = sessionStorage.getItem('config');
    let config: any = JSON.parse(envs);
    console.log('i am called already logged in');
    ReactDOM.render(
        <React.StrictMode>
            <App config={config} />
        </React.StrictMode>,
        document.getElementById('root'),
    );
} else {
    console.log('i am called not logged in');
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
}

// fetch(`${'https://awgment-mt.techsophy.com'}${window.location.pathname}.json`)
//     .then(async (r) => r.json())
//     .then((config) => {
//         ReactDOM.render(
//             <React.StrictMode>
//                 <App config={config} />
//             </React.StrictMode>,
//             document.getElementById('root'),
//         );
//     });
