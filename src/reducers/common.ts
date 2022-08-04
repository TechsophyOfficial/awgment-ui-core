import { SET_SPINNER, SHOW_FLASH_MESSAGE, CLEAN_ALERTS, UPDATE_THEMES } from '../constants/common';

interface Action {
    type: string;
    showSpinner?: boolean;
    successMessage?: string;
    errorMessage?: string;
    token?: string;
    updateThemesList?: boolean;
}

interface CommonReducer {
    showSpinner?: boolean;
    successMessage?: string;
    errorMessage?: string;
    token?: string;
    updateThemesList?: boolean;
}
const initialState = {
    showSpinner: false,
    errorMessage: '',
    successMessage: '',
    token: '',
    updateThemesList: false,
};

export const commonReducer = (state = initialState, action: Action): CommonReducer => {
    switch (action.type) {
        case SET_SPINNER:
            return {
                ...state,
                showSpinner: action.showSpinner,
            };
        case SHOW_FLASH_MESSAGE:
            return Object.assign({}, state, {
                successMessage: action.successMessage,
                errorMessage: action.errorMessage,
            });
        case CLEAN_ALERTS:
            return Object.assign({}, state, {
                successMessage: null,
                errorMessage: null,
            });
        case UPDATE_THEMES:
            return {
                ...state,
                updateThemesList: action.updateThemesList,
            };
        default:
            return state;
    }
};

export default commonReducer;
