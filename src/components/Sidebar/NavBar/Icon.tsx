import React from 'react';
import WorkflowIcon from '../../../assets/icons/WorkflowIcon';
import RuleIcon from '../../../assets/icons/RuleIcon';
import CaseIcon from '../../../assets/icons/CaseIcon';
import FormIcon from '../../../assets/icons/FormIcon';
import ArtifactsIcon from '../../../assets/icons/ArtifactsIcon';
import UsersIcon from '../../../assets/icons/UsersIcon';
import ThemeIcon from '../../../assets/icons/ThemesIcon';
import TemplateIcon from '../../../assets/icons/TemplatesIcon';
import OpenTicketIcon from '../../../assets/icons/OpenTicketIcon';
import HomeIcon from 'assets/icons/HomeIcon';

const Icon = ({ url }) => {
    switch (true) {
        case url === 'workflow-modeler':
            return <WorkflowIcon />;
        case url === 'form-modeler':
            return <FormIcon />;
        case url === 'form-modeler/components':
            return <FormIcon />;
        case url === 'rule-modeler':
            return <RuleIcon />;
        case url === 'case-modeler':
            return <CaseIcon />;
        case url === 'accounts/groups':
            return <UsersIcon />;
        case url === 'accounts/users':
            return <UsersIcon />;
        case url === 'manage-themes':
            return <ThemeIcon />;
        case url === 'manage-templates':
            return <TemplateIcon />;
        case url === 'caseInbox':
            return <CaseIcon />;
        case url === 'open-ticket':
            return <OpenTicketIcon />;
        case url === 'doctor-consultation':
            return <OpenTicketIcon />;
        case url === 'view-doctor-consultancies':
            return <OpenTicketIcon />;
        case url === 'view-ticket':
            return <OpenTicketIcon />;
        case url === 'save-submit-form':
            return <OpenTicketIcon />;
        case url === 'manage-artifacts':
            return <ArtifactsIcon />;
        case url === 'manage-checklist':
            return <RuleIcon />;
        case url === '/':
            return <HomeIcon />;
        default:
            return <OpenTicketIcon />;
    }
};

export default Icon;
