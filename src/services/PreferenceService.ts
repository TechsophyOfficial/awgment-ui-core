import { KEYCLOAK_IMAGES } from '../constants/common';
import { USER_PREFERENCE } from '../constants/endpoints';
import { request, ResponseProps } from '../request';

export const UPLOAD_PROFILE_IMAGE = `${process.env.REACT_APP_API_GATEWAY_URL}${USER_PREFERENCE}`;

export const uploadProfileImage = async (
    file: string,
    name: string,
): Promise<{ success: boolean; message?: string; data?: any }> => {
    const blob = new Blob([file]);
    const fileOfBlob = new File([blob], `${name}`);
    const params = {
        file: fileOfBlob,
    };
    const r: ResponseProps = (await request.postForm(
        `${UPLOAD_PROFILE_IMAGE}${'/profile-picture'}`,
        params,
    )) as ResponseProps;
    if (r) {
        // const data: any = r.data as any;
        return { success: r.success ? true : false, message: r.message, data: r.data };
    }
    return { success: false };
};
