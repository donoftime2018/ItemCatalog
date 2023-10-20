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
    // console.log(recentUpdate)

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
        // await fetch("http://localhost:4000/items/deleteItems/" + id, {
        //     method: "DELETE",
        //     "Cache-Control": "no-cache"
        // })


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
        // await fetch("http://localhost:4000/items/increaseRating/" + id, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     "Cache-Control": "no-cache"
        // })
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
        // await fetch("http://localhost:4000/items/decreaseRating/" + id, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     "Cache-Control": "no-cache"
        // })
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
                // <div key={id}>
                <>
                    <CardContent key={id} sx={{paddingBottom: '1px'}}>
                        <span style={{fontSize: '20px', display: 'flex', textAlign: 'center', justifyContent: 'center'}}>{itemDesc}</span>
                    </CardContent>
                    <CardContent sx={{display: 'flex', alignItems: 'center', paddingTop: '1px', justifyContent: 'center'}}>
                        <Tooltip title="Close description"><IconButton onClick={closeDesc}><CloseIcon color="info" fontSize="large"></CloseIcon></IconButton></Tooltip>
                        {/* <Button sx={{borderRadius: '25px', border: "1px solid black"}} variant="contained" color="success" onClick={closeDesc}>Hide Description</Button> */}
                    </CardContent>
                {/* </div> */}
                </>
                : 
                
                // <div key={id}>
                <>
                    <CardContent key={id} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px'}}>
                    <Tooltip title="Open description"><IconButton onClick={openDesc}><InfoIcon color="info" fontSize="large"></InfoIcon></IconButton></Tooltip>
                    </CardContent>
                </>
                    
                // </div>
                
                }
            </>
            {/* <Divider/>
            <CardContent><span style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>{itemQuantity} exist</span></CardContent> */}
            <Divider/>
            <div>  
            <CardContent style={{display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center'}}>
                <span>{checkRating()}</span>
                <div>
                    <Tooltip title="Add Star"><IconButton onClick={increaseRating}><AddCircleIcon color="primary" fontSize="large"></AddCircleIcon></IconButton></Tooltip>
                    <Tooltip title="Remove Star"><IconButton onClick={decreaseRating}><RemoveCircleIcon color="error" fontSize="large"></RemoveCircleIcon></IconButton></Tooltip>
                </div>
               
            </CardContent>

            </div>
            {/* <Divider/>
            <CardContent style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                <span style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>Last Updated: {Date(lastUpdate)}</span>
            </CardContent> */}
            {/* <>
            { */}
                {/* // itemRating < 4 ? */}
                {/* <div key={id}>
                <Divider></Divider>
                    <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <IconButton onClick={deleteItem}><Delete color="error"></Delete></IconButton>
                    </CardContent>

                </div> */}
                {/* // : */}
                
                {/* <div>

                </div> */}

            {/* }
            </> */}
         </Card>
    </>)
    
   
}

export default Item;