import React from "react";
import VehicleCard from "../../components/Card/VehicleCard";
import VehicleService from "../../service/VehicleService";
import {Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import MediumVehicleCard from "../../components/Card/mediumVehicleCard";


export default function Vehicle(props) {
    const [vehicleList, setVehicleList] = React.useState([]);
    const [user, setUser] = React.useState(props.signInUser);
    const [count, setCount] = React.useState(props.setResult);
    const [selectVehicle, setSelectVehicle] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const [sortValue, setSortValue] = React.useState('Recommended');

    React.useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        loadVehicleData();
    },[]);

    const loadVehicleData = async () => {
        const res = await VehicleService.fetchVehicles();
        if (res.status === 200) {
            setVehicleList(res.data.data)
            console.log(vehicleList)
        } else {
            console.log("fetching error: " + res)
        }
    }
    const handleChange = (event, value) => {
        setPage(value);
        console.log(page-1)
        loadVehicleData();
    };

    const getVehicleData = (data) => {
        console.log("get v " + data)
        setSelectVehicle(data)
        props.setVehicle(data)
    }

    const sortChange = (event, newAlignment) => {
        setSortValue(newAlignment)
    };

    return (
        <div>
            <Stack spacing={2}>
                <Stack direction="row"
                       justifyContent="space-between"
                       alignItems="center">
                    <h2 style={{marginLeft: '20px', fontFamily: 'Convergence'}}>Vehicle Fleet</h2>
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
                <Stack direction="row" justifyContent="center" alignItems="stretch" spacing={2}>
                    {count === 0 &&
                    <Stack direction="column" spacing={2} justifyContent="center" alignItems="stretch">
                        {vehicleList.map((vehicle, i) => (
                            <VehicleCard setV={vehicle} userSignIn={user}
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
                <Pagination count={2} page={page} onChange={handleChange} />
            </Stack>
        </div>
    );
}

