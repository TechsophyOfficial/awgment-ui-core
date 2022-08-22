import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import TsfFormioForm from 'tsf_react_formio/dist/components/tsfFormioForm';
import { useDispatch } from 'react-redux';
import { closeSpinner, showFlashMessage, showSpinner } from '../../actions/common';
import { getFormById } from 'services/MenuService';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AppConfig from '../../appConfig';

interface ParamTypes {
    formId: string;
    label: string;
}
// import { useHistory } from 'react-router-dom';

const MenuForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const appData: any = React.useContext(AppConfig);
    const { formId, label } = useParams<ParamTypes>();

    const [menuForm, setMenutForm] = useState<any>(null);

    const fetchAddForm = useCallback(
        async (url) => {
            dispatch(showSpinner());
            const form = await getFormById(formId, url);
            setMenutForm(form.data);
            dispatch(closeSpinner());
        },
        [dispatch, formId],
    );

    useEffect(() => {
        if (appData) {
            fetchAddForm(appData.apiGatewayUrl);
        }
    }, [fetchAddForm, appData]);

    const handleEvent = ({ success, message }) => {
        if (success) {
            dispatch(showFlashMessage({}));
            setTimeout(() => {
                history.push('/');
            }, 5000);
        } else {
            dispatch(showFlashMessage({ errorMessage: message }));
        }
    };

    return (
        <div>
            <h3 className="text-center font-weight-bold" style={{ marginTop: '40px' }}>
                {label}
            </h3>
            <FormWrapper>
                <FormCard>
                    <TsfFormioForm form={menuForm} onCustomEvent={handleEvent} />
                </FormCard>
            </FormWrapper>
        </div>
    );
};

export default MenuForm;

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FormCard = styled(Card)`
    margin: 1em;
    padding: 1.5em;
    min-width: 80vw;
    max-width: 700px;
    .alert-success,
    .button-icon-right {
        display: none;
    }
`;
