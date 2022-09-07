import React, { useContext, useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { showSpinner, closeSpinner, showFlashMessage } from '../actions/common';
import FileUpload from '../components/common/FileUpload';
import { deleteTheme, downloadThemeApi, uploadThemeApi } from '../services/ThemeService';
import { ThemeContext } from './ThemeContext';
import { DeleteConfirmModal } from '../components/common/DeleteConfimModal';
import defaultTheme from './defaultTheme.json';
import AppConfig from '../appConfig';

const MyVerticallyCenteredModal = (props) => {
    const [name, setName] = useState('');
    const handleChange = (e) => setName(e.target.value);
    useEffect(() => {
        setName(props.name);
    }, [props.name]);

    useEffect(() => {
        // returned function will be called on component unmount
        return () => {
            setName('');
        };
    }, []);

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Theme Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Control
                        type="text"
                        onChange={(e) => handleChange(e)}
                        value={name}
                        placeholder="Enter theme name"
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button className="cancelButton" onClick={props.onHide}>
                    Close
                </Button>
                <Button
                    disabled={!name}
                    className="saveButton"
                    variant="primary"
                    type="submit"
                    onClick={() => props.handlesubmit(name)}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const UploadDownloadTheme = (props) => {
    const appData: any = React.useContext(AppConfig);
    const GATEWAY_URL = appData.apiGatewayUrl;

    const [fileContent, setFileContent] = useState<string>('');
    const dispatch = useDispatch();
    const [activeThemeId, setActiveThemeId] = useState(props.themeId);
    const [fileName, setFileName] = useState('');
    const [name, setName] = useState('');
    const [nameModalShow, setNameModalShow] = React.useState(false);
    const [deleteModalShow, setDeleteModalShow] = React.useState(false);

    const { updateThemesList } = useContext(ThemeContext);

    useEffect(() => {
        setActiveThemeId(props.themeId);
    }, [props.themeId]);

    const onReaderLoad = async (event) => {
        setFileContent(event.currentTarget.result);
        // await BPMNmodeler?.importXML(event.target.result);
    };

    const openFTL = (ftlFile: File): void => {
        setFileName(ftlFile?.name);
        const reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(ftlFile);
        setNameModalShow(true);
    };

    const downloadFile = async () => {
        dispatch(showSpinner());
        dispatch(showSpinner());
        const { success, data } = await downloadThemeApi(activeThemeId, GATEWAY_URL);
        if (success && data) {
            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([JSON.stringify(data)]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${data.name}.json`);

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();
            dispatch(closeSpinner());

            // Clean up and remove the link
            //   link.parentNode.removeChild(link);
        } else {
            dispatch(closeSpinner());
        }
    };

    const downoadTemplateFile = () => {
        dispatch(showSpinner());
        const file = JSON.stringify(defaultTheme);
        if (file) {
            const url = window.URL.createObjectURL(new Blob([file]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Template.json`);

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();
            dispatch(closeSpinner());
            // Clean up and remove the link
            // link.parentNode.removeChild(link);:
        }
    };

    const resetData = () => {
        setName('');
        setFileContent('');
        setFileName('');
        setActiveThemeId('');
        setNameModalShow(false);
    };

    const deleteFile = async (): Promise<void> => {
        setDeleteModalShow(false);
        dispatch(showSpinner());
        const { success, message } = await deleteTheme(activeThemeId, GATEWAY_URL);
        if (success) {
            resetData();
            dispatch(closeSpinner());
            updateThemesList();
            dispatch(showFlashMessage({ successMessage: message }));
        } else {
            resetData();
            dispatch(closeSpinner());
            updateThemesList();
            dispatch(closeSpinner());
            dispatch(showFlashMessage({ errorMessage: message }));
        }
    };

    const onUploadTheme = async (name: string): Promise<void> => {
        setNameModalShow(false);
        dispatch(showSpinner());
        const { success, message } = await uploadThemeApi(name, fileContent, GATEWAY_URL);
        if (success) {
            resetData();
            updateThemesList();
            dispatch(closeSpinner());
            dispatch(showFlashMessage({ successMessage: message }));
        } else {
            dispatch(closeSpinner());
        }
    };
    return (
        <div style={{ display: 'flex' }}>
            <TemplateDetails>
                <p>Let’s upload the theme that you wish to apply to the whole product:</p>
                <UploadWrpper>
                    <FileUpload extensions={['json']} onChange={openFTL} onError={alert}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Button color="primary" key={'upload'}>
                                Upload
                            </Button>
                            {fileName && <span style={{ marginLeft: '10px' }}>{fileName}</span>}
                        </div>
                    </FileUpload>
                    <div style={{ flex: '1' }}>
                        {/* <Button className="saveButton" onClick={() => setNameModalShow(true)}>
                            Upload
                        </Button> */}
                        <Button variant="outline-secondary" className="linkButton" onClick={downoadTemplateFile}>
                            Download Template
                        </Button>
                    </div>
                    {activeThemeId && (
                        <ToBottom>
                            <FontAwesomeIcon onClick={downloadFile} icon={faFileDownload}></FontAwesomeIcon>
                            <FontAwesomeIcon
                                className="deleteButton"
                                onClick={() => setDeleteModalShow(true)}
                                icon={faTrash}></FontAwesomeIcon>
                        </ToBottom>
                    )}
                </UploadWrpper>
            </TemplateDetails>

            {nameModalShow && (
                <MyVerticallyCenteredModal
                    show={nameModalShow}
                    name={name}
                    onHide={() => setNameModalShow(false)}
                    handlesubmit={(name) => onUploadTheme(name)}
                />
            )}

            <DeleteConfirmModal
                show={deleteModalShow}
                message={'Are you sure you want to delete the theme ' + props.name + '?'}
                onHide={() => setDeleteModalShow(false)}
                handleSubmit={() => deleteFile()}
            />
        </div>
    );
};

export default withTheme(UploadDownloadTheme);

const TemplateDetails = styled(Col)`
    background: #f5f5f5;
    p {
        color: #353535;
        font-size: 12px;
        margin-top: 21px;
        margin-bottom: 21px;
    }
`;

const ToBottom = styled.div`
    position: relative;
    bottom: 0;
    right: 0;
    float: right !important;
    > svg.svg-inline--fa.fa-w-12 {
        width: 40px;
        height: 40px;
        color: ${({ theme }) => theme?.content?.colors.textColor};
        background-color: ${({ theme }) => theme?.content?.colors.headerColor};
        margin-right: 10px;
        border-radius: 50%;
        padding: 10px;
    }
    > .svg-inline--fa.fa-w-14 {
        width: 40px;
        height: 40px;
        color: ${({ theme }) => theme?.content?.colors.textColor};
        background-color: ${({ theme }) => theme?.content?.colors.headerColor};
        border-radius: 50%;
        padding: 10px;
    }
`;
const UploadWrpper = styled.div`
    display: block;
    > div {
        flex: 1;
        float: left;
        display: inline-block;
    }
`;
