import React from 'react';
import styled from 'styled-components';
import Card from './Card';

interface LandingPageProps {
    primaryText: string;
    secondaryText: string;
}

const LandingPage: React.FC<LandingPageProps> = ({ primaryText, secondaryText }) => {
    return (
        <LandingPageWrapper>
            <Card primaryText={primaryText} secondaryText={secondaryText} />
        </LandingPageWrapper>
    );
};

export default LandingPage;

const LandingPageWrapper = styled.div`
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background-color: #e4e4f0;
    display: flex;
    justify-content: center;
    align-items: center;
`;
