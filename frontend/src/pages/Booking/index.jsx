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
import AlertSnackBar from "../../components/Alert";
import swal from "sweetalert";
import CardMedia from "@mui/material/CardMedia";
import pay1 from "../../assets/images/payP.png";
import pay2 from "../../assets/images/payM.png";
import pay3 from "../../assets/images/payV.png";
import pay4 from "../../assets/images/payA.png";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import vehicleImg1 from "../../assets/images/vehicles/v1f.jpg";
import vehicleImg2 from "../../assets/images/vehicles/v2f.jpg";

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
        }
    }

    getVehicle = (data) => {
        console.log("get booking " + data)
        this.setState({alertState: true})
        this.setState({selectVehicle: data})
        this.setState({stepperValue: 1});
        this.setState({bookingTabValue: 1});
    }


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
            this.setState({vehicleTypeId: event.target.value});
        };

        const sortChange = (event, newAlignment) => {
            this.setState({sortValue: newAlignment})
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
                                    borderRadius: '6px'
                                }}>
                                    <h3 align="center">Filters</h3>
                                    <Divider/>
                                    <Stack direction="column"
                                           justifyContent="flex-start"
                                           alignItems="center"
                                           spacing={1}>
                                        <FormGroup>
                                            <FormLabel id="demo-controlled-radio-buttons-group">Driver
                                                Status</FormLabel>
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
                                   spacing={2} sx={{width: '80vw',}}>

                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="stretch"
                                       spacing={2} sx={{
                                    height: '400px',
                                    width: '400px',
                                    border: '1px solid #E0E0E0',
                                    borderRadius: '6px',
                                }}>
                                    <h2 align="center">Price Summary</h2>
                                    <Divider/>
                                    <h4>Great value</h4>
                                    <p>You got an excellent deal with a leading brand based on 1031 reviews.</p>
                                    <Divider/>
                                    <h4>Efficient fuel</h4>
                                    <p>Get a full tank at pick-up and fill it back up on return.</p>
                                    <Divider/>
                                    <h4>Great value</h4>
                                    <p>You got an excellent deal with a leading brand based on 1031 reviews.</p>
                                    <Divider/>
                                </Stack>
                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="stretch"
                                       spacing={2} sx={{
                                    padding: '15px',
                                    height: '400px',
                                    width: '100%',
                                    border: '1px solid #E0E0E0',
                                    borderRadius: '6px'
                                }}>
                                    <h2 style={{marginLeft: '20px', fontFamily: 'Convergence'}}>More Car Details</h2>
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

                                        <Stack>
                                            <img style={{width:'220px',
                                                height:'100px',}} src={vehicleImg1} alt=""/>
                                            <img style={{width:'220px',
                                                height:'100px',}} src={vehicleImg2} alt=""/>
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
                                   spacing={2} sx={{width: '80vw',}}>
                                {this.state.user !== null &&
                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="stretch"
                                       spacing={2} sx={{
                                    padding: '15px',
                                    height: '400px',
                                    width: '100%',
                                    border: '1px solid #E0E0E0',
                                    borderRadius: '6px'
                                }}>
                                    <h2 style={{marginLeft: '20px', fontFamily: 'Convergence'}}>Your Details</h2>
                                    <Divider/>
                                    <Stack direction="row"
                                           justifyContent="flex-start"
                                           alignItems="flex-start"
                                           spacing={2}>
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
                                                <pre className={classes.card_prop_id}> E-mail : </pre>
                                                <span
                                                    className={classes.card_prop_value}>{this.state.searchData.customer.cusEmail}</span>
                                            </IconButton>

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
                                }
                                {this.state.user === null && swal("Sign In Unsuccessful!", "Please Sign In", "error")}
                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="stretch"
                                       spacing={2} sx={{
                                    height: '400px',
                                    width: '300px',
                                    border: '1px solid #E0E0E0',
                                    borderRadius: '6px',
                                    marginTop: '25px'
                                }}>
                                    <h2 align="center">Summary</h2>
                                    <Divider/>
                                    <Skeleton animation="wave"/>
                                    <Skeleton animation="wave"/>
                                    <Skeleton animation="wave"/>

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


                                        <ValidatorForm onError={errors => console.log(errors)}>
                                            <Stack width="100%" direction="column" justifyContent="center"
                                                   alignItems="center" spacing={2}>
                                                <Divider/>
                                                <TextValidator width="60%" label="Caed Number" variant="outlined"
                                                               helperText="" size="small"
                                                               color="primary"
                                                               errorMessages="Incorrect entry !"
                                                               validators={['required',]}
                                                />

                                                <Stack direction="row" justifyContent="center" alignItems="stretch"
                                                       spacing={2}>
                                                    <TextValidator label="Name on Card" variant="outlined" helperText=""
                                                                   size="small"
                                                                   color="primary"
                                                                   errorMessages="Incorrect entry !"
                                                                   validators={['required',]}
                                                    />
                                                    <TextValidator label="Expire Date" variant="outlined" helperText=""
                                                                   size="small"
                                                                   color="primary"
                                                                   errorMessages="Incorrect entry !"
                                                                   validators={['required',]}
                                                    />
                                                    <TextValidator label="CVV Code" variant="outlined" helperText=""
                                                                   size="small"
                                                                   color="primary"
                                                                   errorMessages="Incorrect entry !"
                                                                   validators={['required',]}
                                                    />
                                                </Stack>
                                                <Stack></Stack>

                                            </Stack>
                                        </ValidatorForm>
                                    </Stack>
                                    <Divider/>
                                    <Stack direction="row"
                                           justifyContent="center"
                                           alignItems="center"
                                           spacing={4}>
                                        <Button onClick={goDetails} color="primary" variant="contained" style={{
                                            fontWeight: 'bold',
                                            width: '95px',
                                            borderRadius: 15
                                        }}>Cancel</Button>
                                        <Button onClick={goConfirmation} color="primary" variant="contained"
                                                style={{fontWeight: 'bold', width: '95px', borderRadius: 15}}>Request to
                                            Booking</Button>
                                    </Stack>
                                </Stack>
                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="stretch"
                                       spacing={2} sx={{
                                    height: '400px',
                                    width: '300px',
                                    border: '1px solid #E0E0E0',
                                    borderRadius: '6px',
                                    marginTop: '25px'
                                }}>
                                    <h2 align="center">Summary</h2>
                                    <Divider/>
                                    <Skeleton animation="wave"/>
                                    <Skeleton animation="wave"/>
                                    <Skeleton animation="wave"/>

                                </Stack>
                            </Stack>
                        </TabPanel>
                    </Stack>
                </Stack>
                <AlertSnackBar open={this.state.alertState} message="message!"/>

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
