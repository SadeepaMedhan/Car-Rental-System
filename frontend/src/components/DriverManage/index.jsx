import React from "react";
import {Component} from "react";
import {withStyles} from "@mui/styles";
import {styleSheet} from "./style";
import Divider from "@mui/material/Divider";
import {Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import DriverService from "../../service/DriverService";


class DriverManage extends Component{

    constructor(props) {
        super(props);
        this.state={
            driver: {
                driverID:'',
                name:'',
                address:'',
                nic:'',
                email:'',
                password:'',
                contact:'',
                age:'',
                salary:'1500',
                status:'Available'
            },
            btnState:props.btnState,
            selectDriver:props.driverData,
        }
    }

    clearData = () =>{
        this.setState({
            driver: {
                driverID:'',
                name:'',
                address:'',
                nic:'',
                email:'',
                password:'',
                contact:'',
                age:'',
                salary:'1500',
                status:'Available'
            },
            selectDriver:null,
        })
    }

    async loadData() {
        if(this.state.btnState === "Save"){
            let res = await DriverService.fetchNewId();
            if (res.status === 200) {
                let tempDriver = this.state.driver
                tempDriver.driverID = res.data.data
                this.setState({
                    driver: tempDriver
                })
                console.log("res: " + JSON.stringify(res.data.data))

            } else {
                console.log("fetching error: " + res)
            }
        }else{
            if(this.state.selectDriver !== null){
                this.setState({
                    driver: this.state.selectDriver
                })
            }

        }

    }

    componentDidMount() {
        this.loadData();
    }


    render() {

        const saveDriver = async () => {
            if(this.state.btnState === "Save") {
                console.log(this.state.driver)

                let formData = this.state.driver
                let response = await DriverService.postDriver(formData);
                if (response.status === 201) {
                    console.log("saved !")
                    this.clearData()
                } else {
                    console.log(response.data)
                }
            }else{
                //console.log(this.state.driver)

                let formData = this.state.driver
                let response = await DriverService.updateDriver(formData);
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
                <h2>{this.state.btnState} Driver</h2><p>{this.state.driver.driverID}</p>
                <Divider />
                <Stack direction="row" justifyContent="flex-start" alignItems="center"
                       spacing={2} style={{ height:'100px'}}>
                    <TextField value={this.state.driver.name} id="outlined-basic" label="Name" variant="outlined"
                               onChange={(e) => {
                                   let formData = this.state.driver
                                   formData.name = e.target.value
                                   this.setState({ formData })}}/>
                    <TextField value={this.state.driver.address} id="outlined-basic" label="Address" variant="outlined"
                               onChange={(e) => {
                                       let formData = this.state.driver
                                       formData.address = e.target.value
                                       this.setState({ formData })}}/>
                    <TextField value={this.state.driver.nic} id="outlined-basic" label="NIC Number" variant="outlined"
                               onChange={(e) => {
                                       let formData = this.state.driver
                                       formData.nic = e.target.value
                                       this.setState({ formData })}}/>

                </Stack>

                <Stack direction="row" justifyContent="flex-start"
                       alignItems="center"
                       spacing={2} style={{ height:'100px'}}>
                    <TextField value={this.state.driver.email} id="outlined-basic" label="E-mail Address" variant="outlined"
                               onChange={(e) => {
                                let formData = this.state.driver
                                formData.email = e.target.value
                                this.setState({ formData })}}/>
                    <TextField value={this.state.driver.contact} id="outlined-basic" label="Contact" variant="outlined"
                               onChange={(e) => {
                                let formData = this.state.driver
                                formData.contact = e.target.value
                                this.setState({ formData })}}/>
                    <TextField value={this.state.driver.age} id="outlined-basic" label="Age" variant="outlined"
                               onChange={(e) => {
                                let formData = this.state.driver
                                formData.age = e.target.value
                                this.setState({ formData })}}/>


                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="flex-start"
                       alignItems="center"
                       spacing={2} style={{ height:'100px'}}>
                    <TextField value={this.state.driver.password} id="outlined-basic" label="Password" variant="outlined" onChange={(e) => {
                        let formData = this.state.driver
                        formData.password = e.target.value
                        this.setState({ formData })
                    }}/>
                    <TextField value={this.state.driver.password} id="outlined-basic" label="Confirm Password" variant="outlined" onChange={(e) => {
                        let formData = this.state.driver
                        formData.password = e.target.value
                        this.setState({ formData })
                    }}/>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="flex-end"
                       alignItems="center"
                       spacing={2} style={{ height:'80px'}}>
                    <Button autoFocus color="info" variant="contained" style={{fontWeight:'bold', width:'95px',borderRadius:15 }}>
                        Clear
                    </Button>
                    <Button onClick={saveDriver} disabled={this.state.selectDriver === null} color="primary" variant="contained" style={{fontWeight:'bold', width:'95px',borderRadius:15 }}>
                        {this.state.btnState}
                    </Button>
                </Stack>
            </Stack>
        );
    }
}
export default withStyles(styleSheet)(DriverManage)