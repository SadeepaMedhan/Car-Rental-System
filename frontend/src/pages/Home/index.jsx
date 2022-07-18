import * as React from "react";
import {Component} from "react";

import {styleSheet} from "./style";
import {withStyles} from "@mui/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SpeedDialBtn from "../../components/speedDial";
import logo from "../../assets/images/logo4.jpg";
import backImg from "../../assets/images/carBack.jpg";
import Button from "@mui/material/Button";
import {FormControl, InputLabel, Select, Stack, Tooltip, Typography} from "@mui/material";
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {TimePicker} from "@mui/x-date-pickers";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import Vehicle from "../Vehicle";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{  }}>
                    {children}
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            driverStatus: 0,
            vehicleType: 0,
            location: 0,
            anchorElNav: null,
            value: 1,
            tabValue: 0,
            selectDate: new Date('2014-08-18T21:11:54'),
            selectTime: new Date('2014-08-18T21:11:54'),
            anchorEl: true,
        }
    }

    render() {
        let {classes} = this.props;
        // const open = Boolean(this.state.anchorEl);

        const navTabChange = (event,newValue) => {
            this.setState({tabValue : newValue});
        };
        const driverChange = (event) => {
            this.setState({driverStatus: event.target.value});
        };
        const vehicleChange = (event) => {
            this.setState({vehicleType: event.target.value});
        };
        const locationChange = (event) => {
            this.setState({location: event.target.value});
        };
        const dateChange = (date) => {
            this.setState({selectDate: date});
        };
        const timeChange = (time) => {
            this.setState({selectTime: time});
        };

        const handleOpenNavMenu = (event) => {
            this.setState({anchorElNav : event.currentTarget});
        };

        const handleCloseNavMenu = (event,newValue) => {
            this.setState({anchorElNav : null});
        };
        const handleOpenDash = (event) => {
            console.log(IconButton)
        };

        return (
            <div>
                <div className={classes.back__floor}>

                    <div className={classes.nav__bar}>
                        <div className={classes.nav__item}>
                            <Stack  direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={2}
                                    sx={{display: { xs: 'none', md: 'block' }}}
                            >
                                <img className={classes.nav__logo} src={logo} alt=""/>
                            </Stack>
                            <h3 className={classes.nav__head}>Easy Car Rental Pvt(Ltd)</h3>
                        </div>
                        <div className={classes.nav__item}>
                            <Typography sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
                                        height={"40px"}  textAlign="center">
                                <img className={classes.nav__logo} src={logo} alt=""/>
                            </Typography>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' ,display: {xs: 'none', md: 'flex'}}}>
                                <Tabs value={this.state.tabValue} onChange={navTabChange} aria-label="basic tabs example">
                                    <Tab label="Home" {...a11yProps(0)} />
                                    <Tab label="Vehicles" {...a11yProps(1)} />
                                    <Tab label="Service" {...a11yProps(2)} />
                                    <Tab label="About" {...a11yProps(3)} />
                                </Tabs>
                            </Box>

                        </div>
                        <div className={classes.nav__item}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={this.state.anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(this.state.anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'fex', md: 'none' },
                                }}
                            >

                                <Tabs
                                    orientation="vertical"
                                    value={this.state.tabValue}
                                    onChange={navTabChange}
                                    aria-label="menu tabs"
                                >
                                    <Tab label="Home" {...a11yProps(0)} />
                                    <Tab label="Vehicles" {...a11yProps(1)} />
                                    <Tab label="Service" {...a11yProps(2)} />
                                    <Tab label="About" {...a11yProps(3)} />
                                </Tabs>
                            </Menu>
                            <Tooltip title="Sign In" >
                            <IconButton
                                size="large"
                                aria-label="account of user"
                                aria-controls="sign-appbar"
                                aria-haspopup="true"
                                 onClick={handleOpenDash}
                                color="inherit"
                                sx={{
                                    display: { xs: 'none', md: 'block' },
                                }}
                            >
                                <AccountCircleIcon />
                            </IconButton>
                            </Tooltip>
                        </div>
                    </div>


                    <TabPanel value={this.state.tabValue} index={0}>
                        <div>
                            <Grid className={classes.back__img} sx={{height: { xs: '100vh', md: '80vh' }}}>
                                <div>
                                    <img src={backImg} alt="" style={{width: '100vw',
                                        position: 'absolute',
                                        margin: 'auto',
                                        bottom: 0,
                                        top: 0}}
                                    />
                                </div>
                            </Grid>

                            <div className={classes.book__back}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <div>
                                        <FormControl variant="outlined" sx={{m: 1, minWidth: 120}}>
                                            <InputLabel id="lblType">Vehicle Type</InputLabel>
                                            <Select
                                                labelId="lblType"
                                                id="txtType"
                                                value={this.state.vehicleType}
                                                onChange={vehicleChange}
                                            >
                                                <MenuItem value={0}>
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={1}>General</MenuItem>
                                                <MenuItem value={2}>Premium</MenuItem>
                                                <MenuItem value={3}>Luxury</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div>
                                        <FormControl sx={{m: 1, minWidth: 220}}>
                                            <InputLabel id="demo-simple-select-filled-label">Pickup Location</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                value={this.state.location}
                                                onChange={locationChange}
                                            >
                                                <MenuItem value={0}>
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={1}>Ten</MenuItem>
                                                <MenuItem value={2}>Twenty</MenuItem>
                                                <MenuItem value={3}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className={classes.book__item}>
                                        <DesktopDatePicker
                                            sx={{m: 1, minWidth: 120}}
                                            label="Pickup Date"
                                            inputFormat="MM/dd/yyyy"
                                            value={this.state.selectDate}
                                            onChange={dateChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />

                                    </div>
                                    <div className={classes.book__item}>
                                        <TimePicker
                                            label="Pickup Time"
                                            value={this.state.selectTime}
                                            onChange={timeChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </div>
                                    <div className={classes.book__item}>
                                        <DesktopDatePicker
                                            variant="filled"
                                            label="Pickup Date"
                                            inputFormat="MM/dd/yyyy"
                                            value={this.state.selectDate}
                                            onChange={dateChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </div>
                                    <div>
                                        <FormControl sx={{m: 1, minWidth: 120}}>
                                            <InputLabel id="demo-simple-select-filled-label">Self Driver</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select"
                                                value={this.state.driverStatus}
                                                label="Age"
                                                onChange={driverChange}
                                            >
                                                <MenuItem value={0}>With Driver</MenuItem>
                                                <MenuItem value={1}>Self Driver</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className={classes.book__item}>
                                        <Button className={classes.check__btn}
                                                color="primary"
                                                variant="contained"
                                        >Check</Button>
                                    </div>
                                </LocalizationProvider>
                            </div>
                        </div>

                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={1}>
                        <Vehicle/>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={2}>
                        <Vehicle/>
                    </TabPanel>

                    <SpeedDialBtn/>
                </div>

            </div>
        )
    }
}

export default withStyles(styleSheet)(HomePage);
