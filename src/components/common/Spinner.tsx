import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { COLORS } from '../../theme/index';
import { connect } from 'react-redux';
interface TSSpinnerProps {
    showSpinner: boolean;
}

interface State {
    common: TSSpinnerProps;
}

const TS_Spinner: React.FC<TSSpinnerProps> = ({ showSpinner }) => {
    if (showSpinner) {
        return (
            <SpinnerWrap data-testid="spinner">
                <StyledSpinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </StyledSpinner>
            </SpinnerWrap>
        );
    }
    return null;
};

const StyledSpinner = styled(Spinner)`
    color: ${COLORS.SPINNER};
    position: absolute;
    top: 50%;
    left: 50%;
`;

const SpinnerWrap = styled.div`
    position: fixed;
    background-color: ${COLORS.DARK_GREY};
    width: 100%;
    height: 100%;
    z-index: 9999;
    opacity: 0.5;
`;

const mapStateToProps = (state: State): { showSpinner: boolean } => ({
    showSpinner: state.common.showSpinner,
});

export default connect(mapStateToProps, {})(TS_Spinner);
