import React from 'react';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions, Rating, Stack} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import NoiseControlOffIcon from '@mui/icons-material/NoiseControlOff';

import {Component} from "react";
import {styleSheet} from "./style";
import {withStyles} from "@mui/styles";
import Button from "@mui/material/Button";


class MediumVehicleCard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            vehicle:props.setV,
            user:props.userSignIn,
        }
    }


    vehicleSelect = () => {
        console.log(this.state.vehicle.vehicleId)
        console.log("go booking")
        this.props.setVehicleId(this.state.vehicle)
    }



    render() {
        let {classes} = this.props;
        let baseUrl = "http://localhost:8080/backend/uploads/"

        return (
            <div >
                <Stack className={classes.card_box}
                       justifyContent="center" alignItems="stretch"
                       direction='column'
                       sx={{ maxWidth: '345px' }}>

                    <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2} >
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <p className={classes.card_brand} >
                                {this.state.vehicle.brand}
                            </p>
                            <p className={classes.card_type} >{this.state.vehicle.type}</p>
                        </Stack>
                        <Stack  direction="row" justifyContent="center" alignItems="flex-start" spacing={1}>
                            <img className={classes.card_img} src={baseUrl+this.state.vehicle.imgUrl1} alt=""/>
                            <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                <IconButton>
                                    <PersonOutlineOutlinedIcon /><pre className={classes.card_prop_id}> : </pre>
                                    <span className={classes.card_prop_value}>{this.state.vehicle.noOfPassenger}</span>
                                </IconButton>
                                <IconButton>
                                    <LocalGasStationIcon /><pre className={classes.card_prop_id}> : </pre>
                                    <span className={classes.card_prop_value}>{this.state.vehicle.fuelType}</span>
                                </IconButton>
                            </Stack>
                        </Stack>
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                            <IconButton>
                                <SettingsSuggestIcon /><pre className={classes.card_prop_id}> : </pre>
                                <span className={classes.card_prop_value}>{this.state.vehicle.transmissionType}</span>
                            </IconButton>
                            <IconButton>
                                <AcUnitIcon /><pre className={classes.card_prop_id}> : </pre>
                                <span className={classes.card_prop_value}>Yes</span>
                            </IconButton>
                            <p className={classes.card_type} >LKR.{this.state.vehicle.dailyRate}</p>
                        </Stack>

                        <Stack direction="row" justifyContent="center" alignItems="flex-end" spacing={2} >
                            <Button size="small"
                                color="primary"
                                variant="outlined" onClick={this.vehicleSelect}>
                                View more
                            </Button>
                            <Button size="small"
                                color="primary"
                                variant="contained" onClick={this.vehicleSelect}>
                                Select Car
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </div>
        );
    }

}
export default withStyles(styleSheet)(MediumVehicleCard)
