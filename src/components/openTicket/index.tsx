import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TsfFormioForm from 'tsf_component_formio/dist/components/tsfFormioForm';
import { closeSpinner, showFlashMessage, showSpinner } from '../../actions/common';
import AppConfig from '../../appConfig';

import {
    getTicketForm,
    createTicket,
    FormioTicketFormSubmitionData,
    OpenTicketSubmitionData,
} from '../../services/TicketService';
import { useKeycloak } from '@react-keycloak/web';

const OpenTicket = () => {
    const appData: any = React.useContext(AppConfig);
    const GATEWAY_URL = appData.apiGatewayUrl;

    const dispatch = useDispatch();
    const history = useHistory();
    const { keycloak } = useKeycloak();
    const { idTokenParsed } = keycloak;

    const [ticketForm, setTicketForm] = useState<any>(null);
    const [formSubmissionData, setFormSubmissionData] = useState<any>(null);

    useEffect(() => {
        const fetchAddForm = async () => {
            dispatch(showSpinner());
            const form = await getTicketForm(GATEWAY_URL);
            setTicketForm(form);
            dispatch(closeSpinner());
        };
        fetchAddForm();
    }, [dispatch]);

    // const handleSubmit = async (data: FormioTicketFormSubmitionData) => {
    //     const { submit, ...others } = data;
    //     const address = `{"address_components":[{"long_name":"Seattle","short_name":"Seattle","types":["locality","political"]},{"long_name":"King County","short_name":"King County","types":["administrative_area_level_2","political"]},{"long_name":"Washington","short_name":"WA","types":["administrative_area_level_1","political"]},{"long_name":"United States","short_name":"US","types":["country","political"]}],"formatted_address":"Seattle, WA, USA","geometry":{"location":{"lat":47.6062095,"lng":-122.3320708},"viewport":{"south":47.49191193068355,"west":-122.4596958831932,"north":47.73414504967467,"east":-122.2244331457869}},"place_id":"ChIJVTPokywQkFQRmtVEaUZlJRA","types":["locality","political"],"formattedPlace":"Seattle, WA, USA"}`;
    //     const submissionData: OpenTicketSubmitionData = {
    //         firstName: idTokenParsed?.['given_name'],
    //         lastName: idTokenParsed?.['family_name'],
    //         emailId: idTokenParsed?.['email'],
    //         mobileNumber: '(123) 456-7890',
    //         address,
    //         ...others,
    //     };
    //     dispatch(showSpinner());
    //     const { success, message = '' } = await createTicket(submissionData, GATEWAY_URL);
    //     dispatch(closeSpinner());
    //     if (success) {
    //         dispatch(showFlashMessage({ successMessage: message }));
    //         setTimeout(() => {
    //             history.push('/');
    //         }, 5000);
    //     } else {
    //         dispatch(
    //             showFlashMessage({
    //                 errorMessage: message,
    //             }),
    //         );
    //     }
    // };

    // const handleChange = (schema) => {
    //     setFormSubmissionData({ ...schema.data });
    // };

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
                Submit Ticket
            </h3>
            <FormWrapper>
                <FormCard bg="light">
                    <TsfFormioForm
                        form={ticketForm}
                        // onChange={(schema) => handleChange(schema)}
                        // onCustomEvent={() => {
                        //     handleSubmit(formSubmissionData);
                        // }}

                        onCustomEvent={handleEvent}
                    />
                </FormCard>
            </FormWrapper>
        </div>
    );
};

export default OpenTicket;

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
