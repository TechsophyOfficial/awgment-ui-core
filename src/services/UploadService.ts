import { request, ResponseProps } from '../request';
import { FILE_UPLOADS, DOWNLOAD_ID } from '../constants/endpoints';
import axios from 'axios';

export const UPLOAD_CSV = `${process.env.REACT_APP_API_GATEWAY_URL}${FILE_UPLOADS}`;
export const DOWNLOAD_CSV = `${process.env.REACT_APP_API_GATEWAY_URL}${DOWNLOAD_ID}`;

// export const uploadCSV = async (fileName: any, fileContent: any): Promise<{ success: boolean; message?: string }> => {
//     //     const blob = new Blob([fileData]);
//     //   const fileOfBlob = new File([blob], `${fileName}.ftl`);
//     const r: ResponseProps = (await request.post(`${UPLOAD_CSV}`, { file: fileContent })) as ResponseProps;
//     if (r.success) {
//         return { success: true, message: r.message };
//     }
//     return { success: false, message: 'Unable to Upload File' };
// };

export const uploadCSV = async (
    fileName: string,
    file: File,
    type: string,
): Promise<{ success: boolean; data?: any; message?: string }> => {
    const blob = new Blob([file]);
    const fileOfBlob = new File([blob], `${fileName}.csv`);
    const params = {
        file: file,
    };
    const r: ResponseProps = (await request.postForm(`${UPLOAD_CSV}${type}`, params)) as ResponseProps;
    if (r && r.success) {
        // alert('File Uploaded Successfully');
        // const data: any = r.data as any;
        return { success: true, message: r.message, data: r.data };
    }
    return { success: false };
};

export const downloadCsv = async (id: string) => {
    let token = sessionStorage.getItem('react-token');
    const response = await axios.get(`${DOWNLOAD_CSV}${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,

            responseType: 'blob', // VERY IMPORTANT 'arrayBuffer'
        },
    });
    console.log(response);
    return response;
};
