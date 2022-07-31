import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Stack, Tooltip} from "@mui/material";
import {styleSheet} from "./style";
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import Divider from "@mui/material/Divider";
import CustomerService from "../../service/CustomerService";
import UploadFilesService from "../../service/UploadFilesService";


export default function SignUp() {
    const [open, setOpen] = React.useState(false);
    const [cusRepeatPassword, setCusRepeatPassword] = React.useState('');
    const [currentFile, setCurrentFile] = React.useState(undefined);
    const [cusFormData, setCusFormData] = React.useState({
        cusID:'***',
        cusName:'',
        cusEmail:'',
        cusPassword:'',
        cusNIC:'',
        cusDrivingLicenseNo:'',
        cusAddress:'',
        cusContactNo:'',
        nicUrl:'',
    });
    React.useEffect(() => {
        getNewId();
    }, []);
    let classes = styleSheet();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const submitForm = () => {
        saveCus()
    }


    const getNewId = async () => {
        let response = await CustomerService.fetchNewId();
        if (response.status === 200) {
            setCusFormData({...cusFormData ,cusID:response.data.data})
            console.log("res: " + JSON.stringify(response.data.data))
        } else {
            console.log("fetching error: " + response)
        }
    }
    const saveCus = async () => {
        console.log(cusFormData)
        let response = await CustomerService.createCustomer(cusFormData);
        if (response.status === 201) {
            console.log("saved !")
            handleClose()
        } else {
            console.log(response)
        }
    }

    const selectFile = (event) => {
        setCurrentFile(event.target.files[0])
        setCusFormData({...cusFormData ,nicUrl:event.target.files[0].name})
    };

    const uploadNic = async () => {
        var data = new FormData();
        let file = currentFile;
        let fileName = currentFile.name;
        data.append("myFile", file, fileName);

        let resp = await UploadFilesService.upload(file);
        console.log(resp)
    }

    return (
        <div>
            <Tooltip title="create account">
                <Button onClick={handleClickOpen} style={{fontWeight: 'bold', width: '95px', borderRadius: 15}}
                        color="primary" variant="contained">Sign Up</Button>
            </Tooltip>
            <SignUpForm className={classes.signUp__cover} onClose={handleClose} aria-labelledby="tittle" open={open}>
                <SignUpFormTitle className={classes.signUp__tittle} id="tittle" onClose={handleClose}>
                    Sign Up
                    <p style={{fontFamily: 'Convergence', fontSize: '0.7em'}}>
                        Your ID is : {cusFormData.cusID}</p>
                </SignUpFormTitle>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} divider={<Divider orientation="vertical" flexItem />}
                       className={classes.signUp__back}>
                    <ValidatorForm onSubmit={submitForm} onError={errors => console.log(errors)}>

                        <Stack direction="column" spacing={4} sx={{padding:'20px'}}>
                            <Stack direction="column" spacing={2}>

                                <Stack direction="row" spacing={4}>
                                    <TextValidator
                                        label="User Name" variant="outlined"
                                        size="small" color="primary"
                                        value={cusFormData.cusName}
                                        onChange={(e) => {
                                            setCusFormData({...cusFormData ,cusName:e.target.value})
                                        }} validators={['required',]}
                                        errorMessages={['this field is required']}/>
                                    <TextValidator
                                        label="NIC" variant="outlined"
                                        size="small" color="primary"
                                        value={cusFormData.cusNIC}
                                        onChange={(e) => {
                                            setCusFormData({...cusFormData ,cusNIC:e.target.value})
                                        }} validators={['required',]}
                                        errorMessages={['this field is required']}/>

                                </Stack>
                                <Stack direction="row" spacing={4}>
                                    <TextValidator
                                        label="Address" variant="outlined"
                                        size="small" color="primary"
                                        value={cusFormData.cusAddress}
                                        onChange={(e) => {
                                            setCusFormData({...cusFormData ,cusAddress:e.target.value})
                                        }} validators={['required',]}
                                        errorMessages={['this field is required']}/>
                                    <TextValidator
                                        label="Driving License No" variant="outlined"
                                        size="small" color="primary"
                                        value={cusFormData.cusDrivingLicenseNo}
                                        onChange={(e) => {
                                            setCusFormData({...cusFormData ,cusDrivingLicenseNo:e.target.value})
                                        }} validators={['required',]}
                                        errorMessages={['this field is required']}/>

                                </Stack>
                                <Stack direction="row" spacing={4}>
                                    <TextValidator
                                        label="Contact" variant="outlined"
                                        size="small" color="primary"
                                        value={cusFormData.cusContactNo}
                                        onChange={(e) => {
                                            setCusFormData({...cusFormData ,cusContactNo:e.target.value})
                                        }} validators={['required',]}
                                        errorMessages={['this field is required']}/>

                                    <TextValidator
                                        label="E-mail" variant="outlined"
                                        size="small" color="primary"
                                        value={cusFormData.cusEmail}
                                        onChange={(e) => {
                                            setCusFormData({...cusFormData ,cusEmail:e.target.value})
                                        }} validators={['required','isEmail']}
                                        errorMessages={['this field is required','invalid E-mail']}/>

                                </Stack>
                                <Stack direction="row" spacing={4}>
                                    <TextValidator
                                        label="Password" variant="outlined"
                                        size="small" color="primary"
                                        value={cusFormData.cusPassword}
                                        onChange={(e) => {
                                            setCusFormData({...cusFormData ,cusPassword:e.target.value})
                                        }} validators={['required',]}
                                        errorMessages={['this field is required']}/>
                                    <TextValidator
                                        label="Repeat Password" variant="outlined"
                                        size="small" color="primary"
                                        value={cusRepeatPassword}
                                        onChange={(e) => {
                                            setCusRepeatPassword(e.target.value)
                                        }} validators={['required',]}
                                        errorMessages={['this field is required']}/>

                                </Stack>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <label htmlFor="btn-upload">
                                        <input
                                            multiple
                                            id="btn-upload"
                                            name="btn-upload"
                                            style={{display: 'none'}}
                                            type="file"
                                            accept="image/*"
                                            onChange={selectFile}/>
                                        <Button
                                            className="btn-choose"
                                            variant="outlined"
                                            component="span">
                                            Choose NIC Image
                                        </Button>
                                    </label>
                                    <div>
                                        {currentFile && (
                                            <img height="80px" className="preview my20"
                                                 src={URL.createObjectURL(currentFile)} alt=""/>
                                        )}
                                    </div>
                                    <Button
                                        className="btn-upload"
                                        color="primary"
                                        variant="contained"
                                        component="span"
                                        disabled={!currentFile}
                                        onClick={uploadNic}
                                    >
                                        Upload
                                    </Button>
                                </Stack>
                            </Stack>
                            <Stack direction="row" justifyContent="center"
                                   alignItems="center"
                                   spacing={1}>
                                <Button onClick={handleClose} color="info" variant="contained"
                                        style={{
                                            fontWeight: 'bold',
                                            width: '95px',
                                            borderRadius: 15
                                        }}>
                                    Clear
                                </Button>
                                <Button type="submit" color="primary" variant="contained"
                                        style={{
                                            fontWeight: 'bold',
                                            width: '95px',
                                            borderRadius: 15
                                        }}>
                                    Confirm
                                </Button>
                            </Stack>
                        </Stack>

                    </ValidatorForm>
                    <Stack direction="column"
                           justifyContent="center"
                           alignItems="center"
                           spacing={2} sx={{margin: '0', }}>
                        <h2 style={{
                            fontFamily: 'Convergence',
                            fontSize: '1.5em'
                        }}>Personal Information</h2>
                        <p style={{
                            fontFamily: 'Convergence',
                        }}>Fill ot the form on the left.</p>
                        <p style={{
                            textAlign: 'center', fontFamily: 'Convergence',
                        }}>You can always edit the data in the settings menu</p>
                    </Stack>
                </Stack>
            </SignUpForm>
        </div>
    );
}

const SignUpForm = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        width: '100vw',
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
        maxWidth: '900px',
        maxHeight: false,
    }
}));

const SignUpFormTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton aria-label="close" onClick={onClose}
                            sx={{
                                position: 'absolute',
                                right: 8, top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

SignUpFormTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};
