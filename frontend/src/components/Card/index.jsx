import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Rating} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TransformOutlinedIcon from '@mui/icons-material/TransformOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
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
                <Grid container spacing={2}  className={classes.card_box}>
                    <Grid item xs className={classes.card_btn1_box}>
                        <img className={classes.card_img} src={this.props.imgSrc} alt=""/>
                    </Grid>

                    <Grid item xs>
                        <Grid>
                            <Typography className={classes.card_brand} sx={{ fontSize: { xs: '1.5em', md: '1.7em' } }} >
                                {this.props.brand}
                            </Typography>
                            <p className={classes.card_type} >{this.props.type}</p>
                            <div>
                                <IconButton>
                                    <PersonOutlineOutlinedIcon /><pre style={{ fontSize:'0.75em'}}> Seating Capacity : </pre>
                                    <span style={{ fontSize:'0.75em'}}>{this.props.noOfPassenger}</span>
                                </IconButton>
                                <IconButton>
                                    <LocalGasStationIcon /><pre style={{ fontSize:'0.75em'}}> Fuel Type : </pre>
                                    <span style={{ fontSize:'0.75em'}}>{this.props.fuelType}</span>
                                </IconButton>
                                <IconButton>
                                    <SettingsSuggestIcon /><pre style={{ fontSize:'0.75em'}}> Transmission : </pre>
                                    <span style={{ fontSize:'0.75em'}}>{this.props.fuelType}</span>
                                </IconButton>
                                <IconButton>
                                    <AcUnitIcon /><pre style={{ fontSize:'0.75em'}}> Air Condition : </pre>
                                    <span style={{ fontSize:'0.75em'}}>Yes</span>
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs className={classes.card_price}>
                        <Grid>
                            <div>
                                <IconButton>
                                    <NoiseControlOffIcon /><pre style={{ fontSize:'0.75em'}}> Daily Rate : </pre>
                                    <span style={{ fontSize:'0.75em'}}>{this.props.noOfPassenger}</span>
                                </IconButton>
                                <IconButton>
                                    <NoiseControlOffIcon /><pre style={{ fontSize:'0.75em'}}> Free KM for a Day : </pre>
                                    <span style={{ fontSize:'0.75em'}}>{this.props.fuelType}</span>
                                </IconButton>
                                <IconButton>
                                    <NoiseControlOffIcon /><pre style={{ fontSize:'0.75em'}}> Monthly Rate : </pre>
                                    <span style={{ fontSize:'0.75em'}}>{this.props.fuelType}</span>
                                </IconButton>
                                <IconButton>
                                    <NoiseControlOffIcon /><pre style={{ fontSize:'0.75em'}}> Free KM for a Month : </pre>
                                    <span style={{ fontSize:'0.75em'}}>Yes</span>
                                </IconButton>
                                <IconButton>
                                    <NoiseControlOffIcon /><pre style={{ fontSize:'0.75em'}}> Price per Extra KM : </pre>
                                    <span style={{ fontSize:'0.75em'}}>Yes</span>
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs className={classes.card_btn1_box}>
                        <Grid item className={classes.card_btn1}>
                            <Button
                                color="primary"
                                variant="contained"
                                sx={{ display: { xs: 'none', md: 'block' } }}
                            >
                                Select
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs className={classes.card_btn1_box}>
                    <Button  color="primary"
                             variant="contained"
                             sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        Select
                    </Button>
                </Grid>
            </div>
        );
    }

}
export default withStyles(styleSheet)(VehicleCard)
