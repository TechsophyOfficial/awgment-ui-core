import { showFlashMessage, cleanAlerts } from '../common';
import { SHOW_FLASH_MESSAGE, CLEAN_ALERTS } from '../../constants/common';

describe('Common Action', () => {
    test('showFlashMessage() test', () => {
        const obj = {
            successMessage: 'success',
            errorMessage: 'error',
        };
        const expected = {
            type: SHOW_FLASH_MESSAGE,
            successMessage: 'success',
            errorMessage: 'error',
        };
        const result = showFlashMessage(obj);
        expect(result).toEqual(expected);
    });

    test('cleanAlerts() test', () => {
        const expected = {
            type: CLEAN_ALERTS,
        };
        const result = cleanAlerts();
        expect(result).toEqual(expected);
    });
});
