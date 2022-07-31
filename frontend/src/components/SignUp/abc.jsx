import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Backdrop, Stack, Tooltip} from "@mui/material";
import {styleSheet} from "./style";
import {withStyles} from "@mui/styles";
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import CustomerService from "../../service/CustomerService";
import UploadFilesService from "../../service/UploadFilesService";
import Divider from "@mui/material/Divider";

class Sign extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            password: '',
            showPassword: false,
            cusFormData: {
                cusID: 'C***',
                cusName: "",
                cusEmail: '',
                cusPassword: '',
                cusNIC: '',
                cusDrivingLicenseNo: '',
                cusAddress: '',
                cusContactNo: '',
                nicUrl: ''
            },
            currentFile: undefined,
            user: {
                password: '',
                repeatPassword: '',
            },
        }
    }

    saveCus = async () => {
        console.log(this.state.cusFormData)
        let formData = this.state.cusFormData
        let response = await CustomerService.createCustomer(formData);
        if (response.status === 201) {
            console.log("saved !")
        } else {
            console.log(response)
        }
    }


    handleChange = (event) => {
        const {user} = this.state;
        user[event.target.name] = event.target.value;
        this.setState({user});
    }

    handleSubmit = (event) => {

    }


    render() {
        let {classes} = this.props;


        const handleClickOpen = () => {
            this.setState({open: true})
        };
        const handleClose = () => {
            this.setState({open: false});
        };

        const handleChange = (prop) => (event) => {
            this.setState({showPassword: event.target.value});
        };

        const handleClickShowPassword = () => {
            this.setState({showPassword: !this.state.showPassword});
        };

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };
        const selectFile = (event) => {
            this.setState({
                currentFile: event.target.files[0],
                nicUrl: event.target.files[0].name
            });
        };
        const uploadNic = async (event) => {
            var data = new FormData();
            let file = this.state.currentFile;
            let fileName = this.state.currentFile.name;
            data.append("myFile", file, fileName);

            let resp = await UploadFilesService.upload(file);
            console.log(resp)
        };

        const {user} = this.state;

        return (
            <div>
                <Tooltip title="create account">
                    <Button onClick={handleClickOpen} style={{fontWeight: 'bold', width: '95px', borderRadius: 15}}
                            color="primary" variant="contained">Sign Up</Button>
                </Tooltip>

                    <Stack className={classes.signUp__cover}>

                        <SignUpTitle className={classes.signUp__tittle} id="tittle" onClose={handleClose}>
                            Sign Up
                            <Tooltip title="Your ID">
                                <p style={{fontFamily: 'Convergence', fontSize: '0.7em'}}>
                                    Your ID is : {this.state.cusFormData.cusID}</p>
                            </Tooltip>
                        </SignUpTitle>

                        <Stack spacing={4}
                               justifyContent="space-evenly"
                               direction="row" divider={<Divider orientation="vertical" flexItem/>}>

                            <ValidatorForm  onSubmit={this.saveCus} onError={errors => console.log(errors)}>
                                <Stack direction="column" justifyContent="center" alignItems="center" spacing={3}
                                       className={classes.signUp__back} >

                                    <Stack direction="row" spacing={4}>
                                        <TextValidator
                                            label="User Name" variant="outlined"
                                            size="small" color="primary"
                                            value={this.state.cusFormData.cusName}
                                            onChange={(e) => {
                                                let formData = this.state.cusFormData
                                                formData.cusName = e.target.value
                                                this.setState({formData})
                                            }} validators={['required',]}/>


                                        <TextValidator label="NIC" variant="outlined"
                                                       size="small" color="primary"
                                                       value={this.state.cusFormData.cusNIC}
                                                       onChange={(e) => {
                                                           let formData = this.state.cusFormData
                                                           formData.cusNIC = e.target.value
                                                           this.setState({formData})
                                                       }} validators={['required',]}/>
                                    </Stack>
                                    <Stack direction="row" spacing={4}>
                                        <TextValidator label="Address" variant="outlined"
                                                       size="small" color="primary"
                                                       value={this.state.cusFormData.cusAddress}
                                                       onChange={(e) => {
                                                           let formData = this.state.cusFormData
                                                           formData.cusAddress = e.target.value
                                                           this.setState({formData})
                                                       }} validators={['required',]}/>

                                        <TextValidator label="Driving License No" variant="outlined"
                                                       size="small" color="primary"
                                                       value={this.state.cusFormData.cusDrivingLicenseNo}
                                                       onChange={(e) => {
                                                           let formData = this.state.cusFormData
                                                           formData.cusDrivingLicenseNo = e.target.value
                                                           this.setState({formData})
                                                       }} validators={['required',]}/>
                                    </Stack>
                                    <Stack direction="row" spacing={4}>
                                        <TextValidator label="Contact" variant="outlined"
                                                       size="small" color="primary"
                                                       value={this.state.cusFormData.cusContactNo}
                                                       onChange={(e) => {
                                                           let formData = this.state.cusFormData
                                                           formData.cusContactNo = e.target.value
                                                           this.setState({formData})
                                                       }} validators={['required',]}/>

                                        <TextValidator label="E-mail" variant="outlined"
                                                       size="small" color="primary"
                                                       value={this.state.cusFormData.cusEmail}
                                                       onChange={(e) => {
                                                           let formData = this.state.cusFormData
                                                           formData.cusEmail = e.target.value
                                                           this.setState({formData})
                                                       }} validators={['required',]}/>
                                    </Stack>

                                    <Stack direction="row" spacing={4}>
                                        <TextValidator
                                            label="Password"
                                            onChange={this.handleChange}
                                            type="password"
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            value={user.password}
                                        />
                                        <TextValidator
                                            label="Repeat password"
                                            onChange={this.handleChange}
                                            type="password"
                                            validators={['isPasswordMatch', 'required']}
                                            errorMessages={['password mismatch', 'this field is required']}
                                            value={user.repeatPassword}
                                        />

                                    </Stack>

                                    <Stack direction="row" justifyContent="space-between" alignItems="center"
                                           spacing={1}>
                                        <Button onClick={handleClose} color="info" variant="contained"
                                                style={{fontWeight: 'bold', width: '95px', borderRadius: 15}}>
                                            Clear
                                        </Button>
                                        <Button type="submit" color="primary" variant="contained"
                                                style={{fontWeight: 'bold', width: '95px', borderRadius: 15}}>
                                            Confirm
                                        </Button>
                                    </Stack>

                                </Stack>
                            </ValidatorForm>

                            <Stack direction="column"
                                   justifyContent="center"
                                   alignItems="center"
                                   spacing={2} sx={{margin: '0', padding: '20px'}}>
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
                                    {this.state.currentFile && (
                                        <img height="80px" className="preview my20"
                                             src={URL.createObjectURL(this.state.currentFile)} alt=""/>
                                    )}
                                </div>
                                <Button
                                    className="btn-upload"
                                    color="primary"
                                    variant="contained"
                                    component="span"
                                    disabled={!this.state.currentFile}
                                    onClick={uploadNic}
                                >
                                    Upload
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>

            </div>
        );
    }

}



const SignUpTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton aria-label="close" onClick={onClose}
                            sx={{position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500],}}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

SignUpTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};