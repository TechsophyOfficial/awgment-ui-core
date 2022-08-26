import { request, ResponseProps } from '../../request';
import {
    deleteTemplateApi,
    downloadTemplateApi,
    getAllTemplatesApi,
    uploadTemplateApi,
} from '../TemplateService';
import { TEMPLATE_UPLOAD, TEMPLATE_DOWNLOAD, ALL_TEMPLATES, TEMPLATES_DELETE } from '../../constants/endpoints';

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

const GET_ALL_TEMPLATES_ENDPOINT ='',
TEMPLATE_DELETE_ENDPOINNT='',
TEMPLATE_DOWNLOAD_ENDPOINNT='',
TEMPLATE_UPLOAD_ENDPOINT='';

describe('getAllTemplatesApi', () => {
    afterEach(jest.clearAllMocks);
    const URL= '';
    const data = [];
    test('fetches successfully data from an API', async () => {
        mockedRequest.get.mockResolvedValue(successResponse(data));
        const result = await getAllTemplatesApi(URL);
        expect(mockedRequest.get).toHaveBeenCalledTimes(1);
        expect(result).toEqual(successResponse(data));
    });

    test('getAllTemplatesApi() should call wilth proper Request URL', async () => {
        await getAllTemplatesApi(URL);
        expect(mockedRequest.get).toHaveBeenCalledWith(`${ALL_TEMPLATES}`);
    });

    test('fetches erroneously data from an API', async () => {
        mockedRequest.get.mockResolvedValue(errorResponse());
        const result = await getAllTemplatesApi(URL);
        expect(result.message).toEqual('Unable to fetch templates');
    });
});

describe('uploadTemplateApi', () => {
    afterEach(jest.clearAllMocks);
    const data = {
        templateName: 'fileName.ftl',
    };
    const URL = '';
    const params = {
        TemplateName: 'fileName',
        file: new File([new Blob()], 'filename.ftl'),
    };
    test('fetches successfully data from an API', async () => {
        mockedRequest.postForm.mockResolvedValue(successResponse(data));
        const result = await uploadTemplateApi('fileName', '',URL);
        expect(mockedRequest.postForm).toHaveBeenCalledTimes(1);
        expect(mockedRequest.postForm).toHaveBeenCalledWith(`${TEMPLATE_UPLOAD}`, params);
        expect(result.success).toEqual(true);
    });

    test('fetches erroneously data from an API', async () => {
        mockedRequest.postForm.mockResolvedValue(errorResponse());
        const result = await uploadTemplateApi('123', '',URL);
        expect(result.success).toEqual(false);
    });
});

describe('downloadTemplateApi testing', () => {
    afterEach(jest.clearAllMocks);

    const data = '<HTML></HTML>';
    const URL = '';
    test('fetches successfully data from an API', async () => {
        mockedRequest.getBlob.mockResolvedValue(successResponse(data));
        const result = await downloadTemplateApi('123',URL);
        expect(mockedRequest.getBlob).toHaveBeenCalledTimes(1);
        expect(mockedRequest.getBlob).toHaveBeenCalledWith(TEMPLATE_DOWNLOAD + '/123');
        expect(result.success).toEqual(true);
    });

    test('fetches erroneously data from an API', async () => {
        mockedRequest.getBlob.mockResolvedValue(errorResponse());
        const result = await downloadTemplateApi('123',URL);
        expect(mockedRequest.getBlob).toHaveBeenCalledTimes(1);
        expect(result.success).toEqual(false);
    });
});

describe('Delete Template testing', () => {
    afterEach(jest.clearAllMocks);
    const URL = '';
    test('fetches successfully data from an API', async () => {
        mockedRequest.delete.mockResolvedValue(successResponse({}));
        const result = await deleteTemplateApi('123',URL);
        expect(mockedRequest.delete).toHaveBeenCalledTimes(1);
        expect(mockedRequest.delete).toHaveBeenCalledWith(TEMPLATES_DELETE + '123');
        expect(result).toEqual(successResponse({}));
    });

    test('fetches erroneously data from an API', async () => {
        mockedRequest.delete.mockResolvedValue(errorResponse());
        const result = await deleteTemplateApi('123',URL);
        expect(mockedRequest.delete).toHaveBeenCalledTimes(1);
        expect(result.success).toEqual(false);
    });
});
