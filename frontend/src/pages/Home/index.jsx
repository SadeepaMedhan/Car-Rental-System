import * as React from "react";
import {Component} from "react";

import {styleSheet} from "./style";
import {withStyles} from "@mui/styles";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SpeedDialBtn from "../../components/speedDial";


const driverStatus = [
    {value: '0', label: 'Self Drive'},
    {value: '1', label: 'With Driver'}
];


class HomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            driverStatus:'0',
            vehicleOpen:false,
            anchorElNav:null,
            value:1
        }


    }

    render() {
        let { classes } = this.props;

        const handleChange = (event) => {
            this.setState({driverStatus: event.target.value});
        };

        return(
            <div>

                <Stack direction="row" spacing={2} marginTop={"12px"} marginLeft={"12px"}>
                    <TextField
                        id="driverState"
                        select
                        label="Select"
                        value={this.state.driverStatus}
                        onChange={handleChange}
                        helperText=""
                    >
                        {driverStatus.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="pickUpLocation"
                        select
                        label="Select"
                        value={this.state.driverStatus}
                        onChange={handleChange}
                        helperText=""
                    >
                        {driverStatus.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                </Stack>


               <SpeedDialBtn/>
            </div>
        )
    }
}

export default withStyles(styleSheet)(HomePage);
