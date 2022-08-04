import React from 'react';
import { Card, Row, Image } from 'react-bootstrap';
import {
    ACCOUNTS_MODELER,
    ACCOUNT_USERS,
    CASE_INBOX,
    CASE_MODELER,
    FORM_MODELER,
    MANAGE_ARTIFACTS,
    MANAGE_COMPONENTS,
    MANAGE_TEMPLATES,
    MANAGE_THEMES,
    OPEN_TICKET,
    RULE_MODELER,
    WORKFLOW_MODELER,
} from '../../constants/Routes';
import { CustomFormattedMessage } from '../common/CustomFormattedMessage';
import styled from 'styled-components';
import { withTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

interface Cards {
    imageUrl: string;
    cardTitle: string;
    cardLink: string;
    cardLinkTitle: string;
}

export const Home = ({ history: any }) => {
    const { keycloak } = useKeycloak();
    const { idTokenParsed } = keycloak;

    const renderCards = ({ imageUrl, cardTitle, cardLink, cardLinkTitle }: Cards) => {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <div style={{ textAlign: 'center', padding: '1em' }}>
                        <Image src={imageUrl} style={{ width: '100px', textAlign: 'center' }} />
                    </div>
                    <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                        <Card.Title>{<CustomFormattedMessage id={cardTitle} />}</Card.Title>
                    </div>
                    <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                        {/* <Link to={cardLink}>{ <CustomFormattedMessage id={cardLinkTitle} />}</Link> */}

                        <CardText to={cardLink}>{<CustomFormattedMessage id={cardLinkTitle} />}</CardText>
                        {/* <CardText href={cardLink}>{<CustomFormattedMessage id={cardLinkTitle} />}</CardText> */}
                    </div>
                </Card.Body>
            </Card>
        );
    };

    // FIXME: TEMPORARY USER ROLE INTRODUCED
    return (
        <div>
            {idTokenParsed && idTokenParsed['email'] === 'wasim.k@techsophy.com' ? (
                <Row style={{ justifyContent: 'space-evenly', margin: '6em' }}>
                    {renderCards({
                        imageUrl: require('../../assets/images/caseInbox.png'),
                        cardTitle: 'caseInbox',
                        cardLink: CASE_INBOX,
                        cardLinkTitle: 'goToCaseInbox',
                    })}
                </Row>
            ) : idTokenParsed && idTokenParsed['email'] === 'venkataramana.g@techsophy.com' ? (
                <Row style={{ justifyContent: 'space-evenly', margin: '6em' }}>
                    {renderCards({
                        imageUrl: require('../../assets/images/ticket.jpg'),
                        cardTitle: 'openTicket',
                        cardLink: OPEN_TICKET,
                        cardLinkTitle: 'goToOpenTicket',
                    })}
                </Row>
            ) : (
                <>
                    <Row style={{ justifyContent: 'space-evenly', margin: '6em' }}>
                        {renderCards({
                            imageUrl: require('../../assets/images/workflow.png'),
                            cardTitle: 'workflowModeler',
                            cardLink: WORKFLOW_MODELER,
                            cardLinkTitle: 'gotoWorkflowModeler',
                        })}
                        {renderCards({
                            imageUrl: require('../../assets/images/rules.png'),
                            cardTitle: 'ruleModeler',
                            cardLink: RULE_MODELER,
                            cardLinkTitle: 'gotoRuleModeler',
                        })}
                        {renderCards({
                            imageUrl: require('../../assets/images/forms.png'),
                            cardTitle: 'formModeler',
                            cardLink: FORM_MODELER,
                            cardLinkTitle: 'gotoFormModeler',
                        })}
                    </Row>
                    <Row style={{ justifyContent: 'space-evenly', margin: '6em' }}>
                        {renderCards({
                            imageUrl: require('../../assets/images/caseManagement.png'),
                            cardTitle: 'caseModeler',
                            cardLink: CASE_MODELER,
                            cardLinkTitle: 'gotoCaseModeler',
                        })}
                        {renderCards({
                            imageUrl: require('../../assets/images/accounts.png'),
                            cardTitle: 'accountsModeler',
                            cardLink: ACCOUNTS_MODELER,
                            cardLinkTitle: 'gotoAccountsModeler',
                        })}
                        {renderCards({
                            imageUrl: require('../../assets/images/user.png'),
                            cardTitle: 'accountsusers',
                            cardLink: ACCOUNT_USERS,
                            cardLinkTitle: 'gotoAccountUsers',
                        })}
                    </Row>
                    <Row style={{ justifyContent: 'space-evenly', margin: '6em' }}>
                        {renderCards({
                            imageUrl: require('../../assets/images/theme.png'),
                            cardTitle: 'manageThemes',
                            cardLink: MANAGE_THEMES,
                            cardLinkTitle: 'goToManageThemes',
                        })}
                        {renderCards({
                            imageUrl: require('../../assets/images/template.png'),
                            cardTitle: 'manageTemplates',
                            cardLink: MANAGE_TEMPLATES,
                            cardLinkTitle: 'goToManageTemplates',
                        })}
                        {renderCards({
                            imageUrl: require('../../assets/images/caseInbox.png'),
                            cardTitle: 'caseInbox',
                            cardLink: CASE_INBOX,
                            cardLinkTitle: 'goToCaseInbox',
                        })}
                    </Row>
                    <Row style={{ justifyContent: 'space-evenly', margin: '6em' }}>
                        {renderCards({
                            imageUrl: require('../../assets/images/ticket.jpg'),
                            cardTitle: 'openTicket',
                            cardLink: OPEN_TICKET,
                            cardLinkTitle: 'goToOpenTicket',
                        })}
                        {renderCards({
                            imageUrl: require('../../assets/images/forms.png'),
                            cardTitle: 'manageComponents',
                            cardLink: MANAGE_COMPONENTS,
                            cardLinkTitle: 'gotoManageComponents',
                        })}
                        {renderCards({
                            imageUrl: require('../../assets/images/artifacts.png'),
                            cardTitle: 'manageArtifacts',
                            cardLink: MANAGE_ARTIFACTS,
                            cardLinkTitle: 'gotoManageArtifacts',
                        })}
                    </Row>{' '}
                </>
            )}
        </div>
    );
};
export default withTheme(Home);

const CardText = styled(Link)`
    color: ${({ theme }) => theme?.content?.colors.headerColor};
`;
