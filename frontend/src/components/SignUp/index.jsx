import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Avatar, InputAdornment, Stack, TextField, Tooltip} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {styleSheet} from "./style";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {withStyles} from "@mui/styles";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import CustomerService from "../../service/CustomerService";

class SignUp extends Component{

    constructor(props) {
        super(props);
        this.state = {
            open:false,
            password:'',
            showPassword:false,
            cusFormData: {
                cusID: 'C002',
                cusName: '',
                cusEmail: '',
                cusPassword: '',
                cusNIC: '',
                cusDrivingLicenseNo: '',
                cusAddress: '',
                cusContactNo: ''
            },

        }
    }

    handleSubmit = async () => {
        console.log('save button clicked!!')
        console.log(this.state.cusFormData)
        let formData = this.state.cusFormData
        let response = await CustomerService.createCustomer(formData);
        if (response.status === 201) {
            console.log("saved !")
        } else {
            console.log(response)
        }
    }

    render() {
        let {classes} = this.props;

        const handleClickOpen = () => {
            this.setState({open:true})
        };
        const handleClose = () => {
            this.setState({open:false});
        };

        const handleChange = (prop) => (event) => {
            this.setState({showPassword:event.target.value});
        };

        const handleClickShowPassword = () => {
            this.setState({showPassword:!this.state.showPassword});
        };

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };

        return (
            <div>
                <Tooltip title="create account" >
                    <Button onClick={handleClickOpen} style={{fontWeight:'bold', width:'95px',borderRadius:15 }} color="primary" variant="contained">Sign Up</Button>
                </Tooltip>


                    <SignUpForm className={classes.signUp__cover} aria-labelledby="tittle" open={this.state.open}>
                        <SignUpTitle className={classes.signUp__tittle} id="tittle" onClose={handleClose}>
                            Create Account
                            <hr/>
                        </SignUpTitle>
                        <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>

                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}
                               width={{xs:'300px', md:'550px'}} className={classes.signUp__back}>
                            <Stack direction="row" justifyContent="flex-start"
                                   alignItems="center" spacing={2} sx={{ marginBottom: '10px' }}>
                                <Avatar src="/broken-image.jpg" sx={{ width: 56, height: 56 }} />
                                <Tooltip title="Upload Image" >
                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                        <input hidden accept="image/*" type="file" />
                                        <PhotoCamera />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Your ID" >
                                    <h3>{this.state.cusFormData.cusID}</h3>
                                </Tooltip>
                            </Stack>


                            <Stack direction="row" spacing={4}>
                                <TextValidator
                                    label="User Name" variant="outlined"
                                     size="small" color="primary"
                                    value={this.state.cusFormData.cusName}
                                    onChange={(e) => {
                                        let formData = this.state.cusFormData
                                        formData.cusName = e.target.value
                                        this.setState({ formData })
                                    }} validators={['required',]}/>


                                <TextValidator label="NIC" variant="outlined"
                                           size="small" color="primary"
                                           value={this.state.cusFormData.cusNIC}
                                           onChange={(e) => {
                                               let formData = this.state.cusFormData
                                               formData.cusNIC = e.target.value
                                               this.setState({ formData })
                                           }} validators={['required',]}/>
                            </Stack>
                            <Stack direction="row" spacing={4}>
                                <TextValidator label="Address" variant="outlined"
                                            size="small" color="primary"
                                           value={this.state.cusFormData.cusAddress}
                                           onChange={(e) => {
                                               let formData = this.state.cusFormData
                                               formData.cusAddress = e.target.value
                                               this.setState({ formData })
                                           }} validators={['required',]}/>

                                <TextValidator label="Driving License No" variant="outlined"
                                            size="small" color="primary"
                                           value={this.state.cusFormData.cusDrivingLicenseNo}
                                           onChange={(e) => {
                                               let formData = this.state.cusFormData
                                               formData.cusDrivingLicenseNo = e.target.value
                                               this.setState({ formData })
                                           }} validators={['required',]}/>
                            </Stack>
                            <Stack direction="row" spacing={4}>
                                <TextValidator label="Contact" variant="outlined"
                                           size="small" color="primary"
                                           value={this.state.cusFormData.cusContactNo}
                                           onChange={(e) => {
                                               let formData = this.state.cusFormData
                                               formData.cusContactNo = e.target.value
                                               this.setState({ formData })
                                           }} validators={['required',]}/>

                                <TextValidator  label="E-mail" variant="outlined"
                                           size="small" color="primary"
                                           value={this.state.cusFormData.cusEmail}
                                           onChange={(e) => {
                                               let formData = this.state.cusFormData
                                               formData.cusEmail = e.target.value
                                               this.setState({ formData })
                                           }} validators={['required',]}/>
                            </Stack>

                            <Stack  direction="row" spacing={4}>
                                <TextValidator label="Password" variant="outlined" helperText="Incorrect entry."
                                           type="password" size="small"
                                               value={this.state.cusFormData.cusPassword}
                                               onChange={(e) => {
                                                   let formData = this.state.cusFormData
                                                   formData.cusPassword = e.target.value
                                                   this.setState({ formData })
                                               }} errorMessages="Incorrect Password" validators={['required',]}
                                           endAdornment={
                                               <InputAdornment position="end">
                                                   <IconButton
                                                       aria-label="toggle password visibility"
                                                       onClick={handleClickShowPassword}
                                                       onMouseDown={handleMouseDownPassword}
                                                       edge="end"
                                                   >
                                                       {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                   </IconButton>
                                               </InputAdornment>
                                           }
                                />
                                <TextValidator label="Confirm Password" variant="outlined" helperText="Incorrect entry."
                                           type="password" size="small"
                                               value={this.state.cusFormData.cusPassword}
                                               onChange={(e) => {
                                                   let formData = this.state.cusFormData
                                                   formData.cusPassword = e.target.value
                                                   this.setState({ formData })
                                               }} errorMessages="Incorrect Password" validators={['required',]}
                                           endAdornment={
                                               <InputAdornment position="end">
                                                   <IconButton
                                                       aria-label="toggle password visibility"
                                                       onClick={handleClickShowPassword}
                                                       onMouseDown={handleMouseDownPassword}
                                                       edge="end"
                                                   >
                                                       {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                   </IconButton>
                                               </InputAdornment>
                                           }
                                />
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                                <Button autoFocus onClick={handleClose} color="info" variant="contained" style={{fontWeight:'bold', width:'95px',borderRadius:15 }}>
                                    Clear
                                </Button>
                                <Button type="submit" color="primary" variant="contained" style={{fontWeight:'bold', width:'95px',borderRadius:15 }}>
                                    Confirm
                                </Button>
                            </Stack>

                        </Stack>
                        </ValidatorForm>
                    </SignUpForm>
            </div>
        );
    }

}export default withStyles(styleSheet)(SignUp);

const SignUpForm = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {padding: theme.spacing(1),
    },
}));

const SignUpTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton aria-label="close" onClick={onClose}
                            sx={{position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500],}}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

SignUpTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};