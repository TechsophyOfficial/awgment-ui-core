import { request, ResponseProps } from '../../request';
import {
    createTheme,
    deleteTheme,
    downloadThemeApi,
    getAllThemes,
    getUserTheme,
    saveUserTheme,
    uploadThemeApi,
} from '../ThemeService';

jest.mock('../../request');

const mockedRequest = request as jest.Mocked<typeof request>;


const successResponse = (data) => {
    const res: ResponseProps = {
        success: true,
        message: 'Success Response',
    };
    // if (data) {
    //     res.data = data;
    // }
    return res;
};

const errorResponse = () => {
    return {
        success: false,
        message: 'Error Response',
    };
};

describe('getAllThemes', () => {
    afterEach(jest.clearAllMocks);
    const data = [];
    test('fetches successfully data from an API', async () => {
        mockedRequest.get.mockResolvedValue(successResponse(data));
        const result = await getAllThemes({});
        expect(mockedRequest.get).toHaveBeenCalledTimes(1);
        expect(result).toEqual(successResponse(data));
    });

    test('getAllThemes() should call wilth proper Request URL', async () => {
        await getAllThemes({});
        expect(mockedRequest.get).toHaveBeenCalledWith(`/accounts/v1/themes?include-content=true`);
    });

    test('fetches erroneously data from an API', async () => {
        mockedRequest.get.mockResolvedValue(errorResponse());
        const result = await getAllThemes({});
        expect(result.message).toEqual('Unable to fetch themes');
    });
});

describe('getUserTheme', () => {
    afterEach(jest.clearAllMocks);
    const data = {};
    test('fetches successfully data from an API', async () => {
        mockedRequest.get.mockResolvedValue(successResponse(data));
        const result = await getUserTheme('');
        expect(mockedRequest.get).toHaveBeenCalledTimes(1);
        expect(result).toEqual(successResponse(data));
    });

    test('getUserTheme() should call wilth proper Request URL', async () => {
        await getUserTheme('');
        expect(mockedRequest.get).toHaveBeenCalledWith(`/accounts/v1/users/preferences/`);
    });

    test('fetches erroneously data from an API', async () => {
        mockedRequest.get.mockResolvedValue(errorResponse());
        const result = await getUserTheme('');
        expect(result.message).toEqual('Unable to fetch theme');
    });
});

describe('saveUserTheme', () => {
    afterEach(jest.clearAllMocks);
    const data = {};
    const SAVE_USER_THEME_ENDPOINNT = '';
    const param = {
        themeId: '123',
    };

    test('fetches successfully data from an API', async () => {
        mockedRequest.post.mockResolvedValue(successResponse(false));
        const result = await saveUserTheme('123', 'api');
        expect(mockedRequest.post).toHaveBeenCalledTimes(1);
        expect(result).toEqual(successResponse(false));
    });

    test('saveUserTheme() should call wilth proper Request URL', async () => {
        await saveUserTheme('123', 'api');
        expect(mockedRequest.post).toHaveBeenCalledWith(`api/accounts/v1/users/preferences/`, param);
    });

    test('fetches erroneously data from an API', async () => {
        mockedRequest.post.mockResolvedValue(errorResponse());
        const result = await saveUserTheme('123', SAVE_USER_THEME_ENDPOINNT);
        expect(result.message).toEqual('Unable to save user theme');
    });
});

const CREATE_USER_THEME_ENDPOINNT = '';

describe('createTheme', () => {
    afterEach(jest.clearAllMocks);

    const data = {};
    const reqBody = {
        name: 'default',
        content: {
            name: 'akhi1997',
            theme: 'theme1997',
            fonts: {
                fontSize: 12,
                font: 'Bebas Neue',
            },
            colors: {
                headerColor: '#113371',
                textColor: '#ffffff',
            },
        },
    };
    test('fetches successfully data from an API', async () => {
        mockedRequest.post.mockResolvedValue(successResponse(data));
        const result = await createTheme(reqBody, '');
        expect(mockedRequest.post).toHaveBeenCalledTimes(1);
        expect(result).toEqual(successResponse(data));
    });

    test('saveUserTheme() should call wilth proper Request URL', async () => {
        await createTheme(reqBody, 'api');
        expect(mockedRequest.post).toHaveBeenCalledWith(`api/accounts/v1/themes/`, reqBody);
    });

    test('fetches erroneously data from an API', async () => {
        mockedRequest.post.mockResolvedValue(errorResponse());
        const result = await createTheme(reqBody, '');
        expect(result.message).toEqual('Unable to create user theme');
    });
});

describe('deleteTheme testing', () => {
    afterEach(jest.clearAllMocks);

    test('fetches successfully data from an API', async () => {
        mockedRequest.delete.mockResolvedValue(successResponse({}));
        const result = await deleteTheme('123', 'api');
        expect(mockedRequest.delete).toHaveBeenCalledTimes(1);
        expect(mockedRequest.delete).toHaveBeenCalledWith('api/accounts/v1/themes/' + '123');
        expect(result).toEqual(successResponse({}));
    });

    test('fetches erroneously data from an API', async () => {
        mockedRequest.delete.mockResolvedValue(errorResponse());
        const result = await deleteTheme('123', '');
        expect(mockedRequest.delete).toHaveBeenCalledTimes(1);
        expect(result.success).toEqual(false);
    });
});

describe('uploadThemeApi', () => {
    afterEach(jest.clearAllMocks);
    const data = {
        templateName: 'fileName.json',
    };
    const params = {
        file: new File([new Blob()], 'filename.json'),
    };
    test('fetches successfully data from an API', async () => {
        mockedRequest.postForm.mockResolvedValue(successResponse(data));
        const result = await uploadThemeApi('fileName', '', 'api');
        expect(mockedRequest.postForm).toHaveBeenCalledTimes(1);
        expect(mockedRequest.postForm).toHaveBeenCalledWith(`api/accounts/v1/themes/import?name=fileName`, params);
        expect(result.success).toEqual(true);
    });

    test('fetches erroneously data from an API', async () => {
        mockedRequest.postForm.mockResolvedValue(errorResponse());
        const result = await uploadThemeApi('123', '','');
        expect(result.success).toEqual(false);
    });
});

describe('downloadThemeApi testing', () => {
    afterEach(jest.clearAllMocks);
    const data = {};

    test('fetches successfully data from an API', async () => {
        mockedRequest.get.mockResolvedValue(successResponse(data));
        const result = await downloadThemeApi('123', 'api');
        expect(mockedRequest.get).toHaveBeenCalledTimes(1);
        expect(mockedRequest.get).toHaveBeenCalledWith('api/accounts/v1/themes/123/export');
        expect(result.success).toEqual(true);
    });

    // test('fetches erroneously data from an API', async () => {
    //     mockedRequest.get.mockResolvedValue(errorResponse());
    //     const result = await downloadThemeApi('123','');
    //     expect(mockedRequest.get).toHaveBeenCalledTimes(1);
    //     expect(result.success).toEqual(false);
    // });
});
