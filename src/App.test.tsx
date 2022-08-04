import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// jest.mock('@react-keycloak/web', () => {
//     const originalModule = jest.requireActual('@react-keycloak/web');
//     return {
//         ...originalModule,
//         useKeycloak: () => {
//             return {
//                 keycloak: {
//                     idTokenParsed: {
//                         name: 'afdsa',
//                     },
//                     init: jest.fn().mockImplementation(() => Promise.resolve({})),
//                     login: jest.fn(),
//                     createLoginUrl: jest.fn(),
//                     logout: jest.fn(),
//                     createLogoutUrl: jest.fn(),
//                     register: jest.fn(),
//                     createRegisterUrl: jest.fn(),
//                     createAccountUrl: jest.fn(),
//                     accountManagement: jest.fn(),
//                     hasRealmRole: jest.fn(),
//                     hasResourceRole: jest.fn(),
//                     loadUserProfile: jest.fn(),
//                     loadUserInfo: jest.fn(),
//                     isTokenExpired: jest.fn(),
//                     updateToken: jest.fn(),
//                     clearToken: jest.fn(),
//                 },
//             };
//         },
//     };
// });

describe('App', () => {
    // const mockResponse = jest.fn();
    // Object.defineProperty(window, 'location', {
    //     value: {
    //         hash: {
    //             endsWith: mockResponse,
    //             includes: mockResponse,
    //         },
    //         assign: mockResponse,
    //     },
    //     writable: true,
    // });

    it('App test', () => {
        // const { getByText } = render(<App />);
        // expect(getByText('Workflow Modeler')).toBeInTheDocument();
        // expect(getByText('Rule Modeler')).toBeInTheDocument();
        // expect(getByText('Form Modeler')).toBeInTheDocument();
    });
});
