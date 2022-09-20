import React, { useContext, useState } from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import PlaneLayout from '../../layout/PlaneLayout';
import FileUpload from '../common/FileUpload';
import { useDispatch } from 'react-redux';
import { closeSpinner, showFlashMessage, showSpinner } from '../../actions/common';
import { Typography } from '@material-ui/core';
import fileUploadState from '../../assets/images/states/uploadFile.png';
import { uploadProfileImage } from 'services/PreferenceService';
import { ThemeContext } from 'theme/ThemeContext';
import AppConfig from '../../appConfig';

const UploadProfileImage = (props) => {
    const [bg, setBg] = useState<any>(null);
    const dispatch = useDispatch();
    const bgRef = React.createRef<any>();
    const bgEmptyStateRef = React.createRef<any>();
    const { onChangeProfilePic } = useContext(ThemeContext);
    const appData: any = React.useContext(AppConfig);

    const openBG = (image: File): void => {
        setBg(image);
        if (bgRef && bgRef.current.style) {
            const url = URL.createObjectURL(image);
            bgRef.current.style.backgroundImage = "url('" + url + "')";
        }
        if (bgEmptyStateRef) {
            bgEmptyStateRef.current.style.visibility = 'hidden';
        }
        onUploadBgImage(image?.name, image);
    };

    const onUploadBgImage = async (name, file): Promise<void> => {
        dispatch(showSpinner());
        const gatewayUrl= appData?.apiGatewayUrl;
        const { success, message } = await uploadProfileImage(file, name, gatewayUrl);
        if (success) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const value = reader.result?.toString().split(',')[1];
                if (reader) {
                    onChangeProfilePic(value);
                }
            };
            dispatch(closeSpinner());
            dispatch(showFlashMessage({ successMessage: message }));
        } else {
            dispatch(closeSpinner());
            dispatch(showFlashMessage({ errorMessage: message }));
        }
    };

    return (
        <PlaneLayout>
            <CustomLoginWrapper style={{ display: 'flex' }}>
                <div style={{ marginRight: '60px' }}>
                    <Typography variant="body1">Choose a Profile Image</Typography>
                    <div ref={bgRef}>
                        <img src={fileUploadState} alt="No file found" ref={bgEmptyStateRef} />
                        <FileUpload extensions={['png', 'jpg', 'jpeg', 'svg']} onChange={openBG} onError={alert}>
                            <div
                                style={{
                                    alignItems: 'center',
                                }}>
                                <Button variant="outline-primary" key={'upload'} style={{ marginRight: '0' }}>
                                    Choose Image
                                </Button>
                            </div>
                        </FileUpload>
                    </div>
                </div>
            </CustomLoginWrapper>
        </PlaneLayout>
    );
};

export default withTheme(UploadProfileImage);

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
        max-width: 60%;
        margin-left: 20%;
        background-position: center;
        img {
            width: 172px;
        }
        button {
            margin-top: 44px;
        }
    }
`;
