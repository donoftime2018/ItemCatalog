
import React from "react";
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";
// import Login from "./components/Login/Login";
import { ItemContext, OfficialItem } from "./components/context/context"
import "./App.css";

const App = () =>
{
    return(
        <>
            <div className="App">
                <ItemContext>
                <Routes>
                    <Route element={<Dashboard/>} path="/"></Route>
                    {/* <Route element={<Login/>} path="/login"></Route> */}
                </Routes>
                </ItemContext>
            </div>
        </>
    )
}

export default App;