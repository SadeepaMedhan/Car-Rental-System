import * as React from "react";
import {Component} from "react";

import {styleSheet} from "./style";
import {withStyles} from "@mui/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../assets/images/logo4.jpg";
import Button from "@mui/material/Button";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    Paper,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Typography
} from "@mui/material";
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
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
import generalCar from "../../assets/images/vehicles/prius-f.jpg";
import premiumCar from "../../assets/images/vehicles/ToyotaAllion-f.jpg";
import luxuryCar from "../../assets/images/vehicles/Mercedes.jpeg";
import SmallVehicleCard from "../../components/Card/smallVehicleCard";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Chip from '@mui/material/Chip';
import VehicleService from "../../service/VehicleService";
import BookingPage from "../Booking";
import Skeleton from "@mui/material/Skeleton";
import swal from 'sweetalert';
import CarRentalIcon from '@mui/icons-material/CarRental';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import ContactInfo from "../../components/ContactInfo";
import CustomerView from "../Customer";
import DriverView from "../Driver";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            driverStatus: 0,
            vehicleType: 0,
            anchorElNav: null,
            value: 1,
            tabValue: 0,
            anchorEl: true,
            openLogin: false,
            vehicleTypeId: 0,
            signInIcon: null,
            user: null,
            vehicleList: [],
            leavingDate: new Date("2022/07/27"),
            returnDate: new Date("2022/07/28"),
            location: null,
            bookingData: {
                customer: null,
                leavingDate: null,
                returnDate: null,
                location: null,
                driverState: 0,
                vehicleType: 0,
            },
        }
    }

    getUserData = (data) => {
        console.log("get " + data)
        this.setState({user: data})
    }
    getDriverData = (data) => {
        console.log("get " + data)
        this.setState({driver: data})
        this.setState({tabValue: 5});
    }

    getVehicle = (data) => {
        this.setState({tabValue: 4});
    }

    async loadData() {
        let res = await VehicleService.fetchVehicles();
        if (res.status === 200) {
            this.setState({
                vehicleList: JSON.stringify(res.data.data)
            })
            console.log("res: " + JSON.stringify(res.data.data))

        } else {
            console.log("fetching error: " + res)
        }
    }

    componentDidMount() {
        this.loadData();
    }


    render() {
        let {classes} = this.props;

        const navTabChange = (event, newValue) => {
            if (newValue === 4) {
                if (this.state.user !== null) {
                    this.setState({tabValue: 4});
                } else {
                    swal("Sign In Unsuccessful!", "Please Sign In", "error")
                }

            }
            this.setState({tabValue: newValue});
        };
        const searchResult = () => {
            if (this.state.user !== null) {
                this.setState({
                    bookingData: {
                        customer: this.state.user,
                        leavingDate: this.state.leavingDate,
                        returnDate: this.state.returnDate,
                        location: this.state.location,
                        driverState: this.state.driverStatus,
                        vehicleType: this.state.vehicleType
                    }
                })
                this.setState({tabValue: 4});
            } else {
                swal("Sign In Unsuccessful!", "Please Sign In", "error")
            }
        };

        const driverChange = (event) => {
            this.setState({driverStatus: event.target.value});
        };
        const vehicleChange = (event) => {
            this.setState({vehicleType: event.target.value});
        };

        const handleOpenNavMenu = (event) => {
            this.setState({anchorElNav: event.currentTarget});
        };

        const handleCloseNavMenu = () => {
            this.setState({anchorElNav: null});
        };
        const logout = () => {
            this.setState({user: null});
        };
        const openUserInfo = () => {
            this.setState({tabValue: 6});
        };


        const radioBtnChange = (event) => {
            this.setState({vehicleTypeId: event.target.value});
        };


        const Item = styled(Paper)(({theme}) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            ...theme.typography.body2, padding: theme.spacing(1),
            textAlign: 'center', color: theme.palette.text.secondary,
        }));


        const signInHandleMenu = (event) => {
            this.setState({signInIcon: event.currentTarget});
        };

        const signUpHandleClose = () => {
            this.setState({signInIcon: null});
        };


        return (
            <div>
                <div className={classes.back__floor}>

                    <div className={classes.nav__bar}>
                        <div className={classes.nav__item}>
                            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}
                                   sx={{display: {xs: 'none', md: 'block'}}}>
                                <img className={classes.nav__logo} src={logo} alt=""/>
                            </Stack>
                            <h3 className={classes.nav__head}>Easy Car Rental Pvt(Ltd)</h3>
                        </div>
                        <div className={classes.nav__item}>
                            <Typography sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
                                        height={"40px"} textAlign="center">
                                <img className={classes.nav__logo} src={logo} alt=""/>
                            </Typography>
                            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
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
                            <IconButton size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        color="inherit"
                                        sx={{display: {xs: 'block', md: 'none'},}}>
                                <MenuIcon/>
                            </IconButton>

                            <Menu id="menu-appbar"
                                  anchorEl={this.state.anchorElNav}
                                  anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
                                  keepMounted
                                  transformOrigin={{vertical: 'top', horizontal: 'left',}}
                                  open={Boolean(this.state.anchorElNav)}
                                  onClose={handleCloseNavMenu}
                                  sx={{display: {xs: 'fex', md: 'none'},}}>

                                <Tabs orientation="vertical" value={this.state.tabValue} onChange={navTabChange}
                                      aria-label="menu tabs">
                                    <Tab label="Home" {...a11yProps(0)} />
                                    <Tab label="Vehicles" {...a11yProps(1)} />
                                    <Tab label="Service" {...a11yProps(2)} />
                                    <Tab label="About" {...a11yProps(3)} />

                                </Tabs>
                            </Menu>
                            <div>
                                {this.state.user === null && <SignIn getDriverInfo={this.getDriverData.bind(this)}
                                                                     getUserInfo={this.getUserData.bind(this)}/>}
                                {this.state.user !== null && (
                                    <Chip icon={<AccountCircle/>} label={this.state.user.cusName}
                                          onClick={signInHandleMenu}/>)}
                                <Menu anchorEl={this.state.signInIcon}
                                      id="account-menu"
                                      open={Boolean(this.state.signInIcon)}
                                      onClose={signUpHandleClose}
                                      onClick={signUpHandleClose}
                                      PaperProps={{
                                          elevation: 0,
                                          sx: {
                                              overflow: 'visible',
                                              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5,
                                              '& .MuiAvatar-root': {
                                                  width: 32, height: 32, ml: -0.5, mr: 1,
                                              },
                                              '&:before': {
                                                  content: '""',
                                                  display: 'block', position: 'absolute',
                                                  top: 0, right: 14, width: 10, height: 10,
                                                  bgcolor: 'background.paper', zIndex: 0,
                                                  transform: 'translateY(-50%) rotate(45deg)',
                                              },
                                          },
                                      }}
                                      transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                >
                                    <MenuItem>
                                        <Avatar/> Profile
                                    </MenuItem>
                                    <MenuItem onClick={openUserInfo}>
                                        <CarRentalIcon/> My Bookings
                                    </MenuItem>
                                    <Divider/>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <PersonAdd fontSize="small"/>
                                        </ListItemIcon>
                                        Add another account
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <Settings fontSize="small"/>
                                        </ListItemIcon>
                                        Settings
                                    </MenuItem>
                                    <MenuItem onClick={logout}>
                                        <ListItemIcon>
                                            <Logout fontSize="small"/>
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>

                            </div>

                        </div>
                    </div>


                    <TabPanel value={this.state.tabValue} index={0}>
                        <Grid className={classes.back__img} sx={{height: {xs: '100vh', md: '80vh'}, top: '10%'}}>
                            <div className={classes.topic__text}>
                                <h2 className={classes.maintopic__text}>Best Value Car Hire</h2>
                                <h3 className={classes.subtopic__text}>Book car hire now and get exclusive rates for
                                    your trip!</h3>
                            </div>

                            <div>
                                <Slideshow></Slideshow>
                            </div>
                        </Grid>

                        <Stack className={classes.book__back}>

                            <Stack justifyContent="space-around" alignItems="center"
                                   direction={{xs: 'column', md: 'row'}}
                                   spacing={{xs: 1, sm: 2, md: 4}} padding={2} sx={{top: {xs: '28%', md: '65%'}}}>
                                <Stack sx={{marginTop: '17px'}}>
                                    <FormControl sx={{minWidth: 120}}>
                                        <InputLabel id="lblType">Vehicle Type</InputLabel>
                                        <Select
                                            labelId="lblType"
                                            id="demo-simple-select"
                                            value={this.state.vehicleType}
                                            label="Vehicle Type"
                                            onChange={vehicleChange}
                                        >
                                            <MenuItem value={0}>None</MenuItem>
                                            <MenuItem value={1}>General</MenuItem>
                                            <MenuItem value={2}>Premium</MenuItem>
                                            <MenuItem value={3}>Luxury</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <Stack>
                                    <TextField id="outlined-basic" label="Location" variant="outlined"
                                               errorMessages="Incorrect entry !"
                                               value={this.state.location}
                                               onChange={(e) => {
                                                   this.setState({location: e.target.value})
                                               }}
                                    />
                                </Stack>
                                <Stack>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            sx={{m: 1, minWidth: 220}}
                                            label="Pickup Date"
                                            inputFormat="yyyy/MM/dd"
                                            value={this.state.leavingDate}
                                            onChange={(date) => {
                                                console.log(date.getTime())
                                                this.setState({leavingDate: date})
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Stack>
                                <Stack>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            variant="filled"
                                            label="Return Date"
                                            inputFormat="yyyy/MM/dd"
                                            value={this.state.returnDate}
                                            onChange={(date) => {
                                                console.log(date.toLocaleDateString('en-ZA'))
                                                console.log(date.getTime())
                                                /*let d = date.getTime() - this.state.leavingDate
                                                console.log(d)
                                                console.log(d/(1000*3600*24))*/
                                                this.setState({returnDate: date})
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Stack>
                                <Stack>
                                    <FormControl sx={{minWidth: 120}}>
                                        <InputLabel id="demo-simple-select-filled-label">Self Driver</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select"
                                            value={this.state.driverStatus}
                                            label="Self Driver"
                                            onChange={driverChange}
                                        >
                                            <MenuItem value={0}>Self Driver</MenuItem>
                                            <MenuItem value={1}>With Driver</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <Stack>
                                    <Button className={classes.check__btn}
                                            color="primary"
                                            variant="contained"
                                            onClick={searchResult}>
                                        Check
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>


                        <Grid container direction="column" className={classes.scroll__box}>

                            <Stack className={classes.info_sec}>
                                <Typography style={{
                                    fontFamily: 'Convergence', fontSize: '1.2em',
                                    textAlign: 'center', marginTop: '150px', marginBottom: '10px', color: 'white',
                                }}>
                                    Enjoy the efficient and specialized services of
                                    Easy car rentals private limited; Sri Lanka's
                                    leading rent-a-car company
                                </Typography>

                                <Stack direction={{xs: 'column', sm: 'row'}} spacing={{xs: 1, sm: 2, md: 4}}
                                       justifyContent="center" alignItems="center" mt={2}>
                                    <Stack className={classes.info_sec_div}>
                                        <ElectricCarIcon/>
                                        <h3>Modern Fleet</h3>
                                    </Stack>
                                    <Stack className={classes.info_sec_div}>
                                        <AccountBalanceWalletOutlinedIcon/>
                                        <h3>Special Prices</h3>
                                    </Stack>
                                    <Stack className={classes.info_sec_div}>
                                        <VerifiedUserOutlinedIcon/>
                                        <h3>Full Insurance Plan</h3>
                                    </Stack>
                                </Stack>
                            </Stack>


                            <Stack className={classes.service_box}>
                                <h2 style={{
                                    fontFamily: 'Convergence', fontSize: '1.2em', textAlign: 'center',
                                    marginTop: '80px', marginBottom: '10px'
                                }}>
                                    Our Business Class Vehicles
                                </h2>


                                <Stack direction={{xs: 'column', sm: 'row'}} spacing={{xs: 1, sm: 2, md: 4}}
                                       justifyContent="center" alignItems="center" mt={2}>
                                    <div><SmallVehicleCard name="General" imgSrc={generalCar}/></div>
                                    <div><SmallVehicleCard name="Premium" imgSrc={premiumCar}/></div>
                                    <div><SmallVehicleCard name="Luxury" imgSrc={luxuryCar}/></div>
                                </Stack>

                            </Stack>

                            <Stack id="resultSec">
                                <div className={classes.suggest__result_box}>
                                    <h2 style={{
                                        fontFamily: 'Convergence', fontSize: '1.2em',
                                        textAlign: 'center', marginTop: '30px', marginBottom: '10px'
                                    }}>
                                        Best deals found for Sri Lanka car rentals
                                    </h2>
                                    <div style={{
                                        display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly',
                                        width: '100vw', paddingTop: '25px',
                                    }}>

                                        <div style={{height: '100%'}}>
                                            <div className={classes.suggest__result}>
                                                <Vehicle signInUser={this.state.user}
                                                         setVehicle={this.getVehicle.bind(this)}/>
                                            </div>

                                        </div>
                                        <Stack direction="column" justifyContent="flex-start"
                                               alignItems="stretch"
                                               spacing={1} sx={{
                                            height: '400px',
                                            width: '230px',
                                            border: '1px solid #E0E0E0',
                                            borderRadius: '6px', fontFamily: 'Convergence'
                                        }}>
                                            <h3 align="center">Filters</h3>
                                            <Divider/>
                                            <Stack direction="column"
                                                   justifyContent="flex-start"
                                                   alignItems="center"
                                                   spacing={1}>
                                                <FormGroup>
                                                    <FormLabel id="demo-controlled-radio-buttons-group">
                                                        Driver Status</FormLabel>
                                                    <FormControlLabel control={<Checkbox defaultChecked/>}
                                                                      label="With Driver"/>
                                                    <FormControlLabel disabled control={<Checkbox/>}
                                                                      label="Self Drive"/>
                                                    <Divider/>
                                                </FormGroup>

                                                <FormControl>
                                                    <FormLabel id="demo-controlled-radio-buttons-group">Vehicle
                                                        Type</FormLabel>
                                                    <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group"
                                                                name="controlled-radio-buttons-group"
                                                                value={this.state.vehicleTypeId}
                                                                onChange={radioBtnChange}>
                                                        <FormControlLabel value={0} control={<Radio/>} label="General"/>
                                                        <FormControlLabel value={1} control={<Radio/>} label="Premium"/>
                                                        <FormControlLabel value={2} control={<Radio/>} label="Luxury"/>
                                                    </RadioGroup>
                                                </FormControl>

                                            </Stack>
                                            <Skeleton animation="wave"/>

                                        </Stack>
                                    </div>
                                </div>
                            </Stack>

                            <ContactInfo/>
                        </Grid>
                    </TabPanel>

                    <TabPanel value={this.state.tabValue} index={1}>
                        <Stack direction="row"
                               justifyContent="center"
                               alignItems="stretch"
                               spacing={2} sx={{width: '100vw', marginTop: '7%'}}>
                            <Stack direction="column"
                                   justifyContent="flex-start"
                                   alignItems="stretch"
                                   spacing={2}>
                                <Vehicle signInUser={this.state.user}/>
                            </Stack>
                            <Stack direction="column" justifyContent="flex-start"
                                   alignItems="stretch"
                                   spacing={1} sx={{
                                height: '400px',
                                width: '230px',
                                border: '1px solid #E0E0E0',
                                borderRadius: '6px', fontFamily: 'Convergence'
                            }}>
                                <h3 align="center">Filters</h3>
                                <Divider/>
                                <Stack direction="column"
                                       justifyContent="flex-start"
                                       alignItems="center"
                                       spacing={1}>
                                    <FormGroup>
                                        <FormLabel id="demo-controlled-radio-buttons-group">
                                            Driver Status</FormLabel>
                                        <FormControlLabel control={<Checkbox defaultChecked/>} label="With Driver"/>
                                        <FormControlLabel disabled control={<Checkbox/>} label="Self Drive"/>
                                        <Divider/>
                                    </FormGroup>

                                    <FormControl>
                                        <FormLabel id="demo-controlled-radio-buttons-group">Vehicle Type</FormLabel>
                                        <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name="controlled-radio-buttons-group"
                                                    value={this.state.vehicleTypeId}
                                                    onChange={radioBtnChange}>
                                            <FormControlLabel value={0} control={<Radio/>} label="General"/>
                                            <FormControlLabel value={1} control={<Radio/>} label="Premium"/>
                                            <FormControlLabel value={2} control={<Radio/>} label="Luxury"/>
                                        </RadioGroup>
                                    </FormControl>

                                </Stack>
                                <Skeleton animation="wave"/>

                            </Stack>
                        </Stack>
                        <ContactInfo/>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={2}>
                        <ContactInfo/>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={3}>
                        <ContactInfo/>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={4}>
                        <BookingPage data={this.state.bookingData}/>
                        <ContactInfo/>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={5}>
                        <DriverView driver={this.state.driver}/>
                        <ContactInfo/>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={6}>
                        <CustomerView customer={this.state.user}/>
                        <ContactInfo/>
                    </TabPanel>

                    {/*<SpeedDialBtn/>*/}

                </div>
            </div>
        )
    }
}

export default withStyles(styleSheet)(HomePage);


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div role="tabpanel" hidden={value !== index}
             id={`simple-tabpanel-${index}`}
             aria-labelledby={`simple-tab-${index}`}{...other}>
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
