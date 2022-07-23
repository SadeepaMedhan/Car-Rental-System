import * as React from "react";
import {Component} from "react";

import {styleSheet} from "./style";
import {withStyles} from "@mui/styles";
import {Stack} from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import AddVehicle from "../../components/AddVehicle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

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
            bookingTabValue:0,
            stepperValue:0,

        }
    }

    render() {
        let {classes} = this.props;


        const goOne = (e) => {
            this.setState({stepperValue: 1});
        }
        const goTwo = (e) => {
            this.setState({stepperValue: 2});
        }

        return (
            <div>

                <Stack direction="column"
                       justifyContent="center"
                       alignItems="center"
                       spacing={2} sx={{width:'95vw',marginTop:'70px', padding:'10px', zIndex:4}}>
                    <Stack  justifyContent="center" spacing={2} sx={{height:'100px',width:'100%',}}>
                        <Stepper activeStep={this.state.stepperValue} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                    </Stack>
                    <Stack  direction="row"
                            justifyContent="center"
                            alignItems="stretch"
                            spacing={2} sx={{width:'100%',}}>
                        <TabPanel value={this.state.bookingTabValue} index={0}>
                            <Stack  direction="column" justifyContent="flex-start"
                                    alignItems="stretch"
                                    spacing={2}  sx={{padding:'15px', height:'400px',width:'100%', border:'1px solid gray',borderRadius:'6px'}}>
                                <h2 style={{marginLeft:'20px'}}>More Car Details</h2>
                                <Divider />
                                <Skeleton variant="rectangular" width={600} height={250} />
                                <Skeleton variant="rectangular" width={600} height={250} />
                                <Divider />
                                <Stack direction="row"
                                       justifyContent="center"
                                       alignItems="center"
                                       spacing={4}>
                                    <Button color="primary" variant="contained" style={{fontWeight:'bold', width:'95px',borderRadius:15 }}>Back</Button>
                                    <Button onClick={goOne} color="primary" variant="contained" style={{fontWeight:'bold', width:'95px',borderRadius:15 }}>Next</Button>
                                </Stack>
                            </Stack>
                        </TabPanel>
                        <TabPanel value={this.state.bookingTabValue} index={1}>
                            <Stack  direction="column" justifyContent="flex-start"
                                    alignItems="stretch"
                                    spacing={2}  sx={{padding:'15px', height:'400px',width:'100%', border:'1px solid gray',borderRadius:'6px'}}>
                                <h2 style={{marginLeft:'20px'}}>Your Details</h2>
                                <Divider />
                                <Skeleton variant="rectangular" width={600} height={250} />
                                <Skeleton variant="rectangular" width={600} height={250} />
                                <Divider />
                                <Stack direction="row"
                                       justifyContent="center"
                                       alignItems="center"
                                       spacing={4}>
                                    <Button color="primary" variant="contained" style={{fontWeight:'bold', width:'95px',borderRadius:15 }}>Back</Button>
                                    <Button color="primary" variant="contained" style={{fontWeight:'bold', width:'95px',borderRadius:15 }}>Next</Button>
                                </Stack>
                            </Stack>
                        </TabPanel>
                        <TabPanel value={this.state.bookingTabValue} index={2}>
                            <Stack  direction="column" justifyContent="flex-start"
                                    alignItems="stretch"
                                    spacing={2}  sx={{padding:'15px', height:'400px',width:'100%', border:'1px solid gray',borderRadius:'6px'}}>
                                <h2 style={{marginLeft:'20px'}}>Request to Booking</h2>
                                <Divider />
                                <Skeleton variant="rectangular" width={600} height={250} />
                                <Skeleton variant="rectangular" width={600} height={250} />
                                <Divider />
                                <Stack direction="row"
                                       justifyContent="center"
                                       alignItems="center"
                                       spacing={4}>
                                    <Button color="primary" variant="contained" style={{fontWeight:'bold', width:'95px',borderRadius:15 }}>Cancel</Button>
                                    <Button color="primary" variant="contained" style={{fontWeight:'bold', width:'95px',borderRadius:15 }}>Request</Button>
                                </Stack>
                            </Stack>
                        </TabPanel>
                        <Stack  direction="column" justifyContent="flex-start"
                               alignItems="stretch"
                               spacing={2} sx={{height:'400px',width:'30%', border:'1px solid gray',borderRadius:'6px', marginTop:'25px' }}>
                            <h2 align="center">Summary</h2>
                            <Divider />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />

                        </Stack>
                    </Stack>
                </Stack>

            </div>
        )
    }
}

export default withStyles(styleSheet)(BookingPage);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
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
