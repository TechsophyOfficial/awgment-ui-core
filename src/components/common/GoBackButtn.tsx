import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faHome } from '@fortawesome/free-solid-svg-icons';
import './TopBar.scss';

interface Props {
    url?: string;
}

export const GoBackButton: React.FC<Props> = () => {
    return (
        <GoBackButtonWrapper>
            <FontAwesomeIcon
                icon={faHome}
                style={{ width: '1.5 em', height: '1.5 em' }}
                onClick={() => window.history.back()}
            />
        </GoBackButtonWrapper>
    );
};

const GoBackButtonWrapper = styled.div`
    margin: 5px 20px;
    > .svg-inline--fa.fa-w-18 {
        width: 1.5em;
        height: 1.5em;
    }
`;
