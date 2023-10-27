import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, Divider} from "@mui/material"
import axios from "axios";
import { useAuth } from "../context/user";
import Title from "../appTitle/appTitle";
import AppNav from "../NavBar/NavBar";
import StarIcon from '@mui/icons-material/Star';
import "./Profile.css";

const Profile = () => {
    const auth = useAuth()
    const user = auth.user

    const [likedItems, setLikedItems] = useState([])
    const [postedItems, setPostedItems] = useState([])
    const [popularItems, setPopularItems] = useState([])

    const [numLikedItems, setNumLikedItems] = useState(0);
    const [numPostedItems, setNumPostedItems] = useState(0);
  

    useEffect(()=>{
        const getLikedItems = () => {
            const data = {user}
            axios.post("http://localhost:4000/items/getLikedItems", data).then((res)=>{setLikedItems(res.data);}).catch((error)=>{console.error(error)});
        }

        const getPostedItems = () => {
            const data = {user}
            axios.post("http://localhost:4000/items/getPostedItems", data).then((res)=>{setPostedItems(res.data);}).catch((error)=>{console.error(error)});
        }

        const getMostPopularItems = () => {
            const data = {user}
            axios.post("http://localhost:4000/items/mostPopularItems", data).then((res)=>{setPopularItems(res.data); console.log(res.data)}).catch((error)=>{console.error(error)});
        }

        const getNumLiked = () => {
            const data = {user}
            axios.post("http://localhost:4000/items/numLikedItems", data).then(
                (res)=>{
                    setNumLikedItems(res.data); 
                    console.log(res.data)}).catch((error)=>{console.error(error)});
        }

        const getNumPosted = () => {
            const data = {user}
            axios.post("http://localhost:4000/items/numPostedItems", data).then(
                (res)=>{
                    setNumPostedItems(res.data); 
                    console.log(res.data)}).catch((error)=>{console.error(error)});
        }

        getLikedItems()
        getPostedItems()
        getMostPopularItems()
        getNumLiked()
        getNumPosted()

    }, [likedItems, postedItems, popularItems, popularItems.length, 
        likedItems.length, postedItems.length, user, numLikedItems, numPostedItems])

    return(<>
        <AppNav></AppNav>

     
        <Title title={user + "'s Profile"}></Title>

        <div class="profileInfo">
            <Card class="infoCard">
                <CardHeader sx={{textAlign: 'center', textDecoration: 'underline'}} title="Recently Liked Items:"></CardHeader>
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
                <CardHeader sx={{textAlign: 'center', textDecoration: 'underline'}} title="Recently Posted Items:"></CardHeader>
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

            <Card class="infoCard">
                <CardHeader sx={{textAlign: 'center', textDecoration: 'underline'}} title="Your Most Popular Items:"></CardHeader>
                <>
                    {
                        popularItems.map((item, index)=>{
                            return(<>
                                <Divider></Divider>
                                <CardContent sx={{textAlign: 'center', alignItems: 'center'}}>{item.name}, {item.rating} <StarIcon color='warning' sx={{alignItems: 'start', fontSize: 'large'}}></StarIcon></CardContent>
                            </>)
                        })
                    }
                </>
            </Card>
        </div>

        <div class="profileInfo">
            <Card class="infoCard">
                <CardHeader sx={{textAlign: 'center', textDecoration: 'underline'}} title="Number of Items Liked:"></CardHeader>
                <Divider></Divider>
                <CardContent sx={{textAlign: 'center', padding: "4px!important", fontSize: "24px", alignItems: 'center'}}>{numLikedItems}</CardContent>
            </Card>

            <Card class="infoCard">
                <CardHeader sx={{textAlign: 'center', textDecoration: 'underline'}} title="Number of Items Posted:"></CardHeader>
                <Divider></Divider>
                <CardContent sx={{textAlign: 'center', padding: "4px!important", fontSize: "24px", alignItems: 'center'}}>{numPostedItems}</CardContent>
            </Card>
        </div>
        
    </>)
}

export default Profile;
