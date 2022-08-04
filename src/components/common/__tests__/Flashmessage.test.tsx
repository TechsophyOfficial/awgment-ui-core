import React from 'react';
import FlashMessage from '../Flashmessage';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const successMessageProps = {
    common: {
        successMessage: 'success message',
        open_flash_message: true,
        cleanAlerts: jest.fn(),
    },
};

const errorMessageProps = {
    common: {
        errorMessage: 'error occurred',
        open_flash_message: true,
        cleanAlerts: jest.fn(),
    },
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store = mockStore(successMessageProps);

it('render flash messages for success scenario', () => {
    const { getByText } = render(
        <Provider store={store}>
            <FlashMessage />
        </Provider>,
    );
    expect(getByText('success message')).toBeInTheDocument();
});

it('render flash messages for error scenario', () => {
    store = mockStore(errorMessageProps);
    const { getByText } = render(
        <Provider store={store}>
            <FlashMessage />
        </Provider>,
    );
    expect(getByText('error occurred')).toBeInTheDocument();
});
