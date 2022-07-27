import React, {Component} from "react";
import {Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import NoiseControlOffIcon from "@mui/icons-material/NoiseControlOff";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

class DriverView extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <Stack direction="row"
                   justifyContent="center"
                   alignItems="stretch"
                   spacing={2} sx={{width: '100vw', marginTop: '7%'}}>
                <Stack direction="row" justifyContent="flex-start"
                       alignItems="stretch"
                       spacing={2} sx={{width: '88vw',}}>

                    <Stack direction="column" justifyContent="flex-start"
                           alignItems="stretch"
                           spacing={2} sx={{
                        height: '400px',
                        width: '400px',
                        border: '1px solid #E0E0E0',
                        borderRadius: '6px',
                        padding: '6px', fontFamily: 'Convergence'
                    }}>
                        <Stack direction="row"
                               justifyContent="space-between"
                               alignItems="center">
                            <h3 style={{marginLeft: '20px', fontFamily: 'Convergence'}}>Your Details</h3>
                            <Button>Edit</Button>
                        </Stack>
                        <Divider/>
                        <Stack direction="column" justifyContent="center" alignItems="flex-start"
                               spacing={1}>
                            <IconButton>
                                <NoiseControlOffIcon/>
                                <pre style={{
                                    fontFamily: 'Convergence',
                                    fontSize: '0.6em',
                                }}> Full Name : </pre>
                                <span
                                    style={{
                                        fontFamily: 'Convergence',
                                        fontSize: '0.6em',
                                    }}>{"this.state.searchData."}</span>
                            </IconButton>
                            <IconButton>
                                <NoiseControlOffIcon/>
                                <pre style={{
                                    fontFamily: 'Convergence',
                                    fontSize: '0.6em',
                                }}> Address : </pre>
                                <span
                                    style={{
                                        fontFamily: 'Convergence',
                                        fontSize: '0.6em',
                                    }}>{"this.state.searchData."}</span>
                            </IconButton>
                            <IconButton>
                                <NoiseControlOffIcon/>
                                <pre style={{
                                    fontFamily: 'Convergence',
                                    fontSize: '0.6em',
                                }}> Contact : </pre>
                                <span
                                    style={{
                                        fontFamily: 'Convergence',
                                        fontSize: '0.6em',
                                    }}>{"this.state.searchData."}</span>
                            </IconButton>
                            <IconButton>
                                <NoiseControlOffIcon/>
                                <pre style={{
                                    fontFamily: 'Convergence',
                                    fontSize: '0.6em',
                                }}> NIC : </pre>
                                <span
                                    style={{
                                        fontFamily: 'Convergence',
                                        fontSize: '0.6em',
                                    }}>{'this.state.searchData.'}</span>
                            </IconButton>
                            <IconButton>
                                <NoiseControlOffIcon/>
                                <pre style={{
                                    fontFamily: 'Convergence',
                                    fontSize: '0.6em',
                                }}> E-mail : </pre>
                                <span
                                    style={{
                                        fontFamily: 'Convergence',
                                        fontSize: '0.6em',
                                    }}>{"this.state.searchData.."}</span>
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Stack direction="column" justifyContent="flex-start"
                           alignItems="stretch"
                           spacing={2} sx={{
                        padding: '15px',
                        height: '400px',
                        width: '100%',
                        border: '1px solid #E0E0E0',
                        borderRadius: '6px'
                    }}>
                        <Stack direction="row"
                               justifyContent="space-between"
                               alignItems="center">
                            <h2 style={{marginLeft: '20px', fontFamily: 'Convergence'}}>Your Schedule</h2>
                            <Button>Edit</Button>
                        </Stack>

                        <Divider/>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="schedule table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Pickup</TableCell>
                                        <TableCell align="left">Return</TableCell>
                                        <TableCell align="left">Location</TableCell>
                                        <TableCell align="left">Customer</TableCell>
                                        <TableCell align="left">Vehicle</TableCell>
                                        <TableCell align="left">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left">Date</TableCell>
                                        <TableCell align="left">Date</TableCell>
                                        <TableCell align="left">Location</TableCell>
                                        <TableCell align="left"><Avatar alt="user"/></TableCell>
                                        <TableCell align="left"><Avatar alt="vehicle"/></TableCell>
                                        <TableCell align="left">Action</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Divider/>
                    </Stack>
                </Stack>
            </Stack>
        );
    }
}

export default DriverView;