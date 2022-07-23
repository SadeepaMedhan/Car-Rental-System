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

export default function Dashboard() {
    let classes = styleSheet();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [tittle, setTittle] = React.useState("Dashboard");
    const [selectImg, setSelectImg] = React.useState(null);
    const [vehicleList, setVehicleList] = React.useState([]);
    const [driversList, setDriversList] = React.useState([]);
    const [selectVehicle, setSelectVehicle] = React.useState(null);
    const [selectDriver, setSelectDriver] = React.useState(null);
    const [vehicleFormValue, setVehicleFormValue] = React.useState(0);
    const [driversFormValue, setDriversFormValue] = React.useState(0);



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
                            <Tab value={0} label="All" />
                            <Tab value={1} label="Add New Vehicle" />
                            <Tab value={2} label="Update Vehicle" />
                        </Tabs>
                    </Stack>
                </TabPanel>
                {/*-----------------------------------vehicle-------------------------*/}
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
                                                                   deleteVehicle(row.vehicleId)
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
                {/*-----------------------------------driver---------------------------*/}
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
                                                                    deleteDrivers(row.driverID)
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
                {/*-----------------------------------customer-------------------------*/}
                <TabPanel value={value} index={4}>
                    <Stack >
                        <Tabs
                            value={vehicleFormValue}
                            onChange={vehicleFormHandleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value={0} label="All" />
                            <Tab value={1} label="Add New Customer" />
                            <Tab value={2} label="Update Customer" />
                        </Tabs>

                        <TabPanel value={vehicleFormValue} index={0}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="customer table">
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
                                                                    deleteVehicle(row.vehicleId)
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
                <TabPanel value={value} index={5}></TabPanel>
                <TabPanel value={value} index={6}></TabPanel>
                <TabPanel value={value} index={7}></TabPanel>
                <TabPanel value={value} index={8}></TabPanel>
                <TabPanel value={value} index={9}></TabPanel>


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
