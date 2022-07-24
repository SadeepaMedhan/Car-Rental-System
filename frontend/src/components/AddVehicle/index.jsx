import React from "react";
import {Component} from "react";
import {withStyles} from "@mui/styles";
import {styleSheet} from "./style";
import Divider from "@mui/material/Divider";
import {Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import VehicleService from "../../service/VehicleService";
import {useTheme} from "@mui/material/styles";


class AddVehicle extends Component{

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
                maintenanceMileage:'5000',
                status:'Available'
            },
            btnState:props.btnState,
            selectVehicle:props.vehicleData,
        }
    }

    clearData = () =>{
        this.setState({
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
                maintenanceMileage:'5000',
                status:'Available'
            },
            selectVehicle:null,
        })
    }

    async loadData() {
        if(this.state.btnState === "Save"){
            let res = await VehicleService.fetchNewId();
            if (res.status === 200) {
                let tempVehicle = this.state.vehicle
                tempVehicle.vehicleId = res.data.data
                this.setState({
                    vehicle: tempVehicle
                })
                console.log("res: " + JSON.stringify(res.data.data))

            } else {
                console.log("fetching error: " + res)
            }
        }else{
            if(this.state.selectVehicle !== null){
                this.setState({
                    vehicle: this.state.selectVehicle
                })
            }

        }

    }

    componentDidMount() {
        this.loadData();
    }


    render() {
        let {classes} = this.props;

        const saveVehicle = async () => {
            if(this.state.btnState === "Save") {
                console.log(this.state.vehicle)

                let formData = this.state.vehicle
                let response = await VehicleService.createVehicle(formData);
                if (response.status === 201) {
                    console.log("saved !")
                    this.clearData()
                } else {
                    console.log(response.data)
                }
            }else{
                //console.log(this.state.vehicle)

                let formData = this.state.vehicle
                let response = await VehicleService.updateVehicle(formData);
                if (response.status === 200) {
                    console.log("updated !")
                    this.clearData()
                } else {
                    console.log(response.data)
                }
            }
        };


        return(
            <Stack style={{border:'1px solid gray', padding:'10px',borderRadius:'8px'}}>
                <h2>{this.state.btnState} Vehicle</h2><p>{this.state.vehicle.vehicleId}</p>
                <Divider />
                <Stack direction="row" justifyContent="flex-start" alignItems="center"
                       spacing={2} style={{ height:'100px'}}>
                    <TextField value={this.state.vehicle.regNo} id="outlined-basic" label="regNo" variant="outlined" onChange={(e) => {
                                   let formData = this.state.vehicle
                                   formData.regNo = e.target.value
                                   this.setState({ formData })
                               }}/>
                    <TextField value={this.state.vehicle.brand} id="outlined-basic" label="brand" variant="outlined" onChange={(e) => {
                        let formData = this.state.vehicle
                        formData.brand = e.target.value
                        this.setState({ formData })
                    }}/>
                    <TextField value={this.state.vehicle.type} id="outlined-basic" label="type" variant="outlined" onChange={(e) => {
                        let formData = this.state.vehicle
                        formData.type = e.target.value
                        this.setState({ formData })
                    }} />
                    <TextField value={this.state.vehicle.noOfPassenger} id="outlined-basic" label="noOfPassenger" variant="outlined" onChange={(e) => {
                        let formData = this.state.vehicle
                        formData.noOfPassenger = e.target.value
                        this.setState({ formData })
                    }}/>
                </Stack>

                <Stack direction="row" justifyContent="flex-start"
                       alignItems="center"
                       spacing={2} style={{ height:'100px'}}>
                    <TextField value={this.state.vehicle.color} id="outlined-basic" label="color" variant="outlined" onChange={(e) => {
                        let formData = this.state.vehicle
                        formData.color = e.target.value
                        this.setState({ formData })
                    }}/>
                    <TextField value={this.state.vehicle.transmissionType} id="outlined-basic" label="transmissionType" variant="outlined" onChange={(e) => {
                        let formData = this.state.vehicle
                        formData.transmissionType = e.target.value
                        this.setState({ formData })
                    }} />
                    <TextField value={this.state.vehicle.fuelType} id="outlined-basic" label="fuelType" variant="outlined" onChange={(e) => {
                        let formData = this.state.vehicle
                        formData.fuelType = e.target.value
                        this.setState({ formData })
                    }}/>
                    <TextField value={this.state.vehicle.maintenanceMileage} id="outlined-basic" label="maintenanceMileage" variant="outlined" onChange={(e) => {
                        let formData = this.state.vehicle
                        formData.maintenanceMileage = e.target.value
                        this.setState({ formData })
                    }}/>

                    <input
                        type="file"
                        name="myImage"
                        onClick={(event) => {
                            console.log(event.target)
                        }}
                    />

                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="flex-start"
                       alignItems="center"
                       spacing={2} style={{ height:'100px'}}>
                    <TextField value={this.state.vehicle.dailyRate} id="outlined-basic" label="dailyRate" variant="outlined" onChange={(e) => {
                        let formData = this.state.vehicle
                        formData.dailyRate = e.target.value
                        this.setState({ formData })
                    }}/>
                    <TextField value={this.state.vehicle.monthlyRate} id="outlined-basic" label="monthlyRate" variant="outlined" onChange={(e) => {
                        let formData = this.state.vehicle
                        formData.monthlyRate = e.target.value
                        this.setState({ formData })
                    }}/>
                    <TextField value={this.state.vehicle.freeMileageDay} id="outlined-basic" label="freeMileageDay" variant="outlined" onChange={(e) => {
                        let formData = this.state.vehicle
                        formData.freeMileageDay = e.target.value
                        this.setState({ formData })
                    }}/>
                    <TextField value={this.state.vehicle.freeMileageMonth} id="outlined-basic" label="freeMileageMonth" variant="outlined" onChange={(e) => {
                        let formData = this.state.vehicle
                        formData.freeMileageMonth = e.target.value
                        this.setState({ formData })
                    }}/>
                    <TextField value={this.state.vehicle.priceExtraKM} id="outlined-basic" label="priceExtraKM" variant="outlined" onChange={(e) => {
                        let formData = this.state.vehicle
                        formData.priceExtraKM = e.target.value
                        this.setState({ formData })
                    }} />
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="flex-end"
                       alignItems="center"
                       spacing={2} style={{ height:'80px'}}>
                    <Button autoFocus color="info" variant="contained" style={{fontWeight:'bold', width:'95px',borderRadius:15 }}>
                        Clear
                    </Button>
                    <Button onClick={saveVehicle} disabled={this.state.selectVehicle === null} color="primary" variant="contained" style={{fontWeight:'bold', width:'95px',borderRadius:15 }}>
                        {this.state.btnState}
                    </Button>
                </Stack>
            </Stack>
        );
    }
}
export default withStyles(styleSheet)(AddVehicle)