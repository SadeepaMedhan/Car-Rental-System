import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {InputAdornment, Stack, TextField, Tooltip} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {styleSheet} from "./style";
import PhotoCamera from '@mui/icons-material/PhotoCamera';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function SignUp() {
    let classes = styleSheet();
    const [open, setOpen] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (prop) => (event) => {
       setPassword(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <Tooltip title="create account" >
                <Button onClick={handleClickOpen} style={{fontWeight:'bold', width:'95px',borderRadius:15 }} color="primary" variant="contained">Sign Up</Button>
            </Tooltip>
            <BootstrapDialog className={classes.login__cover}
                aria-labelledby="tittle"
                open={open}

            >
                <BootstrapDialogTitle className={classes.login__tittle} id="tittle" onClose={handleClose}>
                    Create Account
                </BootstrapDialogTitle>

                <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}
                       width={{xs:'300px', md:'550px'}} className={classes.login__back}>
                    <Stack direction="row">

                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" />
                            <PhotoCamera />
                        </IconButton>

                    </Stack>

                    <Stack direction="row" spacing={4}>

                        <TextField label="User Name" variant="outlined"
                                     helperText="Incorrect entry." size="small" color="primary"

                        />
                        <TextField label="NIC" variant="outlined"
                                   helperText="Incorrect entry." size="small" color="primary"

                        />
                    </Stack>
                    <Stack direction="row" spacing={4}>
                        <TextField label="Address" variant="outlined"
                                   helperText="Incorrect entry." size="small" color="primary"

                        />
                        <TextField label="Driving License No" variant="outlined"
                                   helperText="Incorrect entry." size="small" color="primary"

                        />
                    </Stack>
                    <Stack direction="row" spacing={4}>
                        <TextField label="Contact" variant="outlined"
                                   helperText="Incorrect entry." size="small" color="primary"

                        />
                        <TextField label="E-mail" variant="outlined"
                                   helperText="Incorrect entry." size="small" color="primary"

                        />
                    </Stack>

                    <Stack  direction="row" spacing={4}>
                        <TextField label="Password" variant="outlined" helperText="Incorrect entry."
                            type="password" size="small"
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <TextField label="Confirm Password" variant="outlined" helperText="Incorrect entry."
                            type="password" size="small"
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                        <Button autoFocus onClick={handleClose} style={{fontWeight:'bold', width:'95px',borderRadius:15 }} color="info" variant="contained">Clear</Button>
                        <Button onClick={handleClose} style={{fontWeight:'bold', width:'95px',borderRadius:15 }} color="primary" variant="contained">Confirm</Button>
                    </Stack>
                </Stack>
            </BootstrapDialog>
        </div>
    );
}
