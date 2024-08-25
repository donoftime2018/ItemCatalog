import React from "react";
import {Card, CardContent, Divider, IconButton, Box, Typography} from "@mui/material";
import { useState } from "react";
import "./Item.css"
import Delete from "@mui/icons-material/Delete";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Modal from "@mui/material/Modal"
import InfoIcon from '@mui/icons-material/Info';
import {Tooltip} from "@mui/material";
import axios from 'axios';
import { useAuth } from "../context/user";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'azure',
    borderRadius: '25px',
    boxShadow: 24,
    p: 3,
    textAlign: 'center',
    alignItems: 'center'
  };

const Item = ({itemName, itemDesc, itemPoster, itemRatedByUser, itemPrice, itemRating, id, dbID}) => {


    const [open, setOpen] = useState(false);
    const auth=useAuth();
    const user = auth.user;

    const openDesc = () => {
        setOpen(true);
    }

    const closeDesc = () => {
        setOpen(false);
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
                <span style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>Price Tag: ${itemPrice.toFixed(2)}</span>
            </CardContent>
            <Divider/>
            <CardContent key={id} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px'}}>
            <Tooltip title="View Full Description"><IconButton onClick={openDesc}><InfoIcon color="info" fontSize="large"></InfoIcon></IconButton></Tooltip>
            </CardContent>
            <Divider/>
            <CardContent style={{display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center'}}>
                <div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <FavoriteIcon fontSize="large" sx={{color:'#c70e0e'}}><IconButton></IconButton></FavoriteIcon>{itemRating}
                    </div>
                </div>
            </CardContent>
            {
                user === itemPoster? 
                <>
                    
                    <Divider></Divider>
                    <CardContent sx={{display: 'flex', flexDirection: 'row', paddingTop: '5px', paddingBottom: '10px!important', alignItems: 'center', justifyContent: 'center'}}>
                        <Tooltip title="Delete item"><IconButton onClick={deleteItem} ><Delete color="error" fontSize='large'></Delete></IconButton></Tooltip>
                    </CardContent>
                </> : 
                <></>
            }
         </Card>

         <Modal open={open} 
            onClose={closeDesc}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" style={{margin: '5px 0px', lineHeight: '1.25'}}>{itemName}</Typography>
                    <Divider></Divider>
                    <Typography id="modal-modal-description" style={{margin: '5px 0px'}}>Posted by: {itemPoster}</Typography>
                    <Divider></Divider>
                    <Typography id="modal-modal-description" style={{margin: '5px 0px', lineHeight: '1.25'}}>{itemDesc}</Typography>
                    <Divider></Divider>
                    <Typography variant="h6" style={{margin: '5px 0px', lineHeight: '1.25'}}><FavoriteIcon sx={{color:'#c70e0e'}}></FavoriteIcon>{itemRating}</Typography>
                </Box>
         </Modal>
    </>)
    
   
}

export default Item;