import React from "react";
import {Card, CardContent, Divider, Button, IconButton} from "@mui/material";
import { useState } from "react";
import "./Item.css"
import Delete from "@mui/icons-material/Delete";
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';
import {Tooltip} from "@mui/material";
import axios from 'axios';
import { useAuth } from "../context/user";


const Item = ({itemName, itemDesc, itemPoster, itemPrice, itemRating, id, dbID, lastUpdate}) => {

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
                <StarIcon fontSize="large" color="warning"></StarIcon>{itemRating}
            </>)
        }
    }

    const deleteItem = async() => {
        let id = dbID;

        axios.delete("http://localhost:4000/items/deleteItems/" + id).then((res) => {
            console.log(res.data)
            console.log('Student successfully updated')
          }).catch((error) => {
            console.log(error)
          })
    }

    const increaseRating = async() => {
        let id = dbID;
        
        let user = auth.user
        let data = {user}

        axios.put("http://localhost:4000/items/increaseRating/" + id, data).then((res)=>{console.log(res);
            if(res.status === 400)
            {
                window.alert("You already rated this item!")
            }
        }
        ).catch((error)=>{console.error(error)})
    }

    const decreaseRating = async() => {
        let id = dbID;
        let user = auth.user

        let data = {user}

        axios.put("http://localhost:4000/items/decreaseRating/" + id, data).then((res)=>{console.log(res);
            if(res.status === 400)
            {
                window.alert("You haven't rated this item yet!")
            }
        }
        ).catch((error)=>{console.error(error)})
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
                    <Tooltip title="Add Star"><IconButton onClick={increaseRating}><AddCircleIcon color="primary" fontSize="large"></AddCircleIcon></IconButton></Tooltip>
                    <Tooltip title="Remove Star"><IconButton onClick={decreaseRating}><RemoveCircleIcon color="error" fontSize="large"></RemoveCircleIcon></IconButton></Tooltip>
                </div>
               
            </CardContent>
            {
                user === itemPoster? 
                <>
                    
                    <Divider></Divider>
                    <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Tooltip title="Delete item"><IconButton onClick={deleteItem} ><Delete color="error" size='large'></Delete></IconButton></Tooltip>
                    </CardContent>
                </> : 
                
                <></>
            }
         </Card>
    </>)
    
   
}

export default Item;