import React from 'react';
import MicroFrontend from '../common/MicroFrontEnd';
import AppConfig from '../../appConfig';

//const { REACT_APP_HOST: commonHost, REACT_APP_CHECKLIST_URL: checklistHost } = process.env;

const Checklist = ({ history }) => {
    const appData: any = React.useContext(AppConfig);
    const commonHost = appData.baseUrl;
    const checklistHost = `${appData.baseUrl}/model/checklist`;
    return (
        <div>
            <MicroFrontend history={history} host={checklistHost} name="ChecklistMFE" mainhost={commonHost} />
        </div>
    );
};

export default Checklist;
