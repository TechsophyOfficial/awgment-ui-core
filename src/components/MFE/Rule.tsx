import React from 'react';
import MicroFrontend from '../common/MicroFrontEnd';
import AppConfig from '../../appConfig';

//const { REACT_APP_HOST: commonHost, REACT_APP_RULE_URL: ruleHost } = process.env;

const Rule = ({ history }) => {
    const appData: any = React.useContext(AppConfig);
    const commonHost = appData.baseUrL;
    const ruleHost = `${appData.baseUrL}/model/rules`;
    
    return (
        <div>
            <MicroFrontend history={history} host={ruleHost} name="RuleMFE" mainhost={commonHost} />
        </div>
    );
};

export default Rule;
