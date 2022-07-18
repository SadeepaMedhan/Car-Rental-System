import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TransformOutlinedIcon from '@mui/icons-material/TransformOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AcUnitIcon from '@mui/icons-material/AcUnit';

import {Component} from "react";
import {styleSheet} from "./style";
import {withStyles} from "@mui/styles";

class VehicleCard extends Component{

    constructor(props) {
        super(props);
    }


    render() {

        let {classes} = this.props;

        return (
            <div /*sx={{ maxWidth: 345 }}*/>
                <Grid container className={classes.card_box}>
                    <Grid item xs>
                        <img className={classes.card_img} src={this.props.imgSrc} alt=""/>
                    </Grid>

                    <Grid item xs>

                        <Grid>
                            <Typography className={classes.card_brand} sx={{ fontSize: { xs: '1.5em', md: '1.7em' } }} >
                                {this.props.brand}
                            </Typography>
                            <p className={classes.card_type} >{this.props.type}</p>
                            <div>
                                <IconButton aria-label="delete">
                                    <PersonOutlineOutlinedIcon /><pre style={{ fontSize:'0.75em'}}> Seating Capacity : </pre>
                                    <span style={{ fontSize:'0.75em'}}>{this.props.noOfPassenger}</span>
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <LocalGasStationIcon /><pre style={{ fontSize:'0.75em'}}> Fuel Type : </pre>
                                    <span style={{ fontSize:'0.75em'}}>{this.props.fuelType}</span>
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <SettingsSuggestIcon /><pre style={{ fontSize:'0.75em'}}> Transmission : </pre>
                                    <span style={{ fontSize:'0.75em'}}>{this.props.fuelType}</span>
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <AcUnitIcon /><pre style={{ fontSize:'0.75em'}}> Air Condition : </pre>
                                    <span style={{ fontSize:'0.75em'}}>Yes</span>
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs className={classes.card_price}>
                        <Grid>
                            <div>
                                <IconButton aria-label="delete">
                                    <PersonOutlineOutlinedIcon /><pre style={{ fontSize:'0.75em'}}> Seating Capacity : </pre>
                                    <span style={{ fontSize:'0.75em'}}>{this.props.noOfPassenger}</span>
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <LocalGasStationIcon /><pre style={{ fontSize:'0.75em'}}> Fuel Type : </pre>
                                    <span style={{ fontSize:'0.75em'}}>{this.props.fuelType}</span>
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <SettingsSuggestIcon /><pre style={{ fontSize:'0.75em'}}> Transmission : </pre>
                                    <span style={{ fontSize:'0.75em'}}>{this.props.fuelType}</span>
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <AcUnitIcon /><pre style={{ fontSize:'0.75em'}}> Air Condition : </pre>
                                    <span style={{ fontSize:'0.75em'}}>Yes</span>
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                    <div>
                        <Button  color="primary"
                                 variant="contained"
                                 sx={{ display: { xs: 'none', md: 'block' } }}
                        >
                            Select
                        </Button>
                    </div>
                </Grid>
                <Grid item xs>
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

}export default withStyles(styleSheet)(VehicleCard)
