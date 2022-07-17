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
import {FormControl, InputLabel, Select, Stack, Typography} from "@mui/material";
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {TimePicker} from "@mui/x-date-pickers";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Menu from "@mui/material/Menu";

const pages = ['Vehicles', 'Customer', 'Booking', 'About', 'Income'];

const driverStatus = [
    {value: '0', label: 'Self Drive'},
    {value: '1', label: 'With Driver'}
];


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            driverStatus: '0',
            vehicleOpen: false,
            anchorElNav: null,
            value: 1,
            selectDate: new Date('2014-08-18T21:11:54'),
            selectTime: new Date('2014-08-18T21:11:54'),
            anchorEl: true,
        }


    }


    render() {
        let {classes} = this.props;
        // const open = Boolean(this.state.anchorEl);

        const handleChange = (event) => {
            this.setState({driverStatus: event.target.value});
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

        const handleCloseNavMenu = () => {
            this.setState({anchorElNav : null});
        };

        return (
            <div>
                <div className={classes.back__floor}>
                    <div className={classes.nav__bar}>
                        <div className={classes.nav__item}>
                            <img className={classes.nav__logo} src={logo} alt=""/>
                            <p>Easy Car Rental Pvt(Ltd)</p>
                        </div>
                        <div className={classes.nav__item}>
                            <Stack className={classes.tab__lis}
                                   direction={{xs: 'column', sm: 'row'}}
                                   spacing={{xs: 1, sm: 2, md: 4}}
                                   sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}
                            >
                                <li className={classes.tab__lis__item}>
                                    <a className={classes.tab__lis__item_link} href="">Home</a>
                                </li>
                                <li className={classes.tab__lis__item}>
                                    <a className={classes.tab__lis__item_link} href="">Vehicles</a>
                                </li>
                                <li className={classes.tab__lis__item}>
                                    <a className={classes.tab__lis__item_link} href="">Service</a>
                                </li>
                                <li className={classes.tab__lis__item}>
                                    <a className={classes.tab__lis__item_link} href="">About</a>
                                </li>
                            </Stack>
                        </div>
                        <div className={classes.nav__item}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
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
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </div>

                    <div className={classes.back__img}>
                        <div>
                            <img src={backImg} alt="" style={{width: '98vw'}}/>
                        </div>
                    </div>

                    <div className={classes.book__back}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <div>
                                <FormControl variant="outlined" sx={{m: 1, minWidth: 120}}>
                                    <InputLabel id="lblType">Vehicle Type</InputLabel>
                                    <Select
                                        labelId="lblType"
                                        id="txtType"
                                        value={this.state.driverStatus}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl sx={{m: 1, minWidth: 240}}>
                                    <InputLabel id="demo-simple-select-filled-label">Pickup Location</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={this.state.driverStatus}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
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
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
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


                <SpeedDialBtn/>
            </div>
        )
    }
}

export default withStyles(styleSheet)(HomePage);
