import React from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import Theme from './Theme';
import { withTheme } from 'styled-components';
import styled from 'styled-components';
import { faChalkboard, faImage, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomizeLoginPage from './CustomizeLoginPage';
import UploadDownloadTheme from 'theme/UploadDownloadTheme';
import UploadProfileImage from './UploadProfileImage';

const Preferences = () => {
    return (
        <UserPreferences>
            <div style={{ alignSelf: 'stretch', width: '100%' }}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row style={{ height: '100%' }}>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <NavItem>
                                    <NavLink eventKey="first">
                                        <FontAwesomeIcon size="xs" icon={faChalkboard} />
                                        <span>Theme</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink eventKey="second">
                                        <FontAwesomeIcon size="xs" icon={faImage} />
                                        <span>Customize Login Page</span>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink eventKey="third">
                                        <FontAwesomeIcon size="xs" icon={faUserTie} />
                                        <span>Upload Profile Image</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Col>
                        <PrefDetails sm={9}>
                            <div>
                                <h4 className="page-title">User Preferences</h4>
                            </div>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Theme />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <CustomizeLoginPage />
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <UploadProfileImage />
                                </Tab.Pane>
                            </Tab.Content>
                        </PrefDetails>
                    </Row>
                </Tab.Container>
            </div>
        </UserPreferences>
    );
};
export default withTheme(Preferences);

const UserPreferences = styled.div`
    min-height: 100vh;
    display: flex;
`;

const PrefDetails = styled(Col)`
    background: #f5f5f5;
`;

const NavItem = styled(Nav.Item)`
    > .nav-link.active {
        background-color: #f5f5f5 !important;
        color: #212529 !important;
    }
`;

const NavLink = styled(Nav.Link)`
    color: #212529;
    position: relative;
    svg {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
    }
    span {
        padding-left: 20px;
    }
`;
