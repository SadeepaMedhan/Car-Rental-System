import * as React from "react";
import {Component} from "react";
import logo from "../../assets/images/logo6.jpg";

import {styleSheet} from "./style";
import {withStyles} from "@mui/styles";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import {Typography} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const pages = ['About Us', 'Cars', 'Futures', 'Help'];


class MyNav extends Component{

    componentDidUpdate(prevProps, prevState, snapshot) {
        for (let i = 0; i < pages.length; i++) {
            if(this.state.value===i){
                console.log(pages[i]);
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            anchorElNav:null,
            value:0
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


        const handleChangeNav = (event, newValue) => {
            this.setState({value : newValue});
            console.log(newValue)
        };

        return(
            <div>
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
                                    <Typography textAlign="center"><a href="">{page}</a></Typography>
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


                    <Typography sx={{display: { xs: 'none', md: 'flex' },position:'absolute'}}  width={"100%"}  textAlign="center">
                        <img className={classes.navbar__img} src={logo} alt=""/>
                    </Typography>

                    <Tabs sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },marginLeft:'20%' }}
                          TabIndicatorProps={{style: {background:'#FCD903'}}}
                          textColor={"inherit"} value={this.state.value}
                          onChange={handleChangeNav}
                          aria-label="nav tabs"
                    >
                        {pages.map((page) => ( <a className={classes.navbar__tab} href={page}>{page}</a> ))}

                    </Tabs>
                </div>
            </div>
        )
    }
}

export default withStyles(styleSheet)(MyNav);

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