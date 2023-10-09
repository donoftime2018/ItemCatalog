import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, Divider} from "@mui/material"
import axios from "axios";
import { useAuth } from "../context/user";
import "./Profile.css";

const Profile = () => {
    const auth = useAuth()

    

    return(<>
        <div class="profileInfo">
            <Card class="profileCard">
                <CardHeader title="User Profile" sx={{textAlign: 'center'}}></CardHeader>
                <Divider></Divider>
                <CardContent>Username: {auth.user}</CardContent>
                <Divider></Divider>
                <CardContent></CardContent>
            </Card>
        </div>
    </>)
}

export default Profile;
