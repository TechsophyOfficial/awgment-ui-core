import React from 'react';
import MicroFrontend from '../common/MicroFrontEnd';
import AppConfig from '../../appConfig';

//const { REACT_APP_HOST: commonHost, REACT_APP_CASE_URL: caseHost } = process.env;

const Case = ({ history }) => {
    const appData: any = React.useContext(AppConfig);
    const commonHost = appData.baseUrL;
    const caseHost = `${appData.baseUrL}/model/case`;
    return (
        <div>
            <MicroFrontend history={history} host={caseHost} name="CaseMFE" mainhost={commonHost} />
        </div>
    );
};

export default Case;
