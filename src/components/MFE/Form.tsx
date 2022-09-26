import React from 'react';
import MicroFrontend from '../common/MicroFrontEnd';
import AppConfig from '../../appConfig';

//const { REACT_APP_HOST: commonHost, REACT_APP_FORM_URL: host } = process.env;

const Form = ({ history }) => {
    const appData: any = React.useContext(AppConfig);
    // const commonHost = appData.baseUrl;
    // const host = `${appData.baseUrl}/model/forms`;
    const commonHost = 'http://localhost:3001'
    const host = 'http://localhost:3001/model/forms'
    return (
        <div>
            <MicroFrontend history={history} host={host} name="FormMFE" mainhost={commonHost} />
        </div>
    );
};

export default Form;
