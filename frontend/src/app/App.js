import React from "react";
import HomePage from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import {Route, Routes} from "react-router-dom";
import Vehicle from "../pages/Vehicle";
import MyNavBar from "../components/NavBar";

function App() {
    return (
        <div>
            <MyNavBar/>

            <Routes>
                <Route exact path='/' element={<HomePage/>}/>
                <Route path='vehicle' element={<Vehicle/>}/>
                <Route path='customer' element={<Dashboard/>}/>
            </Routes>
        </div>

    );
}

export default App;
