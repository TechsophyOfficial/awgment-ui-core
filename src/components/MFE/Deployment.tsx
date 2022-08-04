import React from 'react';
import MicroFrontend from '../common/MicroFrontEnd';

const { REACT_APP_HOST: commonHost, REACT_APP_DEPLOYMENT_HOST: host } = process.env;

const Deployment = ({ history }) => {
    return (
        <div>
            <MicroFrontend history={history} host={host} name="DeploymentMFE" mainhost={commonHost} />
        </div>
    );
};

export default Deployment;
