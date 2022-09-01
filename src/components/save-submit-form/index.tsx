import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import TsfFormioForm from 'tsf_component_formio/dist/components/tsfFormioForm';
import { useDispatch } from 'react-redux';
import { closeSpinner, showFlashMessage, showSpinner } from '../../actions/common';
import { getSaveSubmitForm } from 'services/SaveSubmitService';
import AppConfig from '../../appConfig';
// import { useHistory } from 'react-router-dom';

const SaveAndSubmitForm = () => {
    const dispatch = useDispatch();
    const appData: any = React.useContext(AppConfig);
    const GATEWAY_URL = appData.apiGatewayUrl;

    const [saveSubmitForm, setSaveSubmitForm] = useState<any>(null);

    const fetchAddForm = useCallback(async (url: string) => {
        dispatch(showSpinner());
        const form = await getSaveSubmitForm(url);
        setSaveSubmitForm(form);
        dispatch(closeSpinner());
    }, [dispatch]);

    useEffect(() => {
        if(GATEWAY_URL) fetchAddForm(GATEWAY_URL);
    }, [fetchAddForm, GATEWAY_URL]);

    const handleEvent = ({ success, message }) => {
        if (success) {
            dispatch(showFlashMessage({ successMessage: message }));
            // setTimeout(() => {
            //     history.push('/');
            // }, 5000);
        } else {
            dispatch(showFlashMessage({ errorMessage: message }));
        }
    };

    return (
        <div>
            <h3 className="text-center font-weight-bold" style={{ marginTop: '80px' }}>
                Save and Submit Form
            </h3>
            <FormWrapper>
                <FormCard bg="light">
                    <TsfFormioForm form={saveSubmitForm} onCustomEvent={handleEvent} />
                </FormCard>
            </FormWrapper>
        </div>
    );
};

export default SaveAndSubmitForm;

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FormCard = styled(Card)`
    margin: 1em;
    padding: 1.5em;
    min-width: 35vw;
    max-width: 500px;
    .alert-success,
    .button-icon-right {
        display: none;
    }
`;
