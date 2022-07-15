import React from "react";
import {Box, Typography} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function Navbar(){
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography gutterBottom variant="h5" component="div">
                Dashboard
            </Typography>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                <LinkTab label="Customers" href="/drafts" />
                <LinkTab label="Vehicles" href="/trash" />
                <LinkTab label="Bookings" href="/spam" />
                <LinkTab label="About" href="/spam" />
                <LinkTab label="Income" href="/spam" />
            </Tabs>
        </Box>
    );
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}