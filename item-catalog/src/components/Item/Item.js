import React from "react";
import {Card, CardContent, Divider, IconButton, Box} from "@mui/material";
import { useState } from "react";
import "./Item.css"
import Delete from "@mui/icons-material/Delete";
import StarIcon from '@mui/icons-material/Star';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';
import {Tooltip} from "@mui/material";
import axios from 'axios';
import { useAuth } from "../context/user";


const Item = ({itemName, itemDesc, itemPoster, itemPrice, itemReviews, itemRating, id, dbID, lastUpdate}) => {

    const [open, setOpen] = useState(false);
    const auth=useAuth();
    const user = auth.user;

    const openDesc = () => {
        setOpen(true);
    }

    const closeDesc = () => {
        setOpen(false);
    }

    const checkRating = () => {
        if (itemRating != null)
        {
            return (<>
                <div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <StarIcon fontSize="large" color="warning"></StarIcon><Box flexGrow='0.025'/>{itemRating} / 10
                    </div>
                    <div style={{fontSize: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {itemReviews} Reviews
                    </div>
                </div>
            </>)
        }
    }

    const deleteItem = () => {
        let id = dbID;
        let confirmDelete = window.confirm("Are you sure you want to delete " + itemName + "?")

        if (confirmDelete === true)
        {
            axios.delete("http://localhost:4000/items/deleteItems/" + id).then((res) => {
                console.log(res.data)
                }).catch((error) => {
                console.log(error)
                })
        }
    }

    const increaseRating = () => {
        let id = dbID;
        
        let user = auth.user
        let data = {user}

        axios.put("http://localhost:4000/items/increaseRating/" + id, data).then((res)=>{console.log(res);
        }
        ).catch((error)=>{
            const errorMessage = JSON.parse(error.request.response)
            console.error(errorMessage.msg); 
            alert(errorMessage.msg);})
    }

    const decreaseRating = () => {
        let id = dbID;
        let user = auth.user

        let data = {user}

        axios.put("http://localhost:4000/items/decreaseRating/" + id, data).then((res)=>{console.log(res);
        }
        ).catch((error)=>{
            const errorMessage = JSON.parse(error.request.response)
            console.error(errorMessage.msg); 
            alert(errorMessage.msg);})
    }

    return(<>
        <Card class="itemCard" key={id}>
            <CardContent>
                <div style={{flexDirection: 'column'}}>
                    <span style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>{itemName}</span>
                    <span style={{fontSize: '20px', display: 'flex', textAlign: 'center', justifyContent: 'center'}}>Posted by: {itemPoster}</span>
                </div>
            </CardContent>
            <Divider/>
            <CardContent>
                <span style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>Avg. Market Price: ${itemPrice.toFixed(2)}</span>
            </CardContent>
            <Divider/>
            <>
            {open ? 
                <>
                    <CardContent key={id} sx={{paddingBottom: '1px'}}>
                        <span style={{fontSize: '20px', display: 'flex', textAlign: 'center', justifyContent: 'center'}}>{itemDesc}</span>
                    </CardContent>
                    <CardContent sx={{display: 'flex', alignItems: 'center', paddingTop: '1px', justifyContent: 'center'}}>
                        <Tooltip title="Close description"><IconButton onClick={closeDesc}><CloseIcon color="info" fontSize="large"></CloseIcon></IconButton></Tooltip>
                    </CardContent>
                </>
                : 
                <>
                    <CardContent key={id} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px'}}>
                    <Tooltip title="Open description"><IconButton onClick={openDesc}><InfoIcon color="info" fontSize="large"></InfoIcon></IconButton></Tooltip>
                    </CardContent>
                </>         
                }
            </>
            <Divider/>
            <CardContent style={{display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center'}}>
                <span>{checkRating()}</span>
                <div>
                    <Tooltip title="Add Review"><IconButton onClick={increaseRating}><AddCircleIcon color="primary" fontSize="large"></AddCircleIcon></IconButton></Tooltip>
                    <Tooltip title="Remove Review"><IconButton onClick={decreaseRating}><RemoveCircleIcon color="error" fontSize="large"></RemoveCircleIcon></IconButton></Tooltip>
                </div>
               
            </CardContent>
            {
                user === itemPoster? 
                <>
                    
                    <Divider></Divider>
                    <CardContent sx={{display: 'flex', paddingTop: '5px', paddingBottom: '10px!important', alignItems: 'center', justifyContent: 'center'}}>
                        <Tooltip title="Delete item"><IconButton onClick={deleteItem} ><Delete color="error" fontSize='large'></Delete></IconButton></Tooltip>
                    </CardContent>
                </> : 
                
                <></>
            }
         </Card>
    </>)
    
   
}

export default Item;