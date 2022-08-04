import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import './TopBar.scss';
import { Link } from 'react-router-dom';

interface Props {
    url?: string;
}

export const HomeButton: React.FC<Props> = ({ url }) => {
    return (
        // <NavButtonDiv2 data-testid="backButton">
        <ButtonWrapper2 to={url}>
            <FontAwesomeIcon icon={faHome} style={{ height: 20, width: 20 }} />
        </ButtonWrapper2>
        // </NavButtonDiv2>
    );
};

const NavButtonDiv2 = styled.div`
    display: flex;
    position : inherit,
    top : 10px
`;

const ButtonWrapper2 = styled(Link)`
    color: #212529;
    background-color: #e2e6ea;
    border-color: #dae0e5;
    :hover {
        text-decoration: none;
        color: #212529;
    }
    padding: 4px 8px;
    border-width: 1px;
    border-radius: 5px;
`;
