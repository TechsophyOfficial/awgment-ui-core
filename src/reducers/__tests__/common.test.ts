import commonReducer from '../common';
import { SET_SPINNER, SHOW_FLASH_MESSAGE, CLEAN_ALERTS } from '../../constants/common';

const initialState = {
    showSpinner: false,
    errorMessage: '',
    successMessage: '',
};

describe('commonReducer', () => {
    test('SET_SPINNER commonReducer() test', () => {
        const action = {
            type: SET_SPINNER,
            showSpinner: true,
            successMessage: 'success',
            errorMessage: 'error',
        };
        const expected = {
            showSpinner: true,
            errorMessage: '',
            successMessage: '',
        };
        const result = commonReducer(initialState, action);
        expect(result).toEqual(expected);
    });

    test('SHOW_FLASH_MESSAGE commonReducer() test', () => {
        const action = {
            type: SHOW_FLASH_MESSAGE,
            showSpinner: false,
            successMessage: 'success',
            errorMessage: 'error',
        };
        const expected = {
            showSpinner: false,
            successMessage: 'success',
            errorMessage: 'error',
        };
        const result = commonReducer(initialState, action);
        expect(result).toEqual(expected);
    });

    test('CLEAN_ALERTS commonReducer() test', () => {
        const action = {
            type: CLEAN_ALERTS,
            showSpinner: false,
            successMessage: '',
            errorMessage: '',
        };
        const expected = {
            showSpinner: false,
            successMessage: null,
            errorMessage: null,
        };
        const result = commonReducer(initialState, action);
        expect(result).toEqual(expected);
    });
});
