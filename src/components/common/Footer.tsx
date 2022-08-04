import { Typography } from '@material-ui/core';
import { FOOTER_HEIGHT } from 'constants/common';
import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrapper>
                <FooterText style={{}}>
                    <Typography>
                        A product of <b>techsophy</b> 2021
                    </Typography>
                </FooterText>
                <FooterText>
                    <Typography style={{ width: '100%', textAlign: 'center' }}>
                        Powered by <b>AWGMENT</b>
                    </Typography>
                </FooterText>
            </FooterWrapper>
        </FooterContainer>
    );
};

const FooterContainer = styled.div`
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100% !important;
    height: ${FOOTER_HEIGHT}px !important ;
    background: #212429;
    color: #e4e4f0;
`;

const FooterWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0 100px;
`;

const FooterText = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    font-size: 12px;
    p {
        font-family: Inter;
    }
`;

export default Footer;
