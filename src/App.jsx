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

const queryClient = new QueryClient();

const defaultHistory = createBrowserHistory({
    basename: process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '/',
});

// const defaultHistory = createBrowserHistory({ forceRefresh: true });

export const store = configureStore();
const urlParams = new URLSearchParams(window.location.search);
const urlRealm = urlParams.get(REALM);
const storedRealm = sessionStorage.getItem('realm');

const App = ({ history = defaultHistory }) => {
    const realm = urlRealm ? urlRealm : storedRealm ? storedRealm : process.env.REACT_APP_KEYCLOAK_REALM;
    sessionStorage.setItem('theme-loaded', 'false');
    sessionStorage.setItem('realm', realm);

    const keycloak = new Keycloak({
        realm: realm,
        url: `${process.env.REACT_APP_KEYCLOAK_URL}auth/`,
        clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
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
                <ThemeContextProvider>
                    <LocaleProvider>
                        <Provider store={store}>
                            <Spinner />
                            <Navigator history={history} />
                            <LoadSxpChat />
                        </Provider>
                    </LocaleProvider>
                </ThemeContextProvider>
            </QueryClientProvider>
        </ReactKeycloakProvider>
    );
};

export default App;
