// KeycloakService.ts
import Keycloak, { KeycloakInstance, KeycloakInitOptions, KeycloakTokenParsed } from 'keycloak-js';

type AuthCallback = () => void;
type SuccessCallback = () => void;

let keycloak: KeycloakInstance; // Will be assigned after config is received

const storeToken = (token: string | undefined) => {
    sessionStorage.setItem('react-token', token ?? '');
};

const initKeycloak = (onAuthenticatedCallback: AuthCallback, config: any) => {
    const keycloakConfig = {
        url: `${config?.keyCloakUrl}auth`,
        realm: config?.keyCloakRealm,
        clientId: config?.keyCloakClientId,
    };

    keycloak = new Keycloak(keycloakConfig);

    const options: KeycloakInitOptions = {
        onLoad: 'check-sso',
        checkLoginIframe: false,
        pkceMethod: 'S256',
    };

    keycloak
        .init(options)
        .then((authenticated: boolean) => {
            if (authenticated) {
                const token: any = keycloak.token;
                const parsed = keycloak.tokenParsed;
                onAuthenticatedCallback();
                sessionStorage.setItem('react-token', token ?? '');
                localStorage.setItem('token', token);
                localStorage.setItem('currentUser', parsed?.preferred_username ?? '');
                localStorage.setItem('email', parsed?.email ?? '');
            } else {
                doLogin();
            }
        })
        .catch((err) => {
            console.error('Keycloak init error', err);
        });

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(5);
    };

    keycloak.onAuthSuccess = () => storeToken(keycloak.token);
    keycloak.onAuthRefreshSuccess = () => storeToken(keycloak.token);
    keycloak.onAuthLogout = () => sessionStorage.clear();
};

// Helper methods assume `keycloak` has already been initialized
const doLogin = () => keycloak?.login();
const doLogout = () => keycloak?.logout();
const getToken = (): string | undefined => keycloak?.token;
const isLoggedIn = (): boolean => !!keycloak?.token;
const updateToken = (successCallback: SuccessCallback) => keycloak?.updateToken(5).then(successCallback).catch(doLogin);
const getTokenParsed = (): KeycloakTokenParsed | any => keycloak?.tokenParsed;
const getUsername = (): string | undefined => getTokenParsed()?.preferred_username;
const getFullname = (): string =>
    ((getTokenParsed()?.given_name ?? '') + ' ' + (getTokenParsed()?.family_name ?? '')).trim();
const getSub = (): string | undefined => getTokenParsed()?.sub;
const getUserEmail = (): string | undefined => getTokenParsed()?.email;
const hasRole = (roles: string[]): boolean => roles.some((role) => keycloak?.hasResourceRole(role));
const getRoles = (): string[] => getTokenParsed()?.realm_access?.roles ?? [];
const getLocation = (): string | undefined => getTokenParsed()?.location;

const KeycloakService = {
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
