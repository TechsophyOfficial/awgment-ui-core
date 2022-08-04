import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { Navbar, Image, Dropdown, ButtonGroup } from 'react-bootstrap';
import './TopBar.scss';
import { useKeycloak } from '@react-keycloak/web';
import { KeycloakPromise } from 'keycloak-js';
import { useHistory } from 'react-router-dom';
import { PREFERENCES } from '../../constants/Routes';
import { withTheme } from 'styled-components';
import { Avatar } from '@material-ui/core';
import { ADMIN_ROLE, ADMIN, HEADER_HEIGHT } from '../../constants/common';
import { ThemeContext } from 'theme/ThemeContext';

const TopBar = () => {
    const { keycloak } = useKeycloak();
    const { idTokenParsed } = keycloak;
    const { userInfo } = useContext(ThemeContext);
    const history = useHistory();
    const imgRef: any = useRef();

    const getUserName = (name: string) => {
        if (name) {
            const matches = name.match(/\b(\w)/g); // ['J','S','O','N']
            const acronym = matches ? matches.join('') : null; // JSON
            return acronym;
        }

        return '';
    };

    const hasTenantRole = (roles) => {
        let role_exist = '';
        let admin_role = false;
        if (roles && roles.length > 0) {
            roles.map((role) => {
                role_exist = role;
                if (role === ADMIN_ROLE) {
                    admin_role = true;
                }
            });
            if (admin_role) {
                return ADMIN;
            } else {
                return role_exist;
            }
        } else {
            return role_exist;
        }
    };

    return (
        <StyledNavbar collapseOnSelect expand="sm" fixed="top">
            <Navbar.Brand>
                <Image src={require('../../assets/images/logo.png')} style={{ width: '125px' }} />
            </Navbar.Brand>
            <div style={{ display: 'inline-flex', marginLeft: 'auto' }}>
                <User>
                    <Dropdown alignRight as={ButtonGroup} className="header-dropdown">
                        <Toggle id="dropdown-basic" style={{ border: 'none' }}>
                            {idTokenParsed && idTokenParsed['name'] && (
                                <div style={{ display: 'flex' }}>
                                    <Username>
                                        <span>{idTokenParsed['name']}</span>
                                        <br />
                                        <span> {hasTenantRole(keycloak.realmAccess?.roles)}</span>
                                    </Username>
                                    <Avatar>
                                        {userInfo
                                            ? userInfo.profilePicture && (
                                                  <UserProfilePicture
                                                      ref={imgRef}
                                                      src={`data:image/jpeg;base64,${userInfo.profilePicture}`}
                                                  />
                                              )
                                            : getUserName(idTokenParsed['name'])}
                                    </Avatar>
                                </div>
                            )}
                        </Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={(): KeycloakPromise<void, void> => keycloak.logout()}>
                                Logout
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => history.push(PREFERENCES)}>User Preferences</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </User>
            </div>
        </StyledNavbar>
    );
};

export default withTheme(TopBar);

const UserProfilePicture = styled.img`
    height: 100%;
`;

const StyledNavbar = styled(Navbar)`
    height: ${HEADER_HEIGHT}px;
    display: flex;
    justify-content: start;
    align-items: center;
    background-color: #f8f9fa;
    padding-left: 31px;
    padding-right: 54px;
`;
// background-color: ${({ theme }) => theme?.content?.colors.headerColor};

const User = styled.div`
    .username {
        color: ${({ theme }) => theme?.content?.colors.headerColor};
    }
`;

const Username = styled.span`
    margin-right: 9px;
    font-size: 12px;
    font-weight: 400;
    font-family: 'Roboto';
    align-self: flex-end;
`;

const Toggle = styled(Dropdown.Toggle)`
    background-color: transparent !important;
    border: none;
    padding: 4px;
    color: #141414 !important;
    :hover {
        background-color: transparent !important;
        color: #141414 !important;
        border: 0;
        color: black;
    }
    :focus {
        background-color: transparent !important;
        color: #141414 !important;
        border-color: white !important;
        box-shadow: none !important;
    }
    :active {
        background-color: transparent !important;
        color: #141414 !important;
    }
    &.dropdown-toggle:after {
        content: none;
    }
`;
