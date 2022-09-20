import React, { useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components';
import { Button, Col, Form, ListGroup, ListGroupItem, Modal, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { CustomFormattedMessage } from '../common/CustomFormattedMessage';
import PlaneLayout from '../../layout/PlaneLayout';
import FileUpload from '../common/FileUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
    deleteTemplateApi,
    downloadTemplateApi,
    getAllTemplatesApi,
    uploadTemplateApi,
} from '../../services/TemplateService';
import { closeSpinner, showFlashMessage, showSpinner } from '../../actions/common';
import { DeleteConfirmModal } from '../common/DeleteConfimModal';
import '../../styles.scss';
import AppConfig from '../../appConfig';

function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState('');
    const handleChange = (e) => setName(e.target.value);

    useEffect(() => {
        setName(props.name);
    }, [props.name]);

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Template Name</Modal.Title>
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
}

const ManageTemplates = () => {
    const appData: any = React.useContext(AppConfig);
    const GATEWAY_URL = appData.apiGatewayUrl;

    const [templates, setTemplates] = useState<any[]>([]);
    const [fileContent, setFileContent] = useState<string>('');
    const dispatch = useDispatch();
    const [activeTemplateId, setActiveTemplateId] = useState('');
    const [fileName, setFileName] = useState('');
    const [name, setName] = useState('');
    const [nameModalShow, setNameModalShow] = React.useState(false);
    const [deleteModalShow, setDeleteModalShow] = React.useState(false);

    useEffect(() => {
        if (GATEWAY_URL) getAllTemplates(GATEWAY_URL);
    }, [GATEWAY_URL]);

    const onReaderLoad = async (event) => {
        setFileContent(event.currentTarget.result);
    };

    const openFTL = (ftlFile: File): void => {
        setFileName(ftlFile?.name);
        const reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(ftlFile);
    };

    // const getHtmlData = (file: string) => {
    //     const dom = document.createElement('div');
    //     dom.innerHTML = file;
    //     return dom;
    // };

    const downoadFile = async (): Promise<void> => {
        dispatch(showSpinner());
        const { success, data } = await downloadTemplateApi(activeTemplateId, GATEWAY_URL);
        if (success && data) {
            // Create blob link to download
            const url = window.URL.createObjectURL(data.data);
            const link: HTMLAnchorElement = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `FileName.ftl`);

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();
            dispatch(closeSpinner());

            // Clean up and remove the link
            if (link) {
                // @ts-ignore: Object is possibly 'null'.
                link.parentNode.removeChild(link);
            }
        } else {
            dispatch(closeSpinner());
        }
    };

    const resetData = () => {
        setFileContent('');
        setFileName('');
        setActiveTemplateId('');
        setNameModalShow(false);
    };

    const deleteFile = async (): Promise<void> => {
        setDeleteModalShow(false);
        dispatch(showSpinner());
        const { success } = await deleteTemplateApi(activeTemplateId, GATEWAY_URL);
        if (success) {
            resetData();
            dispatch(closeSpinner());
            getAllTemplates(GATEWAY_URL);
        } else {
            resetData();
            dispatch(closeSpinner());
            getAllTemplates(GATEWAY_URL);
            dispatch(closeSpinner());
        }
    };

    const onUploadTemplate = async (name: string): Promise<void> => {
        setNameModalShow(false);
        dispatch(showSpinner());
        const { success } = await uploadTemplateApi(name, fileContent, GATEWAY_URL);
        if (success) {
            resetData();
            getAllTemplates(GATEWAY_URL);
            dispatch(closeSpinner());
            dispatch(showFlashMessage({ successMessage: 'Template Uploaded Successfully' }));
        } else {
            dispatch(closeSpinner());
        }
    };

    const getAllTemplates = async (gatewayUrl: string): Promise<void> => {
        dispatch(showSpinner());
        const { success, data } = await getAllTemplatesApi(gatewayUrl);
        if (success && data) {
            dispatch(closeSpinner());
            setTemplates(data);
        } else {
            dispatch(closeSpinner());
        }
    };

    const setId = (id) => {
        setActiveTemplateId(id);
    };

    return (
        <PlaneLayout>
            <Row style={{ height: '100%' }}>
                <Col sm={3}>
                    <ListGroup className="list-group-wrapper">
                        {templates?.length > 0 &&
                            templates.map((eachTheme: any, i) => {
                                return (
                                    <ListGroupItem action key={eachTheme.id} onClick={() => setId(eachTheme.id)}>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <div />
                                            {templates[i].name}
                                        </div>
                                    </ListGroupItem>
                                );
                            })}
                    </ListGroup>
                </Col>
                <TemplateDetails sm={9}>
                    <Title>
                        <h4>
                            <CustomFormattedMessage id="manageTemplates" />
                        </h4>{' '}
                        :
                    </Title>
                    <UploadWrpper>
                        <FileUpload extensions={['ftl']} onChange={openFTL} onError={alert}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Button className="core-ui-button" key={'upload'}>
                                    Choose File
                                </Button>
                                {fileName && <span style={{ marginLeft: '10px' }}>{fileName}</span>}
                            </div>
                        </FileUpload>
                        <div style={{ flex: '1' }}>
                            <Button className="saveButton" onClick={() => setNameModalShow(true)}>
                                Upload
                            </Button>
                        </div>
                    </UploadWrpper>
                    {/* {fileContent} */}
                    {/* <iframe src={fileContent }></iframe>  */}
                    {/* {getHtmlData(   fileContent)} */}
                    {/* <div dangerouslySetInnerHTML={{__html: fileContent}} /> */}
                    {activeTemplateId && (
                        <ToBottom>
                            <FontAwesomeIcon onClick={downoadFile} icon={faFileDownload}></FontAwesomeIcon>
                            <FontAwesomeIcon
                                className="deleteButton"
                                onClick={() => setDeleteModalShow(true)}
                                icon={faTrash}></FontAwesomeIcon>
                        </ToBottom>
                    )}
                </TemplateDetails>
                <MyVerticallyCenteredModal
                    show={nameModalShow}
                    name={name}
                    onHide={() => setNameModalShow(false)}
                    handlesubmit={(name) => onUploadTemplate(name)}
                />

                <DeleteConfirmModal
                    show={deleteModalShow}
                    message={'Are you sure you want to delete the template ' + name + '?'}
                    onHide={() => setDeleteModalShow(false)}
                    handleSubmit={deleteFile}
                />
            </Row>
        </PlaneLayout>
    );
};

export default withTheme(ManageTemplates);

const Title = styled.div`
    padding: 15px 0px;
    display: flex;
    > .title {
        color: ${({ theme }) => theme?.content?.colors.headerColor};
        margin-left: 13px;
    }
`;

const TemplateDetails = styled(Col)`
    background: #f5f5f5;
`;

const ToBottom = styled.div`
    position: absolute;
    bottom: 40px;
    right: 40px;
    > svg.svg-inline--fa.fa-w-12 {
        width: 40px;
        height: 40px;
        color: ${({ theme }) => theme?.content?.colors.headerColor};
        margin-right: 10px;
    }
    > .svg-inline--fa.fa-w-14 {
        width: 40px;
        height: 40px;
        color: #d11a2a;
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
