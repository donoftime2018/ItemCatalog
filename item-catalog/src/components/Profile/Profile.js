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
    const [recommendedItems, setRecommendedItems] = useState([])

    useEffect(()=>{
        const getLikedItems = () => {
            const data = {user}
            axios.post("http://localhost:4000/items/getLikedItems", data).then((res)=>{setLikedItems(res.data);}).catch((error)=>{console.error(error)});
        }

        const getPostedItems = () => {
            const data = {user}
            axios.post("http://localhost:4000/items/getPostedItems", data).then((res)=>{setPostedItems(res.data);}).catch((error)=>{console.error(error)});
        }

        const getRecommendedItems = () => {
            const data = {user}
            axios.post("http://localhost:4000/items/getRecommendedItems", data).then((res)=>{setRecommendedItems(res.data); console.log(res.data)}).catch((error)=>{console.error(error)});
        }

        getLikedItems()
        getPostedItems()
        getRecommendedItems()

    }, [likedItems, postedItems, likedItems.length, postedItems.length, recommendedItems, recommendedItems.length, user])


    const filterRecommendedItems = () => {
        let filteredList = []
        for (let i = 0; i < likedItems.length; i++)
        {
            if(recommendedItems[i].name.includes(likedItems[i].name) || recommendedItems[i].desc.includes(likedItems[i].desc))
            {
                filteredList.push(recommendedItems[i])
            }
        }

        return(<>

        </>)
    }

    return(<>
        <AppNav></AppNav>
        <Title title={user + "'s Profile"}></Title>

        <div class="profileInfo">
            <Card class="infoCard">
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

            <Card class="infoCard">
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


        <div class="recommendedInfo">
            <Card class="recommendedCard">
                <CardHeader sx={{textAlign: 'center', textDecoration: 'underline'}} title="Items You Might Enjoy:"></CardHeader>
                <>
                    {
                        recommendedItems.map((item, index)=>{
                            return(<>
                                <Divider></Divider>
                                <CardContent sx={{textAlign: 'center'}}>{item.name}, {item.rating} stars</CardContent>
                            </>)
                        })
                    }
                </>
            </Card>
        </div>
    </>)
}

export default Profile;
