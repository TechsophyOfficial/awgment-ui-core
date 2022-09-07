import { request, ResponseProps } from '../request';
import { FORMS } from '../constants/endpoints';
import {
    SAVE_SUBMIT_FORM_ID,
    VIEW_TICKET_FORM_ID,
    Doctor_Consultation_FORM_ID,
    View_Doctor_Consultancies_FORM_ID,
} from '../constants/common';

interface FormProps {
    id: string;
    version: number;
}

//export const GET_FORM_ENDPOINT = `${process.env.REACT_APP_API_GATEWAY_URL}${FORMS}`;

export const getSaveSubmitForm = async (gatewayUrl: string) => {
    const GET_FORM_ENDPOINT = `${gatewayUrl}${FORMS}`;
    const res: ResponseProps = (await request.get(`${GET_FORM_ENDPOINT}/${SAVE_SUBMIT_FORM_ID}`)) as ResponseProps;
    if (res.success) {
        const data = res.data as FormProps;
        return data;
    }
    return {};
};

export const getViewTicketForm = async (gatewayUrl: string) => {
    const GET_FORM_ENDPOINT = `${gatewayUrl}${FORMS}`;
    const res: ResponseProps = (await request.get(`${GET_FORM_ENDPOINT}/${VIEW_TICKET_FORM_ID}`)) as ResponseProps;
    if (res.success) {
        const data = res.data as FormProps;
        return data;
    }
    return {};
};

// new

// new 2

export const getDoctorConsultationForm = async (gatewayUrl: string) => {
    const GET_FORM_ENDPOINT = `${gatewayUrl}${FORMS}`;
    const res: ResponseProps = (await request.get(
        `${GET_FORM_ENDPOINT}/${Doctor_Consultation_FORM_ID}`,
    )) as ResponseProps;
    if (res.success) {
        const data = res.data as FormProps;
        return data;
    }
    return {};
};

export const getViewDoctorConsultanciesForm = async (gatewayUrl: string) => {
    const GET_FORM_ENDPOINT = `${gatewayUrl}${FORMS}`;
    const res: ResponseProps = (await request.get(
        `${GET_FORM_ENDPOINT}/${View_Doctor_Consultancies_FORM_ID}`,
    )) as ResponseProps;
    if (res.success) {
        const data = res.data as FormProps;
        return data;
    }
    return {};
};
