import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import PeopleIcon from '@mui/icons-material/People';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EventIcon from '@mui/icons-material/Event';
import backImg2 from "../../assets/images/dashBack3.webp";
import {styleSheet} from "./style";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HandymanIcon from '@mui/icons-material/Handyman';
import BadgeIcon from '@mui/icons-material/Badge';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddVehicle from "../../components/AddVehicle";
import VehicleService from "../../service/VehicleService";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Avatar, InputAdornment, Paper,
    Stack, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    TextField, Tooltip
} from "@mui/material";
import DriverService from "../../service/DriverService";
import DriverManage from "../../components/DriverManage";
import CustomerService from "../../service/CustomerService";
import {ManageAccounts} from "@mui/icons-material";
import CustomerManage from "../../components/CustomerManage";
import swal from 'sweetalert';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {Scheduler, DayView, Appointments} from '@devexpress/dx-react-scheduler';



export default function Dashboard() {
    let classes = styleSheet();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [tittle, setTittle] = React.useState("Dashboard");
    const [selectImg, setSelectImg] = React.useState(null);
    const [vehicleList, setVehicleList] = React.useState([]);
    const [driversList, setDriversList] = React.useState([]);
    const [customersList, setCustomersList] = React.useState([]);
    const [selectVehicle, setSelectVehicle] = React.useState(null);
    const [selectDriver, setSelectDriver] = React.useState(null);
    const [selectCustomer, setSelectCustomer] = React.useState(null);
    const [vehicleFormValue, setVehicleFormValue] = React.useState(0);
    const [driversFormValue, setDriversFormValue] = React.useState(0);
    const [customersFormValue, setCustomersFormValue] = React.useState(0);
    const [date, setDate] = React.useState(() => new Date(2022, 1, 1, 1, 1));

    const now = new Date();

    const [marked] = React.useState([
        { recurring: { repeat: 'yearly', month: 5, day: 1 }, color: '#ffc400' },
        { recurring: { repeat: 'yearly', month: 12, day: 24 }, color: '#ffee00' },
        { recurring: { repeat: 'yearly', month: 12, day: 25 }, color: 'red' },
        { date: new Date(now.getFullYear(), now.getMonth() + 1, 4) },
        { date: new Date(now.getFullYear(), now.getMonth() - 2, 13) },
        { date: new Date(now.getFullYear(), now.getMonth(), 2), color: '#46c4f3' },
        { date: new Date(now.getFullYear(), now.getMonth(), 6), color: '#7e56bd' },
        { date: new Date(now.getFullYear(), now.getMonth(), 11), color: '#7e56bd' },
        { date: new Date(now.getFullYear(), now.getMonth(), 19), color: '#89d7c9' },
        { date: new Date(now.getFullYear(), now.getMonth(), 28), color: '#ea4986' },
        { date: new Date(now.getFullYear(), now.getMonth(), 13), color: '#7e56bd' },
        { date: new Date(now.getFullYear(), now.getMonth(), 13), color: '#f13f77' },
        { date: new Date(now.getFullYear(), now.getMonth(), 13), color: '#89d7c9' },
        { date: new Date(now.getFullYear(), now.getMonth(), 13), color: '#8dec7d' },
        { date: new Date(now.getFullYear(), now.getMonth(), 21), color: '#ffc400' },
        { date: new Date(now.getFullYear(), now.getMonth(), 21), color: '#8dec7d' },
        { start: new Date(now.getFullYear(), now.getMonth() + 1, 15), end: new Date(now.getFullYear(), now.getMonth() + 1, 18), color: '#f4511e' }
    ]);

    const [colors] = React.useState([
        { recurring: { repeat: 'yearly', month: 12, day: 8 }, background: '#9ccc65' },
        { recurring: { repeat: 'yearly', month: 5, day: 1 }, background: 'red' },
        { recurring: { repeat: 'yearly', month: 12, day: 24 }, background: '#fff568' },
        { recurring: { repeat: 'yearly', month: 12, day: 25 }, background: '#e88080' },
        { date: new Date(now.getFullYear(), now.getMonth() + 1, 4), background: '#cfd8dc' },
        { date: new Date(now.getFullYear(), now.getMonth() + 2, 24), background: '#9575cd' },
        { date: new Date(now.getFullYear(), now.getMonth() - 2, 13), background: '#d4e157' },
        { date: new Date(now.getFullYear(), now.getMonth() - 1, 6), background: "#f4511e" },
        { date: new Date(now.getFullYear(), now.getMonth() + 1, 6), background: '#46c4f3' },
        { date: new Date(now.getFullYear(), now.getMonth() + 1, 22), background: '#7e56bd' },
        { date: new Date(now.getFullYear(), now.getMonth() - 1, 11), background: '#46c4f3' },
        { date: new Date(now.getFullYear(), now.getMonth() - 1, 29), background: '#7e56bd' },
        { date: new Date(now.getFullYear(), now.getMonth(), 2), background: '#46c4f3' },
        { date: new Date(now.getFullYear(), now.getMonth(), 3), background: '#7e56bd' },
        { date: new Date(now.getFullYear(), now.getMonth(), 11), background: '#f13f77' },
        { date: new Date(now.getFullYear(), now.getMonth(), 19), background: '#8dec7d' },
        { date: new Date(now.getFullYear(), now.getMonth(), 28), background: '#ea4986' },
        { start: new Date(now.getFullYear(), now.getMonth() + 1, 15), end: new Date(now.getFullYear(), now.getMonth() + 1, 18), text: 'Conference', background: '#f4511e' }
    ]);

    const [labels] = React.useState([
        { recurring: { repeat: 'yearly', month: 12, day: 25 }, title: 'Christmas', color: '#f48fb1' },
        { recurring: { repeat: 'yearly', month: 1, day: 1 }, title: 'New year' },
        { recurring: { repeat: 'yearly', month: 12, day: 1 }, title: 'Meeting', color: '#ffc400' },
        { date: new Date(now.getFullYear(), now.getMonth() + 1, 4), text: 'Spa day', color: '#cfd8dc' },
        { date: new Date(now.getFullYear(), now.getMonth() + 2, 24), text: 'BD Party', color: '#9ccc65' },
        { date: new Date(now.getFullYear(), now.getMonth() - 2, 13), text: 'Exams', color: '#d4e157' },
        { date: new Date(now.getFullYear(), now.getMonth() - 1, 6), text: 'Trip', color: "#f4511e" },
        { date: new Date(now.getFullYear(), now.getMonth() + 1, 6), color: '#46c4f3', text: 'Pizza Night' },
        { date: new Date(now.getFullYear(), now.getMonth() + 1, 22), color: '#7e56bd', text: 'Beerpong' },
        { date: new Date(now.getFullYear(), now.getMonth() - 1, 11), color: '#46c4f3', text: 'Anniversary' },
        { date: new Date(now.getFullYear(), now.getMonth() - 1, 29), color: '#7e56bd', text: 'Pete BD' },
        { date: new Date(now.getFullYear(), now.getMonth(), 2), color: '#46c4f3', text: 'Ana BD' },
        { date: new Date(now.getFullYear(), now.getMonth(), 3), color: '#7e56bd', text: 'Concert' },
        { date: new Date(now.getFullYear(), now.getMonth(), 11), color: '#f13f77', text: 'Trip' },
        { date: new Date(now.getFullYear(), now.getMonth(), 19), color: '#8dec7d', text: 'Math exam' },
        { date: new Date(now.getFullYear(), now.getMonth(), 28), color: '#ea4986', text: 'Party' },
        { start: new Date(now.getFullYear(), now.getMonth() + 1, 15), end: new Date(now.getFullYear(), now.getMonth() + 1, 18), text: 'Conference', color: '#f4511e' }
    ]);


    const currentDate = '2018-11-01';
    const schedulerData = [
        { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
        { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
    ];

    const handleChange = (event, newValue) => {
        setValue(newValue);
        function getTittle(newValue) {
            switch (newValue) {
                case 0: return"Dashboard"
                case 1: return"Booking Management"
                case 2: loadVehicleData(); return"Vehicle Management"
                case 3: loadDriversData(); return"Driver Management"
                case 4: return"Customer Management"
                case 5: return"Reports"
                case 7: return"Checking Requests"
                case 8: return"Vehicle Maintenance"
                case 9: return"Damages"
                case 10: return"Schedule"
                default: return"Dashboard"
            }
        }setTittle(getTittle(newValue))
    }

    const handleDrawerOpen = () => {setOpen(true)}
    const handleDrawerClose = () => {setOpen(false)}


    const vehicleFormHandleChange = (event, newValue) => {
        loadVehicleData()
        setVehicleFormValue(newValue);
    }
    const updateVehicle = (data) => {
        setSelectVehicle(data);
        setVehicleFormValue(2);
    }
    const deleteVehicle = async (data) => {
        console.log(data)
        let params = {id: data}
        let res = await VehicleService.deleteVehicle(params);
        if (res.status === 200) {loadVehicleData();
        } else {console.log(res)}
    }

    const loadVehicleData = async () => {
        const res = await VehicleService.fetchVehicles();
        if (res.status === 200) {setVehicleList( res.data.data)}
        else {console.log("fetching error: " + res)}
    }
    // driver
    const driverFormHandleChange = (event, newValue) => {
        loadDriversData()
        setDriversFormValue(newValue);
    }
    const updateDrivers = (data) => {
        setSelectDriver(data);
        setDriversFormValue(2);
    }
    const deleteDrivers = async (data) => {
        console.log(data)
        let params = {id: data}
        let res = await DriverService.deleteDriver(params);
        if (res.status === 200) {loadDriversData();
        } else {console.log(res)}
    }

    const loadDriversData = async () => {
        const res = await DriverService.fetchDrivers();
        if (res.status === 200) {setDriversList( res.data.data)}
        else {console.log("fetching error: " + res)}
    }

    // customer
    const customerFormHandleChange = (event, newValue) => {
        loadCustomersData()
        setCustomersFormValue(newValue);
    }
    const updateCustomer = (data) => {
        setSelectCustomer(data);
        setCustomersFormValue(2);
    }
    const deleteCustomer = async (data) => {
        console.log(data)
        let params = {id: data}
        let res = await CustomerService.deleteCustomer(params);
        if (res.status === 200) {loadCustomersData();
        } else {console.log(res)}
    }

    const loadCustomersData = async () => {
        const res = await CustomerService.fetchCustomers();
        if (res.status === 200) {setCustomersList( res.data.data)}
        else {console.log("fetching error: " + res)}
    }

    return (
        <Box sx={{ display: 'flex' }} >
            <img src={backImg2} style={{position:"fixed",
                width: '100vw', height:'100vh', backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', opacity:'30%',}}/>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start"
                        onClick={handleDrawerOpen}
                        sx={{marginRight: 5, ...(open && { display: 'none' }),}}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {tittle}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Tabs orientation="vertical"
                    value={value} onChange={handleChange}
                    aria-label="dashboard tabs" sx={{ borderRight: 1, borderColor: 'divider' }}>


                    <Tab className={classes.tab} icon={
                        <DashboardIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>} iconPosition="start" label="Dashboard" {...a11yProps(0)} />
                    <Tab className={classes.tab} icon={
                        <CollectionsBookmarkIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>} iconPosition="start" label="Booking" {...a11yProps(1)} />
                    <Tab className={classes.tab} icon={
                        <DirectionsCarIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>} iconPosition="start" label="Vehicle" {...a11yProps(2)} />
                    <Tab className={classes.tab} icon={
                        <PeopleIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>} iconPosition="start" label="Driver" {...a11yProps(3)} />
                    <Tab className={classes.tab} icon={
                        <SwitchAccountIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>} iconPosition="start" label="Customer" {...a11yProps(4)} />
                    <Tab className={classes.tab} icon={
                        <LeaderboardIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>} iconPosition="start" label="Reports" {...a11yProps(5)} />
                    <Divider />
                    <Tab className={classes.tab} icon={
                        <DashboardIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>} iconPosition="start" label="Requests" {...a11yProps(6)} />
                    <Tab className={classes.tab} icon={
                        <CollectionsBookmarkIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>} iconPosition="start" label="Maintenance" {...a11yProps(7)} />
                    <Tab className={classes.tab} icon={
                        <DirectionsCarIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>} iconPosition="start" label="Damages" {...a11yProps(8)} />
                    <Tab className={classes.tab} icon={
                        <PeopleIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>} iconPosition="start" label="Schedule" {...a11yProps(9)} />

                </Tabs>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {/*-----------------------------------Dash-------------------------*/}
                <TabPanel value={value} index={0}>

                    <Stack spacing={2}>
                        <Stack direction={{ xs: 'column', sm: 'row' }}
                               spacing={{ xs: 1, sm: 2, md: 4 }}
                               justifyContent="center"
                               alignItems="center"
                               mt={2} >

                            <Stack className={classes.card_box}>
                                <div style={{backgroundColor: '#27ae60'}} className={classes.card_logo_box}>
                                    <PeopleAltIcon style={{fontSize: '34px'}}
                                                   className={classes.card_logo} />
                                </div>
                                <Stack direction="column" justifyContent="flex-start" alignItems="flex-end" spacing={1} className={classes.card_mainAria}>
                                    <h3>Customers</h3>
                                    <h2>750</h2>
                                </Stack><Divider />
                                <Stack direction="row" justifyContent="flex-start" spacing={1}
                                       alignItems="center" style={{width: '100%', height:'40px'}}>
                                    <EventIcon/><h3>Last 7 Days</h3>
                                </Stack>
                            </Stack>

                            <Stack className={classes.card_box}>
                                <div style={{backgroundColor: '#34495e'}} className={classes.card_logo_box}>
                                    <DirectionsCarIcon style={{fontSize: '34px'}}
                                                       className={classes.card_logo} />
                                </div>
                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="flex-end" spacing={1}
                                       className={classes.card_mainAria}>
                                    <h3>Cars</h3>
                                    <h2>27</h2>
                                </Stack>
                                <Divider />
                                <Stack direction="row" justifyContent="flex-start" spacing={1}
                                       alignItems="center" style={{width: '100%', height:'40px'}}>
                                    <EventIcon/><h3>Last 7 Days</h3>
                                </Stack>
                            </Stack>

                            <Stack className={classes.card_box}>
                                <div style={{backgroundColor: '#f39c12'}} className={classes.card_logo_box}>
                                    <CollectionsBookmarkIcon style={{fontSize: '34px'}}
                                                             className={classes.card_logo} />
                                </div>
                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="flex-end" spacing={1}
                                       className={classes.card_mainAria}>
                                    <h3>Rentals</h3>
                                    <h2>550</h2>
                                </Stack>
                                <Divider />
                                <Stack direction="row" justifyContent="flex-start" spacing={1}
                                       alignItems="center" style={{width: '100%', height:'40px'}}>
                                    <EventIcon/><h3>Last 7 Days</h3>
                                </Stack>
                            </Stack>

                            <Stack className={classes.card_box}>
                                <div style={{backgroundColor: '#8e44ad'}} className={classes.card_logo_box}>
                                    <BadgeIcon style={{fontSize: '34px'}}
                                               className={classes.card_logo} />
                                </div>
                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="flex-end" spacing={1}
                                       className={classes.card_mainAria}>
                                    <h3>Drivers</h3>
                                    <h2>27</h2>
                                </Stack>
                                <Divider />
                                <Stack direction="row" justifyContent="flex-start" spacing={1}
                                       alignItems="center" style={{width: '100%', height:'40px'}}>
                                    <EventIcon/><h3>Last 7 Days</h3>
                                </Stack>
                            </Stack>

                            <Stack className={classes.card_box}>
                                <div style={{backgroundColor: '#16a085'}} className={classes.card_logo_box}>
                                    <HandymanIcon style={{fontSize: '34px'}}
                                                  className={classes.card_logo} />
                                </div>
                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="flex-end" spacing={1}
                                       className={classes.card_mainAria}>
                                    <h3>Maintain</h3>
                                    <h2>550</h2>
                                </Stack>
                                <Divider />
                                <Stack direction="row" justifyContent="flex-start" spacing={1}
                                       alignItems="center" style={{width: '100%', height:'40px'}}>
                                    <EventIcon/><h3>Last 7 Days</h3>
                                </Stack>
                            </Stack>

                        </Stack>
                        <Stack>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <StaticDatePicker
                                    onChange={(newValue) => setDate(newValue)}
                                    value={date}
                                    renderInput={(params) => <TextField {...params} />}
                                    componentsProps={{
                                        actionBar: {
                                            actions: ['today'],
                                        },
                                    }}
                                    /*marked={[
                                        {
                                            date: new Date(year, month, 2),
                                            color: '#46c4f3',
                                            markCssClass: 'square-mark'
                                        }, {
                                            date: new Date(year, month, 4),
                                            color: '#159833',
                                            markCssClass: 'triangle-mark'
                                        }, {
                                            date: new Date(year, month, 6),
                                            color: '#b05cbf',
                                            markCssClass: 'square-mark'
                                        }, {
                                            date: new Date(year, month, 6),
                                            color: '#3adecf',
                                            markCssClass: 'triangle-mark'
                                        }, {
                                            date: new Date(year, month, 6),
                                            color: '#c8d235'
                                        }, {
                                            date: new Date(year, month, 8),
                                            color: '#46c4f3'
                                        }, {
                                            date: new Date(year, month, 10),
                                            color: '#7e56bd',
                                            markCssClass: 'square-mark'
                                        }, {
                                            date: new Date(year, month, 13),
                                            color: '#f13f77'
                                        }, {
                                            date: new Date(year, month, 16),
                                            color: '#21b326',
                                            markCssClass: 'square-mark'
                                        }, {
                                            date: new Date(year, month, 16),
                                            color: '#ffa93a',
                                            markCssClass: 'triangle-mark'
                                        },{
                                            date: new Date(year, month, 18),
                                            color: '#89d7c9',
                                            markCssClass: 'triangle-mark'
                                        }, {
                                            date: new Date(year, month, 21),
                                            color: '#ffc400',
                                            markCssClass: 'square-mark'
                                        }, {
                                            date: new Date(year, month, 26),
                                            color: '#8dec7d',
                                            markCssClass: 'triangle-mark'
                                        }
                                    ]}*/
                                />
                            </LocalizationProvider>
                            <Stack>
                                {/*<div className="mbsc-grid">
                                    <div className="mbsc-row">
                                        <div className="mbsc-col-sm-12 mbsc-col-md-4">
                                            <div className="mbsc-form-group">
                                                <div className="mbsc-form-group-title">Marked days</div>
                                                <Datepicker controls={['calendar']} display="inline" marked={marked} />
                                            </div>
                                        </div>
                                        <div className="mbsc-col-sm-12 mbsc-col-md-4">
                                            <div className="mbsc-form-group">
                                                <div className="mbsc-form-group-title">Colored days</div>
                                                <Datepicker controls={['calendar']} display="inline" colors={colors} />
                                            </div>
                                        </div>
                                        <div className="mbsc-col-sm-12 mbsc-col-md-4">
                                            <div className="mbsc-form-group">
                                                <div className="mbsc-form-group-title">Labels</div>
                                                <Datepicker controls={['calendar']} display="inline" labels={labels} />
                                            </div>
                                        </div>
                                    </div>
                                </div>*/}
                                {/*<Scheduler
                                    data={schedulerData}
                                >
                                    <ViewState
                                        currentDate={currentDate}
                                    />
                                    <DayView
                                        startDayHour={9}
                                        endDayHour={14}
                                    />
                                    <Appointments />
                                </Scheduler>*/}
                            </Stack>
                        </Stack>
                    </Stack>
                </TabPanel>
                {/*-----------------------------------booking-------------------------*/}
                <TabPanel value={value} index={1}> {/*-----------booking------------*/}
                    <Stack>
                        <Tabs
                            value={vehicleFormValue}
                            onChange={vehicleFormHandleChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="booking tabs"
                        >
                            <Tab value={0} label="All Bookings" />
                            <Tab value={1} label="Update Booking" />
                        </Tabs>
                    </Stack>
                </TabPanel>
                {/*----------------------------------vehicle-------------------------*/}
                <TabPanel value={value} index={2}>
                    <Stack >
                        <Tabs
                            value={vehicleFormValue}
                            onChange={vehicleFormHandleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value={0} label="All" />
                            <Tab value={1} label="Add New Vehicle" />
                            <Tab value={2} label="Update Vehicle" />
                        </Tabs>

                        <TabPanel value={vehicleFormValue} index={0}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="vehicle table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Reg.No</TableCell>
                                            <TableCell align="left">Brand</TableCell>
                                            <TableCell align="left">Type</TableCell>
                                            <TableCell align="left">Transmission Type</TableCell>
                                            <TableCell align="left">Fuel Type</TableCell>
                                            <TableCell align="left">Status</TableCell>
                                            <TableCell align="left">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            vehicleList.map((row) => (
                                                <TableRow>
                                                    <TableCell align="left">{row.regNo}</TableCell>
                                                    <TableCell align="left">{row.brand}</TableCell>
                                                    <TableCell align="left">{row.type}</TableCell>
                                                    <TableCell align="left">{row.transmissionType}</TableCell>
                                                    <TableCell align="left">{row.fuelType}</TableCell>
                                                    <TableCell align="left">{row.status}</TableCell>
                                                    <TableCell align="left">
                                                        <Tooltip title="Edit">
                                                            <IconButton
                                                                onClick={() => {
                                                                    console.log("edit icon clicked!")
                                                                   updateVehicle(row);

                                                                }}
                                                            >
                                                                <EditIcon color="primary" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete">
                                                            <IconButton
                                                                onClick={() => {
                                                                    swal({
                                                                        title: "Are you sure?",
                                                                        text: "Once deleted, you will not be able to recover this imaginary file!",
                                                                        icon: "warning",
                                                                        buttons: true,
                                                                        dangerMode: true,
                                                                    })
                                                                        .then((willDelete) => {
                                                                            if (willDelete) {
                                                                                deleteVehicle(row.vehicleId);
                                                                                swal("Poof! Your imaginary file has been deleted!", {
                                                                                    icon: "success",
                                                                                });
                                                                            } else {
                                                                                swal("Your imaginary file is safe!");
                                                                            }
                                                                        });
                                                                }}
                                                            >
                                                                <DeleteIcon color="error" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel value={vehicleFormValue} index={1}>
                            <AddVehicle btnState="Save"/>
                        </TabPanel>
                        <TabPanel value={vehicleFormValue} index={2}>
                            <AddVehicle vehicleData={selectVehicle} btnState="Update"/>
                        </TabPanel>
                    </Stack>
                </TabPanel>
                {/*----------------------------------driver---------------------------*/}
                <TabPanel value={value} index={3}>
                    <Stack >
                        <Tabs
                            value={driversFormValue}
                            onChange={driverFormHandleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="driver tabs"
                        >
                            <Tab value={0} label="All" />
                            <Tab value={1} label="Add New Driver" />
                            <Tab value={2} label="Update Driver" />
                        </Tabs>

                        <TabPanel value={driversFormValue} index={0}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="driver table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Name</TableCell>
                                            <TableCell align="left">Address</TableCell>
                                            <TableCell align="left">NIC</TableCell>
                                            <TableCell align="left">E-mail</TableCell>
                                            <TableCell align="left">Contact</TableCell>
                                            <TableCell align="left">Status</TableCell>
                                            <TableCell align="left">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            driversList.map((row) => (
                                                <TableRow>
                                                    <TableCell align="left">{row.name}</TableCell>
                                                    <TableCell align="left">{row.address}</TableCell>
                                                    <TableCell align="left">{row.nic}</TableCell>
                                                    <TableCell align="left">{row.email}</TableCell>
                                                    <TableCell align="left">{row.contact}</TableCell>
                                                    <TableCell align="left">{row.status}</TableCell>
                                                    <TableCell align="left">
                                                        <Tooltip title="Edit">
                                                            <IconButton
                                                                onClick={() => {
                                                                    console.log("edit icon clicked!")
                                                                    updateDrivers(row);

                                                                }}
                                                            >
                                                                <EditIcon color="primary" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete">
                                                            <IconButton
                                                                onClick={() => {
                                                                    swal({
                                                                        title: "Are you sure?",
                                                                        text: "Once deleted, you will not be able to recover this imaginary file!",
                                                                        icon: "warning",
                                                                        buttons: true,
                                                                        dangerMode: true,
                                                                    })
                                                                        .then((willDelete) => {
                                                                            if (willDelete) {
                                                                                deleteDrivers(row.driverID)
                                                                                swal("Poof! Your imaginary file has been deleted!", {
                                                                                    icon: "success",
                                                                                });
                                                                            } else {
                                                                                swal("Your imaginary file is safe!");
                                                                            }
                                                                        });

                                                                }}
                                                            >
                                                                <DeleteIcon color="error" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel value={driversFormValue} index={1}>
                            <DriverManage btnState="Save"/>
                        </TabPanel>
                        <TabPanel value={driversFormValue} index={2}>
                            <DriverManage driverData={selectDriver} btnState="Update"/>
                        </TabPanel>
                    </Stack>
                </TabPanel>
                {/*----------------------------------customer-------------------------*/}
                <TabPanel value={value} index={4}>
                    <Stack >
                        <Tabs
                            value={customersFormValue}
                            onChange={customerFormHandleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="customer tabs"
                        >
                            <Tab value={0} label="All" />
                            <Tab value={1} label="Add New Customer" />
                            <Tab value={2} label="Update Customer" />
                        </Tabs>

                        <TabPanel value={customersFormValue} index={0}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="customer table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Name</TableCell>
                                            <TableCell align="left">Email</TableCell>
                                            <TableCell align="left">Address</TableCell>
                                            <TableCell align="left">Contact</TableCell>
                                            <TableCell align="left">NIC</TableCell>
                                            <TableCell align="left">Driving License No</TableCell>
                                            <TableCell align="left">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            customersList.map((row) => (
                                                <TableRow>
                                                    <TableCell align="left">{row.cusName}</TableCell>
                                                    <TableCell align="left">{row.cusEmail}</TableCell>
                                                    <TableCell align="left">{row.cusAddress}</TableCell>
                                                    <TableCell align="left">{row.cusContactNo}</TableCell>
                                                    <TableCell align="left">{row.cusNIC}</TableCell>
                                                    <TableCell align="left">{row.cusDrivingLicenseNo}</TableCell>
                                                    <TableCell align="left">{row.status}</TableCell>
                                                    <TableCell align="left">
                                                        <Tooltip title="Edit">
                                                            <IconButton
                                                                onClick={() => {
                                                                    updateCustomer(row);

                                                                }}
                                                            >
                                                                <EditIcon color="primary" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete">
                                                            <IconButton
                                                                onClick={() => {
                                                                    swal({
                                                                        title: "Are you sure?",
                                                                        text: "Once deleted, you will not be able to recover this imaginary file!",
                                                                        icon: "warning",
                                                                        buttons: true,
                                                                        dangerMode: true,
                                                                    })
                                                                        .then((willDelete) => {
                                                                            if (willDelete) {
                                                                                deleteCustomer(row.cusID)
                                                                                swal("Poof! Your imaginary file has been deleted!", {
                                                                                    icon: "success",
                                                                                });
                                                                            } else {
                                                                                swal("Your imaginary file is safe!");
                                                                            }
                                                                        })
                                                                }}
                                                            >
                                                                <DeleteIcon color="error" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel value={customersFormValue} index={1}>
                            <CustomerManage btnState="Save"/>
                        </TabPanel>
                        <TabPanel value={customersFormValue} index={2}>
                            <CustomerManage customerData={selectCustomer} btnState="Update"/>
                        </TabPanel>
                    </Stack>
                </TabPanel>
                {/*-----------------------------------reports-------------------------*/}
                <TabPanel value={value} index={5}></TabPanel>
                {/*-----------------------------------request-------------------------*/}
                <TabPanel value={value} index={7}></TabPanel>
                {/*---------------------------------maintenance-----------------------*/}
                <TabPanel value={value} index={8}></TabPanel>
                {/*-----------------------------------damages-------------------------*/}
                <TabPanel value={value} index={9}></TabPanel>
                {/*----------------------------------schedule-------------------------*/}
                <TabPanel value={value} index={10}></TabPanel>


            </Box>
        </Box>
    );
}



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

const drawerWidth = 200;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);
