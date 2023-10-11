import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, Divider} from "@mui/material"
import axios from "axios";
import { useAuth } from "../context/user";
import AppNav from "../NavBar/NavBar";
import "./Profile.css";

const Profile = () => {
    const auth = useAuth()
    const user = auth.user
    
    const [email, setEmail] = useState("")
    const [likedItems, setLikedItems] = useState([])
    const [postedItems, setPostedItems] = useState([])

    // useEffect(()=>{
        const getEmail = () => {
            const data = {user}
            axios.post("http://localhost:4000/userProfile/getCredentials", data).then((res)=>{
                if(res.statusCode === 200)
                {
                    setEmail(res.data[0].email);
                }
                // setEmail(res.data)
            }).catch((error) => {
                console.log(error)
              })
        }
    
        const getLikedItems = () => {
            const data = {user}
            axios.post("http://localhost:4000/userProfile/getLikedItems", data).then((res)=>{
                if(res.statusCode === 200)
                // setEmail(res.data)
                    setLikedItems(res.data)
                // console.log(res);
            }).catch((error) => {
                console.log(error)
              })
        }
    
        const getPostedItems = () => {
            const data = {user}
            axios.post("http://localhost:4000/userProfile/getPostedItems", data).then((res)=>{
                if (res.statusCode === 200)
                // setEmail(res.data)
                    setPostedItems(res.data)
                // console.log(res);
            }).catch((error) => {
                console.log(error)
              })
    
        }

        getEmail()
        getLikedItems()
        getPostedItems()

    // }, [email, user, likedItems, postedItems])

    return(<>
        <AppNav></AppNav>
        <div class="profileInfo">
            <Card class="profileCard">
                <CardHeader title="User Profile" sx={{textAlign: 'center'}}></CardHeader>
                <Divider></Divider>
                <CardContent>Username: {user}</CardContent>
                <Divider></Divider>
                <CardContent>Email: {email}</CardContent>
            </Card>

        </div>
    </>)
}

export default Profile;
