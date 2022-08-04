import { request, ResponseProps } from '../request';
import { TICKET_CASE_ENGINE, FORMS } from '../constants/endpoints';
import { OPEN_TICKET_FORM_ID, OPEN_TICKET_PROCESS_DEFINITION_KEY } from '../constants/common';

interface FormProps {
    components: any;
}

interface TicketInfo {
    [key: string]: unknown;
}
export interface FormioTicketFormSubmitionData extends TicketInfo {
    submit: boolean;
}

export interface OpenTicketSubmitionData extends TicketInfo {
    firstName: string;
    lastName: string;
    emailId: string;
    mobileNumber: string;
    address: string;
}

interface CreateTicketReqObj {
    businessKey: string;
    processDefinitionKey: string;
    variables: OpenTicketSubmitionData;
}

interface CreateTicketApiResponse {
    businessKey: string;
}

export const GET_FORM_ENDPOINT = `${process.env.REACT_APP_API_GATEWAY_URL}${FORMS}`;
export const TICKET_CASE_ENDPOINT = `${process.env.REACT_APP_API_GATEWAY_URL}${TICKET_CASE_ENGINE}`;

export const getTicketForm = async () => {
    const res: ResponseProps = (await request.get(`${GET_FORM_ENDPOINT}/${OPEN_TICKET_FORM_ID}`)) as ResponseProps;
    if (res.success) {
        // const { components } = res.data as FormProps;
        // return components;
        const data = res.data as FormProps;
        return data;
    }
    return {};
};

export const createTicket = async (
    ticketFormData: OpenTicketSubmitionData,
): Promise<{ success: boolean; message: string }> => {
    const reqObj: CreateTicketReqObj = {
        variables: ticketFormData,
        processDefinitionKey: OPEN_TICKET_PROCESS_DEFINITION_KEY,
        businessKey: `Ticket-${Math.floor(Math.random() * 900000) + 100000}`,
    };

    const res: ResponseProps = (await request.post(TICKET_CASE_ENDPOINT, reqObj)) as ResponseProps;
    if (res.success) {
        const { businessKey } = res.data as CreateTicketApiResponse;
        return { success: true, message: `${businessKey} has been created successfully.` };
    }
    return { success: false, message: 'Unable to raise ticket' };
};
