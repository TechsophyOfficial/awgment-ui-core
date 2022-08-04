import React from 'react';
import styled from 'styled-components';
import WorkflowSvg from '../../assets/images/Workflow.svg';

interface CardProps {
    primaryText: string;
    secondaryText: string;
}

const Card: React.FC<CardProps> = ({ primaryText, secondaryText }) => {
    return (
        <CardWrapper>
            <img src={WorkflowSvg} alt="Img" height="150px" width="250px" />
            <PrimaryText>{primaryText}</PrimaryText>
            <SecondaryText>{secondaryText}</SecondaryText>
        </CardWrapper>
    );
};

export default Card;

const CardWrapper = styled.div`
    padding: 3em 2em;
    text-align: center;
    border-radius: 5px;
    background-color: white;
`;

const PrimaryText = styled.p`
    margin: 0;
    padding: 0;
    margin-top: 2em;
    font-size: '21px';
    font-weight: 500;
`;

const SecondaryText = styled.p`
    margin: 0;
    padding: 0;
    font-size: '14px';
    font-weight: 400;
`;
