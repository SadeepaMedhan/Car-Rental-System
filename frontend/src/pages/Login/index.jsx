import React, {Component} from "react";
import {withStyles} from "@mui/styles";
import {styleSheet} from "./style";
import Typography from "@mui/material/Typography";
import {FormControl, InputAdornment, InputLabel, Modal, OutlinedInput, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import CloseIcon from '@mui/icons-material/Close';
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            password: '',
            showPassword: false,
            open:props.viewOpen,
            close:false,
        }
    }

    render() {
        let {classes} = this.props;
        console.log(this.state.open+" open")
        console.log(this.props.viewOpen+" prop")

        const handleChange = (prop) => (event) => {
            this.setState({password: event.target.value})
        };

        const handleClickShowPassword = () => {
            this.setState({showPassword: !this.state.showPassword})
            };

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };

        const handleOpen = () => this.setState({open:true});
        const handleClose = () =>{
            this.setState({open:false});
        }

        return (
                <Modal
                    open={this.state.open}
                    onClose={this.state.close}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className={classes.login} >
                    <Grid container xs={12} sm={6} md={4}   className={classes.login__cover}>
                        <Grid container rowSpacing={2}  className={classes.login__back}>
                            <Grid item xs={2} sm={2} md={2}  className={classes.login__tittle}>
                                <h2>WELCOME</h2>
                            </Grid>
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
                                <div  className={classes.login__hr}>
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
                                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </Grid>

                            </Grid>
                            <Grid  item gap={2} xs={2} sm={4} md={4} className={classes.login__btn}>
                                <Button style={{fontWeight:'bold', width:'95px',borderRadius:15 }} color="info" variant="contained">Sign In</Button>
                                <Button style={{fontWeight:'bold', width:'95px',borderRadius:15 }} color="primary" variant="contained">Sign Up</Button>
                            </Grid>
                            <div className={classes.login__close_icon}>
                                <IconButton aria-label="close-icon" onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>

                            </div>
                        </Grid>
                    </Grid>

                </Modal>
        )
    }
}

export default withStyles(styleSheet)(Login);
