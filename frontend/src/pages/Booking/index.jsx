import * as React from "react";
import {Component} from "react";

import {styleSheet} from "./style";
import {withStyles} from "@mui/styles";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Vehicle from "../Vehicle";
import IconButton from "@mui/material/IconButton";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import NoiseControlOffIcon from "@mui/icons-material/NoiseControlOff";
import swal from "sweetalert";
import CardMedia from "@mui/material/CardMedia";
import pay1 from "../../assets/images/payP.png";
import pay2 from "../../assets/images/payM.png";
import pay3 from "../../assets/images/payV.png";
import pay4 from "../../assets/images/payA.png";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import vehicleImg1 from "../../assets/images/vehicles/Suzuki-Alto-R (1).png";
import vehicleImg2 from "../../assets/images/vehicles/Suzuki-Alto-R (2).png";
import vehicleImg3 from "../../assets/images/vehicles/Suzuki-Alto-R (3).PNG";
import vehicleImg4 from "../../assets/images/vehicles/Suzuki-Alto-R (4).PNG";
import BookingService from "../../service/BookingService";
import DriverService from "../../service/DriverService";

const steps = [
    'Search Results',
    'Options',
    'Details',
    'Confirmation',
];

class BookingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingTabValue: 0,
            stepperValue: 0,
            vehicleTypeId: 0,
            searchData: props.data,
            selectVehicle: '',
            alertState: false,
            sortValue: 'Recommended',
            bookingId: '',
            payCardNo: '',
            payDate: '',
            payName: '',
            payCode: '',
            driver:null,
            duration:1,
            lossDamageFee: 10000,
            rentalCost:0,
            leavingDate:props.data.returnDate.toLocaleDateString('en-ZA'),
            returnDate:props.data.returnDate.toLocaleDateString('en-ZA'),
        }
    }

    componentDidMount() {
        this.getAvailableDriver()
    }

    getAvailableDriver = async () => {
        if(this.state.searchData.driverState === 1){
            let resp = await DriverService.fetchDrivers();
            resp.data.data.map((dr)=>{
                console.log(dr.name+", "+dr.status)

                if (dr.status === 'Available'){
                    this.checkSchedule(dr)
                    //this.setState({driver:dr})
                }
            })

        }
    }
    checkSchedule = async (dr) => {
        let params = {id: dr.driverID}
        let schedule = await DriverService.getSchedule(params);
        schedule.data.data.map((book)=>{
            if (book.leavingDate !== this.state.searchData.leavingDate){
                //console.log(dr)
                this.setState({driver:dr})
            }
        })
    }

    getVehicle = (data) => {
        console.log("get booking " + data)
        this.setState({alertState: true})
        this.setState({selectVehicle: data})
        let d = this.state.searchData.returnDate.getTime()-this.state.searchData.leavingDate.getTime();
        this.setState({duration:d/(1000*3600*24)})
        this.setState({rentalCost:(d/(1000*3600*24) * data.dailyRate)})
        this.setState({stepperValue: 1});
        this.setState({bookingTabValue: 1});
    }

    saveVehicle = async () => {

        let formData = {
            bookingId: "b",
            leavingDate: this.state.searchData.leavingDate,
            returnDate: this.state.searchData.returnDate,
            location: this.state.searchData.location,
            payment: "10000",
            lossDamageFee: this.state.lossDamageFee,
            rentalFee: this.state.rentalCost,
            status: "Pending",
            customer: this.state.searchData.customer,
            vehicle: this.state.selectVehicle,
            driver: this.state.driver
        }
        let response = await BookingService.createBooking(formData);
        console.log("res " + response)
        if (response.status === 201) {
            swal("Payment successful!", "Your Booking is pending", "success").then((value) => {
                window.location.assign('/');
            });
            //this.clearData()
        } else {
            swal("Unsuccessful!", response.data, "error")
            console.log(response.data)
        }
    };

    render() {
        let {classes} = this.props;


        const goResults = (e) => {
            this.setState({stepperValue: 0});
            this.setState({bookingTabValue: 0});
        }
        const goOptions = (e) => {

            this.setState({stepperValue: 1});
            this.setState({bookingTabValue: 1});
        }
        const goDetails = (e) => {
            if (this.user !== null) {
                this.setState({stepperValue: 2});
                this.setState({bookingTabValue: 2});
            } else {
                swal("Sign In Unsuccessful!", "Please Sign In", "error")
            }

        }
        const goConfirmation = (e) => {
            this.setState({stepperValue: 3});
            this.setState({bookingTabValue: 3});
        }

        const radioBtnChange = (event) => {
            changeLossDamageFee(event.target.value)
            this.setState({vehicleTypeId: event.target.value});

        };

        const changeLossDamageFee = (key) => {
            console.log(key)
            if (key === 0) {
                this.setState({lossDamageFee: 10000})
                console.log(this.state.lossDamageFee)
            } else if (key === 1) {
                this.setState({lossDamageFee: 15000})
                console.log(this.state.lossDamageFee)
            } else if (key === 2) {
                this.setState({lossDamageFee: 20000})
                console.log(this.state.lossDamageFee)
            } else {
            }
        };

        const sortChange = (event, newAlignment) => {
            this.setState({sortValue: newAlignment})
        };

        const confirmPayment = () => {
            this.saveVehicle()
        };

        return (
            <div>

                <Stack direction="column"
                       justifyContent="center"
                       alignItems="center"
                       spacing={2} sx={{width: '95vw', marginTop: '70px', padding: '10px', zIndex: 4}}>
                    <Stack justifyContent="center" spacing={2} sx={{height: '100px', width: '100%',}}>
                        <Stepper activeStep={this.state.stepperValue} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Stack>

                    <Stack direction="row"
                           justifyContent="center"
                           alignItems="stretch"
                           spacing={2} sx={{width: '100%',}}>
                        <TabPanel value={this.state.bookingTabValue} index={0} sx={{width: '100vw',}}>
                            <Stack direction="row" justifyContent="flex-start"
                                   alignItems="stretch"
                                   spacing={2} sx={{width: '88vw',}}>
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
                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="stretch"
                                       spacing={2} sx={{
                                    padding: '15px',
                                    height: '100%',
                                    width: '100%',
                                    border: '1px solid #E0E0E0',
                                    borderRadius: '6px'
                                }}>
                                    <Stack direction="row"
                                           justifyContent="space-between"
                                           alignItems="center">
                                        <h2 style={{marginLeft: '20px', fontFamily: 'Convergence'}}>Search Results</h2>
                                        <ToggleButtonGroup
                                            color="primary"
                                            value={this.state.sortValue}
                                            exclusive
                                            onChange={sortChange}
                                        >
                                            <ToggleButton value="Recommended">Recommended</ToggleButton>
                                            <ToggleButton value="Price">Price(low to high)</ToggleButton>
                                            <ToggleButton value="Rating">Rating</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Stack>
                                    <Divider/>
                                    <Vehicle signInUser={this.state.searchData.customer}
                                             setVehicle={this.getVehicle.bind(this)}/>
                                    <Divider/>
                                    <Stack direction="row"
                                           justifyContent="center"
                                           alignItems="center"
                                           spacing={4}>
                                        <Button href="/home" color="primary" variant="contained" style={{
                                            fontWeight: 'bold',
                                            width: '95px',
                                            borderRadius: 15
                                        }}>Back</Button>
                                    </Stack>
                                </Stack>

                            </Stack>

                        </TabPanel>
                        <TabPanel value={this.state.bookingTabValue} index={1}>
                            <Stack direction="row" justifyContent="flex-start"
                                   alignItems="stretch"
                                   spacing={2} sx={{width: '88vw',}}>

                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="stretch"
                                       spacing={2} sx={{
                                    height: '400px',
                                    width: '400px',
                                    border: '1px solid #E0E0E0',
                                    borderRadius: '6px',
                                    padding: '6px', fontFamily: 'Convergence'
                                }}>
                                    <h3 align="center" style={{fontFamily: 'Convergence'}}>Booking Details</h3>
                                    <Divider/>
                                    <h4>Time and Place</h4>
                                    <Stack direction="row"
                                           justifyContent="space-between"
                                           alignItems="flex-start"
                                           spacing={1}>
                                        <p>Pickup :</p>
                                        <Stack>
                                            <p>{this.state.leavingDate}</p>
                                            <p>{this.state.searchData.location}</p>
                                        </Stack>
                                    </Stack>
                                    <Stack direction="row"
                                           justifyContent="space-between"
                                           alignItems="flex-start"
                                           spacing={1}>
                                        <p>Return :</p>
                                        <Stack>
                                            <p>{this.state.returnDate}</p>
                                            <p>{this.state.searchData.location}</p>
                                        </Stack>
                                    </Stack>
                                    <Stack direction="row"
                                           justifyContent="flex-start"
                                           alignItems="flex-start"
                                           spacing={1}>
                                        <p>Rental Duration :</p>
                                        <Stack>
                                            <p>{this.state.duration} day</p>
                                        </Stack>
                                    </Stack>
                                    <Divider/>

                                    <Stack direction="row"
                                           justifyContent="flex-start"
                                           alignItems="flex-start"
                                           spacing={1}>
                                        <p>Fuel policy :</p>
                                        <Stack>
                                            <p>Full to full</p>
                                        </Stack>
                                    </Stack>
                                    <Divider/>

                                    <Stack direction="row"
                                           justifyContent="flex-start"
                                           alignItems="flex-start"
                                           spacing={1}>
                                        <p>Rental cost :</p>
                                        <p>{this.state.rentalCost}</p>
                                    </Stack>
                                </Stack>
                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="stretch"
                                       spacing={2} sx={{
                                    padding: '15px',
                                    height: '400px',
                                    width: '100%',
                                    border: '1px solid #E0E0E0',
                                    borderRadius: '6px'
                                }}> <Stack direction="row"
                                           justifyContent="space-between"
                                           alignItems="center">
                                    <h2 style={{marginLeft: '20px', fontFamily: 'Convergence'}}>More Car Details</h2>
                                    <h3 style={{fontFamily: 'Convergence'}}>{this.state.selectVehicle.brand}</h3>
                                </Stack>
                                    <Divider/>

                                    <Stack direction="row"
                                           justifyContent="flex-start"
                                           alignItems="flex-start"
                                           spacing={2}>
                                        <Stack direction="column" justifyContent="center" alignItems="flex-start"
                                               spacing={1}>
                                            <IconButton>
                                                <PersonOutlineOutlinedIcon/>
                                                <pre className={classes.card_prop_id}> : </pre>
                                                <span
                                                    className={classes.card_prop_value}>{this.state.selectVehicle.noOfPassenger}</span>
                                            </IconButton>
                                            <IconButton>
                                                <LocalGasStationIcon/>
                                                <pre className={classes.card_prop_id}> : </pre>
                                                <span
                                                    className={classes.card_prop_value}>{this.state.selectVehicle.fuelType}</span>
                                            </IconButton>
                                            <IconButton>
                                                <SettingsSuggestIcon/>
                                                <pre className={classes.card_prop_id}> : </pre>
                                                <span
                                                    className={classes.card_prop_value}>{this.state.selectVehicle.transmissionType}</span>
                                            </IconButton>
                                            <IconButton>
                                                <AcUnitIcon/>
                                                <pre className={classes.card_prop_id}> : </pre>
                                                <span className={classes.card_prop_value}>Yes</span>
                                            </IconButton>
                                        </Stack>


                                        <Stack direction="column" justifyContent="center" alignItems="flex-start"
                                               spacing={1}>
                                            <IconButton>
                                                <NoiseControlOffIcon/>
                                                <pre className={classes.card_prop_id}> Daily Rate : </pre>
                                                <span
                                                    className={classes.card_prop_value}>{this.state.selectVehicle.dailyRate}</span>
                                            </IconButton>
                                            <IconButton>
                                                <NoiseControlOffIcon/>
                                                <pre className={classes.card_prop_id}> Free KM for a Day : </pre>
                                                <span
                                                    className={classes.card_prop_value}>{this.state.selectVehicle.freeMileageDay}</span>
                                            </IconButton>
                                            <IconButton>
                                                <NoiseControlOffIcon/>
                                                <pre className={classes.card_prop_id}> Monthly Rate : </pre>
                                                <span
                                                    className={classes.card_prop_value}>{this.state.selectVehicle.monthlyRate}</span>
                                            </IconButton>
                                            <IconButton>
                                                <NoiseControlOffIcon/>
                                                <pre className={classes.card_prop_id}> Free KM for a Month : </pre>
                                                <span
                                                    className={classes.card_prop_value}>{this.state.selectVehicle.freeMileageMonth}</span>
                                            </IconButton>
                                            <IconButton>
                                                <NoiseControlOffIcon/>
                                                <pre className={classes.card_prop_id}> Price per Extra KM : </pre>
                                                <span
                                                    className={classes.card_prop_value}>{this.state.selectVehicle.priceExtraKM}</span>
                                            </IconButton>
                                        </Stack>

                                        <Stack direction="column"
                                               justifyContent="center"
                                               alignItems="center"
                                               spacing={1}>
                                            <img style={{
                                                width: '220px',
                                                height: '100px',
                                            }} src={vehicleImg1} alt=""/>
                                            <img style={{
                                                width: '220px',
                                                height: '100px',
                                            }} src={vehicleImg2} alt=""/>
                                        </Stack>
                                        <Stack direction="column"
                                               justifyContent="center"
                                               alignItems="center"
                                               spacing={1}>
                                            <img style={{
                                                width: '220px',
                                                height: '100px',
                                            }} src={vehicleImg3} alt=""/>
                                            <img style={{
                                                width: '220px',
                                                height: '100px',
                                            }} src={vehicleImg4} alt=""/>

                                        </Stack>
                                    </Stack>

                                    <Divider/>
                                    <Stack direction="row"
                                           justifyContent="center"
                                           alignItems="center"
                                           spacing={4}>
                                        <Button onClick={goResults} color="primary" variant="contained" style={{
                                            fontWeight: 'bold',
                                            width: '95px',
                                            borderRadius: 15
                                        }}>Back</Button>
                                        <Button onClick={goDetails} color="primary" variant="contained" style={{
                                            fontWeight: 'bold',
                                            width: '95px',
                                            borderRadius: 15
                                        }}>Next</Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </TabPanel>
                        <TabPanel value={this.state.bookingTabValue} index={2}>
                            <Stack direction="row" justifyContent="flex-start"
                                   alignItems="stretch"
                                   spacing={2} sx={{width: '88vw',}}>
                                {this.state.user !== null &&
                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="stretch"
                                       spacing={2} sx={{
                                    height: '400px',
                                    width: '400px',
                                    border: '1px solid #E0E0E0',
                                    borderRadius: '6px',
                                    padding: '6px', fontFamily: 'Convergence'
                                }}>
                                    <Stack direction="row"
                                           justifyContent="space-between"
                                           alignItems="center">
                                        <h3 style={{marginLeft: '20px', fontFamily: 'Convergence'}}>Your Details</h3>
                                        <Button>Edit</Button>
                                    </Stack>
                                    <Divider/>
                                    <Stack direction="column" justifyContent="center" alignItems="flex-start"
                                           spacing={1}>
                                        <IconButton>
                                            <NoiseControlOffIcon/>
                                            <pre className={classes.card_prop_id}> Full Name : </pre>
                                            <span
                                                className={classes.card_prop_value}>{this.state.searchData.customer.cusName}</span>
                                        </IconButton>
                                        <IconButton>
                                            <NoiseControlOffIcon/>
                                            <pre className={classes.card_prop_id}> Address : </pre>
                                            <span
                                                className={classes.card_prop_value}>{this.state.searchData.customer.cusAddress}</span>
                                        </IconButton>
                                        <IconButton>
                                            <NoiseControlOffIcon/>
                                            <pre className={classes.card_prop_id}> Contact : </pre>
                                            <span
                                                className={classes.card_prop_value}>{this.state.searchData.customer.cusContactNo}</span>
                                        </IconButton>
                                        <IconButton>
                                            <NoiseControlOffIcon/>
                                            <pre className={classes.card_prop_id}> NIC : </pre>
                                            <span
                                                className={classes.card_prop_value}>{this.state.searchData.customer.cusNIC}</span>
                                        </IconButton>
                                        <IconButton>
                                            <NoiseControlOffIcon/>
                                            <pre className={classes.card_prop_id}> E-mail : </pre>
                                            <span
                                                className={classes.card_prop_value}>{this.state.searchData.customer.cusEmail}</span>
                                        </IconButton>
                                    </Stack>
                                </Stack>
                                }
                                {this.state.user === null && swal("Sign In Unsuccessful!", "Please Sign In", "error")}
                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="stretch"
                                       spacing={2} sx={{
                                    padding: '15px',
                                    height: '400px',
                                    width: '100%',
                                    border: '1px solid #E0E0E0',
                                    borderRadius: '6px'
                                }}>
                                    <Stack direction="row"
                                           justifyContent="space-between"
                                           alignItems="center">
                                        <h2 style={{marginLeft: '20px', fontFamily: 'Convergence'}}>Booking Details</h2>
                                        <Button>Edit</Button>
                                    </Stack>

                                    <Divider/>
                                    <Stack direction="row"
                                           justifyContent="flex-start"
                                           alignItems="flex-start"
                                           spacing={2}>
                                        <Stack direction="column" justifyContent="center" alignItems="flex-start"
                                               spacing={1}>
                                            <IconButton>
                                                <NoiseControlOffIcon/>
                                                <pre className={classes.card_prop_id}> Brand : </pre>
                                                <span
                                                    className={classes.card_prop_value}>{this.state.selectVehicle.brand}</span>
                                            </IconButton>
                                            <IconButton>
                                                <NoiseControlOffIcon/>
                                                <pre className={classes.card_prop_id}> Type : </pre>
                                                <span
                                                    className={classes.card_prop_value}>{this.state.selectVehicle.type}</span>
                                            </IconButton>
                                            <IconButton>
                                                <NoiseControlOffIcon/>
                                                <pre className={classes.card_prop_id}> Driver : </pre>
                                                <span
                                                    className={classes.card_prop_value}>
                                                    {this.state.driver === null ? "Self drive" : this.state.driver.name}
                                                </span>
                                            </IconButton>
                                            <Stack direction="row"
                                                   justifyContent="flex-start"
                                                   alignItems="flex-start"
                                                   spacing={1}>
                                                <IconButton>
                                                    <PersonOutlineOutlinedIcon/>
                                                    <pre className={classes.card_prop_id}> : </pre>
                                                    <span
                                                        className={classes.card_prop_value}>{this.state.selectVehicle.noOfPassenger}</span>
                                                </IconButton>
                                                <IconButton>
                                                    <LocalGasStationIcon/>
                                                    <pre className={classes.card_prop_id}> : </pre>
                                                    <span
                                                        className={classes.card_prop_value}>{this.state.selectVehicle.fuelType}</span>
                                                </IconButton>
                                            </Stack>
                                            <Stack direction="row"
                                                   justifyContent="flex-start"
                                                   alignItems="flex-start"
                                                   spacing={1}>
                                                <IconButton>
                                                    <SettingsSuggestIcon/>
                                                    <pre className={classes.card_prop_id}> : </pre>
                                                    <span
                                                        className={classes.card_prop_value}>{this.state.selectVehicle.transmissionType}</span>
                                                </IconButton>
                                                <IconButton>
                                                    <AcUnitIcon/>
                                                    <pre className={classes.card_prop_id}> : </pre>
                                                    <span className={classes.card_prop_value}>Yes</span>
                                                </IconButton>
                                            </Stack>
                                        </Stack>
                                        <Stack direction="column" justifyContent="center" alignItems="flex-start"
                                               spacing={1}>
                                            <IconButton>
                                                <NoiseControlOffIcon/>
                                                <pre className={classes.card_prop_id}> Pickup Date : </pre>
                                                <span
                                                    className={classes.card_prop_value}>{this.state.leavingDate}</span>
                                            </IconButton>
                                            <IconButton>
                                                <NoiseControlOffIcon/>
                                                <pre className={classes.card_prop_id}> Return Date : </pre>
                                                <span
                                                    className={classes.card_prop_value}>{this.state.returnDate}</span>
                                            </IconButton>
                                            <IconButton>
                                                <NoiseControlOffIcon/>
                                                <pre className={classes.card_prop_id}> Rental Duration : </pre>
                                                <span
                                                    className={classes.card_prop_value}>{this.state.duration} day</span>
                                            </IconButton>
                                            <IconButton>
                                                <NoiseControlOffIcon/>
                                                <pre className={classes.card_prop_id}> Rental cost : </pre>
                                                <span
                                                    className={classes.card_prop_value}>{this.state.rentalCost}</span>
                                            </IconButton>
                                        </Stack>
                                        <Stack sx={{height: '100%'}} direction="column" justifyContent="space-around"
                                               alignItems="flex-start"
                                               spacing={4}>
                                            <Stack direction="column" justifyContent="center" alignItems="flex-start"
                                                   spacing={1}>
                                                <IconButton>
                                                    <NoiseControlOffIcon/>
                                                    <pre className={classes.card_prop_id}> Loss Damage Waiver  : </pre>
                                                    <span
                                                        className={classes.card_prop_value}>{this.state.lossDamageFee}.00</span>
                                                </IconButton>
                                                <IconButton>
                                                    <NoiseControlOffIcon/>
                                                    <pre className={classes.card_prop_id}> Extra Price   : </pre>
                                                    <span
                                                        className={classes.card_prop_value}>
                                                        {this.state.driver === null ? 0.00 : 1000.00}
                                                    </span>
                                                </IconButton>
                                            </Stack>
                                            <Stack sx={{paddingLeft: '10px'}} spacing={4} direction="row">
                                                <h3 style={{fontFamily: 'Convergence'}}>Total Price</h3>
                                                <h3 style={{fontFamily: 'Convergence'}}>LKR.{this.state.lossDamageFee}.00</h3>
                                            </Stack>

                                        </Stack>
                                    </Stack>
                                    <Divider/>
                                    <Stack direction="row"
                                           justifyContent="center"
                                           alignItems="center"
                                           spacing={4}>
                                        <Button onClick={goOptions} color="primary" variant="contained" style={{
                                            fontWeight: 'bold',
                                            width: '95px',
                                            borderRadius: 15
                                        }}>Back</Button>
                                        <Button onClick={goConfirmation} color="primary" variant="contained" style={{
                                            fontWeight: 'bold',
                                            width: '95px',
                                            borderRadius: 15
                                        }}>Next</Button>
                                    </Stack>
                                </Stack>


                            </Stack>
                        </TabPanel>
                        <TabPanel value={this.state.bookingTabValue} index={3}>
                            <Stack direction="row" justifyContent="flex-start"
                                   alignItems="stretch"
                                   spacing={2} sx={{width: '80vw',}}>
                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="stretch"
                                       spacing={2} sx={{
                                    padding: '15px',
                                    height: '400px',
                                    width: '100%',
                                    border: '1px solid #E0E0E0',
                                    borderRadius: '6px'
                                }}>
                                    <h2 style={{marginLeft: '20px', fontFamily: 'Convergence'}}>Payment</h2>
                                    <Divider/>
                                    <ValidatorForm onSubmit={confirmPayment} onError={errors => console.log(errors)}>
                                        <Stack direction="column" justifyContent="center" alignItems="flex-start"
                                               spacing={1}>
                                            <Stack direction="row" justifyContent="center" spacing={2}
                                                   sx={{alignSelf: 'center'}}>
                                                <Stack>
                                                    <CardMedia component="img" height="60px" image={pay1} alt="paypal"/>
                                                </Stack>
                                                <Stack>
                                                    <CardMedia component="img" height="60px" image={pay2} alt="master"/>
                                                </Stack>
                                                <Stack>
                                                    <CardMedia component="img" height="60px" image={pay3} alt="visa"/>
                                                </Stack>
                                                <Stack>
                                                    <CardMedia component="img" height="60px" image={pay4} alt="am"/>
                                                </Stack>
                                            </Stack>


                                            <Stack width="100%" direction="column" justifyContent="center"
                                                   alignItems="center" spacing={2}>
                                                <Divider/>

                                                <Stack direction="row" justifyContent="center" alignItems="stretch"
                                                       spacing={2}>
                                                    <TextValidator label="Card Number" variant="outlined"
                                                                   helperText="" size="small"
                                                                   color="primary"
                                                                   errorMessages="Incorrect entry !"
                                                                   validators={['required',]}
                                                                   value={this.state.payCardNo}
                                                                   onChange={(e) => {
                                                                       this.setState({payCardNo: e.target.value})
                                                                   }}
                                                    />
                                                    <TextValidator label="Name on Card" variant="outlined" helperText=""
                                                                   size="small"
                                                                   color="primary"
                                                                   errorMessages="Incorrect entry !"
                                                                   validators={['required',]}
                                                                   value={this.state.payName}
                                                                   onChange={(e) => {
                                                                       this.setState({payName: e.target.value})
                                                                   }}
                                                    />
                                                </Stack>
                                                <Stack direction="row" justifyContent="center" alignItems="stretch"
                                                       spacing={2}>

                                                    <TextValidator label="Expire Date" variant="outlined" helperText=""
                                                                   size="small"
                                                                   color="primary"
                                                                   errorMessages="Incorrect entry !"
                                                                   validators={['required',]}
                                                                   value={this.state.payDate}
                                                                   onChange={(e) => {
                                                                       this.setState({payDate: e.target.value})
                                                                   }}
                                                    />
                                                    <TextValidator label="CVV Code" variant="outlined" helperText=""
                                                                   size="small"
                                                                   color="primary"
                                                                   errorMessages="Incorrect entry !"
                                                                   validators={['required',]}
                                                                   value={this.state.payCode}
                                                                   onChange={(e) => {
                                                                       this.setState({payCode: e.target.value})
                                                                   }}
                                                    />
                                                </Stack>
                                            </Stack>

                                            <Divider width="100%"/>
                                            <Stack direction="row"
                                                   justifyContent="space-between"
                                                   alignItems="center"
                                                   spacing={4}>
                                                <Stack sx={{paddingLeft: '10px'}} spacing={4} direction="row">
                                                    <h3 style={{fontFamily: 'Convergence'}}>Total Price</h3>
                                                    <h3 style={{fontFamily: 'Convergence'}}>LKR.{this.state.lossDamageFee}.00</h3>
                                                </Stack>
                                                <Stack sx={{paddingLeft: '10px'}} spacing={4} direction="row">
                                                    <Button
                                                        Button onClick={goDetails} color="primary" variant="contained"
                                                        style={{
                                                            fontWeight: 'bold',
                                                            width: '95px',
                                                            borderRadius: 15
                                                        }}>
                                                        Cancel
                                                    </Button>
                                                    <Button type="submit" color="primary" variant="contained"
                                                            style={{fontWeight: 'bold', width: '200px', borderRadius: 15}}>
                                                        Request to
                                                        Booking</Button>
                                                </Stack>
                                            </Stack>
                                        </Stack>

                                    </ValidatorForm>
                                </Stack>
                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="stretch"
                                       spacing={2} sx={{
                                    height: '400px',
                                    width: '300px',
                                    border: '1px solid #E0E0E0',
                                    borderRadius: '6px',
                                    marginTop: '25px'
                                }}><h3 align="center" style={{fontFamily: 'Convergence'}}>Booking Details</h3>
                                    <Divider/>

                                    <Stack direction="column" justifyContent="center" alignItems="flex-start"
                                           spacing={1}>
                                        <IconButton>
                                            <NoiseControlOffIcon/>
                                            <pre className={classes.card_prop_id}> Full Name : </pre>
                                            <span
                                                className={classes.card_prop_value}>{this.state.searchData.customer.cusName}</span>
                                        </IconButton>
                                        <IconButton>
                                            <NoiseControlOffIcon/>
                                            <pre className={classes.card_prop_id}> Brand : </pre>
                                            <span
                                                className={classes.card_prop_value}>{this.state.selectVehicle.brand}</span>
                                        </IconButton>
                                        <IconButton>
                                            <NoiseControlOffIcon/>
                                            <pre className={classes.card_prop_id}> Pickup Date : </pre>
                                            <span
                                                className={classes.card_prop_value}>{this.state.leavingDate}</span>
                                        </IconButton>
                                        <IconButton>
                                            <NoiseControlOffIcon/>
                                            <pre className={classes.card_prop_id}> Return Date : </pre>
                                            <span
                                                className={classes.card_prop_value}>{this.state.returnDate}</span>
                                        </IconButton>
                                        <IconButton>
                                            <NoiseControlOffIcon/>
                                            <pre className={classes.card_prop_id}> Rental Duration : </pre>
                                            <span
                                                className={classes.card_prop_value}>{this.state.duration} day</span>
                                        </IconButton>
                                        <IconButton>
                                            <NoiseControlOffIcon/>
                                            <pre className={classes.card_prop_id}> Rental cost : </pre>
                                            <span
                                                className={classes.card_prop_value}>{this.state.rentalCost}</span>
                                        </IconButton>
                                    </Stack>

                                </Stack>
                            </Stack>
                        </TabPanel>
                    </Stack>
                </Stack>
            </div>
        )
    }
}

export default withStyles(styleSheet)(BookingPage);

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
