import React from "react";
import HomePage from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import {Route, Routes} from "react-router-dom";
import Vehicle from "../pages/Vehicle";
import MyNavBar from "../components/NavBar";
import MyNav from "../components/MyNav";
import Login from "../pages/Login";
import Slideshow from "../components/Slider";

function App() {
    return (
        <div>
            {/*<Login viewOpen={true}/>*/}
            <HomePage/>

            {/*<Routes>
                <Route exact path='/n' element={<MyNav/>}/>
                <Route path='home' element={<HomePage/>}/>
                <Route path='log' element={<Login/>}/>
                <Route path='dash' element={<Dashboard/>}/>
            </Routes>*/}
        </div>

    );
}

export default App;
