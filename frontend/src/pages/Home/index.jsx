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
import {FormControl, InputLabel, Select} from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {TimePicker} from "@mui/x-date-pickers";


const driverStatus = [
    {value: '0', label: 'Self Drive'},
    {value: '1', label: 'With Driver'}
];


class HomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            driverStatus:'0',
            vehicleOpen:false,
            anchorElNav:null,
            value:1,
            selectDate:new Date('2014-08-18T21:11:54'),
            selectTime:new Date('2014-08-18T21:11:54'),
        }


    }

    render() {
        let { classes } = this.props;

        const handleChange = (event) => {
            this.setState({driverStatus: event.target.value});
        };
        const dateChange = (event) => {
            this.setState({selectDate: event.target.value});
        };
        const timeChange = (event) => {
            this.setState({selectTime: event.target.value});
        };

        return(
            <div>
                <div className={classes.back__floor}>
                    <div className={classes.nav__bar} >
                        <div className={classes.nav__item}>
                            <img className={classes.nav__logo} src={logo} alt=""/>
                            <p>Easy Car Rental Pvt(Ltd)</p>
                        </div>
                        <div className={classes.nav__item}>
                            <ul className={classes.tab__lis}>
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
                            </ul>
                        </div>
                        <div className={classes.nav__item}>

                        </div>
                    </div>

                    <div className={classes.back__img}>
                        <div>
                            <img  src={backImg} alt="" style={{ width:'98vw'}}/>
                        </div>
                    </div>

                    <div className={classes.book__back}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div >
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-filled-label">Vehicle Type</InputLabel>
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
                        <div >
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 240 }}>
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
                        <div >
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                <DesktopDatePicker
                                    label="Pickup Date"
                                    inputFormat="MM/dd/yyyy"
                                    value={this.state.selectDate}
                                    onChange={dateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </FormControl>

                        </div>
                        <div >
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>

                            <TimePicker
                                    label="Pickup Time"
                                    value={this.state.selectTime}
                                    onChange={timeChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </FormControl>

                        </div>
                        <div >
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                            <DesktopDatePicker
                                label="Pickup Date"
                                inputFormat="MM/dd/yyyy"
                                value={this.state.selectDate}
                                onChange={dateChange}
                                renderInput={(params) => <TextField {...params} />}
                             />
                            </FormControl>
                        </div>
                        <div >
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-filled-label">Self Driver</InputLabel>
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
