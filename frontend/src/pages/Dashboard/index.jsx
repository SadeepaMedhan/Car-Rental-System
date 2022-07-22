import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import PeopleIcon from '@mui/icons-material/People';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EventIcon from '@mui/icons-material/Event';
import backImg2 from "../../assets/images/dashBack3.webp";
import {
    Avatar,
    InputAdornment,
    Paper,
    Stack, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip
} from "@mui/material";
import SmallVehicleCard from "../../components/Card/smallVehicleCard";
import ImageIcon from '@mui/icons-material/Image';
import { DataGrid } from '@mui/x-data-grid';
import {styleSheet} from "./style";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HandymanIcon from '@mui/icons-material/Handyman';
import BadgeIcon from '@mui/icons-material/Badge';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import AddVehicle from "../../components/AddVehicle";
import VehicleService from "../../service/VehicleService";
import {useEffect} from "react";
import Grid from "@mui/material/Grid";
import VehicleCard from "../../components/Card/VehicleCard";
import vehicleImg1 from "../../assets/images/vehicles/v1f.jpg";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

export default function Dashboard() {
    let classes = styleSheet();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [vehicleFormValue, setVehicleFormValue] = React.useState(0);
    const [tittle, setTittle] = React.useState("Dashboard");
    const [selectImg, setSelectImg] = React.useState(null);

    const vehicleFormHandleChange = (event, newValue) => {
        setVehicleFormValue(newValue);
    };
        const handleChange = (event, newValue) => {
        setValue(newValue);

        function getTittle(newValue) {
            switch (newValue) {
                case 0: return"Dashboard"
                case 1: return"Booking Management"
                case 2: return"Vehicle Management"
                case 3: return"Driver Management"
                case 4: return"Customer Management"
                case 5: return"Reports"
                case 7: return"Checking Requests"
                case 8: return"Vehicle Maintenance"
                case 9: return"Damages"
                case 10: return"Schedule"
                default: return"Dashboard"
            }
        }

        setTittle(getTittle(newValue))


    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onFileChange = (event) => {
        setSelectImg(event.target.files[0])

    };

    const imageUploadHandle = () => {
        const  formData = new FormData();
        formData.append("CarImg", selectImg);
    }


    const loadData = async () => {
        let res = await VehicleService.fetchVehicles();
        if (res.status === 200) {
            vehicleList = res.data.data

            console.log("res: " + JSON.stringify(res.data.data))



        } else {
            console.log("fetching error: " + res)
        }
    }

    useEffect(() =>  {
        loadData();
    });

    return (
        <Box sx={{ display: 'flex' }} >
            <img src={backImg2} style={{
                position:"fixed",
                width: '100vw',
                height:'100vh',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                opacity:'30%',
            }}/>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
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
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}>


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
                            <Table/>
                        </Stack>
                    </Stack>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <Stack>

                    </Stack>
                </TabPanel>

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
                            <Tab value={2} label="Other" />
                        </Tabs>

                        <TabPanel value={vehicleFormValue} index={0}>
                            <Table/>
                        </TabPanel>
                        <TabPanel value={vehicleFormValue} index={1}>
                            <AddVehicle/>
                        </TabPanel>
                        <TabPanel value={vehicleFormValue} index={2}>
                            <Table/>
                        </TabPanel>



                    </Stack>
                </TabPanel>
                <TabPanel value={value} index={3}></TabPanel>
                <TabPanel value={value} index={4}></TabPanel>
                <TabPanel value={value} index={5}></TabPanel>
                <TabPanel value={value} index={6}></TabPanel>
                <TabPanel value={value} index={7}></TabPanel>
                <TabPanel value={value} index={8}></TabPanel>
                <TabPanel value={value} index={9}></TabPanel>


            </Box>
        </Box>
    );
}


const vehicle= {
        vehicleId:'',
        regNo:'',
        brand:'',
        type:'',
        noOfPassenger:'',
        transmissionType:'',
        fuelType:'',
        dailyRate:'',
        monthlyRate:'',
        freeMileageDay:'',
        freeMileageMonth:'',
        priceExtraKM:'',
        color:'',
        maintenanceMileage:'',
        status:''
};
let vehicleList=[];


function Table() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customer table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Customer Id</TableCell>
                        <TableCell align="left">Customer Name</TableCell>
                        <TableCell align="left">Customer Address</TableCell>
                        <TableCell align="left">Customer Salary</TableCell>
                        <TableCell align="left">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        vehicleList.map((row) => (
                            <TableRow>
                                <TableCell align="left">aassad</TableCell>
                                <TableCell align="left">aassad</TableCell>
                                <TableCell align="left">aassad</TableCell>
                                <TableCell align="left">aassad</TableCell>

                                <TableCell align="left">
                                    <Tooltip title="Edit">
                                        <IconButton
                                            onClick={() => {
                                                console.log("edit icon clicked!")

                                            }}
                                        >
                                            <EditIcon color="primary" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            onClick={() => {

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