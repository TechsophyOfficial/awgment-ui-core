import React from 'react';
import TopBar from '../components/common/TopBar';
import FlashMessage from '../components/common/Flashmessage';
import Sidebar from '../components/Sidebar';
import { makeStyles } from '@material-ui/core';
import { FOOTER_HEIGHT, HEADER_HEIGHT, SIDEBAR_WIDTH } from 'constants/common';
import Footer from 'components/common/Footer';

const useStyles = makeStyles(() => ({
    root: {
        height: '100vh',
        width: '100vw',
    },
    header: {
        height: HEADER_HEIGHT,
        width: '100vw',
    },
    main: {
        height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
        width: '100vw',
        display: 'flex',
    },
    sidebar: {
        height: '100%',
        width: SIDEBAR_WIDTH,
    },
    content: {
        height: '100%',
        width: '100%',
        overflowY: 'auto',
    },
    footer: {
        height: FOOTER_HEIGHT,
        width: '100vw',
    },
}));

const Layout = ({ children }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <TopBar />
            </div>
            <div className={classes.main}>
                <div className={classes.sidebar}>
                    <Sidebar />
                </div>
                <div className={classes.content}>{children}</div>
            </div>
            <div className={classes.footer}>
                <Footer />
            </div>
            <FlashMessage />
        </div>
    );
};

export default Layout;
