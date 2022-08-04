import React from 'react';
import MicroFrontend from '../common/MicroFrontEnd';

const { REACT_APP_HOST: commonHost, REACT_APP_WORKFLOW_URL: workflowHost } = process.env;

const Workflow = ({ history }) => {
    return (
        <div>
            <MicroFrontend history={history} host={workflowHost} name="WorkflowMFE" mainhost={commonHost} />
        </div>
    );
};

export default Workflow;
