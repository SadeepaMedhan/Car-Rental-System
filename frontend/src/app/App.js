import React from "react";
import HomePage from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import {Route, Routes} from "react-router-dom";
import Vehicle from "../pages/Vehicle";
import MyNavBar from "../components/NavBar";
import MyNav from "../components/MyNav";
import Login from "../pages/Login";

function App() {
    return (
        <div>
            <Login/>

            <Routes>
                <Route exact path='/n' element={<MyNav/>}/>
                <Route path='home' element={<HomePage/>}/>
                <Route path='vehicle' element={<Vehicle/>}/>
                <Route path='customer' element={<Dashboard/>}/>
            </Routes>
        </div>

    );
}

export default App;
