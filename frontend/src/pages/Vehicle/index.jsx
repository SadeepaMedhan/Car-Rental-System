import React from "react";
import VehicleCard from "../../components/Card/VehicleCard";
import vehicleImg1 from "../../assets/images/vehicles/v1f.jpg";
import VehicleService from "../../service/VehicleService";
import {Stack} from "@mui/material";
import Pagination from '@mui/material/Pagination';


export default function Vehicle(props) {
    const [vehicleList, setVehicleList] = React.useState([]);
    const [user, setUser] = React.useState(props.signInUser);
    const [selectVehicle, setSelectVehicle] = React.useState(null);
    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
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



    return (
        <div>
            <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={2}>

                {vehicleList.map((vehicle,i) => (
                    <VehicleCard setV={vehicle} userSignIn={user}
                                 setVehicleId={getVehicleData.bind(this)}/>
                ))}
                <Pagination count={2} page={page} onChange={handleChange} />

            </Stack>
        </div>
    );
}

