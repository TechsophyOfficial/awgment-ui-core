import React from 'react';
import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';
import '../components/common/TopBar.scss';
import { COLORS } from '../theme';
import { HomeButton } from './../components/common/HomeButton';
import FlashMessage from '../components/common/Flashmessage';
import { withTheme } from 'styled-components';

const ModelerTopBar: React.FC = () => {
    return (
        <div className={'navbar-wapper'}>
            <StyledNavbar collapseOnSelect expand="sm" fixed="top">
                <Navbar.Brand>
                    <HomeButton url={'/'} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            </StyledNavbar>
        </div>
    );
};

// export default TopBar;

const StyledNavbar = styled(Navbar)`
    height: 60px;
    display: flex;
    justify-content: start;
    align-items: center;
    background-color: ${({ theme }) => theme?.content?.colors.headerColor};
`;

const ModelerLayout: React.FC = ({ children }) => {
    return (
        <div style={{ height: '100vh', overflow: 'auto' }}>
            <ModelerTopBar />
            {children ? <div style={{ marginTop: '60px' }}>{children}</div> : null}

            <FlashMessage />
        </div>
    );
};

export default withTheme(ModelerLayout);
