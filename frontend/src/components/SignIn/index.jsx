import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {InputAdornment, Stack, Tooltip} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {styleSheet} from "./style";
import Chip from '@mui/material/Chip';
import SignUp from "../SignUp";
import swal from 'sweetalert';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';


const SignInForm = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const SignInFormTitle = (props) => {
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

SignInFormTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function SignIn(props) {
    let classes = styleSheet();
    const [open, setOpen] = React.useState(false);
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePassword = (prop) => (event) => {
        setPassword(event.target.value);
    };
    const handleChangeUserName = (prop) => (event) => {
        setUserName(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const sendData = (e) => {
        e.preventDefault()
        props.getUserInfo("C001");
        swal("Sign In Successful!", "Welcome", "success");
    }

    return (
        <div>
            <Tooltip title="Sign In">
                <Chip label="Sign In" onClick={handleClickOpen}/>
            </Tooltip>
            <SignInForm className={classes.login__cover} onClose={handleClose} aria-labelledby="tittle" open={open}>
                <SignInFormTitle className={classes.login__tittle} id="tittle" onClose={handleClose}>
                    WELCOME
                    <hr/>
                </SignInFormTitle>
                <ValidatorForm  onSubmit={sendData} onError={errors => console.log(errors)}>

                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}
                           width={{xs: '300px', md: '450px'}} className={classes.login__back}>
                        <Stack>
                            <span className={classes.login__media}>Logging Using Social Media</span>
                        </Stack>
                        <Stack direction="row">
                            <IconButton aria-label="fb-icon">
                                <FacebookIcon/>
                            </IconButton>
                            <IconButton aria-label="google-icon">
                                <GoogleIcon/>
                            </IconButton>
                        </Stack>
                        <Stack direction="row" className={classes.login__hr}>
                            <hr width={'100px'} align={'left'}/>
                            <pre> or </pre>
                            <hr width={'100px'} align={'left'}/>
                        </Stack>

                        <Stack>
                            <TextValidator label="User ID" variant="outlined" helperText="User ID or E-mail Address" size="small"
                                           color="primary"
                                           errorMessages="Incorrect entry !"
                                           value={userName}
                                           onChange={(e) => {
                                               setUserName(e.target.value)
                                           }} validators={['required',]}
                            />
                        </Stack>
                        <Stack>
                            <TextValidator label="Password" variant="outlined"
                                           type={showPassword ? "text" : "password"} size="small"
                                           onChange={handleChangePassword('password')}
                                           value={password}
                                           errorMessages="Incorrect Password !"
                                           endAdornment={
                                               <InputAdornment position="end">
                                                   <IconButton aria-label="toggle password visibility"
                                                               onClick={handleClickShowPassword}
                                                               onMouseDown={handleMouseDownPassword} edge="end">
                                                       {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                   </IconButton>
                                               </InputAdornment>
                                           } validators={['required',]}
                            />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                            <SignUp/>
                            <Button autoFocus type="submit"
                                    style={{fontWeight: 'bold', width: '95px', borderRadius: 15}} color="info"
                                    variant="contained">Sign In</Button>
                        </Stack>

                    </Stack>
                </ValidatorForm>
            </SignInForm>
        </div>
    );
}
