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

    useEffect(()=>{
        const getLikedItems = () => {
            const data = {user}
            axios.post("http://localhost:4000/items/getLikedItems", data).then((res)=>{setLikedItems(res.data);}).catch((error)=>{console.error(error)});
        }

        const getPostedItems = () => {
            const data = {user}
            axios.post("http://localhost:4000/items/getPostedItems", data).then((res)=>{setPostedItems(res.data);}).catch((error)=>{console.error(error)});
        }

        getLikedItems()
        getPostedItems()

    }, [likedItems, postedItems, likedItems.length, postedItems.length, user])

    return(<>
        <AppNav></AppNav>
        <Title title={user + "'s Profile"}></Title>

        <div class="profileInfo">
            <Card class="itemCard">
                <CardHeader sx={{textAlign: 'center', textDecoration: 'underline'}} title="Liked Items:"></CardHeader>
                <>
                    {
                        likedItems.map((item, index)=>{
                                return(<>
                                    <Divider></Divider>
                                    <CardContent sx={{textAlign: 'center'}}>{item.name}</CardContent>
                            </>)
                           
                        })
                    }
                </>
                
            </Card>

            <Card class="itemCard">
                <CardHeader sx={{textAlign: 'center', textDecoration: 'underline'}} title="Posted Items:"></CardHeader>
                <>
                    {
                        postedItems.map((item)=>{
                            return(<>
                                <Divider></Divider>
                                <CardContent sx={{textAlign: 'center'}}>{item.name}</CardContent>
                            </>)
                        })
                    }
                </>
            </Card>
        </div>
        
    </>)
}

export default Profile;
