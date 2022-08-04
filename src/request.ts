import wretch from 'wretch';
import { ResponseChain } from 'wretch/dist/resolver';
// import keycloak from './keycloak';

export interface ResponseProps {
    success?: boolean;
    data?: any;
    message?: string;
}

type ApiResponse = unknown;

const callAPI = async (w: ResponseChain): Promise<ApiResponse> => {
    return w
        .unauthorized((_error) => {
            sessionStorage.clear();
            // keycloak.logout();
            return {
                success: false,
                message: 'Please login...',
            };
        })
        .internalError((error) => {
            const { message } = JSON.parse(error.message);
            return {
                success: false,
                message: message,
            };
        })
        .json((response) => response)
        .catch((error) => {
            console.log(error);
            return {
                success: false,
                message: 'Error communicating with server',
            };
        });
};

const callBlobAPI = async (w: ResponseChain): Promise<ApiResponse> => {
    return w
        .unauthorized((_error) => {
            sessionStorage.clear();
            // keycloak.logout();
            return {
                success: false,
                message: 'Please login...',
            };
        })
        .internalError((error) => {
            const { message } = JSON.parse(error.message);
            return {
                success: false,
                message: message,
            };
        })
        .blob((response) => {
            return { success: true, data: response };
        })
        .catch((error) => {
            console.log(error);
            return {
                success: false,
                message: 'Error communicating with server',
            };
        });
};

export const request = {
    get: (url: string): Promise<ApiResponse> =>
        callAPI(
            wretch(url)
                .auth(`Bearer ${sessionStorage.getItem('react-token')}`)
                .headers({ 'content-type': 'application/json' })
                .get(),
        ),
    getBlob: (url: string): Promise<ApiResponse> =>
        callBlobAPI(
            wretch(url)
                .auth(`Bearer ${sessionStorage.getItem('react-token')}`)
                .headers({ 'content-type': 'application/json' })
                .get(),
        ),

    post: (url: string, body: unknown): Promise<ApiResponse> =>
        callAPI(
            wretch(url)
                .auth(`Bearer ${sessionStorage.getItem('react-token')}`)
                .post(body),
        ),

    delete: (url: string): Promise<ApiResponse> =>
        callAPI(
            wretch(url)
                .auth(`Bearer ${sessionStorage.getItem('react-token')}`)
                .delete(),
        ),
    postForm: (url: string, params: { [key: string]: unknown }, controller?: AbortController): Promise<ApiResponse> =>
        callAPI(
            wretch(url)
                .auth(`Bearer ${sessionStorage.getItem('react-token')}`)
                .formData(params)
                .post(),
        ),
};
