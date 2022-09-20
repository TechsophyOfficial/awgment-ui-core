import { request, ResponseProps } from '../request';
import {
    ALL_THEMES,
    CREATE_USER_THEME,
    SAVE_USER_THEME,
    SELECTED_THEME,
    THEME_DOWNLOAD,
    THEME_UPLOAD,
} from '../constants/endpoints';
import { themeOptions } from '../theme/ManageThemes';
interface Id {
    id: string;
}

export interface ThemeInstance extends Id {
    content: themeOptions;
    createdById: Date;
    createdOn: Date;
    name: string;
    updatedById: string;
    updatedOn: string;
}

interface UserTheme extends Id {
    themeId: string;
    userId: string;
    profilePicture: string;
}

interface CreateThemeRequestBody {
    content: themeOptions;
    name: string;
}

interface ThemeReqProps {
    paginate?: boolean;
    searchTerm?: string;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    gatewayUrl?: string;
}

//export const GET_SELECTED_THEME_ENDPOINT = `${process.env.REACT_APP_WORKFLOW_ENGINE_URL}${SELECTED_THEME}`;
//export const GET_ALL_THEMES_ENDPOINT = `${process.env.REACT_APP_API_GATEWAY_URL}${ALL_THEMES}`;
//export const SAVE_USER_THEME_ENDPOINNT = `${process.env.REACT_APP_API_GATEWAY_URL}${SAVE_USER_THEME}`;
//export const CREATE_USER_THEME_ENDPOINNT = `${process.env.REACT_APP_API_GATEWAY_URL}${CREATE_USER_THEME}`;
//export const GET_USER_THEME_ENDPOINNT = `${process.env.REACT_APP_API_GATEWAY_URL}${SAVE_USER_THEME}`;
//export const THEME_UPLOAD_ENDPOINT = `${process.env.REACT_APP_API_GATEWAY_URL}${THEME_UPLOAD}`;
//export const THEME_DOWNLOAD_ENDPOINT = `${process.env.REACT_APP_API_GATEWAY_URL}${THEME_DOWNLOAD}`;

export const getAllThemes = async ({
    paginate = false,
    searchTerm = '',
    gatewayUrl = '',
}: ThemeReqProps): Promise<{ success: boolean; message?: string; data?: ThemeInstance[] }> => {
    const search = searchTerm ? `&q=${searchTerm}` : '';
    const GET_ALL_THEMES_ENDPOINT = `${gatewayUrl}${ALL_THEMES}`;
    const r: ResponseProps = (await request.get(
        `${GET_ALL_THEMES_ENDPOINT}?include-content=true${search}`,
    )) as ResponseProps;
    if (r.success) {
        const data: ThemeInstance[] = r.data as ThemeInstance[];
        return { success: true, message: r.message, data: data };
    }
    return { success: false, message: 'Unable to fetch themes' };
};

export const getTheme = async (
    id: string,
    gatewayUrl: string,
): Promise<{ success: boolean; message?: string; data?: ThemeInstance }> => {
    const GET_ALL_THEMES_ENDPOINT = `${gatewayUrl}${ALL_THEMES}`;
    const r: ResponseProps = (await request.get(`${GET_ALL_THEMES_ENDPOINT}/${id}`)) as ResponseProps;
    if (r.success) {
        const data: ThemeInstance = r.data as ThemeInstance;
        return { success: true, message: r.message, data: data };
    }
    return { success: false, message: 'Unable to fetch theme' };
};

export const getUserTheme = async (
    gatewayUrl: string,
): Promise<{ success: boolean; message?: string; data?: UserTheme }> => {
    const GET_USER_THEME_ENDPOINNT = `${gatewayUrl}${SAVE_USER_THEME}`;
    const r: ResponseProps = (await request.get(`${GET_USER_THEME_ENDPOINNT}`)) as ResponseProps;
    if (r.success) {
        const data: UserTheme = r.data as UserTheme;
        return { success: true, message: r.message, data: data };
    }
    return { success: false, message: 'Unable to fetch theme' };
};

export const saveUserTheme = async (
    themeId: string,
    gatewayUrl: string,
): Promise<{ success: boolean; message?: string }> => {
    const SAVE_USER_THEME_ENDPOINNT = `${gatewayUrl}${SAVE_USER_THEME}`;
    const reqBody = {
        themeId: themeId,
    };
    const r: ResponseProps = (await request.post(`${SAVE_USER_THEME_ENDPOINNT}`, reqBody)) as ResponseProps;
    if (r.success) {
        return { success: true, message: r.message };
    }
    return { success: false, message: 'Unable to save user theme' };
};

export const createTheme = async (
    requestBody: CreateThemeRequestBody,
    gatewayUrl: string,
): Promise<{ success: boolean; message?: string }> => {
    const CREATE_USER_THEME_ENDPOINNT = `${gatewayUrl}${CREATE_USER_THEME}`;
    const r: ResponseProps = (await request.post(`${CREATE_USER_THEME_ENDPOINNT}`, requestBody)) as ResponseProps;
    if (r.success) {
        return { success: true, message: r.message };
    }
    return { success: false, message: 'Unable to create user theme' };
};

export const deleteTheme = async (id: string, gatewayUrl: string): Promise<{ success: boolean; message?: string }> => {
    const CREATE_USER_THEME_ENDPOINNT = `${gatewayUrl}${CREATE_USER_THEME}`;
    const r: ResponseProps = (await request.delete(`${CREATE_USER_THEME_ENDPOINNT + id}`)) as ResponseProps;
    if (r.success) {
        return { success: true, message: r.message };
    }
    return { success: false, message: 'Unable to delete theme' };
};

export const uploadThemeApi = async (
    fileName: string,
    file: string,
    gatewayUrl: string,
): Promise<{ success: boolean; message?: string }> => {
    const THEME_UPLOAD_ENDPOINT = `${gatewayUrl}${THEME_UPLOAD}`;
    const blob = new Blob([file]);
    const fileOfBlob = new File([blob], `${fileName}.json`);
    const params = {
        file: fileOfBlob,
    };
    const r: ResponseProps = (await request.postForm(
        `${THEME_UPLOAD_ENDPOINT}?name=${fileName}`,
        params,
    )) as ResponseProps;
    if (r.success) {
        return { success: true, message: r.message };
    }
    return { success: false };
};

export const downloadThemeApi = async (
    id: string,
    gatewayUrl: string,
): Promise<{ success: boolean; message?: string; data?: any }> => {
    const THEME_DOWNLOAD_ENDPOINT = `${gatewayUrl}${THEME_DOWNLOAD}`;
    const response = (await request.get(`${THEME_DOWNLOAD_ENDPOINT}/${id}/export`)) as ResponseProps;
    if (response) {
        return { success: true, data: response };
    }
    return { success: false };
};
