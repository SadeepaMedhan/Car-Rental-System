import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Grid from "@mui/material/Grid";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TransformOutlinedIcon from '@mui/icons-material/TransformOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';


export default function VehicleCard(props) {
    return (
        <Card /*sx={{ maxWidth: 345 }}*/>
            <CardActionArea sx={{ display:"flex", flexGrow: 1, }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.imgSrc}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.name}
                    </Typography>
                    <Grid>

                        <span style={{ fontSize:'0.75em'}}>Description</span>
                        <div>
                            <IconButton aria-label="delete">
                                <PersonOutlineOutlinedIcon /><span style={{ fontSize:'0.75em'}}>4 Seats</span>
                            </IconButton>
                            <IconButton aria-label="delete">
                                <TransformOutlinedIcon /><span style={{ fontSize:'0.75em'}}>Automatic</span>
                            </IconButton>
                            <IconButton aria-label="delete">
                                <SpeedOutlinedIcon /><span style={{ fontSize:'0.75em'}}>Free 200Km</span>
                            </IconButton>
                            <IconButton aria-label="delete">
                                <TransformOutlinedIcon /><span style={{ fontSize:'0.75em'}}>Automatic</span>
                            </IconButton>

                        </div>

                    </Grid>
                    <Typography variant="body2" color="text.secondary">

                    </Typography>
                </CardContent>
                <div>
                    <Button  color="primary"
                             variant="contained"
                             sx={{ display: { xs: 'none', md: 'block' } }}
                    >
                        Select
                    </Button>
                </div>
            </CardActionArea>
            <div>
                <Button  color="primary"
                         variant="contained"
                         sx={{ display: { xs: 'block', md: 'none' } }}
                >
                    Select
                </Button>
            </div>
        </Card>
    );
}
