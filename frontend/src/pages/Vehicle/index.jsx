import React from "react";
import {Component} from "react";
import Grid from "@mui/material/Grid";
import VehicleCard from "../../components/Card";
import vehicleImg1 from "../../assets/images/vehicles/v1f.jpg";
import vehicleImg2 from "../../assets/images/vehicles/v2f.jpg";
import Box from "@mui/material/Box";
import {withStyles} from "@mui/styles";
import {styleSheet} from "./style";

class Vehicle extends Component{

    constructor(props) {
        super(props);
        this.state={
        }
    }
    render() {
        let {classes} = this.props;

        return(
            <div >

                <Box className={classes.vehicle__card_box} sx={{flexGrow:1,marginTop:10}}>
                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ md: 8 }}>
                        <Grid item xs={6} >
                            <VehicleCard imgSrc={vehicleImg1} name={"Toyota Premio"}/>
                        </Grid>
                        <Grid item xs={6} >
                            <VehicleCard imgSrc={vehicleImg2} name={"Suzuki Alto K10"}/>
                        </Grid>
                        <Grid item xs={6} >
                            <VehicleCard imgSrc={vehicleImg1} name={"Toyota Premio"}/>
                        </Grid>
                        <Grid item xs={6} >
                            <VehicleCard imgSrc={vehicleImg2} name={"Suzuki Alto K10"}/>
                        </Grid>

                    </Grid>
                </Box>
            </div>
        );
    }
}
export default withStyles(styleSheet)(Vehicle)