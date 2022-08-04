import { createTheme } from '@material-ui/core';
import { useKeycloak } from '@react-keycloak/web';
import { INITIAL_THEME } from 'constants/common';
import React, { useEffect } from 'react';
import { getAllThemes, getUserTheme, ThemeInstance } from '../services/ThemeService';
import defaultTheme from './defaultTheme.json';

interface userPreferences {
    id: string;
    profilePicture: string;
    themeId: string;
    userId: string;
}

interface State {
    appTheme: unknown;
    appThemes: ThemeInstance[];
    userInfo: userPreferences | undefined;
    muiTheme: any;
    onChangeTheme: (theme) => void;
    onChangeProfilePic: (theme) => void;
    onTokenRecieved: (token) => void;
    updateThemesList: () => void;
}

export const ThemeContext = React.createContext({} as State);
export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = React.useState<unknown>(defaultTheme);
    const [themes, setThemes] = React.useState<ThemeInstance[]>([]);
    const [userInfo, setUserInfo] = React.useState<userPreferences>({} as userPreferences);
    const [muiTheme, setMuiTheme] = React.useState<any>(INITIAL_THEME);
    const { initialized } = useKeycloak();

    useEffect(() => {
        // getDbThemes()
    }, []);

    const getDbThemes = async () => {
        //Call theme api (to get all themes)
        const { success, data } = await getAllThemes({ paginate: false });
        if (success && data) {
            const allThemes = data;
            setThemes(allThemes);
            getSelecterUserTheme(allThemes);
        }
    };

    const getSelecterUserTheme = async (allThemes): Promise<void> => {
        const { success, data } = await getUserTheme();
        if (success && data) {
            let selectedTheme = null;
            allThemes.map((theme) => {
                setUserInfo(data);
                if (theme.id === data.themeId) {
                    selectedTheme = theme;
                    // setTheme(theme)
                }
            });
            if (selectedTheme) {
                setTheme(selectedTheme);
                setupMuiTheme(selectedTheme);
            } else {
                setTheme(defaultTheme);
            }
        }
    };

    const setupMuiTheme = (theme) => {
        let newTheme = INITIAL_THEME;
        let data = theme['content'];
        if (data) {
            newTheme = createTheme({
                palette: {
                    type: 'light',
                    primary: {
                        main: data.colors.textColor,
                        light: '#95CBF7',
                    },
                    secondary: {
                        main: data.colors.headerColor,
                    },
                    error: {
                        main: '#f65656',
                    },
                },
            });
        }
        setMuiTheme(newTheme);
    };

    const onChangeTheme = (theme) => {
        setTheme(theme);
    };

    const onChangeProfilePic = (image: string) => {
        const updatedData: userPreferences = { ...userInfo, profilePicture: image };
        setUserInfo({ ...updatedData });
    };

    const onTokenRecieved = (token) => {
        if (token) {
            getDbThemes();
        }
    };

    const updateThemesList = () => {
        getDbThemes();
    };
    if (themes && theme && initialized) {
        return (
            <ThemeContext.Provider
                value={{
                    appTheme: theme,
                    appThemes: themes,
                    userInfo: userInfo,
                    muiTheme: muiTheme,
                    onChangeTheme: onChangeTheme,
                    onChangeProfilePic: onChangeProfilePic,
                    onTokenRecieved: onTokenRecieved,
                    updateThemesList: updateThemesList,
                }}>
                {children}
            </ThemeContext.Provider>
        );
    }
    return <div>loading...</div>;
};
