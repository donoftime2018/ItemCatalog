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
    const [recommendedItems, setRecommendedItems] = useState([])

    const [numLikedItems, setNumLikedItems] = useState(0);
    const [numPostedItems, setNumPostedItems] = useState(0);

    const [isLoading, setLoading] = useState(true)
  

    useEffect(()=>{
        const getLikedItems = () => {
            const body = {user}
            axios.post(process.env.REACT_APP_SERVER_URL + "/items/getLikedItems/", body).then((res)=>{setLikedItems(res.data); 
            }).catch((error)=>{
            });
        }

        const getPostedItems = () => {
            const body = {user}
            axios.post(process.env.REACT_APP_SERVER_URL + "/items/getPostedItems/", body).then((res)=>{setPostedItems(res.data); 
            }).catch((error)=>{
            });
        }

        const getMostPopularItems = () => {
            const body = {user}
            axios.post(process.env.REACT_APP_SERVER_URL + "/items/mostPopularItems/", body).then((res)=>{setPopularItems(res.data); 
            }).catch((error)=>{
                });
        }

        const getNumLiked = () => {
            const body = {user}

            axios.post(process.env.REACT_APP_SERVER_URL + "/items/numLikedItems", body).then(
                (res)=>{
                    setNumLikedItems(res.data); 
                }).catch((error)=>{
                });
        }

        const getNumPosted = () => {
            const body = {user}
            axios.post(process.env.REACT_APP_SERVER_URL + "/items/numPostedItems", body).then(
                (res)=>{
                    setNumPostedItems(res.data); 
                }).catch((error)=>{
                }).finally(()=>{
                    setLoading(false)
                });
        }

        const getRecommendedItems = () => {
            const body = {user}
            axios.post(process.env.REACT_APP_SERVER_URL + "/items/recommendedItems", body).then(
                (res)=>{
                    setRecommendedItems(res.data); 
                }).catch((error)=>{
                });
        }

        const getProfileInfo = () => {
            getLikedItems()
            getPostedItems()
            getMostPopularItems()
            getNumLiked()
            getNumPosted()
            getRecommendedItems()
        }

        getProfileInfo()

        document.title = props.title

    }, [likedItems, postedItems, popularItems, popularItems.length, setLoading,
        likedItems.length, recommendedItems, recommendedItems.length, postedItems.length, user,
         numLikedItems, numPostedItems, props])

    return(<>
        <AppNav></AppNav>

     
        <Title title={user + "'s Profile"}></Title>

        <dov class="loadingInfoText">
            {
                isLoading ? 
                <>
                    <h3>Loading...</h3>
                </> :

                <></>
            }              
        </dov>

        <div class="profileInfo">
            <Card class="infoCard">
                <CardHeader sx={{textAlign: 'center', textDecoration: 'underline'}} title="Recently Liked Items:"></CardHeader>
                {
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
                }
                
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
                                <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                                    <div>
                                        {item.name}
                                    </div>
                                    <div style={{display:'inline-flex'}}>
                                        {item.rating}<FavoriteIcon sx={{color:'#c70e0e'}}/> 
                                    </div>                                         
                                </CardContent>
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
