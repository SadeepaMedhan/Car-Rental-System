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
import {Stack} from "@mui/material";


class Vehicle extends Component{

    constructor(props) {
        super(props);
        this.state={
            vehicle: {
                vehicleId:'V002',
                regNo:'13123',
                brand:'Toyota',
                type:'General',
                noOfPassenger:'4',
                transmissionType:'Auto',
                fuelType:'Petrol',
                dailyRate:'',
                monthlyRate:'',
                freeMileageDay:'',
                freeMileageMonth:'',
                priceExtraKM:'',
                color:'White',
                maintenanceMileage:'',
                status:'Available'
            },
            vehicleList:[],
            user:props.signInUser,
            selectVehicleId:'',
        }
    }


    async loadData() {
        let res = await VehicleService.fetchVehicles();
        if (res.status === 200) {
            this.setState({
                vehicleList: JSON.stringify(res.data.data)
            })
            console.log("res: " + JSON.stringify(res.data.data))

        } else {
            console.log("fetching error: " + res)
        }
    }

    componentDidMount() {
       // this.loadData();
    }

    getVehicleData = (data) => {
        console.log("get v "+data)
        this.setState({selectVehicleId:data})
        this.props.setVehicle(data)
    }

    render() {
        let {classes} = this.props;

        return(
            <div >
                <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={2}>

                    <VehicleCard setV={this.state.vehicle} imgSrc={vehicleImg1} userSignIn={this.state.user} setVehicleId={this.getVehicleData.bind(this)} />
                    <VehicleCard setV={this.state.vehicle} imgSrc={vehicleImg2} userSignIn={this.state.user} setVehicleId={this.getVehicleData.bind(this)} />
                    <VehicleCard setV={this.state.vehicle} imgSrc={vehicleImg1} userSignIn={this.state.user} setVehicleId={this.getVehicleData.bind(this)} />
                    {/*  {this.state.vehicleList.map(d => <VehicleCard getVehicle={d} imgSrc={vehicleImg1}
                                                                      userSignIn={false}/>)}*/}
                </Stack>
            </div>
        );
    }
}
export default withStyles(styleSheet)(Vehicle)