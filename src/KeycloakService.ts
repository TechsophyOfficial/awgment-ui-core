import Keycloak, { KeycloakInstance, KeycloakInitOptions, KeycloakTokenParsed } from 'keycloak-js';

type AuthCallback = () => void;
type SuccessCallback = () => void;

const storeToken = (token: string | undefined) => {
    sessionStorage.setItem('react-token', token ?? '');
};

const keycloakConfig = {
    url: 'https://auth-mt-new.trovity.com/auth',
    realm: 'trovity',
    clientId: 'trovity-frontend',
};

const keycloak: KeycloakInstance = new Keycloak(keycloakConfig);

const initKeycloak = (onAuthenticatedCallback: AuthCallback) => {
    const options: KeycloakInitOptions = {
        onLoad: 'check-sso',
        // silentCheckSsoRedirectUri: window.location.origin,
        checkLoginIframe: false,
        pkceMethod: 'S256',
    };

    keycloak
        .init(options)
        .then((authenticated: boolean) => {
            console.log('authenticated', keycloak.token);
            if (authenticated) {
                const token: any = keycloak.token;
                const getTokenParsed = (): KeycloakTokenParsed | any => keycloak.tokenParsed;
                onAuthenticatedCallback();
                sessionStorage.setItem('react-token', token ?? '');
                localStorage.setItem('token', token);
                localStorage.setItem('currentUser', getTokenParsed().preferred_username); // For case inbox filter api
                localStorage.setItem('email', getTokenParsed().email);
            } else {
                doLogin();
            }
        })
        .catch((err: unknown) => {
            console.error('Keycloak init error', err);
        });
};

const doLogin = () => keycloak.login();
const doLogout = () => keycloak.logout();

const getToken = (): string | undefined => keycloak.token;

const isLoggedIn = (): boolean => !!keycloak.token;

const updateToken = (successCallback: SuccessCallback) => keycloak.updateToken(5).then(successCallback).catch(doLogin);

const getTokenParsed = (): KeycloakTokenParsed | any => keycloak.tokenParsed;

const getUsername = (): string | undefined => getTokenParsed()?.preferred_username;

const getFullname = (): string =>
    ((getTokenParsed()?.given_name ?? '') + ' ' + (getTokenParsed()?.family_name ?? '')).trim();

const getSub = (): string | undefined => getTokenParsed()?.sub;

const getUserEmail = (): string | undefined => getTokenParsed()?.email;

const hasRole = (roles: string[]): boolean => roles.some((role) => keycloak.hasResourceRole(role));

const getRoles = (): string[] => getTokenParsed()?.realm_access?.roles ?? [];

const getLocation = (): string | undefined => getTokenParsed()?.location as string | undefined;

keycloak.onTokenExpired = () => {
    keycloak.updateToken(5);
};

keycloak.onAuthSuccess = () => {
    storeToken(keycloak.token);
};

keycloak.onAuthRefreshSuccess = () => {
    storeToken(keycloak.token);
};

keycloak.onAuthLogout = () => sessionStorage.clear();

const KeycloakService = {
    storeToken,
    initKeycloak,
    doLogin,
    doLogout,
    isLoggedIn,
    getToken,
    updateToken,
    getUsername,
    getFullname,
    getSub,
    getUserEmail,
    hasRole,
    getLocation,
    getRoles,
    getTokenParsed,
};

export default KeycloakService;
