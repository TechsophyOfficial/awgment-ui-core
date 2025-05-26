import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'formiojs/dist/formio.full.min.css';
import ErrorPage from 'components/common/ErrorPage';
import KeycloakService from 'KeycloakService';

function renderAppWithConfig(config: any) {
    ReactDOM.render(
        <React.StrictMode>
            <App config={config} />
        </React.StrictMode>,
        document.getElementById('root'),
    );
}

if (sessionStorage.getItem('react-token')) {
    const envs: any = sessionStorage.getItem('config');
    const config: any = JSON.parse(envs);
    KeycloakService.initKeycloak(() => renderAppWithConfig(config));
} else {
    fetch(`${'https://apps-dev.trovity.com'}${window.location.pathname}.json`)
        .then(async (r) => r.json())
        .then((config) => {
            KeycloakService.initKeycloak(() => renderAppWithConfig(config));
        })
        .catch((error) => {
            ReactDOM.render(<ErrorPage />, document.getElementById('root'));
        });
}
