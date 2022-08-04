import React from 'react';
import MicroFrontend from '../common/MicroFrontEnd';

const { REACT_APP_HOST: commonHost, REACT_APP_CASE_URL: caseHost } = process.env;

const Case = ({ history }) => {
    return (
        <div>
            <MicroFrontend history={history} host={caseHost} name="CaseMFE" mainhost={commonHost} />
        </div>
    );
};

export default Case;
