import React, {Component} from "react";
import {Box, Typography} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Button, Input} from "@mui/joy";
import {styleSheet} from "./style";
import {withStyles} from "@mui/styles";
import {NavLink} from "react-router-dom";
import logo from "../../assets/images/logo6.jpg";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const pages = ['Vehicles', 'Customer', 'Booking', 'About', 'Income'];


class NavigationMenu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value:1,
            anchorElNav:null
        }
    }


    render() {
        let { classes } = this.props;

        const handleOpenNavMenu = (event) => {
            this.setState({anchorElNav : event.currentTarget});
        };

        const handleCloseNavMenu = () => {
            this.setState({anchorElNav : null});
        };


        const handleChange = (event, newValue) => {
            this.setState({value : newValue});
        };
        return (
            <div className={classes.navbar__div}>

                <Box  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
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
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                    <Typography width={"100%"}  textAlign="center">
                        <img className={classes.navbar__img} src={logo} alt=""/>
                    </Typography>
                </Box>

                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                </Typography>

                <Tabs sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} TabIndicatorProps={{style: {background:'#FCD903'}}} textColor={"inherit"} value={this.state.value} onChange={handleChange} aria-label="nav tabs example">
                    <img className={classes.navbar__img} src={logo} alt=""/>

                    <LinkTab  label="Vehicle" href="#" />
                    <LinkTab  label="Customer" href="#" />
                    <LinkTab  label="Bookings" href="#" />
                    <LinkTab  label="About" href="#" />
                    <LinkTab  label="Income" href="#" />
                </Tabs>
            </div>
        );
    }
}export default withStyles(styleSheet)(NavigationMenu)

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}

        />
    );
}