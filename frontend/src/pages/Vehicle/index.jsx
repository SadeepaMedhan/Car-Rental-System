import React from "react";
import VehicleService from "../../service/VehicleService";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel, Radio, RadioGroup,
    Stack,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import MediumVehicleCard from "../../components/Card/mediumVehicleCard";
import VehicleCard from "../../components/Card/VehicleCard";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";


export default function Vehicle(props) {
    const [vehicleList, setVehicleList] = React.useState([]);

    const [user, setUser] = React.useState(props.signInUser);
    const [count, setCount] = React.useState(props.setResult);
    const [selectVehicle, setSelectVehicle] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const [sortValue, setSortValue] = React.useState('Recommended');
    const [filterType, setFilterType] = React.useState("General");
    const priceSortList = [...vehicleList].sort((a,b)=>(a.dailyRate > b.dailyRate) ? 1:-1)

    React.useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        loadVehicleData();
        //console.log(props)
    }, []);

    const loadVehicleData = async () => {
        const res = await VehicleService.fetchVehicles();
        if (res.status === 200) {
            setVehicleList(res.data.data)
            console.log(res.data.data)

        } else {
            console.log("fetching error: " + res)
        }
    }
    const handleChange = (event, value) => {
        setPage(value);
        console.log(page - 1)
        loadVehicleData();
    };

    const getVehicleData = (data) => {
        console.log("get v " + data)
        setSelectVehicle(data)
        props.setVehicle(data)
    }

    const sortChange = (event, newValue) => {
        if(newValue!==null){
            setSortValue(newValue)
        }
    };

    const radioBtnChange = (event) => {
        console.log(event.target.value)
        setFilterType(event.target.value)
    };

    return (
        <div>
            <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Stack direction="column" justifyContent="center"  alignItems="stretch" spacing={2}>
                        <Stack direction="row" justifyContent="flex-end">
                            <ToggleButtonGroup
                                color="primary"
                                value={sortValue}
                                exclusive
                                onChange={sortChange}
                            >
                                <ToggleButton value="Recommended">Recommended</ToggleButton>
                                <ToggleButton value="Price">Price(low to high)</ToggleButton>
                                <ToggleButton value="Rating">Rating</ToggleButton>
                            </ToggleButtonGroup>
                        </Stack>
                        {count === 0 &&
                        <Stack direction="column" spacing={2} justifyContent="center" alignItems="stretch">
                            {sortValue === "Recommended" && vehicleList.filter(vehicle => vehicle.type === filterType).map(filteredVehicle =>(
                                <VehicleCard setV={filteredVehicle} userSignIn={user}
                                             setVehicleId={getVehicleData.bind(this)}/>
                            ))}
                            {sortValue === "Price" && priceSortList.filter(vehicle => vehicle.type === filterType).map(filteredVehicle =>(
                                <VehicleCard setV={filteredVehicle} userSignIn={user}
                                             setVehicleId={getVehicleData.bind(this)}/>
                            ))}
                            {sortValue === "Rating" && priceSortList.filter(vehicle => vehicle.type === filterType).map(filteredVehicle =>(
                                <VehicleCard setV={filteredVehicle} userSignIn={user}
                                             setVehicleId={getVehicleData.bind(this)}/>
                            ))}

                        </Stack>}

                        {count > 2 && vehicleList.length > 2 &&
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="stretch">
                            <MediumVehicleCard setV={vehicleList[0]} userSignIn={user}
                                               setVehicleId={getVehicleData.bind(this)}/>
                            <MediumVehicleCard setV={vehicleList[1]} userSignIn={user}
                                               setVehicleId={getVehicleData.bind(this)}/>
                            <MediumVehicleCard setV={vehicleList[2]} userSignIn={user}
                                               setVehicleId={getVehicleData.bind(this)}/>
                        </Stack>
                        }
                    </Stack>
                    <Stack direction="column" justifyContent="flex-start"
                           alignItems="stretch"
                           spacing={1} sx={{
                        height: '400px',
                        width: '230px',
                        border: '1px solid #E0E0E0',
                        borderRadius: '6px', fontFamily: 'Convergence'
                    }}>
                        <h3 align="center">Filters</h3>
                        <Divider/>
                        <Stack direction="column"
                               justifyContent="flex-start"
                               alignItems="center"
                               spacing={1}>
                            <FormGroup>
                                <FormLabel id="demo-controlled-radio-buttons-group">
                                    Driver Status</FormLabel>
                                <FormControlLabel control={<Checkbox defaultChecked/>} label="With Driver"/>
                                <FormControlLabel disabled control={<Checkbox/>} label="Self Drive"/>
                                <Divider/>
                            </FormGroup>

                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Vehicle Type</FormLabel>
                                <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={filterType}
                                            onChange={radioBtnChange}>
                                    <FormControlLabel value="General" control={<Radio/>} label="General"/>
                                    <FormControlLabel value="Premium" control={<Radio/>} label="Premium"/>
                                    <FormControlLabel value="Luxury" control={<Radio/>} label="Luxury"/>
                                </RadioGroup>
                            </FormControl>

                        </Stack>
                        <Skeleton animation="wave"/>

                    </Stack>
                </Stack>

                <Pagination count={2} page={page} onChange={handleChange}/>
            </Stack>
        </div>
    );
}

