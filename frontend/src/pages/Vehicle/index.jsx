import React from "react";
import VehicleCard from "../../components/Card/VehicleCard";
import vehicleImg1 from "../../assets/images/vehicles/v1f.jpg";
import VehicleService from "../../service/VehicleService";
import {Stack} from "@mui/material";


export default function Vehicle(props) {
    const [vehicleList, setVehicleList] = React.useState([]);
    const [user, setUser] = React.useState(props.signInUser);
    const [selectVehicle, setSelectVehicle] = React.useState(null);
    React.useEffect(() => {
        loadVehicleData();
    },[]);

    const loadVehicleData = async () => {
        const res = await VehicleService.fetchVehicles();
        if (res.status === 200) {
            setVehicleList(res.data.data)
        } else {
            console.log("fetching error: " + res)
        }
    }


    const getVehicleData = (data) => {
        console.log("get v " + data)
        setSelectVehicle(data)
        props.setVehicle(data)
    }


    return (
        <div>
            <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={2}>

                {vehicleList.map((vehicle) => (
                    <VehicleCard setV={vehicle} imgSrc={vehicleImg1} userSignIn={user}
                                 setVehicleId={getVehicleData.bind(this)}/>
                ))}

            </Stack>
        </div>
    );
}

