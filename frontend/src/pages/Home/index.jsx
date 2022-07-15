import * as React from "react";
import {Component} from "react";
import Navbar from "../../components/Navbar";
import VehicleCard from "../../components/Card";
import vehicleImg1 from "../../assets/images/vehicles/v1f.jpg"
import vehicleImg2 from "../../assets/images/vehicles/v2f.jpg"


class HomePage extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Navbar/>
                <VehicleCard imgSrc={vehicleImg1} name={"Toyota Premio"}/>
                <VehicleCard imgSrc={vehicleImg2} name={"Suzuki Alto K10"}/>
            </div>
        )
    }
}

export default HomePage;