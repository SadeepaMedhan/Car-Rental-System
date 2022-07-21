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

class VehicleCard extends Component{

    constructor(props) {
        super(props);
    }


    render() {

        let {classes} = this.props;

        return (
            <div /*sx={{ maxWidth: 345 }}*/>
                <Stack className={classes.card_box}
                       justifyContent="center" alignItems="stretch"
                       direction={{ xs: 'column', sm: 'row' }}
                       spacing={{ xs: 1, sm: 2, md: 4 }}>

                        <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2}>
                            <div>
                                <Typography className={classes.card_brand} sx={{ fontSize: { xs: '1.5em', md: '1.7em' } }} >
                                    {this.props.brand}
                                </Typography>
                                <p className={classes.card_type} >{this.props.type}</p>
                            </div>
                            <div>
                                <img className={classes.card_img} src={this.props.imgSrc} alt=""/>
                            </div>

                        </Stack>
                    <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2}>
                        <IconButton>
                            <PersonOutlineOutlinedIcon /><pre className={classes.card_prop_id}> Seating Capacity : </pre>
                            <span className={classes.card_prop_value}>{this.props.noOfPassenger}</span>
                        </IconButton>
                        <IconButton>
                            <LocalGasStationIcon /><pre className={classes.card_prop_id}> Fuel Type : </pre>
                            <span className={classes.card_prop_value}>{this.props.fuelType}</span>
                        </IconButton>
                        <IconButton>
                            <SettingsSuggestIcon /><pre className={classes.card_prop_id}> Transmission : </pre>
                            <span className={classes.card_prop_value}>{this.props.fuelType}</span>
                        </IconButton>
                        <IconButton>
                            <AcUnitIcon /><pre className={classes.card_prop_id}> Air Condition : </pre>
                            <span className={classes.card_prop_value}>Yes</span>
                        </IconButton>
                    </Stack>


                        <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2}>
                            <IconButton>
                                <NoiseControlOffIcon /><pre className={classes.card_prop_id}> Daily Rate : </pre>
                                <span className={classes.card_prop_value}>{this.props.dailyRate}</span>
                            </IconButton>
                            <IconButton>
                                <NoiseControlOffIcon /><pre className={classes.card_prop_id}> Free KM for a Day : </pre>
                                <span className={classes.card_prop_value}>{this.props.freeMileageDay}</span>
                            </IconButton>
                            <IconButton>
                                <NoiseControlOffIcon /><pre className={classes.card_prop_id}> Monthly Rate : </pre>
                                <span className={classes.card_prop_value}>{this.props.monthlyRate}</span>
                            </IconButton>
                            <IconButton>
                                <NoiseControlOffIcon /><pre className={classes.card_prop_id}> Free KM for a Month : </pre>
                                <span className={classes.card_prop_value}>{this.props.freeMileageMonth}</span>
                            </IconButton>
                            <IconButton>
                                <NoiseControlOffIcon /><pre className={classes.card_prop_id}> Price per Extra KM : </pre>
                                <span className={classes.card_prop_value}>{this.props.priceExtraKM}</span>
                            </IconButton>
                        </Stack>


                        <Stack direction="column" justifyContent="flex-end" alignItems="flex-end" spacing={2}>
                            <Button
                                color="primary"
                                variant="contained">
                                Select
                            </Button>
                        </Stack>

                </Stack>
            </div>
        );
    }

}
export default withStyles(styleSheet)(VehicleCard)
