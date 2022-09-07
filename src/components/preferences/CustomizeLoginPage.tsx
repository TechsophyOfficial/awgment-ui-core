import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import PlaneLayout from '../../layout/PlaneLayout';
import FileUpload from '../common/FileUpload';
import { useKeycloak } from '@react-keycloak/web';
import { ADMIN_ROLE, BG_IMAGE_NAME, LOGO_IMAGE_NAME } from '../../constants/common';
import { uploadKeycloakThemeImageApi } from '../../services/KeycloakTheme';
import { useDispatch } from 'react-redux';
import { closeSpinner, showFlashMessage, showSpinner } from '../../actions/common';
import { Typography } from '@material-ui/core';
import fileUploadState from '../../assets/images/states/uploadFile.png';
import AppConfig from '../../appConfig';

const CustomizeLoginPage = (props) => {
    // const [fileContent, setFileContent] = useState<string>('');
    const [bg, setBg] = useState<any>(null);
    const [logo, setLogo] = useState<any>(null);
    const { keycloak } = useKeycloak();
    const dispatch = useDispatch();
    const bgRef = React.createRef<any>();
    const logoRef = React.createRef<any>();
    const bgEmptyStateRef = React.createRef<any>();
    const logoEmptyStateRef = React.createRef<any>();

    const appData: any = React.useContext(AppConfig);
    const BASE_URL = appData.baseUrl;

    const hasTenantRole = (roles) => {
        let role_exist = false;
        if (roles && roles.length > 0) {
            roles.map((role) => {
                if (role == ADMIN_ROLE) {
                    role_exist = true;
                }
            });
            if (role_exist) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    const openBG = (image: File): void => {
        setBg(image);
        if (bgRef && bgRef.current.style) {
            const url = URL.createObjectURL(image);
            bgRef.current.style.backgroundImage = "url('" + url + "')";
        }
        if (bgEmptyStateRef) {
            bgEmptyStateRef.current.style.visibility = 'hidden';
        }
        onUploadBgImage();
    };

    const openLogo = (image: File): void => {
        setLogo(image);
        if (logoRef && logoRef.current.style) {
            const url = URL.createObjectURL(image);
            logoRef.current.style.backgroundImage = "url('" + url + "')";
        }
        if (logoEmptyStateRef) {
            logoEmptyStateRef.current.style.visibility = 'hidden';
        }
        onUploadLogoImage();
    };

    // const resetData = () => {
    //     setFileContent('');
    // };

    const onUploadBgImage = async (): Promise<void> => {
        dispatch(showSpinner());
        const { success, message } = await uploadKeycloakThemeImageApi(bg, BG_IMAGE_NAME, BASE_URL);
        if (success) {
            dispatch(closeSpinner());
            dispatch(showFlashMessage({ successMessage: message }));
        } else {
            dispatch(closeSpinner());
            dispatch(showFlashMessage({ errorMessage: message }));
        }
    };

    const onUploadLogoImage = async (): Promise<void> => {
        dispatch(showSpinner());
        const { success, message } = await uploadKeycloakThemeImageApi(logo, LOGO_IMAGE_NAME, BASE_URL);
        if (success) {
            dispatch(closeSpinner());
            dispatch(showFlashMessage({ successMessage: message }));
        } else {
            dispatch(closeSpinner());
            dispatch(showFlashMessage({ errorMessage: message }));
        }
    };

    return (
        <PlaneLayout>
            {hasTenantRole(keycloak.realmAccess?.roles) && (
                <CustomLoginWrapper style={{ display: 'flex' }}>
                    <div style={{ marginRight: '60px' }}>
                        <Typography variant="body1">Choose a Background Image</Typography>
                        <div ref={bgRef}>
                            <img src={fileUploadState} alt="No file found" ref={bgEmptyStateRef} />
                            <FileUpload extensions={['png']} onChange={openBG} onError={alert}>
                                <div
                                    style={{
                                        alignItems: 'center',
                                    }}>
                                    <Button variant="outline-primary" key={'upload'} style={{ marginRight: '0' }}>
                                        Choose Background Image
                                    </Button>
                                    {/* {bg && bg.name && (
                                        <span style={{ marginLeft: '10px', marginRight: '10px' }}>{bg.name}</span>
                                    )} */}
                                </div>
                            </FileUpload>
                        </div>
                    </div>
                    <div style={{ marginLeft: '60px' }}>
                        <Typography variant="body1">Choose Logo</Typography>
                        <div ref={logoRef}>
                            <img src={fileUploadState} alt="No file found" ref={logoEmptyStateRef} />
                            <FileUpload extensions={['png']} onChange={openLogo} onError={alert}>
                                <div
                                    style={{
                                        alignItems: 'center',
                                    }}>
                                    <Button variant="outline-primary" key={'uploadLogo'}>
                                        Choose Logo
                                    </Button>
                                    {/* {logo && logo.name && (
                                        <span style={{ marginLeft: '10px', marginRight: '10px' }}>{logo.name}</span>
                                    )} */}
                                </div>
                            </FileUpload>
                        </div>
                    </div>
                </CustomLoginWrapper>
            )}

            {!hasTenantRole(keycloak.realmAccess?.roles) && (
                <div>User does not have the permission to Customize login screen </div>
            )}
        </PlaneLayout>
    );
};

export default withTheme(CustomizeLoginPage);

const CustomLoginWrapper = styled.div`
    display: flex;
    .MuiTypography-root {
        color: #737373;
    }
    > div {
        flex: 1;
    }
    > div > div {
        border: 1px dashed #000;
        text-align: center;
        padding: 50px;
        margin-top: 26px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position-y: center;
        img {
            width: 172px;
        }
        button {
            margin-top: 44px;
        }
    }
`;
