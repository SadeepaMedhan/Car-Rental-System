import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
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
    Avatar, Badge,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip
} from "@mui/material";
import DriverService from "../../service/DriverService";
import DriverManage from "../../components/DriverManage";
import CustomerService from "../../service/CustomerService";
import CustomerManage from "../../components/CustomerManage";
import swal from 'sweetalert';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {StaticDatePicker} from '@mui/x-date-pickers/StaticDatePicker';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import BookingService from "../../service/BookingService";
import Chip from "@mui/material/Chip";
import Calendar from "react-calendar";
import UploadFilesService from "../../service/UploadFilesService";
import GarageIcon from '@mui/icons-material/Garage';
import ConstructionIcon from '@mui/icons-material/Construction';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import {CanvasJSChart} from 'canvasjs-react-charts'


export default function Dashboard() {
    let classes = styleSheet();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [tittle, setTittle] = React.useState("Dashboard");
    const [noCus, setNoCus] = React.useState(0);
    const [noVehicle, setNoVehicle] = React.useState(0);
    const [noRental, setNoRental] = React.useState(0);
    const [noDriver, setNoDriver] = React.useState(0);
    const [noMaintain, setNoMaintain] = React.useState(0);
    const [noRequest, setNoRequest] = React.useState(0);
    const [selectImg, setSelectImg] = React.useState(null);
    const [vehicleList, setVehicleList] = React.useState([]);
    const [driversList, setDriversList] = React.useState([]);
    const [customersList, setCustomersList] = React.useState([]);
    const [bookingList, setBookingList] = React.useState([]);
    const [selectVehicle, setSelectVehicle] = React.useState(null);
    const [selectDriver, setSelectDriver] = React.useState(null);
    const [selectCustomer, setSelectCustomer] = React.useState(null);
    const [selectBooking, setSelectBooking] = React.useState(null);
    const [vehicleFormValue, setVehicleFormValue] = React.useState(0);
    const [driversFormValue, setDriversFormValue] = React.useState(0);
    const [customersFormValue, setCustomersFormValue] = React.useState(0);
    const [bookingFormValue, setBookingFormValue] = React.useState(0);
    const [reportFormValue, setReportFormValue] = React.useState(0);
    const [requestFormValue, setRquestFormValue] = React.useState(0);
    const [driverSelectDate, setDriverSelectDate] = React.useState(new Date());
    const [imgUrl, setImgUrl] = React.useState(null);
    const [date, setDate] = React.useState(() => new Date());
    React.useEffect(() => {
        loadBookingData();
        loadVehicleData();
        loadDriversData();
        loadCustomersData();
        loadImages();
    }, []);

    const now = new Date();


    const handleChange = (event, newValue) => {
        setValue(newValue);

        function getTittle(newValue) {
            switch (newValue) {
                case 0:
                    return "Dashboard"
                case 1:
                    loadBookingData();
                    return "Booking Management"
                case 2:
                    loadVehicleData();
                    return "Vehicle Management"
                case 3:
                    loadDriversData();
                    return "Driver Management"
                case 4:
                    loadCustomersData();
                    return "Customer Management"
                case 5:
                    return "Reports"
                case 7:
                    return "Checking Requests"
                case 8:
                    return "Vehicle Maintenance"
                case 9:
                    return "Damages"
                case 10:
                    return "Schedule"
                default:
                    return "Dashboard"
            }
        }

        setTittle(getTittle(newValue))
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }


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
        if (res.status === 200) {
            loadVehicleData();
        } else {
            console.log(res)
        }
    }

    const loadVehicleData = async () => {
        const res = await VehicleService.fetchVehicles();
        if (res.status === 200) {
            setNoVehicle(res.data.data.length)
            setVehicleList(res.data.data)
        } else {
            console.log("fetching error: " + res)
        }
    }

    const updateVehicleStatus = async (data) => {
        console.log(data)
        let response = await VehicleService.updateVehicle(data);
        if (response.status === 200) {
            console.log("updated !")
            loadVehicleData()
        } else {
            console.log(response.data)
        }

    };

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
        if (res.status === 200) {
            loadDriversData();
        } else {
            console.log(res)
        }
    }

    const loadDriversData = async () => {
        const res = await DriverService.fetchDrivers();
        if (res.status === 200) {
            setNoDriver(res.data.data.length)
            setDriversList(res.data.data)
        } else {
            console.log("fetching error: " + res)
        }
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
        if (res.status === 200) {
            loadCustomersData();
        } else {
            console.log(res)
        }
    }

    const loadCustomersData = async () => {
        const res = await CustomerService.fetchCustomers();
        if (res.status === 200) {
            setNoCus(res.data.data.length)
            setCustomersList(res.data.data)
        } else {
            console.log("fetching error: " + res)
        }
    }
    // booking
    const bookingFormHandleChange = (event, newValue) => {
        loadBookingData()
        setBookingFormValue(newValue);
    }

    const loadBookingData = async () => {
        const res = await BookingService.fetchBooking();
        if (res.status === 200) {
            setNoRental(res.data.data.length)
            setBookingList(res.data.data)
        } else {
            console.log("fetching error: " + res)
        }
    }

    const updateBookingData = async (data) => {
        let response = await BookingService.updateBooking(data);
        if (response.status === 200) {
            console.log("updated !")
            loadBookingData()
        } else {
            console.log(response.data)
        }
    }
    const deleteBooking = async (data) => {
        let params = {id: data}
        let response = await BookingService.deleteBookingData(params);
        if (response.status === 200) {
            loadBookingData();
        } else {
            console.log(response)
        }
    }
    const requestFormHandleChange = (event, newValue) => {
        //loadBookingData()
        setRquestFormValue(newValue);
    }
    const reportFormHandleChange = (event, newValue) => {
        setReportFormValue(newValue);
    }

    const loadImages = async () => {
        let baseUrl = "http://localhost:8080/backend_war/"
        const res = await UploadFilesService.getFiles();
        console.log(baseUrl+res.data[1])
        setImgUrl(baseUrl+res.data[0]);
    }


    let baseUrl = "http://localhost:8080/backend_war/uploads/"


    const dateList = [];

    const payLis = [
        {label:'',y:''}
    ];
    bookingList.map((book)=>
        dateList.push({
            date:book.leavingDate.split('T')[0],
            payment:book.payment,
            rentalFee:book.rentalFee,
            lossDamage:book.lossDamageFee
        })
    )

    const dayLis=[]
    dateList.map((date)=>{
            if(true){
                dayLis.push({
                    label:date.date,
                    y:date.rentalFee
                })
            }
        }
    )

    const dailyIncome = {
        animationEnabled: true,
        exportEnabled: true,
        title: {text: "Daily Income"},
        axisY: {
            title: "Rate",
            suffix: "LKR"
        },
        axisX: {
            title: "Days of Month",
            interval: 1
        },

        data: [{
                type: "line",
                dataPoints: dayLis
            }
        ]
    }
    const monthlyIncome = {
        animationEnabled: true,
        exportEnabled: true,
        title: {text: "Monthly Income"},
        axisY: {
            title: "Rate",
            suffix: "LKR"
        },
        axisX: {
            title: "Month of Year",
            interval: 1
        },

        data: [{
                type: "line",
                dataPoints: dayLis
            }
        ]
    }
    const annuallyIncome = {
        animationEnabled: true,
        exportEnabled: true,
        title: {text: "Annually Income"},
        axisY: {
            title: "Rate",
            suffix: "LKR"
        },
        axisX: {
            title: "Years",
            interval: 1
        },

        data: [{
                type: "line",
                dataPoints: dayLis
            }
        ]
    }

    return (
        <Box sx={{display: 'flex'}}>
            <img src={backImg2} style={{
                position: "fixed",
                width: '100vw', height: '100vh', backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', opacity: '30%',
            }}/>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start"
                                onClick={handleDrawerOpen}
                                sx={{marginRight: 5, ...(open && {display: 'none'}),}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {tittle}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <Tabs orientation="vertical"
                      value={value} onChange={handleChange}
                      aria-label="dashboard tabs" sx={{borderRight: 1, borderColor: 'divider'}}>


                    <Tab className={classes.tab} icon={
                        <DashboardIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>} iconPosition="start"
                         label="Dashboard" {...a11yProps(0)} />
                    <Tab className={classes.tab} icon={
                        <Badge badgeContent={noRequest} color="secondary" anchorOrigin={{vertical: 'top', horizontal: 'left',}}>
                            <CollectionsBookmarkIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>
                        </Badge>}
                         iconPosition="start" label="Booking" {...a11yProps(1)} />
                    <Tab className={classes.tab} icon={
                        <DirectionsCarIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>} iconPosition="start"
                         label="Vehicle" {...a11yProps(2)} />
                    <Tab className={classes.tab} icon={
                        <PeopleIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>} iconPosition="start"
                         label="Driver" {...a11yProps(3)} />
                    <Tab className={classes.tab} icon={
                        <SwitchAccountIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>} iconPosition="start"
                         label="Customer" {...a11yProps(4)} />
                    <Tab className={classes.tab} icon={
                        <LeaderboardIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>} iconPosition="start"
                         label="Reports" {...a11yProps(5)} />
                    <Divider/>
                    <Tab className={classes.tab} icon={
                        <MoveToInboxIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>} iconPosition="start"
                         label="Requests" {...a11yProps(6)} />
                    <Tab className={classes.tab} icon={
                        <GarageIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>}
                         iconPosition="start" label="Maintenance" {...a11yProps(7)} />
                    <Tab className={classes.tab} icon={
                        <ConstructionIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>} iconPosition="start"
                         label="Damages" {...a11yProps(8)} />
                    <Tab className={classes.tab} icon={
                        <CalendarMonthIcon sx={{marginRight: open ? '10px' : '22px !important'}}/>} iconPosition="start"
                         label="Schedule" {...a11yProps(9)} />

                </Tabs>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>
                {/*-----------------------------------Dash-------------------------*/}
                <TabPanel value={value} index={0}>

                    <Stack spacing={4}>
                        <Stack direction={{xs: 'column', sm: 'row'}}
                               spacing={{xs: 1, sm: 2, md: 4}}
                               justifyContent="center"
                               alignItems="center"
                               mt={2}>

                            <Stack className={classes.card_box}>
                                <div style={{backgroundColor: '#27ae60'}} className={classes.card_logo_box}>
                                    <PeopleAltIcon style={{fontSize: '34px'}}
                                                   className={classes.card_logo}/>
                                </div>
                                <Stack direction="column" justifyContent="flex-start" alignItems="flex-end" spacing={1}
                                       className={classes.card_mainAria}>
                                    <h3>Customers</h3>
                                    <h2>{noCus}</h2>
                                </Stack><Divider/>
                                <Stack direction="row" justifyContent="flex-start" spacing={1}
                                       alignItems="center" style={{width: '100%', height: '40px'}}>
                                    <EventIcon/><h3>Last 7 Days</h3>
                                </Stack>
                            </Stack>

                            <Stack className={classes.card_box}>
                                <div style={{backgroundColor: '#34495e'}} className={classes.card_logo_box}>
                                    <DirectionsCarIcon style={{fontSize: '34px'}}
                                                       className={classes.card_logo}/>
                                </div>
                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="flex-end" spacing={1}
                                       className={classes.card_mainAria}>
                                    <h3>Cars</h3>
                                    <h2>{noVehicle}</h2>
                                </Stack>
                                <Divider/>
                                <Stack direction="row" justifyContent="flex-start" spacing={1}
                                       alignItems="center" style={{width: '100%', height: '40px'}}>
                                    <EventIcon/><h3>Last 7 Days</h3>
                                </Stack>
                            </Stack>

                            <Stack className={classes.card_box}>
                                <div style={{backgroundColor: '#f39c12'}} className={classes.card_logo_box}>
                                    <CollectionsBookmarkIcon style={{fontSize: '34px'}}
                                                             className={classes.card_logo}/>
                                </div>
                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="flex-end" spacing={1}
                                       className={classes.card_mainAria}>
                                    <h3>Rentals</h3>
                                    <h2>{noRental}</h2>
                                </Stack>
                                <Divider/>
                                <Stack direction="row" justifyContent="flex-start" spacing={1}
                                       alignItems="center" style={{width: '100%', height: '40px'}}>
                                    <EventIcon/><h3>Last 7 Days</h3>
                                </Stack>
                            </Stack>

                            <Stack className={classes.card_box}>
                                <div style={{backgroundColor: '#8e44ad'}} className={classes.card_logo_box}>
                                    <BadgeIcon style={{fontSize: '34px'}}
                                               className={classes.card_logo}/>
                                </div>
                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="flex-end" spacing={1}
                                       className={classes.card_mainAria}>
                                    <h3>Drivers</h3>
                                    <h2>{noDriver}</h2>
                                </Stack>
                                <Divider/>
                                <Stack direction="row" justifyContent="flex-start" spacing={1}
                                       alignItems="center" style={{width: '100%', height: '40px'}}>
                                    <EventIcon/><h3>Last 7 Days</h3>
                                </Stack>
                            </Stack>

                            <Stack className={classes.card_box}>
                                <div style={{backgroundColor: '#16a085'}} className={classes.card_logo_box}>
                                    <HandymanIcon style={{fontSize: '34px'}}
                                                  className={classes.card_logo}/>
                                </div>
                                <Stack direction="column" justifyContent="flex-start"
                                       alignItems="flex-end" spacing={1}
                                       className={classes.card_mainAria}>
                                    <h3>Maintain</h3>
                                    <h2>{noMaintain}</h2>
                                </Stack>
                                <Divider/>
                                <Stack direction="row" justifyContent="flex-start" spacing={1}
                                       alignItems="center" style={{width: '100%', height: '40px'}}>
                                    <EventIcon/><h3>Last 7 Days</h3>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack direction="row"
                               justifyContent="space-around"
                               alignItems="flex-start"
                               spacing={2} style={{border:'1px solid #E0E0E0',borderRadius:'3px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
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
                            </Stack>
                            <Stack>
                                <h2>Today Rentals</h2>

                                <TableContainer component={Paper}>
                                    <Table sx={{minWidth: 650}} aria-label="booking table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">Status</TableCell>
                                                <TableCell align="left">Vehicle</TableCell>
                                                <TableCell align="left">Date</TableCell>
                                                <TableCell align="left">Location</TableCell>
                                                <TableCell align="left">Customer</TableCell>
                                                <TableCell align="left">Pay</TableCell>
                                                <TableCell align="left">Rental Fee</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                bookingList.map((row) => (
                                                    <TableRow>
                                                        <TableCell align="left">
                                                            <Chip label={row.status}
                                                                  color={row.status === "Pending" ? "warning" : "success"}
                                                                  />
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <Avatar alt="img" src={baseUrl+row.vehicle.imgUrl1}/>
                                                            {row.vehicle.brand}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <Stack>
                                                                <p>{row.leavingDate.split('T')[0]}</p>
                                                                <p>{row.returnDate.split('T')[0]}</p>
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell align="left">{row.location}</TableCell>
                                                        <TableCell align="left">
                                                            <Avatar alt="user"/>
                                                            {row.customer.cusName}
                                                        </TableCell>
                                                        <TableCell align="left">{row.payment}</TableCell>
                                                        <TableCell align="left">{row.rentalFee}</TableCell>

                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Stack>
                        </Stack>
                    </Stack>
                </TabPanel>
                {/*-----------------------------------booking-------------------------*/}
                <TabPanel value={value} index={1}>
                    <Stack>
                        <Tabs
                            value={bookingFormValue}
                            onChange={bookingFormHandleChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="booking tabs"
                        >
                            <Tab value={0} label="All Bookings"/>
                            <Tab value={1} label="Update Booking"/>
                        </Tabs>
                        <TabPanel value={bookingFormValue} index={0}>
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 650}} aria-label="booking table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Status</TableCell>
                                            <TableCell align="left">Vehicle</TableCell>
                                            <TableCell align="left">Pickup</TableCell>
                                            <TableCell align="left">Return</TableCell>
                                            <TableCell align="left">Location</TableCell>
                                            <TableCell align="left">Customer</TableCell>
                                            <TableCell align="left">Driver</TableCell>
                                            <TableCell align="left">Pay</TableCell>
                                            <TableCell align="left">Rental Fee</TableCell>
                                            <TableCell align="left">Edit</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            bookingList.map((row) => (
                                                <TableRow>
                                                    <TableCell align="left">
                                                        <Chip label={row.status}
                                                              color={
                                                                  row.status === "Pending" && "warning" ||
                                                                  row.status === "Accept" && "info" ||
                                                                  row.status === "Finish" && "success" ||
                                                                  row.status === "Closed" && "warning"
                                                                 }
                                                              clickable onClick={() => {
                                                            swal({
                                                                title: "Are you sure?",
                                                                text: "Accept this Rental!",
                                                                icon: "info",
                                                                buttons: true,
                                                            })
                                                                .then((a) => {
                                                                    if (a) {
                                                                        row.status = "Accept";
                                                                        updateBookingData(row)
                                                                        swal("This Rental has been accept!", {
                                                                            icon: "success",
                                                                        });
                                                                    }
                                                                });
                                                        }}/>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Avatar alt="img" src={baseUrl+row.vehicle.imgUrl1}/>
                                                        {row.vehicle.brand}
                                                    </TableCell>
                                                    <TableCell align="left">{row.leavingDate.split('T')[0]}</TableCell>
                                                    <TableCell align="left">{row.returnDate.split('T')[0]}</TableCell>
                                                    <TableCell align="left">{row.location}</TableCell>
                                                    <TableCell align="left">
                                                        <Stack  direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                                                            <Avatar alt="user"/>
                                                            <p>{row.customer.cusName}</p>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.driver === null ? 'Self Drive' : row.driver.name}
                                                    </TableCell>
                                                    <TableCell align="left">{row.payment}</TableCell>
                                                    <TableCell align="left">{row.rentalFee}</TableCell>
                                                    <TableCell align="left">
                                                        <Tooltip title="Edit">
                                                            <IconButton
                                                                onClick={() => {
                                                                    console.log("edit icon clicked!")

                                                                }}
                                                            >
                                                                <EditIcon color="primary"/>
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
                                                                                deleteBooking(row.bookingId);
                                                                                swal("Poof! Your imaginary file has been deleted!", {
                                                                                    icon: "success",
                                                                                });
                                                                            } else {
                                                                                swal("Your imaginary file is safe!");
                                                                            }
                                                                        });
                                                                }}
                                                            >
                                                                <DeleteIcon color="error"/>
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
                        <TabPanel value={bookingFormValue} index={1}>

                        </TabPanel>
                    </Stack>
                </TabPanel>
                {/*----------------------------------vehicle-------------------------*/}
                <TabPanel value={value} index={2}>
                    <Stack>
                        <Tabs
                            value={vehicleFormValue}
                            onChange={vehicleFormHandleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value={0} label="All"/>
                            <Tab value={1} label="Add New Vehicle"/>
                            <Tab value={2} label="Update Vehicle"/>
                        </Tabs>

                        <TabPanel value={vehicleFormValue} index={0}>
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 650}} aria-label="vehicle table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Reg.No</TableCell>
                                            <TableCell align="left">Vehicle</TableCell>
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
                                                    <TableCell align="left">
                                                        <Avatar alt="img" src={baseUrl+row.imgUrl1}/>
                                                        {row.brand}
                                                    </TableCell>
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
                                                                <EditIcon color="primary"/>
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
                                                                <DeleteIcon color="error"/>
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
                    <Stack>
                        <Tabs
                            value={driversFormValue}
                            onChange={driverFormHandleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="driver tabs"
                        >
                            <Tab value={0} label="All"/>
                            <Tab value={1} label="Add New Driver"/>
                            <Tab value={2} label="Update Driver"/>
                        </Tabs>

                        <TabPanel value={driversFormValue} index={0}>
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 650}} aria-label="driver table">
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
                                                                <EditIcon color="primary"/>
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
                                                                <DeleteIcon color="error"/>
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
                    <Stack>
                        <Tabs
                            value={customersFormValue}
                            onChange={customerFormHandleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="customer tabs"
                        >
                            <Tab value={0} label="All"/>
                            <Tab value={1} label="Add New Customer"/>
                            <Tab value={2} label="Update Customer"/>
                        </Tabs>

                        <TabPanel value={customersFormValue} index={0}>
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 650}} aria-label="customer table">
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
                                                                <EditIcon color="primary"/>
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
                                                                <DeleteIcon color="error"/>
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
                <TabPanel value={value} index={5}>
                    <Stack>
                        <Tabs
                            value={reportFormValue}
                            onChange={reportFormHandleChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="report tabs"
                        >
                            <Tab value={0} label="Daily"/>
                            <Tab value={1} label="Monthly"/>
                            <Tab value={2} label="Annually"/>
                        </Tabs>
                        <TabPanel value={reportFormValue} index={0}>
                            <CanvasJSChart options = {dailyIncome} />
                        </TabPanel>
                        <TabPanel value={reportFormValue} index={1}>
                            <CanvasJSChart options = {monthlyIncome} />
                        </TabPanel>
                        <TabPanel value={reportFormValue} index={2}>
                            <CanvasJSChart options = {annuallyIncome} />
                        </TabPanel>
                    </Stack>
                </TabPanel>
                {/*-----------------------------------request-------------------------*/}
                <TabPanel value={value} index={7}>
                    <Stack>
                        <Tabs
                            value={requestFormValue}
                            onChange={requestFormHandleChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="booking tabs"
                        >
                            <Tab value={0} label="Pending"/>
                            <Tab value={1} label="Accept"/>
                            <Tab value={2} label="NIC verify"/>
                        </Tabs>
                        <TabPanel value={requestFormValue} index={0}>
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 650}} aria-label="pending table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Status</TableCell>
                                            <TableCell align="left">Vehicle</TableCell>
                                            <TableCell align="left">Pickup</TableCell>
                                            <TableCell align="left">Return</TableCell>
                                            <TableCell align="left">Location</TableCell>
                                            <TableCell align="left">Customer</TableCell>
                                            <TableCell align="left">Pay</TableCell>
                                            <TableCell align="left">Rental Fee</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bookingList.map((row) => (
                                            row.status === "Pending" &&
                                                <TableRow>
                                                    <TableCell align="left">
                                                        <Chip label={row.status}
                                                                      color={row.status === "Pending" ? "warning" : "success"}
                                                                      clickable onClick={() => {
                                                                    swal({
                                                                        title: "Are you sure?",
                                                                        text: "Accept this Rental!",
                                                                        icon: "info",
                                                                        buttons: true,
                                                                    })
                                                                        .then((a) => {
                                                                            if (a) {
                                                                                row.status = "Accept";
                                                                                updateBookingData(row)
                                                                                swal("This Rental has been accept!", {
                                                                                    icon: "success",
                                                                                });
                                                                            }
                                                                        });
                                                                }}/>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <Avatar alt="img" src={baseUrl+row.vehicle.imgUrl1}/>
                                                                {row.vehicle.brand}
                                                            </TableCell>
                                                            <TableCell align="left">{row.leavingDate.split('T')[0]}</TableCell>
                                                            <TableCell align="left">{row.returnDate.split('T')[0]}</TableCell>
                                                            <TableCell align="left">{row.location}</TableCell>
                                                            <TableCell align="left">
                                                                <Avatar alt="user"/>
                                                                {row.customer.cusName}
                                                            </TableCell>
                                                            <TableCell align="left">{row.payment}</TableCell>
                                                            <TableCell align="left">{row.rentalFee}</TableCell>

                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel value={requestFormValue} index={1}>
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 650}} aria-label="pending table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Status</TableCell>
                                            <TableCell align="left">Vehicle</TableCell>
                                            <TableCell align="left">Pickup</TableCell>
                                            <TableCell align="left">Return</TableCell>
                                            <TableCell align="left">Location</TableCell>
                                            <TableCell align="left">Customer</TableCell>
                                            <TableCell align="left">Pay</TableCell>
                                            <TableCell align="left">Rental Fee</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            bookingList.map((row) => (

                                                row.status === "Accept" &&
                                                <TableRow>
                                                    <TableCell align="left">
                                                        <Chip label={row.status}
                                                              color={row.status === "Pending" ? "warning" : "success"}
                                                              clickable onClick={() => {
                                                            swal({
                                                                title: "Are you sure?",
                                                                text: "Accept this Rental!",
                                                                icon: "info",
                                                                buttons: true,
                                                            })
                                                                .then((a) => {
                                                                    if (a) {
                                                                        row.status = "Accept";
                                                                        updateBookingData(row)
                                                                        swal("This Rental has been accept!", {
                                                                            icon: "success",
                                                                        });
                                                                    }
                                                                });
                                                        }}/>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Avatar alt="img" src={baseUrl+row.vehicle.imgUrl1}/>
                                                        {row.vehicle.brand}
                                                    </TableCell>
                                                    <TableCell align="left">{row.leavingDate.split('T')[0]}</TableCell>
                                                    <TableCell align="left">{row.returnDate.split('T')[0]}</TableCell>
                                                    <TableCell align="left">{row.location}</TableCell>
                                                    <TableCell align="left">
                                                        <Avatar alt="user"/>
                                                        {row.customer.cusName}
                                                    </TableCell>
                                                    <TableCell align="left">{row.payment}</TableCell>
                                                    <TableCell align="left">{row.rentalFee}</TableCell>

                                                </TableRow>

                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel value={requestFormValue} index={2}>

                        </TabPanel>
                    </Stack>
                </TabPanel>
                {/*---------------------------------maintenance-----------------------*/}
                <TabPanel value={value} index={8}>
                    <Stack>
                        <Tabs
                            value={vehicleFormValue}
                            onChange={vehicleFormHandleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value={0} label="Maintain"/>
                            <Tab value={1} label="Service"/>
                            <Tab value={2} label="Hire"/>
                        </Tabs>

                        <TabPanel value={vehicleFormValue} index={0}>
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 650}} aria-label="vehicle table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Reg.No</TableCell>
                                            <TableCell align="left">Brand</TableCell>
                                            <TableCell align="left">Type</TableCell>
                                            <TableCell align="left">Transmission Type</TableCell>
                                            <TableCell align="left">Fuel Type</TableCell>
                                            <TableCell align="left">Status</TableCell>
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
                                                    <TableCell align="left">
                                                        <Chip label={row.status}
                                                              color={row.status === "Maintenance" ? "warning" : "success"}
                                                              clickable onClick={() => {
                                                            swal({
                                                                title: "Are you sure?",
                                                                text: "Change this status!",
                                                                icon: "info",
                                                                buttons: true,
                                                            })
                                                                .then((a) => {
                                                                    if (a) {
                                                                        row.status = "Available";
                                                                        updateVehicleStatus(row)
                                                                        swal("This Vehicle has been Available!", {
                                                                            icon: "success",
                                                                        });
                                                                    }
                                                                });
                                                        }}/>
                                                        </TableCell>

                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel value={vehicleFormValue} index={1}>

                        </TabPanel>
                        <TabPanel value={vehicleFormValue} index={2}>

                        </TabPanel>
                    </Stack>
                </TabPanel>
                {/*-----------------------------------damages-------------------------*/}
                <TabPanel value={value} index={9}>
                    <Stack>
                        <Tabs
                            value={vehicleFormValue}
                            onChange={vehicleFormHandleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value={0} label="Damage"/>
                            <Tab value={1} label="Service"/>
                            <Tab value={2} label="Rent"/>
                        </Tabs>

                        <TabPanel value={vehicleFormValue} index={0}>
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 650}} aria-label="vehicle table">
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
                                                                <EditIcon color="primary"/>
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
                                                                <DeleteIcon color="error"/>
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

                        </TabPanel>
                        <TabPanel value={vehicleFormValue} index={2}>

                        </TabPanel>
                    </Stack>
                </TabPanel>
                {/*----------------------------------schedule-------------------------*/}
                <TabPanel value={value} index={10}>
                    <Stack>
                        <Calendar selectRange={true}/>
                    </Stack>
                </TabPanel>
            </Box>
        </Box>
    );
}


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

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
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

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
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
