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
import {Stack} from "@mui/material";
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


const btnArray1 = [
    { name:'Dashboard', icon: <DashboardIcon />},
    { name:'Booking', icon: <CollectionsBookmarkIcon />},
    { name:'Vehicle', icon: <DirectionsCarIcon />},
    { name:'Driver', icon: <PeopleIcon />},
    { name:'Customer', icon: <SwitchAccountIcon />},
    { name:'Reports', icon: <LeaderboardIcon />}
];

const btnArray2 = [
    { name:'Requests', icon: <DashboardIcon />},
    { name:'Maintenance', icon: <CollectionsBookmarkIcon />},
    { name:'Damages', icon: <DirectionsCarIcon />},
    { name:'Schedule', icon: <PeopleIcon />}
];

const drawerWidth = 240;

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
                        Dashboard
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


                    <Tab icon={<DashboardIcon />} iconPosition="start" label="Dashboard" {...a11yProps(0)} />
                    <Tab icon={<CollectionsBookmarkIcon />} iconPosition="start" label="Booking" {...a11yProps(0)} />
                    <Tab icon={<DirectionsCarIcon />} iconPosition="start" label="Vehicle" {...a11yProps(0)} />
                    <Tab icon={<PeopleIcon />} iconPosition="start" label="Driver" {...a11yProps(0)} />
                    <Tab icon={<SwitchAccountIcon />} iconPosition="start" label="Customer" {...a11yProps(0)} />
                    <Tab icon={<LeaderboardIcon />} iconPosition="start" label="Reports" {...a11yProps(0)} />


                </Tabs>
                <Divider />
                <List>
                    {btnArray2.map((element, index) => (
                        <ListItem key={element.name} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {element.icon}
                                </ListItemIcon>
                                <ListItemText primary={element.name} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
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

            </Box>
        </Box>
    );
}

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: false,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
function Table() {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
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