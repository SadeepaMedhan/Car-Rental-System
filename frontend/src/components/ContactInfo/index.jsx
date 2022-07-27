import React, {Component} from "react";
import {withStyles} from "@mui/styles";
import {styleSheet} from "./style";
import {Link, Stack} from "@mui/material";
import backImg3 from "../../assets/images/carBack3.jpg";
import Button from "@mui/material/Button";

class ContactInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        let {classes} = this.props;
        return (
            <Stack  direction="column">
                <Stack alignItems="center" direction="row" spacing={1} sx={{backgroundColor:'#081F35',width:'100%',height:'90px',}}>

                    <h2 style={{ fontFamily:'Convergence', fontSize:'1.2em',
                        textAlign:'center', marginLeft:'20px', marginRight:'10px', color:'white',}}>
                        You have any questions or need additional information?
                    </h2>
                    <input id="basic" placeholder="Enter your email here"  />
                    <Button>Subscribe</Button>
                </Stack>
                <Stack className={classes.contact_sec} sx={{position:'relative'}}>
                    <Stack >
                        <img src={backImg3} alt="" style={{
                            width: '100vw', height: '100%', backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed',
                            position:'absolute', zIndex:'-1',
                        }}/>
                    </Stack>
                    <Stack sx={{ width: '100vw', height: '100%',}}
                           direction="row"
                           justifyContent="space-evenly"
                           alignItems="center"
                           spacing={2}>
                        <Stack>
                            <h2 style={{
                                fontFamily: 'Convergence', fontSize: '1.2em',
                                textAlign: 'center', color: 'white',
                            }}>
                                Quick Link
                            </h2>
                            <Link>Home</Link>
                            <Link>Home</Link>
                            <Link>Home</Link>
                        </Stack>
                        <Stack>
                            <h2 style={{
                                fontFamily: 'Convergence', fontSize: '1.2em',
                                textAlign: 'center', color: 'white',
                            }}>
                                Fallow Us
                            </h2>
                            <Link>Home</Link>
                            <Link>Home</Link>
                            <Link>Home</Link>
                        </Stack>
                        <Stack>
                            <h2 style={{
                                fontFamily: 'Convergence', fontSize: '1.2em',
                                textAlign: 'center', color: 'white',
                            }}>
                                Contact Us
                            </h2>
                            <Link>Home</Link>
                            <Link>Home</Link>
                            <Link>Home</Link>
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