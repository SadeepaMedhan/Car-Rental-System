import React from "react";
import HomePage from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <div>
            <Routes>
                <Route exact path='/' element={<HomePage/>}/>
                <Route path='home' element={<HomePage/>}/>
                <Route path='dash' element={<Dashboard/>}/>
            </Routes>
        </div>

    );
}

export default App;
