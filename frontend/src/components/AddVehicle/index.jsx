import React from "react";
import {Component} from "react";
import {withStyles} from "@mui/styles";
import {styleSheet} from "./style";
import Divider from "@mui/material/Divider";
import {LinearProgress, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import VehicleService from "../../service/VehicleService";
import {useTheme} from "@mui/material/styles";
import UploadImages from "../ImageUpload/UploadImages";
import UploadService from "../../service/UploadFilesService";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UploadFilesService from "../../service/UploadFilesService";

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 15,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: "#EEEEEE",
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);


class AddVehicle extends Component{

    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);

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
                status:'Available',
                imgUrl1:'',
                imgUrl2:'',
                imgUrl3:'',
                imgUrl4:'',
            },
            btnState:props.btnState,
            selectVehicle:props.vehicleData,

            currentFile: undefined,
            previewImage: undefined,
            progress: 0,

            message: "",
            isError: false,
            imageInfos: [],
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
                status:'Available',
                imgUrl1:'',
                imgUrl2:'',
                imgUrl3:'',
                imgUrl4:'',
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
        UploadService.getFiles().then((response) => {
            this.setState({
                imageInfos: response.data,
            });
        });
    }
    selectFile(event) {
        console.log(event.target.files[0].name)
        this.setState({
            currentFile: event.target.files[0],
            previewImage: URL.createObjectURL(event.target.files[0]),
            progress: 0,
            message: ""
        });
    }

    upload() {
        this.setState({
            progress: 0
        });

        UploadService.upload(this.state.currentFile, (event) => {
            this.setState({
                progress: Math.round((100 * event.loaded) / event.total),
            });
        })
            .then((response) => {
                this.setState({
                    message: response.data.message,
                    isError: false
                });
                return UploadService.getFiles();
            })
            .then((files) => {
                this.setState({
                    imageInfos: files.data,
                });
            })
            .catch((err) => {
                this.setState({
                    progress: 0,
                    message: "Could not upload the image!",
                    currentFile: undefined,
                    isError: true
                });
            });
    }

    render() {
        let {classes} = this.props;

        const {
            currentFile,
            previewImage,
            progress,
            message,
            imageInfos,
            isError
        } = this.state;


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

                    <label htmlFor="btn-upload">
                        <input
                            multiple
                            id="btn-upload"
                            name="btn-upload"
                            style={{ display: 'none' }}
                            type="file"
                            accept="image/*"
                            onChange={this.selectFile} />
                        <Button
                            className="btn-choose"
                            variant="outlined"
                            component="span" >
                            Choose Image
                        </Button>
                    </label>

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
                    <Stack direction="row" justifyContent="flex-end"
                           alignItems="center"
                           spacing={2}>
                        {previewImage && (
                            <div>
                                <img height="80px" className="preview my20" src={previewImage} alt="" />
                            </div>
                        )}

                        {message && (
                            <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
                                {message}
                            </Typography>
                        )}
                        <Button
                            className="btn-upload"
                            color="primary"
                            variant="contained"
                            component="span"
                            disabled={!currentFile}
                            onClick={this.upload}>
                            Upload
                        </Button>
                        {currentFile && (
                            <Box className="my20" display="flex" alignItems="center">
                                <Box width="100px" mr={1}>
                                    <BorderLinearProgress variant="determinate" value={progress} />
                                </Box>
                                <Box minWidth={35}>
                                    <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
                                </Box>
                            </Box>)
                        }
                    </Stack>

                    <div className="file-name">
                        {currentFile ? currentFile.name : null}
                    </div>
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