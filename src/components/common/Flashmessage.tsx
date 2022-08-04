import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { Alert } from 'react-bootstrap';
import { cleanAlerts } from '../../actions/common';

interface Props {
    success_message: string;
    error_message: string;
    cleanAlerts: () => void;
}

interface Common {
    successMessage: string;
    errorMessage: string;
}
interface State {
    common: Common;
}

class FlashMessage extends React.Component<Props> {
    componentDidUpdate(): void {
        if (this.props.success_message) {
            setTimeout(() => {
                this.props.cleanAlerts();
            }, 5000);
        }
    }

    renderFlashMessage = (): React.ReactElement | null => {
        const { success_message, error_message } = this.props;
        const flashMessage = success_message || error_message;
        if (flashMessage) {
            const flashColor = success_message ? 'success' : 'danger';
            return (
                <Alert
                    style={{ position: 'fixed', bottom: '2em', width: '50%', left: '25%', zIndex: 1000 }}
                    variant={flashColor}
                    onClose={(): void => this.props.cleanAlerts()}
                    dismissible>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <i
                            className={success_message ? 'fa fa-check-circle' : 'fa fa-exclamation-triangle'}
                            aria-hidden="true"></i>
                        &nbsp;&nbsp;
                        <span id="BootStrapAlert-id">{flashMessage}</span>
                    </div>
                </Alert>
            );
        }
        return null;
    };

    render(): React.ReactElement | null {
        return this.renderFlashMessage();
    }
}

const mapStateToProps = (state: State): { success_message: string; error_message: string } => ({
    success_message: state.common.successMessage,
    error_message: state.common.errorMessage,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): { cleanAlerts: () => { type: string } } =>
    bindActionCreators({ cleanAlerts: cleanAlerts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);
