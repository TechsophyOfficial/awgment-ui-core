import Keycloak from 'keycloak-js';
import { Provider } from 'react-redux';
import configureStore from './store';
import React from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import LocaleProvider from './context/LocaleContext';
import Navigator from './Navigator';
import { createBrowserHistory } from 'history';
import { REALM } from './constants/common';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeContextProvider } from './theme/ThemeContext';
import Spinner from './components/common/Spinner';
import LoadSxpChat from 'components/chatWidget';
import AppConfig from './appConfig';

const queryClient = new QueryClient();

// const defaultHistory = createBrowserHistory({ forceRefresh: true });

export const store = configureStore();
const urlParams = new URLSearchParams(window.location.search);
const urlRealm = urlParams.get(REALM);
const storedRealm = sessionStorage.getItem('realm');

const App = (props) => {
    const config = props.config;

    const defaultHistory = createBrowserHistory({
        basename: config.publicUrl ? config.publicUrl : '/',
    });

    const history = props.history ? props.history : defaultHistory;

    const realm = urlRealm ? urlRealm : storedRealm ? storedRealm : config.keyCloakRealm;
    sessionStorage.setItem('theme-loaded', 'false');
    sessionStorage.setItem('realm', realm);
    sessionStorage.setItem('config', JSON.stringify(config));

    const keycloak = new Keycloak({
        realm: realm,
        url: `${config.keyCloakUrl}auth/`,
        clientId: config.keyCloakClientId,
    });

    const setTokens = () => {
        const { token, refreshToken, idTokenParsed } = keycloak;
        if (token && refreshToken && idTokenParsed) {
            sessionStorage.setItem('react-token', token);
            localStorage.setItem('token', token);
            localStorage.setItem('currentUser', idTokenParsed.preferred_username); // For case inbox filter api
            localStorage.setItem('email', idTokenParsed.email);
        }
    };

    const refreshAccessToken = () => {
        keycloak
            .updateToken(50)
            .success((refreshed) => {
                if (refreshed) {
                    setTokens();
                }
            })
            .error(() => {
                sessionStorage.clear();
                keycloak.logout();
            });
    };

    const handleEvent = (event) => {
        if (event === 'onAuthSuccess') {
            setTokens();
        }

        if (event === 'onTokenExpired') {
            refreshAccessToken();
        }

        if (event === 'onAuthLogout') {
            sessionStorage.clear();
        }
    };

    return (
        <ReactKeycloakProvider
            initOptions={{
                onLoad: 'login-required',
                checkLoginIframe: false,
                // redirectUri: window.location.origin
            }}
            authClient={keycloak}
            onEvent={handleEvent}>
            <QueryClientProvider client={queryClient}>
                <ThemeContextProvider config={config}>
                    <LocaleProvider>
                        <Provider store={store}>
                            <Spinner />
                            <AppConfig.Provider value={config}>
                                <Navigator history={history} config={config} />
                                {/* <LoadSxpChat /> */}
                            </AppConfig.Provider>
                        </Provider>
                    </LocaleProvider>
                </ThemeContextProvider>
            </QueryClientProvider>
        </ReactKeycloakProvider>
    );
};

export default App;
