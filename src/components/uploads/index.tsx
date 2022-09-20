import React, { useState } from 'react';
import FileUpload from 'components/common/FileUpload';
// import { Button } from '@mui/material';
import { uploadCSV } from 'services/UploadService';
import styled from 'styled-components';
// import { Card } from 'react-bootstrap';
import { styled as styledmaterilaui } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { FileUploader } from 'react-drag-drop-files';
// import { styled } from "@mui/material/styles";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BackupIcon from '@mui/icons-material/Backup';
import { WORKFLOW_START } from 'constants/endpoints';
// import BackupIcon from "@mui/icons-material/Backup";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import GetAppIcon from '@mui/icons-material/GetApp';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { downloadCsv } from 'services/UploadService';
import axios from 'axios';
import { UPLOAD_DOWNLOAD_ID } from '../../constants/common';
import AppConfig from '../../appConfig';

const Input = styledmaterilaui('input')({
    display: 'none',
});

//const REUPLOAD = `${process.env.REACT_APP_API_GATEWAY_URL}${WORKFLOW_START}`;

const fileTypes = [
    'xlsx',
    'xls',
    'csv',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
];

export const Uploads = () => {
    const appData: any = React.useContext(AppConfig);
    const [file, setFile] = React.useState<any>();
    const [category, setCategory] = React.useState('');
    const [fileStatus, setFileStatus] = React.useState(false);
    const [backendFileStatus, setBackendFileStatus] = React.useState(false);
    const [backendFileStatusF, setBackendFileStatusF] = React.useState(false);
    const [iploadData, setUploadData] = React.useState(true);
    const [documentID, setDocumentID] = React.useState('');
    const [type, setType] = React.useState('');
    const [uploadedFile, setUploadedFile] = React.useState(null);

    const REUPLOAD = `${appData.baseUrl}/api${WORKFLOW_START}`;
    const GATEWAY_URL = appData.apiGatewayUrl;

    const handleChange = async (file: any) => {
        console.log('file....', file[0]);
        setFile(file);
        try {
            let statusFromServer = await uploadCSV(file[0]?.name, file[0], category, GATEWAY_URL);
            setFileStatus(true);
            console.log('file....', statusFromServer);
            if (statusFromServer.success) {
                setUploadData(false);
                setUploadedFile(statusFromServer.data.documentId);
                setBackendFileStatus(statusFromServer.success);
            } else {
                setUploadData(false);

                setBackendFileStatusF(true);
            }
        } catch (e) {
            console.log(e);
            // setBackendFileStatusF(true);
        }
    };
    const handleCategory = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    const uploadRef = React.createRef<any>();
    const [fileName, setFileName] = React.useState<any>('');
    const [fileContent, setFileContent] = React.useState<any>('');
    const [excelErrorText, setExcelErrorText] = React.useState<boolean>(false);

    const handleUpload = (file: any) => {
        console.log('file....', file.target.files[0]);
        const excelExtensions = [
            'csv',
            'xlsx',
            'xls',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
        ];
        let excelCheck = excelExtensions.filter((e) => e === file.target.files[0].type);
        if (excelCheck.length > 0) {
            setExcelErrorText(false);
            setFileName(file.target.files[0]?.name);
            uploadCSV(fileName, file.target.files[0], category, GATEWAY_URL);
        } else {
            setExcelErrorText(true);
        }
        // const reader = new FileReader();
        // reader.onload = onReaderLoad;
        // reader.readAsText(file);
    };

    // const onReaderLoad = async (event) => {
    //     setFileContent(event.currentTarget.result);
    //     startUpload();
    // };

    // const startUpload = async () => {
    //     console.log(fileName);
    //     await uploadCSV(fileName, fileContent);
    // };
    const handleReupload = async () => {
        console.log(documentID);
        console.log(type);
        let token = sessionStorage.getItem('react-token');
        let userEmail = localStorage.getItem('email');
        const data = {
            processDefinitionKey: 'Process_ntost2p',
            businessKey: 'synchronizerutility',
            variables: {
                documentId: documentID,
                type: type,
                to: userEmail,
            },
        };
        const response = await axios
            .post(`${REUPLOAD}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(response);
        //return response;

        setDocumentID('');
        setType('');
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                // width: '100%',
                // height: '100%',
                // position: 'absolute',
                // margin: '10px auto',
            }}>
            <Box
                style={
                    {
                        // marginBottom: '20px',
                        // marginTop: '20px',
                        // border: '1px solid red',
                    }
                }
                sx={{ maxWidth: 775 }}>
                <Card sx={{ maxWidth: 755 }} style={{ height: '535px', width: '499px' }}>
                    {backendFileStatus === true && (
                        <div
                            style={{
                                backgroundColor: '#eaf2eb',
                                // height: '150px',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                padding: '30px',
                            }}>
                            <CheckCircleIcon
                                style={{
                                    color: '#2e7d32',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    marginBottom: '10px',
                                }}
                            />
                            <p style={{ color: '#28682b', marginBottom: '0px' }}>successfully uploaded your file</p>
                        </div>
                    )}

                    {backendFileStatusF === true && (
                        <div
                            style={{
                                backgroundColor: '#fff2e5',

                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                padding: '30px',
                            }}>
                            <ReportProblemIcon
                                style={{
                                    color: '#ff7a00',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            />
                            <p
                                style={{
                                    color: '#b55a26',
                                    marginBottom: '0px',
                                    fontWeight: '600',
                                }}>
                                Failed to upload file
                            </p>
                            <p style={{ color: '#b55a26', marginBottom: '0px' }}>Please try again</p>
                        </div>
                    )}

                    {/* : !backendFileStatus && file ? (
                        <div
                            style={{
                                backgroundColor: '#fff2e5',

                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                padding: '30px',
                            }}>
                            <ReportProblemIcon
                                style={{
                                    color: '#ff7a00',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            />
                            <p
                                style={{
                                    color: '#b55a26',
                                    marginBottom: '0px',
                                    fontWeight: '600',
                                }}>
                                Failed to upload file
                            </p>
                            <p style={{ color: '#b55a26', marginBottom: '0px' }}>Please try again</p>
                        </div>
                    ) : (
                        ''
                    )} */}
                    {!fileStatus && file ? (
                        <CardContent
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                minHeight: '300px',
                                minWidth: '400px',
                                padding: '20px',
                            }}>
                            <p>UPLOADING FILE</p>
                            <br />
                            <CircularProgress style={{ marginBottom: '30px' }} />
                            <br />
                            <p>{file ? `File name: ${file[0] && file[0].name}` : 'no files uploaded yet'}</p>
                        </CardContent>
                    ) : (
                        <CardContent
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                // padding: '50px',
                                border: '1px solid #DBDBDB',
                                paddingTop: '50px',
                                paddingBottom: '50px',
                            }}>
                            <p
                                style={{
                                    color: '#707070',
                                    fontFamily: 'Roboto',
                                    fontSize: '20px',
                                    fontWeight: '500',
                                    lineHeight: '23px',
                                    letterSpacing: '0em',
                                    textAlign: 'center',
                                }}>
                                UPLOAD YOUR CSV FILE
                            </p>
                            {/* <br />{' '} */}
                            <img
                                src="data:image/png;base64,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"
                                height="200px"
                                alt="csv"
                            />
                            {/* <br /> */}
                            <p style={{ color: '#acacac', marginTop: '15px' }}>Choose upload category</p>
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                }}>
                                <div>
                                    <Button
                                        style={{
                                            backgroundColor:
                                                category === 'Leads' || category === null ? '#3e9df7' : '#a7d3fb',
                                            borderRadius: '25px',
                                            width: '120px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            textTransform: 'none',
                                            marginRight: '10px',
                                        }}
                                        variant="contained"
                                        // disabled={category === 'Leads' || category === null ? false : true}
                                        onClick={() => handleCategory('Leads')}>
                                        Leads
                                    </Button>
                                    {category === 'Leads' ? (
                                        <CheckCircleIcon
                                            style={{
                                                top: '-10px',
                                                position: 'relative',
                                                color: 'green',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '100%',
                                                marginRight: '10px',
                                            }}
                                        />
                                    ) : (
                                        <CheckCircleIcon
                                            style={{
                                                top: '-10px',
                                                position: 'relative',
                                                color: 'green',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '100%',
                                                visibility: 'hidden',
                                            }}
                                        />
                                    )}
                                </div>
                                <div>
                                    <Button
                                        style={{
                                            backgroundColor:
                                                category === 'Contacts' || category === null ? '#3e9df7' : '#a7d3fb',
                                            borderRadius: '25px',
                                            width: '130px',
                                            textTransform: 'none',
                                            marginRight: '10px',
                                        }}
                                        // disabled={category === 'Contacts' || category === null ? false : true}
                                        variant="contained"
                                        onClick={() => handleCategory('Contacts')}>
                                        Contacts
                                    </Button>
                                    {category === 'Contacts' ? (
                                        <CheckCircleIcon
                                            style={{
                                                top: '-10px',
                                                position: 'relative',
                                                color: 'green',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '100%',
                                            }}
                                        />
                                    ) : (
                                        <CheckCircleIcon
                                            style={{
                                                top: '-10px',
                                                position: 'relative',
                                                color: 'green',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '100%',
                                                visibility: 'hidden',
                                            }}
                                        />
                                    )}
                                </div>
                                <div>
                                    <Button
                                        style={{
                                            backgroundColor:
                                                category === 'Accounts' || category === null ? '#3e9df7' : '#a7d3fb',
                                            borderRadius: '25px',
                                            width: '130px',
                                            textTransform: 'none',
                                        }}
                                        variant="contained"
                                        // disabled={category === 'Accounts' || category === null ? false : true}
                                        onClick={() => handleCategory('Accounts')}>
                                        Accounts
                                    </Button>
                                    {category === 'Accounts' ? (
                                        <CheckCircleIcon
                                            style={{
                                                top: '-10px',
                                                position: 'relative',
                                                color: 'green',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '100%',
                                            }}
                                        />
                                    ) : (
                                        <CheckCircleIcon
                                            style={{
                                                top: '-10px',
                                                position: 'relative',
                                                color: 'green',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '100%',
                                                visibility: 'hidden',
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                            {/* <br />
                            <br /> */}
                            <div
                                style={{
                                    opacity: category ? '1' : '0.5',
                                    marginTop: '15px',
                                }}>
                                <FileUploader multiple={true} handleChange={handleChange} name="file" types={fileTypes}>
                                    <div
                                        style={{
                                            border: '1px dashed blue',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: '15px',
                                            borderStyle: 'dashed',
                                            borderRadius: '10px',
                                            width: '350px',
                                        }}>
                                        <div style={{ marginRight: '0px' }}>Drag & Drop or </div>

                                        <label
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            htmlFor="contained-button-file">
                                            <Input
                                                type="file"
                                                id="contained-button-file"
                                                accept=".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                            />

                                            <Button
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    paddingBottom: '0px',
                                                    marginRight: '0px',
                                                    textTransform: 'none',
                                                    color: '#2290F6',
                                                }}
                                                component="span">
                                                Upload
                                            </Button>
                                            <BackupIcon style={{ fontSize: '40px', color: '#3e9df7' }} />
                                        </label>
                                    </div>
                                </FileUploader>
                            </div>
                        </CardContent>
                    )}
                </Card>
            </Box>

            <br />
            <br />
            {/* REUPLOAD CODE */}
            <div
                style={{
                    width: '499px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    // padding: '50px',
                    border: '1px solid #DBDBDB',
                    borderRadius: '5px',
                    paddingTop: '30px',
                    paddingBottom: '30px',
                    marginBottom: '50px',
                }}>
                <form>
                    <p
                        style={{
                            color: '#707070',
                            fontFamily: 'Roboto',
                            fontSize: '20px',
                            fontWeight: '500',
                            lineHeight: '23px',
                            letterSpacing: '0em',
                            textAlign: 'center',
                        }}>
                        REUPLOAD
                    </p>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ width: '90px', color: '#acacac' }}>DocumentId</label>
                        <input
                            style={{
                                marginLeft: '10px',
                                borderColor: '#acacac',
                                borderWidth: '1px',
                                borderRadius: '5px',
                            }}
                            type="text"
                            value={documentID}
                            onChange={(e) => setDocumentID(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ width: '90px', color: '#acacac' }}>Type</label>
                        <input
                            style={{
                                marginLeft: '10px',
                                borderColor: '#acacac',
                                borderWidth: '1px',
                                borderRadius: '5px',
                            }}
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        style={{
                            backgroundColor: '#3e9df7',
                            borderRadius: '25px',
                            width: '130px',
                            marginRight: '10px',
                            textTransform: 'none',
                            color: '#fff',
                            border: '1px solid #2290F6',
                            marginLeft: '120px',
                        }}
                        component="span"
                        onClick={handleReupload}>
                        Reupload
                    </Button>
                </form>
            </div>
            {iploadData ? (
                <div
                    style={{
                        height: '200px',
                        width: '500px',
                        borderRadius: '10px',
                        background: '#eaf3fc',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        padding: '40px',
                    }}>
                    <p style={{ fontSize: '17px', color: '#333333B2' }}>Download your csv templates</p>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button
                            style={{
                                // backgroundColor: "#3e9df7",
                                borderRadius: '25px',
                                width: '130px',
                                marginRight: '10px',
                                textTransform: 'none',
                                color: '#2290f6',
                                border: '1px solid #2290F6',
                            }}
                            variant="outlined"
                            onClick={async () => {
                                let data = await downloadCsv(UPLOAD_DOWNLOAD_ID, GATEWAY_URL);
                                let response = data?.data;
                                var csv = response;
                                var downloadLink = document.createElement('a');
                                var blob = new Blob(['\ufeff', csv]);
                                var url = URL.createObjectURL(blob);
                                downloadLink.href = url;
                                downloadLink.download = 'data.csv';

                                document.body.appendChild(downloadLink);
                                downloadLink.click();
                                document.body.removeChild(downloadLink);
                            }}
                            endIcon={<GetAppIcon />}>
                            {' '}
                            Leads
                        </Button>
                        <Button
                            style={{
                                // backgroundColor: "#3e9df7",
                                borderRadius: '25px',
                                width: '130px',
                                marginRight: '10px',
                                textTransform: 'none',
                                color: '#2290f6',
                                border: '1px solid #2290F6',
                            }}
                            variant="outlined"
                            onClick={async () => {
                                let data = await downloadCsv(UPLOAD_DOWNLOAD_ID, GATEWAY_URL);
                                let response = data?.data;
                                var csv = response;
                                var downloadLink = document.createElement('a');
                                var blob = new Blob(['\ufeff', csv]);
                                var url = URL.createObjectURL(blob);
                                downloadLink.href = url;
                                downloadLink.download = 'data.csv';

                                document.body.appendChild(downloadLink);
                                downloadLink.click();
                                document.body.removeChild(downloadLink);
                            }}
                            endIcon={<GetAppIcon />}>
                            Contacts
                        </Button>
                        <Button
                            style={{
                                // backgroundColor: "#3e9df7",
                                borderRadius: '25px',
                                width: '130px',
                                textTransform: 'none',
                                color: '#2290f6',
                                border: '1px solid #2290F6',
                            }}
                            variant="outlined"
                            onClick={async () => {
                                let data = await downloadCsv(UPLOAD_DOWNLOAD_ID, GATEWAY_URL);
                                let response = data?.data;
                                var csv = response;
                                var downloadLink = document.createElement('a');
                                var blob = new Blob(['\ufeff', csv]);
                                var url = URL.createObjectURL(blob);
                                downloadLink.href = url;
                                downloadLink.download = 'data.csv';

                                document.body.appendChild(downloadLink);
                                downloadLink.click();
                                document.body.removeChild(downloadLink);
                            }}
                            endIcon={<GetAppIcon />}>
                            Accounts
                        </Button>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};
export default Uploads;

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FormCard = styled(Card)`
    margin: 1em;
    padding: 1.5em;
    min-width: 80vw;
    max-width: 700px;
    .alert-success,
    .button-icon-right {
        display: none;
    }
`;
