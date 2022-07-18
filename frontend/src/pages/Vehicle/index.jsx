import React from "react";
import {Component} from "react";
import Grid from "@mui/material/Grid";
import VehicleCard from "../../components/Card";
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
        console.log('Screen Mounted!');
        this.loadData();
    }


    render() {
        let {classes} = this.props;

        return(
            <div >
                <h2 className={classes.vehicle__tittle}>VEHICLE FLEET</h2>
                <Box  sx={{flexGrow:1,marginTop:12}}>
                    <Grid  className={classes.vehicle__card_box} container spacing={{ xs: 1, md: 2 }} columns={{ md: 8 }}>
                        <Grid item xs={6} >
                            <VehicleCard
                                imgSrc={vehicleImg1}
                                brand={"WagonR"}
                                type={"General"}
                                noOfPassenger={"4"}
                                transmissionType={"Auto"}
                                fuelType={"Petrol"}
                                dailyRate={"vehicle.dailyRate"}
                                monthlyRate={"vehicle.monthlyRate"}
                                freeMileageDay={"vehicle.freeMileageDay"}
                                freeMileageMonth={"vehicle.freeMileageMonth"}
                                priceExtraKM={"vehicle.priceExtraKM"}
                                color={"vehicle.color"}
                                maintenanceMileage={"vehicle.maintenanceMileage"}
                                status={"vehicle.status"}
                            />
                        </Grid><Grid item xs={6} >
                            <VehicleCard
                                imgSrc={vehicleImg2}
                                brand={"WagonR"}
                                type={"General"}
                                noOfPassenger={"4"}
                                transmissionType={"Auto"}
                                fuelType={"Petrol"}
                                dailyRate={"vehicle.dailyRate"}
                                monthlyRate={"vehicle.monthlyRate"}
                                freeMileageDay={"vehicle.freeMileageDay"}
                                freeMileageMonth={"vehicle.freeMileageMonth"}
                                priceExtraKM={"vehicle.priceExtraKM"}
                                color={"vehicle.color"}
                                maintenanceMileage={"vehicle.maintenanceMileage"}
                                status={"vehicle.status"}
                            />
                        </Grid><Grid item xs={6} >
                            <VehicleCard
                                imgSrc={vehicleImg1}
                                brand={"WagonR"}
                                type={"General"}
                                noOfPassenger={"4"}
                                transmissionType={"Auto"}
                                fuelType={"Petrol"}
                                dailyRate={"vehicle.dailyRate"}
                                monthlyRate={"vehicle.monthlyRate"}
                                freeMileageDay={"vehicle.freeMileageDay"}
                                freeMileageMonth={"vehicle.freeMileageMonth"}
                                priceExtraKM={"vehicle.priceExtraKM"}
                                color={"vehicle.color"}
                                maintenanceMileage={"vehicle.maintenanceMileage"}
                                status={"vehicle.status"}
                            />
                        </Grid><Grid item xs={6} >
                            <VehicleCard
                                imgSrc={vehicleImg2}
                                brand={"WagonR"}
                                type={"General"}
                                noOfPassenger={"4"}
                                transmissionType={"Auto"}
                                fuelType={"Petrol"}
                                dailyRate={"vehicle.dailyRate"}
                                monthlyRate={"vehicle.monthlyRate"}
                                freeMileageDay={"vehicle.freeMileageDay"}
                                freeMileageMonth={"vehicle.freeMileageMonth"}
                                priceExtraKM={"vehicle.priceExtraKM"}
                                color={"vehicle.color"}
                                maintenanceMileage={"vehicle.maintenanceMileage"}
                                status={"vehicle.status"}
                            />
                        </Grid><Grid item xs={6} >
                            <VehicleCard
                                imgSrc={vehicleImg1}
                                brand={"WagonR"}
                                type={"General"}
                                noOfPassenger={"4"}
                                transmissionType={"Auto"}
                                fuelType={"Petrol"}
                                dailyRate={"vehicle.dailyRate"}
                                monthlyRate={"vehicle.monthlyRate"}
                                freeMileageDay={"vehicle.freeMileageDay"}
                                freeMileageMonth={"vehicle.freeMileageMonth"}
                                priceExtraKM={"vehicle.priceExtraKM"}
                                color={"vehicle.color"}
                                maintenanceMileage={"vehicle.maintenanceMileage"}
                                status={"vehicle.status"}
                            />
                        </Grid>
                        {this.state.vehicleList.map((vehicle) => (
                            <Grid item xs={6} >
                                <VehicleCard
                                    imgSrc={vehicleImg1}
                                    brand={vehicle.brand}
                                    type={vehicle.type}
                                    noOfPassenger={vehicle.noOfPassenger}
                                    transmissionType={vehicle.transmissionType}
                                    fuelType={vehicle.fuelType}
                                    dailyRate={vehicle.dailyRate}
                                    monthlyRate={vehicle.monthlyRate}
                                    freeMileageDay={vehicle.freeMileageDay}
                                    freeMileageMonth={vehicle.freeMileageMonth}
                                    priceExtraKM={vehicle.priceExtraKM}
                                    color={vehicle.color}
                                    maintenanceMileage={vehicle.maintenanceMileage}
                                    status={vehicle.status}
                                />
                            </Grid>
                        ))}

                    </Grid>
                </Box>
            </div>
        );
    }
}
export default withStyles(styleSheet)(Vehicle)