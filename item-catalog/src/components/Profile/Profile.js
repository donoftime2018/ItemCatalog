import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, TextField, Button, Divider} from "@mui/material"
import axios from "axios";
import { useAuth } from "../context/user";
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik";
import * as yup from "yup"
import Title from "../appTitle/appTitle";
import AppNav from "../NavBar/NavBar";
import StarIcon from '@mui/icons-material/Star';
import "./Profile.css";

const Profile = () => {
    const auth = useAuth()
    const user = auth.user
    const navigate = useNavigate()

    const [likedItems, setLikedItems] = useState([])
    const [postedItems, setPostedItems] = useState([])
    const [popularItems, setPopularItems] = useState([])

    const validation = () => yup.object({
        userName: yup.string().required("Username required")
    })


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
           userName: ""
        },
        validationSchema: validation,
        onSubmit: (values, actions)=>{
            deleteAccount(values.userName);
        }
    }, {})

    const deleteAccount = (account) => {
        if (account === user)
        {
            const data = {account}
            axios.delete("http://localhost:4000/deleteAccount", {data}).then((res)=>{
                console.log(res);
                if(res.status === 200)
                {
                    alert(res.data.msg)
                    navigate("/login")
                }
            }).catch((err)=>{console.error(err)})
        }
        else {
            alert("You are not logged in as " + user)
        }
    }

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

        getLikedItems()
        getPostedItems()
        getMostPopularItems()

    }, [likedItems, postedItems, popularItems, popularItems.length, 
        likedItems.length, postedItems.length, user])

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

        <div class="deleteProfile">
            <Card class="deleteProfileCard">
                <CardHeader sx={{textAlign: 'center', textDecoration: 'underline'}} title="Delete Account:"></CardHeader>
                <Divider></Divider>
                <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
                    <form onSubmit={formik.handleSubmit}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <TextField
                                id="userName"
                                name="userName"
                                variant="outlined"
                                type="text"
                                label="Enter Your Username"
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.userName && Boolean(formik.errors.userName)}
                                helperText={formik.touched.userName && formik.errors.userName}
                                sx={{ backgroundColor: 'white'}} 
                                placeholder="Enter Username" 
                                disableUnderline="true" 
                            ></TextField>   
                        </div>
                        
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button type="Submit" sx={{borderRadius: '25px', border: '1px black solid'}} variant="contained" color="error">Delete Account</Button>
                        </div>
                        
                    </form>
                    </CardContent>
            </Card>
        </div>
        
    </>)
}

export default Profile;
