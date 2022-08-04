import { request, ResponseProps } from '../request';
import { MENU } from '../constants/endpoints';
import { FormProps } from './FormTypes';
import { FORMS } from '../constants/endpoints';

export const GET_MENU_ENDPOINT = `${process.env.REACT_APP_API_GATEWAY_URL}${MENU}`;
export const RUNTIME_FORM_ENDPOINT = `${process.env.REACT_APP_API_GATEWAY_URL}${FORMS}`;

export const getMenu = async () => {
    console.log(GET_MENU_ENDPOINT);
    const res: ResponseProps = (await request.get(GET_MENU_ENDPOINT)) as ResponseProps;
    if (res.success) {
        const data = res.data;
        return data;
    }
    return {};
};

export const getMenuForm = async () => {
    console.log(GET_MENU_ENDPOINT);
    const res: ResponseProps = (await request.get(GET_MENU_ENDPOINT)) as ResponseProps;
    if (res.success) {
        const data = res.data;
        return data;
    }
    return {};
};

export const getFormById = async (id: string): Promise<{ success: boolean; data?: FormProps; message?: string }> => {
    const r: ResponseProps = (await request.get(`${RUNTIME_FORM_ENDPOINT}/${id}`)) as ResponseProps;

    if (r.success) {
        const form = r.data as FormProps;
        return { success: r.success, data: form, message: r.message };
    }

    return { success: false };
};
