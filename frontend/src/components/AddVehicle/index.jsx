import React, {Component} from "react";
import {withStyles} from "@mui/styles";
import {styleSheet} from "./style";
import Divider from "@mui/material/Divider";
import {LinearProgress, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import VehicleService from "../../service/VehicleService";
import UploadService from "../../service/UploadFilesService";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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


class AddVehicle extends Component {

    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);

        this.state = {
            vehicle: {
                vehicleId: '',
                regNo: '',
                brand: '',
                type: '',
                noOfPassenger: '',
                transmissionType: '',
                fuelType: '',
                dailyRate: '',
                monthlyRate: '',
                freeMileageDay: '',
                freeMileageMonth: '',
                priceExtraKM: '',
                color: '',
                maintenanceMileage: '5000',
                status: 'Available',
                imgUrl1: '',
                imgUrl2: '',
                imgUrl3: '',
                imgUrl4: '',

            },
            btnState: props.btnState,
            selectVehicle: props.vehicleData,

            currentFile: undefined,
            image1: undefined,
            image2: undefined,
            image3: undefined,
            image4: undefined,
            progress: 0,
            imageList: [],
            message: "",
            isError: false,
            imageInfos: [],
        }
    }

    clearData = () => {

        this.setState({
            vehicle: {
                vehicleId: '',
                regNo: '',
                brand: '',
                type: '',
                noOfPassenger: '',
                transmissionType: '',
                fuelType: '',
                dailyRate: '',
                monthlyRate: '',
                freeMileageDay: '',
                freeMileageMonth: '',
                priceExtraKM: '',
                color: '',
                maintenanceMileage: '5000',
                status: 'Available',
                imgUrl1: '',
                imgUrl2: '',
                imgUrl3: '',
                imgUrl4: '',
            },
            imageList: []
        })
    }

    async loadData() {
        if (this.state.btnState === "Save") {
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
        } else {
            if (this.state.selectVehicle !== null) {
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
        console.log(event.target.files)
        if (event.target.files.length > 0) {
            this.setState({image1: event.target.files[0]});
        }
        if (event.target.files.length > 1) {
            this.setState({image2: event.target.files[1]});
        }
        if (event.target.files.length > 2) {
            this.setState({image3: event.target.files[2]});
        }
        if (event.target.files.length > 3) {
            this.setState({image4: event.target.files[3]});
        }
        this.setState({
            imageList: event.target.files,
            currentFile: event.target.files[0],
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
        let baseUrl = "http://localhost:8080/backend_war/uploads/"

        const {
            currentFile,
            image1,
            image2,
            image3,
            image4,
            progress,
            message,
            imageInfos,
            isError,
            imageList
        } = this.state;


        const saveVehicle = async () => {

            if (this.state.btnState === "Save") {
                console.log(this.state.vehicle)

                let formData = this.state.vehicle
                formData.imgUrl1 = this.state.image1.name;
                formData.imgUrl2 = this.state.image2.name;
                formData.imgUrl3 = this.state.image3.name;
                formData.imgUrl4 = this.state.image4.name;
                let response = await VehicleService.createVehicle(formData);
                if (response.status === 201) {
                    console.log("saved !")
                    this.clearData()
                } else {
                    console.log(response.data)
                }
            } else {
                //console.log(this.state.vehicle)

                let formData = this.state.vehicle
                formData.imgUrl1 = this.state.currentFile.name;
                let response = await VehicleService.updateVehicle(formData);
                if (response.status === 200) {
                    console.log("updated !")
                    this.clearData()
                } else {
                    console.log(response.data)
                }
            }
        };


        return (
            <Stack spacing={4} style={{border: '1px solid gray', padding: '10px', borderRadius: '4px'}}
                   justifyContent="space-evenly"
                   direction="row" divider={<Divider orientation="vertical" flexItem/>}>
                <Stack >
                    <h2>{this.state.btnState} Vehicle</h2><p>{this.state.vehicle.vehicleId}</p>
                    <Divider/>
                    <Stack direction="row" justifyContent="flex-start" alignItems="center"
                           spacing={2} style={{height: '100px'}}>
                        <TextField value={this.state.vehicle.regNo} id="outlined-basic" label="Reg.No" variant="outlined"
                                   onChange={(e) => {
                                       let formData = this.state.vehicle
                                       formData.regNo = e.target.value
                                       this.setState({formData})
                                   }}/>
                        <TextField value={this.state.vehicle.brand} id="outlined-basic" label="Brand" variant="outlined"
                                   onChange={(e) => {
                                       let formData = this.state.vehicle
                                       formData.brand = e.target.value
                                       this.setState({formData})
                                   }}/>
                        <TextField value={this.state.vehicle.type} id="outlined-basic" label="Type" variant="outlined"
                                   onChange={(e) => {
                                       let formData = this.state.vehicle
                                       formData.type = e.target.value
                                       this.setState({formData})
                                   }}/>
                        <TextField value={this.state.vehicle.noOfPassenger} id="outlined-basic" label="No Of Passenger"
                                   variant="outlined" onChange={(e) => {
                            let formData = this.state.vehicle
                            formData.noOfPassenger = e.target.value
                            this.setState({formData})
                        }}/>



                    </Stack>

                    <Stack direction="row" justifyContent="flex-start"
                           alignItems="center"
                           spacing={2} style={{height: '100px'}}>
                        <TextField value={this.state.vehicle.color} id="outlined-basic" label="Color" variant="outlined"
                                   onChange={(e) => {
                                       let formData = this.state.vehicle
                                       formData.color = e.target.value
                                       this.setState({formData})
                                   }}/>
                        <TextField value={this.state.vehicle.transmissionType} id="outlined-basic"
                                   label="Transmission Type" variant="outlined" onChange={(e) => {
                            let formData = this.state.vehicle
                            formData.transmissionType = e.target.value
                            this.setState({formData})
                        }}/>
                        <TextField value={this.state.vehicle.fuelType} id="outlined-basic" label="Fuel Type"
                                   variant="outlined" onChange={(e) => {
                            let formData = this.state.vehicle
                            formData.fuelType = e.target.value
                            this.setState({formData})
                        }}/>
                        <TextField value={this.state.vehicle.maintenanceMileage} id="outlined-basic"
                                   label="Maintenance Mileage" variant="outlined" onChange={(e) => {
                            let formData = this.state.vehicle
                            formData.maintenanceMileage = e.target.value
                            this.setState({formData})
                        }}/>


                    </Stack>
                    <Divider/>
                    <Stack direction="row" justifyContent="flex-start"
                           alignItems="center"
                           spacing={2} style={{height: '100px'}}>
                        <TextField value={this.state.vehicle.dailyRate} id="outlined-basic" label="Daily Rate"
                                   variant="outlined" onChange={(e) => {
                            let formData = this.state.vehicle
                            formData.dailyRate = e.target.value
                            this.setState({formData})
                        }}/>
                        <TextField value={this.state.vehicle.monthlyRate} id="outlined-basic" label="Monthly Rate"
                                   variant="outlined" onChange={(e) => {
                            let formData = this.state.vehicle
                            formData.monthlyRate = e.target.value
                            this.setState({formData})
                        }}/>
                        <TextField value={this.state.vehicle.freeMileageDay} id="outlined-basic" label="Free Mileage Day"
                                   variant="outlined" onChange={(e) => {
                            let formData = this.state.vehicle
                            formData.freeMileageDay = e.target.value
                            this.setState({formData})
                        }}/>
                        <TextField value={this.state.vehicle.freeMileageMonth} id="outlined-basic"
                                   label="Free Mileage Month" variant="outlined" onChange={(e) => {
                            let formData = this.state.vehicle
                            formData.freeMileageMonth = e.target.value
                            this.setState({formData})
                        }}/>
                        <TextField value={this.state.vehicle.priceExtraKM} id="outlined-basic" label="Price Extra KM"
                                   variant="outlined" onChange={(e) => {
                            let formData = this.state.vehicle
                            formData.priceExtraKM = e.target.value
                            this.setState({formData})
                        }}/>
                    </Stack>
                    <Divider/>
                    <Stack direction="row" justifyContent="flex-end"
                           alignItems="center"
                           spacing={2} style={{height: '80px'}}>


                        <Button onClick={this.clearData} color="info" variant="contained"
                                style={{fontWeight: 'bold', width: '95px', borderRadius: 15}}>
                            Clear
                        </Button>
                        <Button onClick={saveVehicle} disabled={this.state.selectVehicle === null} color="primary"
                                variant="contained" style={{fontWeight: 'bold', width: '95px', borderRadius: 15}}>
                            {this.state.btnState}
                        </Button>

                    </Stack>
                </Stack>
                <Stack direction="column"
                       justifyContent="center"
                       alignItems="center"
                       spacing={2} sx={{margin: '0', padding: '10px', width:'400px'}}>
                    <label htmlFor="btn-upload">
                        <input
                            multiple
                            id="btn-upload"
                            name="btn-upload"
                            style={{display: 'none'}}
                            type="file"
                            accept="image/*"
                            onChange={this.selectFile}/>
                        <Button
                            className="btn-choose"
                            variant="outlined"
                            component="span">
                            Choose Image
                        </Button>
                    </label>
                    <Stack direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2} >
                        {image1 && (
                            <img height="80px" className="preview my20" src={URL.createObjectURL(image1)} alt=""/>
                        )}
                        {image2 && (
                            <img height="80px" className="preview my20" src={URL.createObjectURL(image2)} alt=""/>
                        )}
                        {this.state.btnState === "Update" && this.state.selectVehicle !== null &&
                            <img height="80px" className="preview my20" src={baseUrl+this.state.selectVehicle.imgUrl1} alt=""/>
                        }
                    </Stack>
                    <Stack direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}>
                        {image3 && (
                            <img height="80px" className="preview my20" src={URL.createObjectURL(image3)} alt=""/>
                        )}{image4 && (
                        <img height="80px" className="preview my20" src={URL.createObjectURL(image4)} alt=""/>
                    )}
                    </Stack>
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
                                <BorderLinearProgress variant="determinate" value={progress}/>
                            </Box>
                            <Box minWidth={35}>
                                <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
                            </Box>
                        </Box>)
                    }

                </Stack>

            </Stack>

        );
    }
}

export default withStyles(styleSheet)(AddVehicle)