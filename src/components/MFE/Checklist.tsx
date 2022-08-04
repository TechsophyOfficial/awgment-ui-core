import React from 'react';
import MicroFrontend from '../common/MicroFrontEnd';

const { REACT_APP_HOST: commonHost, REACT_APP_CHECKLIST_URL: checklistHost } = process.env;

const Checklist = ({ history }) => {
    return (
        <div>
            <MicroFrontend history={history} host={checklistHost} name="ChecklistMFE" mainhost={commonHost} />
        </div>
    );
};

export default Checklist;
