import { request, ResponseProps } from '../request';
import { TEMPLATE_UPLOAD, TEMPLATE_DOWNLOAD, ALL_TEMPLATES, TEMPLATES_DELETE } from '../constants/endpoints';

interface Id {
    id: string;
}
interface EditUserData {
    userName: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    emailId: string;
    department: string;
    // groups?: string[];
}

export interface UserData extends Id, EditUserData {}

export interface UserInfo {
    totalElements: number;
    page: number;
    size: number;
    content: UserData[] | [];
}

export interface EditUserDataResponse extends Id {
    userId: string;
    userData: EditUserData;
}

export interface FormioSubmissionData extends UserData {
    submit: boolean;
}

export const GET_ALL_TEMPLATES_ENDPOINT = `${process.env.REACT_APP_API_GATEWAY_URL}${ALL_TEMPLATES}`;
export const TEMPLATE_UPLOAD_ENDPOINT = `${process.env.REACT_APP_API_GATEWAY_URL}${TEMPLATE_UPLOAD}`;
export const TEMPLATE_DOWNLOAD_ENDPOINNT = `${process.env.REACT_APP_API_GATEWAY_URL}${TEMPLATE_DOWNLOAD}`;
export const TEMPLATE_DELETE_ENDPOINNT = `${process.env.REACT_APP_API_GATEWAY_URL}${TEMPLATES_DELETE}`;

export const getAllTemplatesApi = async (): Promise<{ success: boolean; message?: string; data?: any }> => {
    const r: ResponseProps = (await request.get(`${GET_ALL_TEMPLATES_ENDPOINT}`)) as ResponseProps;
    if (r.success) {
        const data: any = r.data as any;
        return { success: true, message: r.message, data: data };
    }
    return { success: false, message: 'Unable to fetch templates' };
};

export const uploadTemplateApi = async (fileName: string, file: string): Promise<{ success: boolean }> => {
    const blob = new Blob([file]);
    const fileOfBlob = new File([blob], `${fileName}.ftl`);
    const params = {
        TemplateName: fileName,
        file: fileOfBlob,
    };
    const r: ResponseProps = (await request.postForm(`${TEMPLATE_UPLOAD_ENDPOINT}`, params)) as ResponseProps;
    if (r && r.success) {
        // const data: any = r.data as any;
        return { success: true };
    }
    return { success: false };
};

export const downloadTemplateApi = async (id: string): Promise<{ success: boolean; message?: string; data?: any }> => {
    const response = (await request.getBlob(`${TEMPLATE_DOWNLOAD_ENDPOINNT}/${id}`)) as ResponseProps;
    if (response && response.success) {
        return { success: true, data: response };
    }
    return { success: false };
    //    const res = (await fetch(`${process.env.REACT_APP_API_GATEWAY_URL}${TEMPLATE_DOWNLOAD}/${id}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'text/plain',
    //                     'Authorization': 'Bearer ' + sessionStorage.getItem('react-token')
    //                 }
    //             }).then(response => response.blob())              )

    //                 if(res) {
    //                     return {success : true , data : res}
    //                 }
    //                 return {success : false}
};

export const deleteTemplateApi = async (id: string): Promise<{ success: boolean; message?: string; data?: any }> => {
    const r: ResponseProps = (await request.delete(`${TEMPLATE_DELETE_ENDPOINNT + id}`)) as ResponseProps;
    if (r.success) {
        const data: any = r.data as any;
        return { success: true, message: r.message, data: data };
    } else {
    }
    return { success: false, message: 'Unable to delete template' };
};
