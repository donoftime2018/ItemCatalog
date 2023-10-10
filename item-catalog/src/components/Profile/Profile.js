import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, Divider} from "@mui/material"
import axios from "axios";
import { useAuth } from "../context/user";
import AppNav from "../NavBar/NavBar";
import "./Profile.css";

const Profile = () => {
    const auth = useAuth()
    const user = auth.user
    

    return(<>
        {/* <AppNav></AppNav> */}
        <div class="profileInfo">
            <Card class="profileCard">
                <CardHeader title="User Profile" sx={{textAlign: 'center'}}></CardHeader>
                <Divider></Divider>
                <CardContent>Username: {user}</CardContent>
                <Divider></Divider>
                <CardContent></CardContent>
            </Card>
        </div>
    </>)
}

export default Profile;
