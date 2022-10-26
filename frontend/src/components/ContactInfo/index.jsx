import React, {Component} from "react";
import {withStyles} from "@mui/styles";
import {styleSheet} from "./style";
import {Link, Stack} from "@mui/material";
import backImg3 from "../../assets/images/carBack3.jpg";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import CallIcon from '@mui/icons-material/Call';



class ContactInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        let {classes} = this.props;
        return (
            <Stack  direction="column">
                <Stack alignItems="center" direction="row" spacing={1} sx={{backgroundColor:'#081F35',width:'100%',height:'60px',}}>

                   {/* <h2 style={{ fontFamily:'Convergence', fontSize:'1.2em',
                        textAlign:'center', marginLeft:'20px', marginRight:'10px', color:'white',}}>
                        You have any questions or need additional information?
                    </h2>
                    <input id="basic" placeholder="Enter your email here"  />
                    <Button>Subscribe</Button>*/}
                </Stack>
                <Stack className={classes.contact_sec} sx={{position:'relative'}}>
                    <Stack >
                        <img src={backImg3} alt="" style={{
                            width: '100vw', height: '100%', backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed',
                            position:'absolute', zIndex:'-1',
                        }}/>
                    </Stack>
                    <Stack sx={{ width: '100vw', height: '100%', backgroundColor: 'rgba(8,15,21,0.8)',}}
                           direction="row"
                           justifyContent="space-evenly"
                           alignItems="center"
                           spacing={2}>
                        <Stack>
                            <h2 style={{fontFamily: 'Convergence', fontSize: '1.2em',
                                textAlign: 'center', color: 'white',}}>
                                Easy Car Rental Pvt(Ltd)
                            </h2>
                        </Stack>
                        <Stack>
                            <p style={{fontFamily: 'Convergence', fontSize: '1.2em',
                                textAlign: 'center', color: 'white',}}>
                                About Us
                            </p>
                            <p style={{fontFamily: 'Convergence', fontSize: '1.2em',
                                textAlign: 'center', color: 'white',}}>
                                Vehicle Fleet
                            </p>
                            <p style={{fontFamily: 'Convergence', fontSize: '1.2em',
                                textAlign: 'center', color: 'white',}}>
                                Service
                            </p>
                            <p style={{fontFamily: 'Convergence', fontSize: '1.2em',
                                textAlign: 'center', color: 'white',}}>
                                Contact Us
                            </p>
                        </Stack>
                        <Stack direction="row">
                            <IconButton style={{ color: 'white',}} aria-label="fb-icon">
                                <CallIcon />
                            </IconButton>
                            <IconButton style={{ color: 'white',}} aria-label="fb-icon">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton style={{ color: 'white',}} aria-label="google-icon">
                                <TwitterIcon/>
                            </IconButton>
                            <IconButton style={{ color: 'white',}} aria-label="fb-icon">
                                <TelegramIcon />
                            </IconButton>
                            <IconButton style={{ color: 'white',}} aria-label="google-icon">
                                <WhatsAppIcon/>
                            </IconButton>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack sx={{backgroundColor: '#080F15', height: '4vh', width: '100vw'}}>

                    <p style={{
                        fontFamily: 'Convergence', fontSize: '0.75em',
                        textAlign: 'center', color: 'white',
                    }}>Copyright © 2022 Easy Car Rental (Pvt) Ltd. All Rights Reserved.</p>
                </Stack>
            </Stack>
        );
    }
}

export default withStyles(styleSheet)(ContactInfo)