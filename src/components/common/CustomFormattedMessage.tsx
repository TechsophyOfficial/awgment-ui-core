import React from 'react';
import { FormattedMessage } from 'react-intl';
import fallbackTranslations from '../../translations/en.json';

export const CustomFormattedMessage = ({ id }) => {
    if (id) {
        return <FormattedMessage id={id} defaultMessage={fallbackTranslations[id]} />;
    }
    return null;
};
