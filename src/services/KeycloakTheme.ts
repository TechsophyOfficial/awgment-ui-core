//import React from 'react';
import { KEYCLOAK_DOCTYPE_ID, KEYCLOAK_IMAGES } from '../constants/common';
import { UPLOAD_KEYCLOAK_THEME_IMAGES } from '../constants/endpoints';
import { request, ResponseProps } from '../request';
//import AppConfig from '../appConfig';

//export const UPLOAD_KEYCLOAK_THEME_IMAGE_ENDPOINT = `${process.env.REACT_APP_API_GATEWAY_URL}${UPLOAD_KEYCLOAK_THEME_IMAGES}`;

export const uploadKeycloakThemeImageApi = async (
    file: string,
    fileName: string,
    baseUrl: string,
): Promise<{ success: boolean; message?: string; data?: any }> => {
    //const appData: any = React.useContext(AppConfig);
    const UPLOAD_KEYCLOAK_THEME_IMAGE_ENDPOINT = `${baseUrl}/api${UPLOAD_KEYCLOAK_THEME_IMAGES}`;

    const blob = new Blob([file]);
    const fileOfBlob = new File([blob], `${fileName}.png`);
    const params = {
        businessKey: KEYCLOAK_IMAGES,
        file: fileOfBlob,
    };
    const r: ResponseProps = (await request.postForm(
        `${UPLOAD_KEYCLOAK_THEME_IMAGE_ENDPOINT}${KEYCLOAK_DOCTYPE_ID}`,
        params,
    )) as ResponseProps;
    if (r) {
        // const data: any = r.data as any;
        return { success: r.success ? true : false, message: r.message, data: r.data };
    }
    return { success: false };
};
