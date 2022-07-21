import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions, Rating, Stack} from '@mui/material';
import {Component} from "react";
import {styleSheet} from "./style";
import {withStyles} from "@mui/styles";

class SmallVehicleCard extends Component{

    constructor(props) {
        super(props);
    }


    render() {

        let {classes} = this.props;

        return (
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={this.props.imgSrc}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {this.props.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }

}
export default withStyles(styleSheet)(SmallVehicleCard)
