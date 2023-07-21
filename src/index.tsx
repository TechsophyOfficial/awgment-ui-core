import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'formiojs/dist/formio.full.min.css';
import ErrorPage from 'components/common/ErrorPage';

if (sessionStorage.getItem('react-token')) {
    let envs: any = sessionStorage.getItem('config');
    let config: any = JSON.parse(envs);
    ReactDOM.render(
        <React.StrictMode>
            <App config={config} />
        </React.StrictMode>,
        document.getElementById('root'),
    );
} else {
    fetch(`${window.location.origin}${window.location.pathname}.json`)
        .then(async (r) => r.json())
        .then((config) => {
            ReactDOM.render(
                <React.StrictMode>
                    <App config={config} />
                </React.StrictMode>,
                document.getElementById('root'),
            );
        })
        .catch((error) => {
            ReactDOM.render(<ErrorPage />, document.getElementById('root'));
            // fetch('../config.json')
            //     .then(async (r) => r.json())
            //     .then((config) => {
            //         ReactDOM.render(
            //             <React.StrictMode>
            //                 <App config={config} />
            //             </React.StrictMode>,
            //             document.getElementById('root'),
            //         );
            //     });
        });
}

// fetch(`${window.location.origin}${window.location.pathname.replace('/model', '')}.json`)
//     .then(async (r) => r.json())
//     .then((config) => {
//         ReactDOM.render(
//             <React.StrictMode>
//                 <App config={config} />
//             </React.StrictMode>,
//             document.getElementById('root'),
//         );
//     });
