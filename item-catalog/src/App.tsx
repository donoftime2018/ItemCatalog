
import React from "react";
import {Routes, Route} from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";
import LoginPage from "./components/Login/Login";
import Register from "./components/Register/Register";
import UpdatePassword from "./components/updatePassword/updatePassword";
import ForgotPassword from "./components/forgotPassword/forgotPassword";
import { AuthProvider } from "./components/context/user";
import Profile from "./components/Profile/Profile";
import { ItemContext} from "./components/context/context"
import DeleteProfile from "./components/DeleteProfile/DeleteProfile";
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
                                <Route element={
                                    <ProtectedRoute>
                                        <Dashboard title="Put a Price On It!"/>
                                    </ProtectedRoute>
                                } path="/"></Route>
                                <Route element={<LoginPage title="Login"/>} path="/login"></Route>
                                <Route element={<Register title="Sign Up"/>} path="/register"></Route>
                                <Route element={<UpdatePassword title="Change Password"/>} path="/updatePassword/:token"></Route>
                                <Route element={<ForgotPassword title="Forgot Password"/>} path="/forgotPassword"></Route>
                                <Route element={
                                    <ProtectedRoute>
                                        <Profile title="User Profile"/>
                                    </ProtectedRoute>
                                } path="/profile">
                                </Route>
                                <Route element={<DeleteProfile title="Delete Account"/>} path="/deleteAccount"></Route>
                            </Routes>
                        </ItemContext>
                </AuthProvider>
            </div>
        </>
    )
}

export default App;