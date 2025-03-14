import React from "react";
import {Card, CardContent, Divider, IconButton, Box, Typography, Tooltip} from "@mui/material";
import AppAlert from "../Alert/Alert";
import { useState, useEffect } from "react";
import "./Item.css"
import Delete from "@mui/icons-material/Delete";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageIcon from '@mui/icons-material/Image';
import Modal from "@mui/material/Modal"
import InfoIcon from '@mui/icons-material/Info';
import ReportItem from "../reportItem/reportItem";
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


const Item = ({itemName, itemDesc, itemPoster, itemWebsite, itemImage, itemRatedByUser, itemPrice, itemRating, dateCreated, lastUpdated, id, dbID}) => {

    const [alertOpen, setAlertOpen] = useState(false);
    const [imageOpen, setImageOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [open, setOpen] = useState(false);
    const auth=useAuth();
    const user = auth.user;

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/

    useEffect(()=>{
        if (alertOpen === true)
        {
            setTimeout(()=>{
                setAlertOpen(false);
                setAlertMessage("");
            }, 5000)
        }
    }, [alertOpen])

    const openDesc = () => {
        setOpen(true);
    }

    const closeDesc = () => {
        setOpen(false);
    }

    const openImage = () => {
        setImageOpen(true);
    }

    const closeImage = () => {
        setImageOpen(false);
    }

    const deleteItem = () => {
        let id = dbID;
        let confirmDelete = window.confirm("Are you sure you want to delete " + itemName + "?")

        let image = itemImage
        let data = {image}
        if (confirmDelete === true)
        {
            axios.delete(process.env.REACT_APP_LOCAL_HOST + "/items/deleteItems/" + id, {data: data}).then((res) => {
                }).catch((error) => {
                
                })
        }
    }

    const increaseRating = () => {
        let id = dbID;
        
        let user = auth.user
        let data = {user}

        axios.put(process.env.REACT_APP_SERVER_URL + "/items/increaseRating/" + id, data).then((res)=>{
                if (res.status === 200)
                {
                    setAlertOpen(true)
                    setAlertMessage("You liked " + itemName)
                }
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

        axios.put(process.env.REACT_APP_SERVER_URL + "/items/decreaseRating/" + id, data).then((res)=>{
                if (res.status === 200)
                {
                    setAlertOpen(true)
                    setAlertMessage("You unliked " + itemName)
                }
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
            <CardContent key={id} sx={{display: 'flex',  alignItems: 'center', justifyContent: 'center', padding: '5px'}}>
            <Tooltip title="View Full Description"><IconButton onClick={openDesc}><InfoIcon color="info" fontSize="large"></InfoIcon></IconButton></Tooltip>
            </CardContent>
            <Divider/>
            <CardContent style={{display: 'flex', padding: '5px', paddingBottom: '10px!important', textAlign: 'center', justifyContent: 'center'}}>
            {
                <>
                    {
                        itemRatedByUser ? 
                        <>
                            <div>
                                <div style={{display: 'flex-inline', justifyContent: 'center', alignItems: 'center'}}>
                                    <Tooltip title="Unlike Item"><IconButton onClick={decreaseRating}><FavoriteIcon fontSize="large" sx={{color:'#c70e0e'}}></FavoriteIcon></IconButton>{itemRating}</Tooltip>
                                </div>
                            </div>
                        </> 
                        :                 
                        <>
                            {
                                itemPoster !== user ? 
                                <>
                                    <div>
                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <Tooltip title="Like Item"><IconButton onClick={increaseRating}><FavoriteBorderIcon fontSize="large" sx={{color:'#c70e0e'}}></FavoriteBorderIcon></IconButton>{itemRating}</Tooltip>
                                        </div>
                                    </div>
                                </> :
                                <>
                                    <div>
                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <FavoriteIcon fontSize="large" sx={{color:'#c70e0e'}}></FavoriteIcon>{itemRating}
                                        </div>
                                    </div>
                                </>
                            }
                    
                        </>
                    }   
                </>
            }
            </CardContent>
            {
                user === itemPoster? 
                <>
                    
                    <Divider></Divider>
                    <CardContent sx={{display: 'flex', flexDirection: 'row', padding: '5px', paddingBottom: '10px!important', alignItems: 'center', justifyContent: 'center'}}>
                        <Tooltip title="Delete item"><IconButton onClick={deleteItem} ><Delete color="error" fontSize='large'></Delete></IconButton></Tooltip>
                    </CardContent>
                </> : 
                <>
                    <Divider></Divider>
                    <CardContent sx={{display: 'flex', flexDirection: 'row', padding: '5px', paddingBottom: '10px!important', alignItems: 'center', justifyContent: 'center'}}>
                        <ReportItem></ReportItem>
                    </CardContent>
                </>
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
                    <Typography id="modal-modal-description" style={{margin: '5px 0px'}}>Found on:
                        <>
                            {
                                urlRegex.test(itemWebsite) === true ? 
                                
                                <> <a href={itemWebsite} target="blank">{itemWebsite}</a></> 
                                : 
                                <> {itemWebsite}</>
                            }
                        </>
                    </Typography>
                    <Divider></Divider>
                    <Typography id="modal-modal-description" style={{margin: '5px 0px'}}>Price Tag: ${itemPrice.toFixed(2)}</Typography>
                    <Divider></Divider>
                    <Typography id="modal-modal-description" style={{margin: '5px 0px', lineHeight: '1.25'}}>{itemDesc}</Typography>
                    <Divider></Divider>
                    <Typography id="modal-modal-description" style={{margin: '5px 0px', lineHeight: '1.25'}}>Date Added: {new Date(dateCreated).toDateString()}</Typography>
                    <Divider></Divider>
                    <Typography id="modal-modal-description" style={{margin: '5px 0px', lineHeight: '1.25'}}>Date Last Updated: {new Date(lastUpdated).toDateString()}</Typography>
                    <Divider></Divider>
                    <div style={{display: 'flex-inline', justifyContent: 'center', alignItems: 'center'}}><Typography variant="h6"><FavoriteIcon fontSize="large" sx={{color:'#c70e0e'}}></FavoriteIcon>{itemRating}</Typography></div>
                    <Divider></Divider>
                    <div style={{display: 'flex-inline', justifyContent: 'center', alignItems: 'center'}}><Typography variant="h6">
                        <Tooltip title="View Image of Item"><IconButton onClick={openImage}><ImageIcon color="primary" fontSize="large"></ImageIcon></IconButton></Tooltip>
                    </Typography></div>
                </Box>
         </Modal>

         <Modal open={imageOpen} onClose={closeImage}>
            <Box 
                component="img" 
                src={`${process.env.REACT_APP_SERVER_URL}/uploads/${itemImage}`}
                alt=''
                sx={{
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                  }}
            >
            </Box>
         </Modal>

        {
            alertOpen ? 
            <AppAlert message={alertMessage}></AppAlert>
            :
            <></>
        }
    </>)
}

export default Item;