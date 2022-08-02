import React, {Component} from "react";
import {Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import NoiseControlOffIcon from "@mui/icons-material/NoiseControlOff";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import CustomerService from "../../service/CustomerService";
import swal from "sweetalert";

class CustomerView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customer:props.customer,
            bookingList:[]
        }
    }

    componentDidMount() {
        this.loadBookingData(this.props.customer.cusID)
    }

    loadBookingData = async (cusId) => {
        let params = {id: cusId}
        console.log(cusId)
        const res = await CustomerService.getBookings(params);
        if (res.status === 200) {
            this.setState({bookingList:res.data.data})
            console.log(this.state.bookingList)
        }
        else {console.log("fetching error: " + res)}
    }

    render() {
        let baseUrl = "http://localhost:8080/backend_war/uploads/"

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
                                    }}>{this.state.customer.cusName}</span>
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
                                    }}>{this.state.customer.cusAddress}</span>
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
                                    }}>{this.state.customer.cusContactNo}</span>
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
                                    }}>{this.state.customer.cusNIC}</span>
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
                                    }}>{this.state.customer.cusEmail}</span>
                            </IconButton>
                            <img height="80px" className="preview my20" src={baseUrl+this.state.customer.nicUrl} alt=""/>
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
                            <h2 style={{marginLeft: '20px', fontFamily: 'Convergence'}}>Your Bookings</h2>

                        </Stack>

                        <Divider/>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="schedule table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Status</TableCell>
                                        <TableCell align="left">Vehicle</TableCell>
                                        <TableCell align="left">Pickup</TableCell>
                                        <TableCell align="left">Return</TableCell>
                                        <TableCell align="left">Location</TableCell>
                                        <TableCell align="left">Amount</TableCell>
                                        <TableCell align="left">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.bookingList.map((row)=>(
                                            <TableRow>
                                                <TableCell align="left">
                                                    <Chip label={row.status} color={row.status === "Pending"? "warning":"success"}/>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Avatar alt="vehicle"/>
                                                    {row.vehicle.brand}
                                                </TableCell>
                                                <TableCell align="left">{row.leavingDate.split('T')[0]}</TableCell>
                                                <TableCell align="left">{row.returnDate.split('T')[0]}</TableCell>
                                                <TableCell align="left">{row.location}</TableCell>
                                                <TableCell align="left">{row.payment}</TableCell>
                                                <TableCell align="left">
                                                    <Chip label={row.status=== "Pending" ? "Cancel" : "Return"}
                                                          color={row.status === "Pending" ? "error" : "info"}
                                                          clickable onClick={() => {
                                                        row.status === "Accept" && (swal("Input Last Mileage here:", {
                                                            content: "input",
                                                        }).then((value) => {
                                                                swal(`You typed: ${value}`);
                                                        })
                                                         )
                                                        row.status === "Pending" && (
                                                             swal({
                                                                title: "Are you sure?",
                                                                text: "Close this Rental!",
                                                                icon: "info",
                                                                buttons: true,
                                                            })
                                                                .then((a) => {
                                                                    if (a) {
                                                                        //updateBookingData(row)
                                                                        swal("This Rental has been closed!", {
                                                                            icon: "success",
                                                                        });
                                                                    }
                                                                })
                                                        )
                                                }}/></TableCell>
                                            </TableRow>
                                        ))
                                    }

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

export default CustomerView;