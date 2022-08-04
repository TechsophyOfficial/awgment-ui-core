import { request, ResponseProps } from '../../request';
import {
    deleteTemplateApi,
    downloadTemplateApi,
    getAllTemplatesApi,
    GET_ALL_TEMPLATES_ENDPOINT,
    TEMPLATE_DELETE_ENDPOINNT,
    TEMPLATE_DOWNLOAD_ENDPOINNT,
    TEMPLATE_UPLOAD_ENDPOINT,
    uploadTemplateApi,
} from '../TemplateService';

jest.mock('../../request');

const mockedRequest = request as jest.Mocked<typeof request>;

const successResponse = (data) => {
    const res: ResponseProps = {
        success: true,
        message: 'Success Response',
    };
    if (data) {
        res.data = data;
    }
    return res;
};

const errorResponse = () => {
    return {
        success: false,
        message: 'Error Response',
    };
};

describe('getAllTemplatesApi', () => {
    afterEach(jest.clearAllMocks);
    const data = [];
    test('fetches successfully data from an API', async () => {
        mockedRequest.get.mockResolvedValue(successResponse(data));
        const result = await getAllTemplatesApi();
        expect(mockedRequest.get).toHaveBeenCalledTimes(1);
        expect(result).toEqual(successResponse(data));
    });

    test('getAllTemplatesApi() should call wilth proper Request URL', async () => {
        await getAllTemplatesApi();
        expect(mockedRequest.get).toHaveBeenCalledWith(`${GET_ALL_TEMPLATES_ENDPOINT}`);
    });

    test('fetches erroneously data from an API', async () => {
        mockedRequest.get.mockResolvedValue(errorResponse());
        const result = await getAllTemplatesApi();
        expect(result.message).toEqual('Unable to fetch templates');
    });
});

describe('uploadTemplateApi', () => {
    afterEach(jest.clearAllMocks);
    const data = {
        templateName: 'fileName.ftl',
    };
    const params = {
        TemplateName: 'fileName',
        file: new File([new Blob()], 'filename.ftl'),
    };
    test('fetches successfully data from an API', async () => {
        mockedRequest.postForm.mockResolvedValue(successResponse(data));
        const result = await uploadTemplateApi('fileName', '');
        expect(mockedRequest.postForm).toHaveBeenCalledTimes(1);
        expect(mockedRequest.postForm).toHaveBeenCalledWith(`${TEMPLATE_UPLOAD_ENDPOINT}`, params);
        expect(result.success).toEqual(true);
    });

    test('fetches erroneously data from an API', async () => {
        mockedRequest.postForm.mockResolvedValue(errorResponse());
        const result = await uploadTemplateApi('123', '');
        expect(result.success).toEqual(false);
    });
});

describe('downloadTemplateApi testing', () => {
    afterEach(jest.clearAllMocks);

    const data = '<HTML></HTML>';

    test('fetches successfully data from an API', async () => {
        mockedRequest.getBlob.mockResolvedValue(successResponse(data));
        const result = await downloadTemplateApi('123');
        expect(mockedRequest.getBlob).toHaveBeenCalledTimes(1);
        expect(mockedRequest.getBlob).toHaveBeenCalledWith(TEMPLATE_DOWNLOAD_ENDPOINNT + '/123');
        expect(result.success).toEqual(true);
    });

    test('fetches erroneously data from an API', async () => {
        mockedRequest.getBlob.mockResolvedValue(errorResponse());
        const result = await downloadTemplateApi('123');
        expect(mockedRequest.getBlob).toHaveBeenCalledTimes(1);
        expect(result.success).toEqual(false);
    });
});

describe('Delete Template testing', () => {
    afterEach(jest.clearAllMocks);

    test('fetches successfully data from an API', async () => {
        mockedRequest.delete.mockResolvedValue(successResponse({}));
        const result = await deleteTemplateApi('123');
        expect(mockedRequest.delete).toHaveBeenCalledTimes(1);
        expect(mockedRequest.delete).toHaveBeenCalledWith(TEMPLATE_DELETE_ENDPOINNT + '123');
        expect(result).toEqual(successResponse({}));
    });

    test('fetches erroneously data from an API', async () => {
        mockedRequest.delete.mockResolvedValue(errorResponse());
        const result = await deleteTemplateApi('123');
        expect(mockedRequest.delete).toHaveBeenCalledTimes(1);
        expect(result.success).toEqual(false);
    });
});
