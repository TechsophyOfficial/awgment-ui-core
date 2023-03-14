import React, { useContext, useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components';
import { ThemeContext } from './ThemeContext';
import { CustomFormattedMessage } from '../components/common/CustomFormattedMessage';
import { Accordion, Button, Card, Col, Form, Modal, Row, Tab, Tabs } from 'react-bootstrap';
import PlaneLayout from '../layout/PlaneLayout';
import headerProps from './headerProps';
import { createTheme, deleteTheme, getAllThemes, getTheme } from '../services/ThemeService';
import { closeSpinner, showFlashMessage, showSpinner } from '../actions/common';
import { useDispatch } from 'react-redux';
import FontPicker from 'font-picker-react';
import { DEFAULT_FONT, DEFAULT_FONT_SIZE, THEMES_KEYS, THEME_TITLES } from '../constants/themes';
import UploadDownloadTheme from './UploadDownloadTheme';
import { DeleteConfirmModal } from '../components/common/DeleteConfimModal';
import DataList from 'tsf_datalist/dist/components/dataList';
import AppConfig from '../appConfig';
interface Header {
    id: string;
    title: string;
    value: string;
}

export interface themeOptions {
    colors: any;
    fonts: any;
}

interface ThemeRequesBody {
    id?: string;
    name: string;
    content: themeOptions;
}

function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState('');
    const handleChange = (e) => setName(e.target.value);
    useEffect(() => {
        setName(props.name);
    }, [props.name]);

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
                    onClick={() => props.handleSubmit(name)}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const ManageThemes = () => {
    const appData: any = React.useContext(AppConfig);
    const GATEWAY_URL = appData.apiGatewayUrl;

    const [themes, setThemes] = useState<any[]>([]);
    const [activeFontFamily, setActiveFontFamily] = useState(DEFAULT_FONT);
    const [headerProp, setHeaderProps] = useState<Header[]>(headerProps);
    const [fontSize, setFontSize] = useState<any>(DEFAULT_FONT_SIZE);
    const [nameModalShow, setNameModalShow] = React.useState(false);
    const [deleteModalShow, setDeleteModalShow] = React.useState(false);

    const [edit, setEdit] = useState(false);
    const fontSizeList = Array.from(Array(64).keys());
    const dispatch = useDispatch();
    const { updateThemesList, appThemes } = useContext(ThemeContext);
    const [name, setName] = useState('');
    const [themeId, setThemeId] = useState('');

    useEffect(() => {
        setThemes(appThemes);
    }, [appThemes]);

    const onSaveTheme = async (name: string): Promise<void> => {
        dispatch(showSpinner());
        const requestBody = getRequestBody(name);
        const { success, message } = await createTheme(requestBody, GATEWAY_URL);
        if (success) {
            dispatch(closeSpinner());
            setNameModalShow(false);
            updateThemesList();
            dispatch(showFlashMessage({ successMessage: message }));
        } else {
            dispatch(closeSpinner());
        }
    };

    const getRequestBody = (name) => {
        const obj: ThemeRequesBody = { name: '', content: { colors: {}, fonts: {} } };
        if (edit) {
            obj.id = themeId;
        }
        obj.name = name;

        // for header
        if (headerProp.length > 0) {
            headerProp.map((prop) => {
                obj.content.colors[prop.id] = prop.value;
            });
        }
        // for fonts
        obj.content.fonts[THEMES_KEYS.FONTS.FONT] = activeFontFamily;
        obj.content.fonts[THEMES_KEYS.FONTS.FONT_SIZE] = fontSize;
        return obj;
    };

    const handleChange = (event, i) => {
        const values: Header[] = [...headerProp];
        values[i].value = event.target.value;
        setHeaderProps(values);
    };

    const editTheme = async (id) => {
        dispatch(showSpinner());
        setEdit(true);
        setThemeId(id);
        const { success, data } = await getTheme(id, GATEWAY_URL);
        if (success && data) {
            const contents = data ? data['content'] : {};
            const name = data?.name ? data.name : '';
            setName(name);
            if (contents) {
                Object.keys(contents).map(function (Ckey, index) {
                    const headers: Header[] = [];
                    if (Ckey === 'colors') {
                        const header = contents[Ckey];
                        Object.keys(header).map(function (hkey, index) {
                            Object.keys(THEMES_KEYS.HEADER).map(function (Tkey, index) {
                                if (THEMES_KEYS.HEADER[Tkey] === hkey) {
                                    let obj: Header = { id: '', title: '', value: '' };
                                    obj.id = THEMES_KEYS.HEADER[Tkey];
                                    obj.value = header[hkey];
                                    obj.title = THEME_TITLES[THEMES_KEYS.HEADER[Tkey]];
                                    headers.push(obj);
                                }
                            });
                        });

                        setHeaderProps(headers);
                    }
                    if (Ckey === 'fonts') {
                        const fontData = contents[Ckey];
                        Object.keys(fontData).map(function (hkey, index) {
                            Object.keys(THEMES_KEYS.FONTS).map(function (Fkey, index) {
                                if (THEMES_KEYS.FONTS[Fkey] === hkey) {
                                    if (hkey === THEMES_KEYS.FONTS.FONT_SIZE) {
                                        setFontSize(fontData[hkey]);
                                    }
                                    if (hkey === THEMES_KEYS.FONTS.FONT) {
                                        setActiveFontFamily(fontData[hkey]);
                                    }
                                }
                            });
                        });
                    }
                });
            }
        }
        dispatch(closeSpinner());
    };

    const deleteThemeFn = async (): Promise<void> => {
        setDeleteModalShow(false);
        dispatch(showSpinner());
        const { success, message } = await deleteTheme(themeId, GATEWAY_URL);
        if (success) {
            dispatch(closeSpinner());
            updateThemesList();
            setToDefaultTheme();
            dispatch(showFlashMessage({ successMessage: message }));
        } else {
            dispatch(closeSpinner());
            dispatch(showFlashMessage({ errorMessage: message }));
        }
    };

    const setToDefaultTheme = () => {
        dispatch(showSpinner());
        setEdit(false);
        setName('');
        setThemeId('');
        setHeaderProps(headerProps);
        setFontSize(DEFAULT_FONT_SIZE);
        setActiveFontFamily(DEFAULT_FONT);
        dispatch(closeSpinner());
    };

    const handleSearch = async (searchTerm: string): Promise<void> => {
        const { success, data } = await getAllThemes({ searchTerm: searchTerm, gatewayUrl: GATEWAY_URL });
        if (success && data) {
            setThemes(data);
        }
    };

    return (
        <PlaneLayout>
            <Row style={{ height: '100%', background: '#E4E4F0' }}>
                <Col style={{ background: '#F8F9FA' }} sm={3}>
                    <ThemeListWrapper className="cutom-scrollbar">
                        <DataList
                            data={{ records: themes }}
                            showCreateNewButton={true}
                            showSearchFeild={true}
                            activeTaskId={themeId}
                            handleCreateNew={() => setToDefaultTheme()}
                            handleSearch={(event) => handleSearch(event?.target?.value)}
                            rowClicked={({ id }) => editTheme(id)}
                        />
                    </ThemeListWrapper>
                </Col>
                <Col sm={9}>
                    <ThemeDetails>
                        <ThemeHeading>
                            <h3>Theme Editor</h3>
                            <p>
                                You can create or upload your own themes, select the respective tab below to start
                                working on the overall product outlook.
                            </p>
                        </ThemeHeading>
                        <Tabs
                            defaultActiveKey="createTheme"
                            className="core-ui-tabs"
                            style={{
                                marginTop: '13px',
                                width: '300px',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                            <Tab eventKey="createTheme" title="Create Theme">
                                <Title>
                                    <h4>
                                        <CustomFormattedMessage id="MANAGE_THEME" />
                                    </h4>{' '}
                                    :
                                    {edit ? <h4 className="title">{name}</h4> : <h4 className="title">Create Theme</h4>}
                                </Title>
                                <div>
                                    <Accordion defaultActiveKey="0">
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                                Header
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    <div>
                                                        <Row style={{ height: '100%' }}>
                                                            {headerProp &&
                                                                headerProp.length > 0 &&
                                                                headerProp.map((prop, i) => {
                                                                    return (
                                                                        <Col sm={6} key={prop.id}>
                                                                            <Feild>
                                                                                <Label>{prop.title} :</Label>
                                                                                <Form.Control
                                                                                    type="color"
                                                                                    id={'colorInput' + i}
                                                                                    defaultValue={headerProp[i].value}
                                                                                    value={headerProp[i].value}
                                                                                    title="Choose your color"
                                                                                    onChange={(event) =>
                                                                                        handleChange(event, i)
                                                                                    }
                                                                                    className="form-control-color"
                                                                                />
                                                                                <span>{prop.value}</span>
                                                                            </Feild>
                                                                        </Col>
                                                                    );
                                                                })}
                                                        </Row>
                                                    </div>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>

                                        <Card style={{ overflow: 'visible' }}>
                                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                                Font
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey="1">
                                                <Card.Body>
                                                    <FontWrapper>
                                                        <Row>
                                                            <Col sm={6}>
                                                                <Label>Font :</Label>
                                                                <FontPicker
                                                                    apiKey="AIzaSyAk9r-xRcKtxSzStW7iw3OmviYijy251pQ"
                                                                    activeFontFamily={activeFontFamily}
                                                                    onChange={(nextFont) =>
                                                                        setActiveFontFamily(nextFont.family)
                                                                    }
                                                                />
                                                                <p className="apply-font">
                                                                    The font will be applied to this text.
                                                                </p>
                                                            </Col>
                                                            <Col sm={6}>
                                                                <Label>Font Size:</Label>
                                                                <div
                                                                    style={{
                                                                        display: 'inline-block',
                                                                        marginLeft: '13px',
                                                                    }}>
                                                                    <FontSize
                                                                        value={fontSize}
                                                                        onChange={(e) => setFontSize(e.target.value)}>
                                                                        {fontSizeList.map((size) => {
                                                                            return <option key={size}>{size}</option>;
                                                                        })}
                                                                    </FontSize>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FontWrapper>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                    <ActionButtons>
                                        <div style={{ flex: '1' }}>
                                            <SaveThemeBtn className="saveButton" onClick={() => setNameModalShow(true)}>
                                                Save
                                            </SaveThemeBtn>
                                            {edit && (
                                                <Button
                                                    className="deleteButton"
                                                    onClick={() => setDeleteModalShow(true)}>
                                                    Delete
                                                </Button>
                                            )}
                                        </div>
                                    </ActionButtons>
                                </div>
                            </Tab>
                            <Tab eventKey="uploadTheme" title="Upload Theme">
                                <UploadDownloadTheme themeId={themeId} name={name} />
                            </Tab>
                        </Tabs>
                    </ThemeDetails>
                </Col>
                <MyVerticallyCenteredModal
                    show={nameModalShow}
                    name={name}
                    onHide={() => setNameModalShow(false)}
                    handleSubmit={(name) => onSaveTheme(name)}
                />

                <DeleteConfirmModal
                    show={deleteModalShow}
                    message={'Are you sure you want to delete the theme ' + name + '?'}
                    onHide={() => setDeleteModalShow(false)}
                    handleSubmit={() => deleteThemeFn()}
                />
            </Row>
        </PlaneLayout>
    );
};

export default withTheme(ManageThemes);

const ActionButtons = styled.div`
    margin-top: 20px;
`;

const SaveThemeBtn = styled(Button)`
    background-color: transparent;
    color: #fff;
    border-color: ${({ theme }) => theme?.content?.colors.headerColor};
    margin-left: 13px;
    background-color: ${({ theme }) => theme?.content?.colors.headerColor};

    &:hover {
        color: #212529;
        background-color: transparent;
        border-color: ${({ theme }) => theme?.content?.headerColor};
    }
`;

const Title = styled.div`
    padding: 15px 0px;
    display: flex;
    > .title {
        color: ${({ theme }) => theme?.content?.colors.headerColor};
        margin-left: 13px;
    }
`;

const ThemeDetails = styled.div`
    background: #f8f9fa;
    border-radius: 10px;
    padding: 40px;
    margin: 15px 15px 15px 0;
`;

const Label = styled.span``;

const Feild = styled.div`
    > .form-control-color {
        max-width: 3rem;
        padding: 0.375rem;
        height: 40px;
        display: inline-block;
        margin: 0px 6px;
    }
`;

const FontWrapper = styled.div`
    > #font-picker,
    div[id^='font-picker'] {
        margin: 0 13px;
        > .dropdown-button {
            background: transparent;
        }
        > .font-list {
            background: #fff;
        }
    }
`;
const FontSize = styled.select`
    border: 0;
    border-bottom: 1px solid #ccc;
    background: transparent;
`;

const ThemeHeading = styled.div`
    h3 {
        font-size: 21px;
        font-weight: 500;
    }
    p {
        font-size: 12px;
        font-weight: 400;
    }
`;

const ThemeListWrapper = styled.div`
    height: calc(100vh - 60px);
    overflow-y: auto;
`;
