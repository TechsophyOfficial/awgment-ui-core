import React from 'react';
import MicroFrontend from '../common/MicroFrontEnd';
import AppConfig from '../../appConfig';

//const { REACT_APP_HOST: commonHost, REACT_APP_DEPLOYMENT_HOST: host } = process.env;

const Deployment = ({ history }) => {
    const appData: any = React.useContext(AppConfig);
    const commonHost = appData.baseUrL;
    const host = `${appData.baseUrL}/model/deployment`;
    return (
        <div>
            <MicroFrontend history={history} host={host} name="DeploymentMFE" mainhost={commonHost} />
        </div>
    );
};

export default Deployment;
