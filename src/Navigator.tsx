import React, { useContext, useEffect, useState } from 'react';
import { Route, Router } from 'react-router-dom';
import {
    WORKFLOW_MODELER,
    FORM_MODELER,
    MANAGE_COMPONENTS,
    RULE_MODELER,
    ACCOUNTS_MODELER,
    CASE_MODELER,
    ACCOUNT_USERS,
    PREFERENCES,
    MANAGE_THEMES,
    MANAGE_TEMPLATES,
    CASE_INBOX,
    OPEN_TICKET,
    MANAGE_ARTIFACTS,
    MANAGE_CHECKLIST,
    CHECKLIST_DASHBOARD,
    SAVE_SUBMIT,
    VIEW_TICKET,
    UPLOAD_CSV,
} from './constants/Routes';
import DashboardLayout from './layout/Layout';
import { useKeycloak } from '@react-keycloak/web';
import MicroFrontend from './components/common/MicroFrontEnd';
import Workflow from './components/MFE/Workflow';
import Rule from './components/MFE/Rule';
import Case from './components/MFE/Case';
import Form from './components/MFE/Form';
import { ThemeContext } from './theme/ThemeContext';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import Preferences from './components/preferences/Preferences';
import ManageThemes from './theme/ManageThemes';
import ManageTemplates from './components/tenants/ManageTemplates';
import DoctorConsultationForm from 'components/doctorConsultation';
import ViewDoctorConsultanciesForm from 'components/viewDoctorConsultancies';

import GlobalStyle from './globalStyles';
import OpenTicket from './components/openTicket';
import Deployment from './components/MFE/Deployment';
import LandingPage from './components/common/LandingPage';
import { ThemeProvider } from '@material-ui/core';
import Checklist from 'components/MFE/Checklist';
import SaveAndSubmitForm from 'components/save-submit-form';
import ViewTicketForm from 'components/view-ticket-form';
import MenuForm from 'components/menuForms';
import Uploads from 'components/uploads';

/* const {
    REACT_APP_HOST: commonHost,
    REACT_APP_ACCOUNTS_HOST: accountsHost,
    REACT_APP_CASE_INBOX_HOST: caseInboxHost,
    REACT_APP_FORM_URL: formHost,
    REACT_APP_TEMPLATES_HOST: templatesHost,
} = process.env; */

const PrivateRoute = ({ component: Component, ...restProps }): React.ReactElement => {
    return (
        <Route
            {...restProps}
            render={(props): React.ReactElement => (
                <DashboardLayout>
                    <Component {...props} />
                </DashboardLayout>
            )}
        />
    );
};

const ModelerRoute = ({ component: Component, ...restProps }): React.ReactElement => {
    return (
        <Route
            {...restProps}
            render={(props): React.ReactElement => (
                <DashboardLayout>
                    <Component {...props} />
                </DashboardLayout>
            )}
        />
    );
};

const Navigator = ({ history, config }: any): React.ReactElement => {
    const commonHost = config.baseUrL;
    const accountsHost = `${config.baseUrl}/account`;
    const caseInboxHost = `${config.baseUrl}/case-inbox`;
    const formHost = `${config.baseUrl}/model/forms`;
    const templatesHost = `${config.baseUrl}/model/templates`;

    const { keycloak, initialized } = useKeycloak();
    const { appTheme, appThemes, muiTheme } = useContext(ThemeContext);
    const token = sessionStorage.getItem('react-token');
    const { onTokenRecieved } = useContext(ThemeContext);
    const [flag, setFlag] = useState(false);

    if (token && sessionStorage.getItem('theme-loaded') === 'false') {
        onTokenRecieved(token);
        sessionStorage.setItem('theme-loaded', 'true');
    }

    useEffect(() => {
        setFlag(true);
    }, []);
    if (initialized && keycloak.authenticated && token && flag) {
        return (
            <>
                <ThemeProvider theme={muiTheme}>
                    <StyledThemeProvider theme={appTheme} appThemes={appThemes}>
                        <GlobalStyle />
                        <Router history={history}>
                            <PrivateRoute
                                exact
                                path={'/'}
                                component={(): React.ReactElement => (
                                    <LandingPage
                                        primaryText="Get started"
                                        secondaryText="Navigate through the side menu"
                                    />
                                )}
                            />
                            <ModelerRoute exact path={PREFERENCES} component={Preferences} />

                            <ModelerRoute exact path={MANAGE_THEMES} component={ManageThemes} />

                            {/* <ModelerRoute exact path={MANAGE_TEMPLATES} component={ManageTemplates}></ModelerRoute> */}

                            <ModelerRoute
                                exact
                                path={MANAGE_TEMPLATES}
                                component={(): React.ReactElement => (
                                    <MicroFrontend
                                        history={history}
                                        host={templatesHost}
                                        name="TemplatesMFE"
                                        mainhost={commonHost}
                                    />
                                )}
                            />

                            {/* <ModelerRoute exact path={OPEN_TICKET} component={OpenTicket}></ModelerRoute> */}

                            <ModelerRoute exact path={SAVE_SUBMIT} component={SaveAndSubmitForm} />

                            <ModelerRoute exact path={VIEW_TICKET} component={MenuForm} />
                            <ModelerRoute exact path={UPLOAD_CSV} component={Uploads} />
                            {/* <ModelerRoute
                                exact
                                path={DOCTOR_CONSULTATION}
                                component={DoctorConsultationForm}></ModelerRoute>

                            <ModelerRoute
                                exact
                                path={VIEW_DOCTOR_CONSULTANCIES}
                                component={ViewDoctorConsultanciesForm}></ModelerRoute> */}

                            <ModelerRoute
                                exact
                                path={WORKFLOW_MODELER}
                                component={(): React.ReactElement => <Workflow history={history} />}
                            />
                            <ModelerRoute
                                exact
                                path={RULE_MODELER}
                                component={(): React.ReactElement => <Rule history={history} />}
                            />
                            <ModelerRoute
                                exact
                                path={CASE_MODELER}
                                component={(): React.ReactElement => <Case history={history} />}
                            />
                            <ModelerRoute
                                exact
                                path={FORM_MODELER}
                                component={(): React.ReactElement => <Form history={history} />}
                            />
                            <ModelerRoute
                                exact
                                path={MANAGE_COMPONENTS}
                                component={(): React.ReactElement => (
                                    <MicroFrontend
                                        history={history}
                                        host={formHost}
                                        name="FormMFE"
                                        mainhost={commonHost}
                                    />
                                )}
                            />
                            <ModelerRoute
                                exact
                                path={ACCOUNTS_MODELER}
                                component={(): React.ReactElement => (
                                    <MicroFrontend
                                        history={history}
                                        host={accountsHost}
                                        name="AccountsMFE"
                                        mainhost={commonHost}
                                    />
                                )}
                            />
                            <ModelerRoute
                                exact
                                path={ACCOUNT_USERS}
                                component={(): React.ReactElement => (
                                    <MicroFrontend
                                        history={history}
                                        host={accountsHost}
                                        name="AccountsMFE"
                                        mainhost={commonHost}
                                    />
                                )}
                            />
                            <ModelerRoute
                                exact
                                path={CASE_INBOX}
                                component={(): React.ReactElement => (
                                    <MicroFrontend
                                        history={history}
                                        host={caseInboxHost}
                                        name="CaseInboxMFE"
                                        mainhost={commonHost}
                                    />
                                )}
                            />
                            <ModelerRoute
                                path={CASE_INBOX + '/*'}
                                component={(): React.ReactElement => (
                                    <MicroFrontend
                                        history={history}
                                        host={caseInboxHost}
                                        name="CaseInboxMFE"
                                        mainhost={commonHost}
                                    />
                                )}
                            />
                            <ModelerRoute
                                exact
                                path={MANAGE_CHECKLIST}
                                component={(): React.ReactElement => <Checklist history={history} />}
                            />
                            <ModelerRoute
                                exact
                                path={CHECKLIST_DASHBOARD}
                                component={(): React.ReactElement => <Checklist history={history} />}
                            />
                            <ModelerRoute
                                exact
                                path={MANAGE_ARTIFACTS}
                                component={(): React.ReactElement => <Deployment history={history} />}
                            />
                        </Router>
                    </StyledThemeProvider>
                </ThemeProvider>
            </>
        );
    }
    return <div>Loading ... </div>;
};

export default Navigator;
