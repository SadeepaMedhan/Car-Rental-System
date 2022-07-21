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
import {
    CardActionArea,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup, FormLabel,
    InputLabel,
    Paper, Radio, RadioGroup,
    Select,
    Stack,
    Typography
} from "@mui/material";
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
import SignIn from "../../components/SignIn";
import {styled} from "@mui/material/styles";
import Slideshow from "../../components/Slider";
import backImg2 from "../../assets/images/carBack5.jpg";
import backImg3 from "../../assets/images/carBack3.jpg";
import generalCar from "../../assets/images/vehicles/prius-f.jpg";
import premiumCar from "../../assets/images/vehicles/ToyotaAllion-f.jpg";
import luxuryCar from "../../assets/images/vehicles/Mercedes.jpeg";
import vehicleImg1 from "../../assets/images/vehicles/v1f.jpg";
import VehicleCard from "../../components/Card/VehicleCard";
import SmallVehicleCard from "../../components/Card/smallVehicleCard";


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
            openLogin: false,
            vehicleTypeId:0,
        }
    }

    render() {
        let {classes} = this.props;
        // const open = Boolean(this.state.anchorEl);

        const navTabChange = (event, newValue) => {
            this.setState({tabValue: newValue});
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
            this.setState({anchorElNav: event.currentTarget});
        };

        const handleCloseNavMenu = (event, newValue) => {
            this.setState({anchorElNav: null});
        };
        const handleOpenDash = (event) => {
            console.log(this.state.openLogin)
            this.setState({openLogin: !this.state.openLogin});
        };
        const radioBtnChange = (event) => {
            this.setState({vehicleTypeId: event.target.value});
        };



        const Item = styled(Paper)(({theme}) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        }));

        return (
            <div>
                <div className={classes.back__floor}>

                    <div className={classes.nav__bar}>
                        <div className={classes.nav__item}>
                            <Stack direction="row"
                                   justifyContent="center"
                                   alignItems="center"
                                   spacing={2}
                                   sx={{display: {xs: 'none', md: 'block'}}}
                            >
                                <img className={classes.nav__logo} src={logo} alt=""/>
                            </Stack>
                            <h3 className={classes.nav__head}>Easy Car Rental Pvt(Ltd)</h3>
                        </div>
                        <div className={classes.nav__item}>
                            <Typography sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
                                        height={"40px"} textAlign="center">
                                <img className={classes.nav__logo} src={logo} alt=""/>
                            </Typography>
                            <Box sx={{ display: {xs: 'none', md: 'flex'}}}>
                                <Tabs value={this.state.tabValue} onChange={navTabChange}
                                      aria-label="basic tabs example">
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
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                <MenuIcon/>
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
                                    display: {xs: 'fex', md: 'none'},
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
                            <SignIn/>
                        </div>
                    </div>


                    <TabPanel value={this.state.tabValue} index={0}>
                        <Grid className={classes.back__img} sx={{height: {xs: '100vh', md: '80vh'},top:'10%'}}>
                            <div className={classes.topic__text}>
                                <h2 className={classes.maintopic__text}>Best Value Car Hire</h2>
                                <h3 className={classes.subtopic__text}>Book car hire now and get exclusive rates for your trip!</h3>
                            </div>

                            <div>
                                <Slideshow></Slideshow>
                            </div>
                        </Grid>

                        <Stack className={classes.book__back}   direction={{ xs: 'column', sm: 'row' }}
                               spacing={{ xs: 1, sm: 2, md: 4 }}  padding={2} sx={{top: {xs: '28%', md: '65%'}}} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <div className={classes.book__item}>
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
                                            <MenuItem value={1} imgSrc={generalCar}>General</MenuItem>
                                            <MenuItem value={2} imgSrc={premiumCar}>Premium</MenuItem>
                                            <MenuItem value={3} imgSrc={luxuryCar}>Luxury</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className={classes.book__item}>
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
                                        sx={{m: 1, minWidth: 220}}
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
                                <div className={classes.book__item}>
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
                                            href="#resultSec"
                                    >Check</Button>

                                </div>
                            </LocalizationProvider>
                        </Stack>


                        <Grid container direction="column" className={classes.scroll__box}>

                            <div className={classes.info_sec}>
                                <Typography  style={{
                                    fontFamily:'Convergence',
                                    fontSize:'1.2em',
                                    textAlign:'center',
                                    marginTop:'75px',
                                    marginBottom:'10px',
                                    color:'white',
                                }}>Enjoy the efficient and specialized services of
                                    Easy car rentals private limited; Sri Lanka's
                                    leading rent-a-car company</Typography>

                                <Stack direction={{ xs: 'column', sm: 'row' }}
                                       spacing={{ xs: 1, sm: 2, md: 4 }}
                                       justifyContent="center"
                                       alignItems="center"
                                       mt={2}>
                                    <div className={classes.info_sec_div}></div>
                                    <div className={classes.info_sec_div}></div>
                                    <div className={classes.info_sec_div}></div>
                                    <div className={classes.info_sec_div}></div>

                                </Stack>

                            </div>


                            <div className={classes.service_box}>
                                <h2 style={{
                                    fontFamily:'Convergence',
                                    fontSize:'1.2em',
                                    textAlign:'center',
                                    marginTop:'15px',
                                    marginBottom:'10px'
                                }}>Our Business Class Vehicles</h2>


                                <Stack direction={{ xs: 'column', sm: 'row' }}
                                       spacing={{ xs: 1, sm: 2, md: 4 }}
                                       justifyContent="center"
                                       alignItems="center"
                                       mt={2}>
                                    <div> <SmallVehicleCard name="General" imgSrc={generalCar}/> </div>
                                    <div> <SmallVehicleCard name="Premium" imgSrc={premiumCar}/> </div>
                                    <div> <SmallVehicleCard name="Luxury" imgSrc={luxuryCar}/> </div>
                                </Stack>

                            </div>

                            <div id="resultSec">
                                <div className={classes.suggest__result_box} >
                                    <h2 style={{
                                        fontFamily:'Convergence',
                                        fontSize:'1.2em',
                                        textAlign:'center',
                                        marginTop:'50px',
                                        marginBottom:'10px'
                                    }}>Best deals found for Sri Lanka car rentals</h2>
                                    <div style={{display:'flex',flexWrap: 'wrap',
                                        justifyContent: 'space-evenly', width:'100vw',
                                        paddingTop:'25px',}}>


                                        <div style={{ height:'100%'}}>
                                            <div className={classes.suggest__result}>
                                                <VehicleCard
                                                    imgSrc={vehicleImg1}
                                                    brand={"WagonR"}
                                                    type={"General"}
                                                    noOfPassenger={"4"}
                                                    transmissionType={"Auto"}
                                                    fuelType={"Petrol"}
                                                    dailyRate={"2500"}
                                                    monthlyRate={"35000"}
                                                    freeMileageDay={"100"}
                                                    freeMileageMonth={"2400"}
                                                    priceExtraKM={"30"}
                                                    color={"Red"}
                                                    maintenanceMileage={"2000"}
                                                    status={"available"}
                                                />
                                            </div>

                                        </div>
                                        <div style={{ height:'100%'}}>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox defaultChecked />} label="With Driver" />
                                                <FormControlLabel disabled control={<Checkbox />} label="Self Drive" />
                                            </FormGroup>
                                            <FormControl>
                                                <FormLabel id="demo-controlled-radio-buttons-group">Vehicle Type</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name="controlled-radio-buttons-group"
                                                    value={this.state.vehicleTypeId}
                                                    onChange={radioBtnChange}
                                                >
                                                    <FormControlLabel value={0} control={<Radio />} label="General" />
                                                    <FormControlLabel value={1} control={<Radio />} label="Premium" />
                                                    <FormControlLabel value={2} control={<Radio />} label="Luxury" />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <div className={classes.info_sec}
                                >
                                <div className={classes.suggest__result}>

                                </div>
                            </div>
                            <div className={classes.contact_sec}>
                                <h2 style={{
                                    position: 'absolute',
                                    fontFamily:'Convergence',
                                    fontSize:'1.2em',
                                    textAlign:'center',
                                    marginTop:'15px',
                                    marginBottom:'10px',
                                    color:'white',
                                }}>Contact</h2>
                                <img src={backImg3} alt="" style={{
                                width: '100vw',
                                height:'100%',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundAttachment:'fixed'
                            }}/>

                            </div>
                        </Grid>

                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={1}>
                        <Vehicle/>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={2}>
                        <Vehicle/>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={3}>
                        <Vehicle/>
                    </TabPanel>

                    <SpeedDialBtn/>
                    <footer>
                        <span>2022 - All Right Reserved</span>
                    </footer>
                </div>
            </div>
        )
    }
}

export default withStyles(styleSheet)(HomePage);


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{}}>
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
