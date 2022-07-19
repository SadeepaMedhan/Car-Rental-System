import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {InputAdornment, TextField, Tooltip} from "@mui/material";
import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {styleSheet} from "./style";
import Chip from '@mui/material/Chip';



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

export default function SignIn() {
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
            <Tooltip title="Sign In" >
                <Chip label="Sign In" onClick={handleClickOpen} />
                </Tooltip>
            <BootstrapDialog className={classes.login__cover}
                onClose={handleClose}
                aria-labelledby="tittle"
                open={open}

            >
                <BootstrapDialogTitle className={classes.login__tittle} id="tittle" onClose={handleClose}>
                    WELCOME
                </BootstrapDialogTitle>

                <div className={classes.login__back}>

                    <Grid className={classes.login__media}>
                        <span style={{ fontSize:'0.75em'}}>Logging Using Social Media</span>
                        <div>
                            <IconButton aria-label="fb-icon">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton aria-label="google-icon">
                                <GoogleIcon />
                            </IconButton>

                        </div>
                        <div className={classes.login__hr} >
                            <hr width={'100px'} align={'left'}/>
                            <pre> or </pre>
                            <hr width={'100px'} align={'left'}/>
                        </div>
                    </Grid>

                    <Grid item xs={2} sm={2} md={2} columns className={classes.login__textField_c}>
                        <Grid className={classes.login__textField}>
                            <TextField
                                label="User ID"
                                variant="outlined"
                                helperText="Incorrect entry."
                                size="small"
                                color="primary"

                            />
                        </Grid>
                        <Grid  className={classes.login__textField}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                helperText="Incorrect entry."
                                type="password"
                                size="small"
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
                        </Grid>

                    </Grid>

                </div>

                <DialogActions className={classes.login__btn}>

                    <Button autoFocus onClick={handleClose} style={{fontWeight:'bold', width:'95px',borderRadius:15 }} color="info" variant="contained">Sign In</Button>
                    <Button onClick={handleClose} style={{fontWeight:'bold', width:'95px',borderRadius:15 }} color="primary" variant="contained">Sign Up</Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
