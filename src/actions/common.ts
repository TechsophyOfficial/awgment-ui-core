import { SET_SPINNER, SHOW_FLASH_MESSAGE, CLEAN_ALERTS, UPDATE_THEMES } from '../constants/common';

interface Spinner {
    type: string;
    showSpinner: boolean;
}

interface FlashMessage {
    errorMessage?: string;
    successMessage?: string;
}

interface Themes {
    type: string;
    updateThemesList: boolean;
}

export const showSpinner = (): Spinner => {
    return {
        type: SET_SPINNER,
        showSpinner: true,
    };
};

export const closeSpinner = (): Spinner => {
    return {
        type: SET_SPINNER,
        showSpinner: false,
    };
};

export const showFlashMessage = ({
    errorMessage,
    successMessage,
}: FlashMessage): { type?: string; errorMessage?: string; successMessage?: string } => {
    return {
        type: SHOW_FLASH_MESSAGE,
        errorMessage: errorMessage,
        successMessage: successMessage,
    };
};

export const cleanAlerts = (): { type: string } => {
    return {
        type: CLEAN_ALERTS,
    };
};

// export const updatedThemesList = ({data} : any) : {type?: string , data?: string} => {
//     return {
//         type: THEMES_LOADED,
//         data : data,
//     };
// };

export const updateThemesList = (): Themes => {
    return {
        type: UPDATE_THEMES,
        updateThemesList: true,
    };
};
