import React from 'react';
import MicroFrontend from '../common/MicroFrontEnd';

const { REACT_APP_HOST: commonHost, REACT_APP_FORM_URL: host } = process.env;

const Form = ({ history }) => {
    return (
        <div>
            <MicroFrontend history={history} host={host} name="FormMFE" mainhost={commonHost} />
        </div>
    );
};

export default Form;
