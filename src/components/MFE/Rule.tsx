import React from 'react';
import MicroFrontend from '../common/MicroFrontEnd';

const { REACT_APP_HOST: commonHost, REACT_APP_RULE_URL: ruleHost } = process.env;

const Rule = ({ history }) => {
    return (
        <div>
            <MicroFrontend history={history} host={ruleHost} name="RuleMFE" mainhost={commonHost} />
        </div>
    );
};

export default Rule;
