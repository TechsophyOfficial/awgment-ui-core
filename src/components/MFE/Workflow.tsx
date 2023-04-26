import React from 'react';
import MicroFrontend from '../common/MicroFrontEnd';
import AppConfig from '../../appConfig';

//const { REACT_APP_HOST: commonHost, REACT_APP_WORKFLOW_URL: workflowHost } = process.env;

const Workflow = ({ history }) => {
    const appData: any = React.useContext(AppConfig);
    const commonHost = appData.baseUrl;
    const workflowHost = `${appData.baseUrl}/model/process`;

    console.log(appData);
    return (
        <div>
            <MicroFrontend
                history={history}
                host={workflowHost}
                name="WorkflowMFE"
                mainhost={commonHost}
                config={appData}
            />
        </div>
    );
};

export default Workflow;
