import React, { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { withTheme } from 'styled-components';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from 'styled-components';
import { CustomFormattedMessage } from '../common/CustomFormattedMessage';
import { saveUserTheme } from '../../services/ThemeService';
import { useDispatch } from 'react-redux';
import { closeSpinner, showFlashMessage, showSpinner } from '../../actions/common';
import AppConfig from '../../appConfig';

const Theme = () => {
    const appData: any = React.useContext(AppConfig);
    const GATEWAY_URL = appData.apiGatewayUrl;
    const [themes, setThemes] = useState<any[]>([]);
    const { onChangeTheme } = useContext(ThemeContext);
    const { appTheme, appThemes } = useContext<any>(ThemeContext);
    const [selectedTheme, setSelectedTheme] = useState<any>(null);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (getFromLS('all-themes') && getFromLS('all-themes').length > 0 && (themes.length == 0)) {
    //         setThemes(getFromLS('all-themes'));
    //     }
    // })

    useEffect(() => {
        setThemes(appThemes);
        // setSelectedTheme(appTheme.id)
    }, [appThemes]);

    const changeTheme = (e) => {
        if (themes.length > 0 && themes[e.target.value]) {
            onChangeTheme(themes[e.target.value]);
            setSelectedTheme(themes[e.target.value]);
        }
    };

    const onSaveTheme = async (): Promise<void> => {
        dispatch(showSpinner());
        const { success, message } = await saveUserTheme(selectedTheme ? selectedTheme.id : '', GATEWAY_URL);
        if (success) {
            dispatch(closeSpinner());
            dispatch(showFlashMessage({ successMessage: message }));
        } else {
            dispatch(closeSpinner());
            dispatch(showFlashMessage({ errorMessage: message }));
        }
    };

    return (
        <div>
            <Title>
                <h4>
                    <CustomFormattedMessage id="THEMES_TITLE" />
                </h4>
            </Title>
            <ThemeWrapper>
                <Form.Control as="select" custom onChange={(e) => changeTheme(e)} style={{ flex: 1 }}>
                    {themes?.length > 0 &&
                        themes.map((eachTheme: any, i) => {
                            return (
                                <option key={i} value={i} selected={appTheme.id === eachTheme.id ? true : false}>
                                    {eachTheme.name}
                                    {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <div
                                        style={{
                                            height: 10,
                                            width: 15,
                                            backgroundColor: themes[i].content.colors.headerColor,
                                            alignSelf: 'center',
                                            marginRight: '1em',
                                        }}
                                    />
                                   
                                </div> */}
                                </option>
                            );
                        })}
                </Form.Control>

                {/* <Dropdown alignRight as={ButtonGroup} style={{ marginRight: '1em' }}>
            <Button variant="basic">Avaiable Themes</Button>
                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                <Dropdown.Menu>
                    {themes?.length > 0 && themes.map((eachTheme: any, i) => {
                        return (
                            <Dropdown.Item key={eachTheme.id} onClick={() => onChangeTheme(themes[i])}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div
                                        style={{
                                            height: 10,
                                            width: 15,
                                            backgroundColor: themes[i].content.colors.headerColor,
                                            alignSelf: 'center',
                                            marginRight: '1em',
                                        }}
                                    />
                                    {themes[i].name}
                                </div>
                            </Dropdown.Item>
                        );
                    })}
                </Dropdown.Menu>
            </Dropdown> */}
                <div style={{ flex: '1' }}>
                    <SaveThemeBtn className="saveButton" onClick={() => onSaveTheme()}>
                        Apply
                    </SaveThemeBtn>
                </div>
            </ThemeWrapper>
        </div>
    );
};

export default withTheme(Theme);

const ThemeWrapper = styled.div`
    display: flex;
    width: 60%;
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
        border-color: ${({ theme }) => theme?.content?.colors.headerColor};
    }
`;

const Title = styled.div`
    padding: 15px 0px;
`;
