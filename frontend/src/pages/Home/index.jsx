import * as React from "react";
import {Component} from "react";
import VehicleCard from "../../components/Card";
import vehicleImg1 from "../../assets/images/vehicles/v1f.jpg"
import vehicleImg2 from "../../assets/images/vehicles/v2f.jpg"
import NavigationMenu from "../../components/Navbar";
import logo from "../../assets/images/logo6.jpg";

import {styleSheet} from "./style";
import {withStyles} from "@mui/styles";
import ResponsiveAppBar from "../../components/AppBar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

class HomePage extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        let { classes } = this.props;

        return(
            <div>
                <NavigationMenu/>

                <Box sx={{flexGrow:1,marginTop:10}}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={2} sm={4} md={4}>
                            <VehicleCard imgSrc={vehicleImg1} name={"Toyota Premio"}/>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                            <VehicleCard imgSrc={vehicleImg2} name={"Suzuki Alto K10"}/>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <VehicleCard imgSrc={vehicleImg1} name={"Toyota Premio"}/>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                            <VehicleCard imgSrc={vehicleImg2} name={"Suzuki Alto K10"}/>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <VehicleCard imgSrc={vehicleImg1} name={"Toyota Premio"}/>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                            <VehicleCard imgSrc={vehicleImg2} name={"Suzuki Alto K10"}/>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <VehicleCard imgSrc={vehicleImg1} name={"Toyota Premio"}/>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                            <VehicleCard imgSrc={vehicleImg2} name={"Suzuki Alto K10"}/>
                        </Grid>

                    </Grid>
                </Box>


            </div>
        )
    }
}

export default withStyles(styleSheet)(HomePage);