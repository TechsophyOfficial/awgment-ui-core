import { createTheme } from '@material-ui/core';

export const FILE_SAVER_PREFIX = 'data:application/bpmn20-xml;charset=UTF-8';
export const alphabets = '0123456789abcdefghijklmnopqrstuvwxyz';
export const ADMIN_ROLE = 'TSF-ADMIN';
export const ADMIN = 'Admin';
export const KEYCLOAK_DOCTYPE_ID = '877062115733221376';
export const KEYCLOAK_IMAGES = 'keycloak-images';
export const BG_IMAGE_NAME = 'bg';
export const LOGO_IMAGE_NAME = 'logo';

// Height and Width
export const HEADER_HEIGHT = 60;
export const FOOTER_HEIGHT = 30;
export const SIDEBAR_WIDTH = 92;

// realm
export const REALM = 'realm';

// forms
export const OPEN_TICKET_FORM_ID = '871606881171517440';
export const SAVE_SUBMIT_FORM_ID = '928232634435125248';
export const VIEW_TICKET_FORM_ID = '959323698389225472';
export const Doctor_Consultation_FORM_ID = '963033970920071168';
export const View_Doctor_Consultancies_FORM_ID = '963332698428088320';

export const OPEN_TICKET_PROCESS_DEFINITION_KEY = 'Process_e1w78p5';

//network
export const DELETE = 'delete';
export const GET = 'get';
export const POST = 'post';
export const PUT = 'put';

//redux
export const SET_SPINNER = 'SET_SPINNER';
export const CLEAR_STORE = 'clearStore';
export const SHOW_FLASH_MESSAGE = 'SHOW_FLASH_MESSAGE';
export const CLEAN_ALERTS = 'CLEAN_ALERTS';
export const UPDATE_THEMES = 'UPDATE_THEMES';

//styles
export const INPUT_TEXT_MIN_WIDTH = 300;

//initial material theme

export const INITIAL_THEME = createTheme({
    palette: {
        type: 'dark',
        primary: {
            // main: colors.indigo[500],
            main: '#201e45',
            light: '#95CBF7',
        },
        secondary: {
            // main: colors.indigo[500]
            main: '#000',
        },
        error: {
            main: '#f17b7b',
        },
    },
});

// Upload IDS

export const UPLOAD_DOWNLOAD_ID = '1003237374350872576';
