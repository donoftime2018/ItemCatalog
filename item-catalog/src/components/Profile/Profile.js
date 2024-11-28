import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, Divider} from "@mui/material"
import axios from "axios";
import { useAuth } from "../context/user";
import Title from "../appTitle/appTitle";
import AppNav from "../NavBar/NavBar";
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./Profile.css";

const Profile = (props) => {
    const auth = useAuth()
    const user = auth.user

    const [likedItems, setLikedItems] = useState([])
    const [postedItems, setPostedItems] = useState([])
    const [popularItems, setPopularItems] = useState([])

    const [numLikedItems, setNumLikedItems] = useState(0);
    const [numPostedItems, setNumPostedItems] = useState(0);
  

    useEffect(()=>{
        const getLikedItems = () => {
            axios.get("http://localhost:4000/items/getLikedItems/" + user).then((res)=>{setLikedItems(res.data); 
            }).catch((error)=>{
            });
        }

        const getPostedItems = () => {
            axios.get("http://localhost:4000/items/getPostedItems/" + user).then((res)=>{setPostedItems(res.data); 
            }).catch((error)=>{
            });
        }

        const getMostPopularItems = () => {
            axios.get("http://localhost:4000/items/mostPopularItems/" + user).then((res)=>{setPopularItems(res.data); 
            }).catch((error)=>{
                });
        }

        const getNumLiked = () => {
            axios.get("http://localhost:4000/items/numLikedItems/" + user).then(
                (res)=>{
                    setNumLikedItems(res.data); 
                }).catch((error)=>{
                });
        }

        const getNumPosted = () => {
            axios.get("http://localhost:4000/items/numPostedItems/" + user).then(
                (res)=>{
                    setNumPostedItems(res.data); 
                }).catch((error)=>{
                });
        }

        getLikedItems()
        getPostedItems()
        getMostPopularItems()
        getNumLiked()
        getNumPosted()

        document.title = props.title

    }, [likedItems, postedItems, popularItems, popularItems.length, 
        likedItems.length, postedItems.length, user,
         numLikedItems, numPostedItems, props])

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
                                <div style={{display: 'flex', flexDirection: 'row'}} >   
                                    <CardContent sx={{textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>{item.name}</CardContent>
                                    <Divider orientation="vertical" flexItem></Divider>
                                    <CardContent sx={{textAlign: "center", display: 'inline-flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>{item.rating}<FavoriteIcon sx={{color:'#c70e0e', fontSize: 'large'}}/></CardContent>
                                </div>
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
