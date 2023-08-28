import React from "react";
import {Card, CardContent, Divider, Button, IconButton} from "@mui/material";
import { useState } from "react";
import "./Item.css"
import Delete from "@mui/icons-material/Delete";
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import StarIcon from '@mui/icons-material/Star';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


const Item = ({itemName, itemDesc, itemPrice, itemRating, id, dbID}) => {

    const [open, setOpen] = useState(false);

    const openDesc = () => {
        setOpen(true);
    }

    const closeDesc = () => {
        setOpen(false);
    }

    const checkRating = () => {
        if (itemRating != null)
        {
            return itemRating + " out of 10"
        }
    }

    const deleteItem = async() => {
        let id = dbID;
        await fetch("http://localhost:4000/items/deleteItems/" + id, {
            method: "DELETE",
            "Cache-Control": "no-cache"
        })
    }

    const increaseRating = async() => {
        let id = dbID;
        await fetch("http://localhost:4000/items/increaseRating/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            "Cache-Control": "no-cache"
        })
    }

    const decreaseRating = async() => {
        let id = dbID;
        await fetch("http://localhost:4000/items/decreaseRating/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            "Cache-Control": "no-cache"
        })
    }

    return(<>
        <Card class="itemCard" key={id}>
            <CardContent>
                <span style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>{itemName}</span>
            </CardContent>
            <Divider/>
            <CardContent>
                <span style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>${itemPrice.toFixed(2)}</span>
            </CardContent>
            <Divider/>
            <>
            {open ? 
                <div key={id}>
                    <CardContent>
                        <span style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>{itemDesc}</span>
                    </CardContent>
                    <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Button sx={{borderRadius: '25px', border: "1px solid black"}} variant="contained" color="success" onClick={closeDesc}>Hide Description</Button>
                    </CardContent>
                </div>
                
                : 
                
                <div key={id}>
                    <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Button sx={{borderRadius: '25px', border: "1px solid black"}} variant="contained" color="success" onClick={openDesc}>Show Description</Button>
                    </CardContent>
                </div>
                
                }
            </>
            {/* <Divider/>
            <CardContent><span style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>{itemQuantity} exist</span></CardContent> */}
            <Divider/>
            <div>  
            <CardContent style={{display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center'}}>
                <span>{checkRating()}</span>
                <div>
                    <IconButton onClick={increaseRating}><StarIcon color="primary" fontSize="large"></StarIcon></IconButton>
                    <IconButton onClick={decreaseRating}><RemoveCircleIcon color="warning" fontSize="large"></RemoveCircleIcon></IconButton>
                </div>
               
            </CardContent>

            </div>
            <Divider></Divider>
            <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <IconButton onClick={deleteItem}><Delete color="error"></Delete></IconButton>
            </CardContent>
         </Card>
    </>)
    
   
}

export default Item;