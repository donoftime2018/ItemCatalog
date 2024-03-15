import {useEffect, useState} from "react";
import {Card, Box, CardContent, CardHeader, Divider} from "@mui/material"
import axios from "axios";
import { useAuth } from "../context/user";
import Title from "../appTitle/appTitle";
import AppNav from "../NavBar/NavBar";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import "./Profile.css";

const Profile = (props) => {
    const auth = useAuth()
    const user = auth.user

    const [likedItems, setLikedItems] = useState([])
    const [postedItems, setPostedItems] = useState([])
    const [popularItems, setPopularItems] = useState([])
    const [bookmarkedItems, setBookmarkedItems] = useState([])

    const [numLikedItems, setNumLikedItems] = useState(0);
    const [numPostedItems, setNumPostedItems] = useState(0);
    const [numBookmarkedItems, setNumBookmarkedItems] = useState(0);
  

    useEffect(()=>{
        const getLikedItems = () => {
            axios.get("http://localhost:4000/items/getLikedItems/" + user).then((res)=>{setLikedItems(res.data); console.log(res.data)}).catch((error)=>{console.error(error)});
        }

        const getPostedItems = () => {
            axios.get("http://localhost:4000/items/getPostedItems/" + user).then((res)=>{setPostedItems(res.data); console.log(res.data)}).catch((error)=>{console.error(error)});
        }

        const getMostPopularItems = () => {
            axios.get("http://localhost:4000/items/mostPopularItems/" + user).then((res)=>{setPopularItems(res.data); console.log(res.data)}).catch((error)=>{console.error(error)});
        }

        const getNumLiked = () => {
            axios.get("http://localhost:4000/items/numLikedItems/" + user).then(
                (res)=>{
                    setNumLikedItems(res.data); 
                    console.log(res.data)}).catch((error)=>{console.error(error)});
        }

        const getNumPosted = () => {
            axios.get("http://localhost:4000/items/numPostedItems/" + user).then(
                (res)=>{
                    setNumPostedItems(res.data); 
                    console.log(res.data)}).catch((error)=>{console.error(error)});
        }

        const getNumBookmarked = () => {
            axios.get("http://localhost:4000/items/numBookmarkedItems/" + user).then(
                (res)=>{
                    setNumBookmarkedItems(res.data)
                    console.log(res.data)}).catch((error)=>{console.error(error)});
        }

        const getBookmarkedItems = () => {
            axios.get("http://localhost:4000/items/recentBookmarkedItems/" + user).then(
                (res)=>{
                    setBookmarkedItems(res.data); 
                    console.log(res.data)}).catch((error)=>{console.error(error)});
        }

        getLikedItems()
        getPostedItems()
        getMostPopularItems()
        getBookmarkedItems()
        getNumBookmarked()
        getNumLiked()
        getNumPosted()

        document.title = props.title

    }, [likedItems, postedItems, popularItems, popularItems.length, 
        likedItems.length, postedItems.length, user, bookmarkedItems, bookmarkedItems.length,
         numLikedItems, numBookmarkedItems, numPostedItems, props])

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
                                <CardContent sx={{textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{item.name}, {item.rating}<ThumbUpIcon color='success' sx={{alignItems: 'center', fontSize: 'large', display: 'flex', justifyContent: 'center'}}/></CardContent>
                            </>)
                        })
                    }
                </>
            </Card>
       
        </div>

        <div class="profileInfo">
            <Card class="infoCard" style={{width: '50px'}}>
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
