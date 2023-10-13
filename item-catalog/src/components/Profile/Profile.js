import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, Divider} from "@mui/material"
import axios from "axios";
import { useAuth } from "../context/user";
import Title from "../appTitle/appTitle";
import AppNav from "../NavBar/NavBar";
import "./Profile.css";

const Profile = () => {
    const auth = useAuth()
    const user = auth.user

    const [likedItems, setLikedItems] = useState([])
    const [postedItems, setPostedItems] = useState([])

    // useEffect(()=>{

    //     const getLikedItems = () => {  
    //         // const data = {user}
    //         axios.post("http://localhost:4000/items/").then((res)=>{
    //             setLikedItems(res.data);
    //         }).catch((err)=>{console.error(err);});
    //     }

    //     const getPostedItems = () => {
    //         // const data = {user}
    //         axios.post("http://localhost:4000/items/").then((res)=>{
    //             setPostedItems(res.data);
    //         }).catch((err)=>{console.error(err)})
    //     }

    //     getLikedItems()
    //     getPostedItems()

    // }, [user, likedItems, postedItems, likedItems.length, postedItems.length])

    return(<>
        <AppNav></AppNav>
        <Title title={user + "'s Profile"}></Title>

        
    </>)
}

export default Profile;
