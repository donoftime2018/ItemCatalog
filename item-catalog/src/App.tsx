
import React from "react";
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";
import LoginPage from "./components/Login/Login";
import Register from "./components/Register/Register";
import UpdatePassword from "./components/updatePassword/updatePassword";
import { AuthProvider } from "./components/context/user";
import Profile from "./components/Profile/Profile";
// import Login from "./components/Login/Login";
import { ItemContext, OfficialItem } from "./components/context/context"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import "./App.css";

const App = () =>
{
    return(
        <>
            <div className="App">
                <AuthProvider>
                        <ItemContext>
                            <Routes>
                                <Route element={<ProtectedRoute>
                                        <Dashboard/>
                                    </ProtectedRoute>} path="/"></Route>
                                <Route element={<LoginPage/>} path="/login"></Route>
                                <Route element={<Register/>} path="/register"></Route>
                                <Route element={<UpdatePassword/>} path="/updatePassword"></Route>
                                <Route element={<Profile/>} path="/profile"></Route>
                            </Routes>
                        </ItemContext>
                </AuthProvider>
            </div>
        </>
    )
}

export default App;