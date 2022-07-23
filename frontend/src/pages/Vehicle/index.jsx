import React from "react";
import {Component} from "react";
import Grid from "@mui/material/Grid";
import VehicleCard from "../../components/Card/VehicleCard";
import vehicleImg1 from "../../assets/images/vehicles/v1f.jpg";
import vehicleImg2 from "../../assets/images/vehicles/v2f.jpg";
import Box from "@mui/material/Box";
import {withStyles} from "@mui/styles";
import {styleSheet} from "./style";
import VehicleService from "../../service/VehicleService";


class Vehicle extends Component{

    constructor(props) {
        super(props);
        this.state={
            vehicle: {
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
            },
            vehicleList:[]
        }
    }


    async loadData() {
        let res = await VehicleService.fetchVehicles();
        if (res.status === 200) {
            this.setState({
                vehicleList: res.data.data
            })
            console.log("res: " + JSON.stringify(res.data.data))

        } else {
            console.log("fetching error: " + res)
        }
    }

    componentDidMount() {
        this.loadData();
    }


    render() {
        let {classes} = this.props;

        return(
            <div >
                <h2 className={classes.vehicle__tittle}>VEHICLE FLEET</h2>
                <Box  sx={{flexGrow:1,marginTop:12}}>
                    <Grid  className={classes.vehicle__card_box} container spacing={{ xs: 1, md: 2 }} columns={{ md: 8 }}>

                        {this.state.vehicleList.map(d => <VehicleCard getVehicle={d} imgSrc={vehicleImg1}
                                                                      userSignIn={false}/>)}

                    </Grid>
                </Box>
            </div>
        );
    }
}
export default withStyles(styleSheet)(Vehicle)