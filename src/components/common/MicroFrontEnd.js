import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeSpinner, showSpinner } from '../../actions/common';
import { withTheme } from 'styled-components';
import { FOOTER_HEIGHT, HEADER_HEIGHT } from 'constants/common';

const MicroFrontend = ({ name, host, history, mainhost }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        loadMFEApp();
    }, []);

    useEffect(() => {
        return () => {
            return (
                // <></>
                window[`unmount${name}`] && window[`unmount${name}`](`${name}-container`)
            );
        };
    }, [name, host, history, mainhost]);

    const loadMFEApp = () => {
        const scriptId = `regulatory-frontend-script-${name}`;
        const renderMicroservice = () => {
            dispatch(closeSpinner());
            return window[`render${name}`] && window[`render${name}`](`${name}-container`, history);
        };
        if (document.getElementById(scriptId)) {
            renderMicroservice();
            return;
        }
        dispatch(showSpinner());
        fetch(`${host}/asset-manifest.json`)
            .then((res) => res.json())
            .then((manifest) => {
                // to load the css
                Object.keys(manifest.files)
                    .filter((key) => key.endsWith('.css'))
                    .reduce((sum, key) => {
                        if (key.endsWith('.css')) {
                            const head = document.getElementsByTagName('head')[0];
                            const link = document.createElement('link');
                            const path = `${mainhost}${manifest.files[key]}`;
                            // link.id   = cssId;
                            link.rel = 'stylesheet';
                            link.type = 'text/css';
                            link.href = path;
                            link.media = 'all';
                            head.appendChild(link);
                        }
                        return sum;
                    }, []);

                //loads js files
                const promises = Object.keys(manifest.files)
                    .filter((key) => key.endsWith('.js'))
                    .reduce((sum, key) => {
                        sum.push(
                            new Promise((resolve) => {
                                if (key.endsWith('.js')) {
                                    const path = `${mainhost}${manifest.files[key]}`;
                                    const script = document.createElement('script');
                                    if (key === 'main.js') {
                                        script.id = scriptId;
                                    }
                                    script.onload = () => {
                                        resolve();
                                    };
                                    script.src = path;
                                    document.body.after(script);
                                }
                            }),
                        );
                        return sum;
                    }, []);

                Promise.allSettled(promises).then(() => {
                    renderMicroservice();
                });
            });
    };

    return (
        //attaches MFE to main tag
        <>
            <main style={{ height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }} id={`${name}-container`} />
        </>
    );
};

MicroFrontend.defaultProps = {
    document,
    window,
};

export default withTheme(MicroFrontend);
