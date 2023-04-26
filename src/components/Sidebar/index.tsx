import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// for left drawer
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import NavItem, { Separator } from './NavBar/NavItem';
import styled, { withTheme } from 'styled-components';
import AppConfig from '../../appConfig';
// import {
//     ACCOUNTS_MODELER,
//     ACCOUNT_USERS,
//     CASE_INBOX,
//     CASE_MODELER,
//     CHECKLIST_DASHBOARD,
//     FORM_MODELER,
//     MANAGE_ARTIFACTS,
//     MANAGE_CHECKLIST,
//     MANAGE_COMPONENTS,
//     MANAGE_TEMPLATES,
//     MANAGE_THEMES,
//     OPEN_TICKET,
//     RULE_MODELER,
//     SAVE_SUBMIT,
//     WORKFLOW_MODELER,
// } from '../../constants/Routes';
// import workflowIcon from '../../assets/icons/WorkflowIcon';
// import RuleIcon from '../../assets/icons/RuleIcon';
// import CaseIcon from '../../assets/icons/CaseIcon';
// import FormIcon from '../../assets/icons/FormIcon';
// import ArtifactsIcon from '../../assets/icons/ArtifactsIcon';
// import UsersIcon from '../../assets/icons/UsersIcon';
// import ThemeIcon from '../../assets/icons/ThemesIcon';
// import TemplateIcon from '../../assets/icons/TemplatesIcon';
// import OpenTicketIcon from '../../assets/icons/OpenTicketIcon';
import { FOOTER_HEIGHT, HEADER_HEIGHT, SIDEBAR_WIDTH } from 'constants/common';
import { getMenu } from '../../services/MenuService';

// const NavProps = [
//     {
//         href: WORKFLOW_MODELER,
//         icon: workflowIcon,
//         title: 'workflowModeler',
//         devider: false,
//     },
//     {
//         href: RULE_MODELER,
//         icon: RuleIcon,
//         title: 'ruleModeler',
//         devider: false,
//     },
//     {
//         href: CASE_MODELER,
//         icon: CaseIcon,
//         title: 'caseModeler',
//         devider: false,
//     },
//     {
//         href: FORM_MODELER,
//         icon: FormIcon,
//         title: 'formModeler',
//         devider: false,
//     },
//     {
//         href: CASE_INBOX,
//         icon: CaseIcon,
//         title: 'caseInbox',
//         devider: true,
//     },
//     {
//         href: MANAGE_COMPONENTS,
//         icon: FormIcon,
//         title: 'manageComponents',
//         devider: false,
//     },
//     {
//         href: MANAGE_CHECKLIST,
//         icon: RuleIcon,
//         title: 'manageChecklist',
//         devider: false,
//     },
//     // {
//     //     href: CHECKLIST_DASHBOARD,
//     //     icon: CaseIcon,
//     //     title: 'checklistDashboard',
//     //     devider: false,
//     // },
//     {
//         href: MANAGE_ARTIFACTS,
//         icon: ArtifactsIcon,
//         title: 'manageArtifacts',
//         devider: false,
//     },
//     {
//         href: ACCOUNTS_MODELER,
//         icon: UsersIcon,
//         title: 'accountsModeler',
//         devider: false,
//     },
//     {
//         href: ACCOUNT_USERS,
//         icon: UsersIcon,
//         title: 'accountsusers',
//     },
//     {
//         href: MANAGE_THEMES,
//         icon: ThemeIcon,
//         title: 'manageThemes',
//         devider: false,
//     },
//     {
//         href: MANAGE_TEMPLATES,
//         icon: TemplateIcon,
//         title: 'manageTemplates',
//         devider: false,
//     },
//     {
//         href: OPEN_TICKET,
//         icon: OpenTicketIcon,
//         title: 'openTicket',
//         devider: false,
//     },
//     {
//         href: SAVE_SUBMIT,
//         icon: OpenTicketIcon,
//         title: 'saveSubmitForm',
//         devider: false,
//     },
// ];

const NavPropsNew = {
    id: 'home',
    url: '/',
    label: 'Home',
    divider: true,
};

const Sidebar = () => {
    const location = useLocation();
    const [edit, setEdit] = useState(null);
    const [formLinks, setFormLinks] = useState<any>([]);
    const [componentLinks, setComponentLinks] = useState<any>([]);

    const appData: any = React.useContext(AppConfig);

    useEffect(() => {
        if (edit) {
            if (edit) {
                setEdit(null);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    useEffect(() => {
        const getData = async () => {
            const GATEWAY_URL = appData.apiGatewayUrl;
            const data = await getMenu(GATEWAY_URL);
            const formComponentsData = data.filter((obj) => obj.type === 'form');
            const genericComponentsData = data.filter((obj) => obj.type === 'component');
            setComponentLinks(genericComponentsData);
            setFormLinks(formComponentsData);
        };
        if (appData) getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appData]);

    const content = (
        <DrawerWrapper variant="permanent" anchor="left" className="custom-scrollbar">
            {/* <div /> */}
            <Divider />
            <List>
                <NavItem item={NavPropsNew} id={'home'} />
                <Separator />
                {componentLinks.map((item, index) => (
                    <NavItem id={index} item={item} key={'nav' + index} />
                ))}
                <Separator />
                {formLinks.map((item, index) => (
                    <NavItem id={index} item={item} key={'nav' + index} />
                ))}
            </List>
        </DrawerWrapper>
    );

    return <div>{content}</div>;
};

export default withTheme(Sidebar);

const DrawerWrapper = styled(Drawer)`
    flex-shrink: 0;
    .MuiDrawer-paper {
        background-color: ${({ theme }) => theme?.content?.colors.headerColor};
        color: ${({ theme }) => theme?.content?.colors.textColor};
        width: ${SIDEBAR_WIDTH}px;
        top: ${HEADER_HEIGHT}px;
        bottom: ${FOOTER_HEIGHT}px;
        height: auto;
    }
    .MuiDrawer-paper::-webkit-scrollbar {
        width: 6px;
        display: block;
    }
    .MuiDrawer-paper::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme?.content?.colors.textColor};
    }
`;
