import React from "react";
import {Component} from "react";
import {withStyles} from "@mui/styles";
import {styleSheet} from "./style";
import Divider from "@mui/material/Divider";
import {Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import CustomerService from "../../service/CustomerService";


class CustomerManage extends Component{

    constructor(props) {
        super(props);
        this.state={
            customer: {
                cusID: '',
                cusName: '',
                cusEmail: '',
                cusPassword: '',
                cusNIC: '',
                cusDrivingLicenseNo: '',
                cusAddress: '',
                cusContactNo: ''
            },
            btnState:props.btnState,
            selectCustomer:props.customerData,

            images:[],
            imageURLs:[],

        }
    }


    clearData = () =>{
        this.setState({
            customer: {
                cusID: '',
                cusName: '',
                cusEmail: '',
                cusPassword: '',
                cusNIC: '',
                cusDrivingLicenseNo: '',
                cusAddress: '',
                cusContactNo: ''
            },
            selectCustomer:null,
        })
    }

    async loadData() {
        if(this.state.btnState === "Save"){
            let res = await CustomerService.fetchNewId();
            if (res.status === 200) {
                let tempCustomer = this.state.customer
                tempCustomer.cusID = res.data.data
                this.setState({
                    customer: tempCustomer
                })
                console.log("res: " + JSON.stringify(res.data.data))

            } else {
                console.log("fetching error: " + res)
            }
        }else{
            if(this.state.selectCustomer !== null){
                this.setState({
                    customer: this.state.selectCustomer
                })
            }

        }

    }

    componentDidMount() {
        this.loadData();
        if (!this.state.images.length<1){
            const newImgUrls = [];
            this.state.images.forEach(image=>newImgUrls.push(URL.createObjectURL(image)));
            this.setState({imageURLs:newImgUrls})
        }
    }




    render() {

        const onImageChange = (e) => {
            this.setState({images: [...e.target.files]})
        }

        const saveCustomer = async () => {
            if(this.state.btnState === "Save") {
                console.log(this.state.customer)

                let formData = this.state.customer
                let response = await CustomerService.createCustomer(formData);
                if (response.status === 201) {
                    console.log("saved !")
                    this.clearData()
                } else {
                    console.log(response.data)
                }
            }else{
                let formData = this.state.customer
                let response = await CustomerService.updateCustomer(formData);
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
                <h2>{this.state.btnState} Customer</h2><p>{this.state.customer.cusID}</p>
                <Divider />
                <Stack direction="row" justifyContent="flex-start" alignItems="center"
                       spacing={2} style={{ height:'100px'}}>
                    <TextField value={this.state.customer.cusName} id="outlined-basic" label="Name" variant="outlined"
                               onChange={(e) => {
                                   let formData = this.state.customer
                                   formData.cusName = e.target.value
                                   this.setState({ formData })}}/>
                    <TextField value={this.state.customer.cusAddress} id="outlined-basic" label="Address" variant="outlined"
                               onChange={(e) => {
                                   let formData = this.state.customer
                                   formData.cusAddress = e.target.value
                                   this.setState({ formData })}}/>
                    <TextField value={this.state.customer.cusNIC} id="outlined-basic" label="NIC Number" variant="outlined"
                               onChange={(e) => {
                                   let formData = this.state.customer
                                   formData.cusNIC = e.target.value
                                   this.setState({ formData })}}/>

                    <input type="file" multiple accept="image/*" onChange={onImageChange}/>
                    {this.state.imageURLs.map(imageSrc => <img src={imageSrc}/>)}

                </Stack>

                <Stack direction="row" justifyContent="flex-start"
                       alignItems="center"
                       spacing={2} style={{ height:'100px'}}>
                    <TextField value={this.state.customer.cusEmail} id="outlined-basic" label="E-mail Address" variant="outlined"
                               onChange={(e) => {
                                   let formData = this.state.customer
                                   formData.cusEmail = e.target.value
                                   this.setState({ formData })}}/>
                    <TextField value={this.state.customer.cusContactNo} id="outlined-basic" label="Contact" variant="outlined"
                               onChange={(e) => {
                                   let formData = this.state.customer
                                   formData.cusContactNo = e.target.value
                                   this.setState({ formData })}}/>
                    <TextField value={this.state.customer.cusDrivingLicenseNo} id="outlined-basic" label="Driving License No" variant="outlined"
                               onChange={(e) => {
                                   let formData = this.state.customer
                                   formData.cusDrivingLicenseNo = e.target.value
                                   this.setState({ formData })}}/>


                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="flex-start"
                       alignItems="center"
                       spacing={2} style={{ height:'100px'}}>
                    <TextField value={this.state.customer.cusPassword} id="outlined-basic" label="Password" variant="outlined"
                               onChange={(e) => {
                                   let formData = this.state.customer
                                   formData.cusPassword = e.target.value
                                   this.setState({ formData })}}/>
                    <TextField value={this.state.customer.cusPassword} id="outlined-basic" label="Confirm Password" variant="outlined"
                               onChange={(e) => {
                                   let formData = this.state.customer
                                   formData.cusPassword = e.target.value
                                   this.setState({ formData })}}/>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="flex-end"
                       alignItems="center"
                       spacing={2} style={{ height:'80px'}}>
                    <Button autoFocus color="info" variant="contained" style={{fontWeight:'bold', width:'95px',borderRadius:15 }}>
                        Clear
                    </Button>
                    <Button onClick={saveCustomer} disabled={this.state.selectCustomer === null} color="primary" variant="contained" style={{fontWeight:'bold', width:'95px',borderRadius:15 }}>
                        {this.state.btnState}
                    </Button>
                </Stack>
            </Stack>
        );
    }
}
export default withStyles(styleSheet)(CustomerManage)