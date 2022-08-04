import React, { Component } from 'react';
const token = sessionStorage.getItem('react-token');
const projId = process.env.REACT_APP_SXP_PROJECT_ID;
const versionId = 'WORKING';
class LoadSxpChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userToken: '',
        };
    }
    componentDidMount = () => {
        this.getUserToken();
    };
    getUserToken = () => {
        this.setState({ userToken: token }, () => this.loadIt());
    };
    loadIt = () => {
        let mainObj = {
            socketUrl: process.env.REACT_APP_SOCKET_URL, //sxp URL
            socketPath: process.env.REACT_APP_SOCKET_PATH,
            SSL: true, //secure connection, true for https, false for http
            accessToken: `Bearer ${this.state.userToken}`,
            currentProject: projId, // name of the project / client you are working on / for
            fileServerUrl: process.env.REACT_APP_CHAT_FILE_SERVER_URL,
            mainTitle: 'AWGMENT',
            // call : '+919876543210',
            // titleLogo:'https://sxp.v1.techsophy.com/static/media/logo.7ad470b4.png',
            // customLauncher:'https://sxp.v1.techsophy.com/static/media/logo.7ad470b4.png',
            subTitle: 'Service eXperience Platform',
            chatRefresh: true,
            autoLaunch: false,
            lazyAutoLaunch: false,
            editChat: true,
            uploadDoc: true,
            defaultMessage: 'Hi, Welcome To AWGMENT',
            languages: [],
            version: versionId,
            journeyTray: true,
        };
        window.embedSXPChat(mainObj);
    };
    render() {
        return <></>;
    }
}
export default LoadSxpChat;
