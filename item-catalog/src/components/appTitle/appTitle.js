import React, {useState} from "react";
import Badge from "react-bootstrap/Badge"
import "bootstrap/dist/css/bootstrap.min.css"
import "./appTitle.css"
import Modal from "@mui/material/Modal"
import { IconButton, Tooltip, Box, Typography, Divider } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import {useLocation} from "react-router-dom"

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

const Title = ({title}) => {
    const location = useLocation()

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return(<>
    <div class="titleBadge">   
        <Badge bg="primary" style={{padding: "2% 5%", border: '3px solid black', textShadow: '3px 2px black'}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <h1 style={{textDecoration: 'underline'}}>{title}</h1>
                {
                    location.pathname === "/" ? 
                    <>
                        <Tooltip title="Site Info"><IconButton onClick={handleOpen}><InfoIcon style={{color: 'white'}} fontSize="large"></InfoIcon></IconButton></Tooltip>
                    </> 
                    : 
                    <>
                    </>
                }
            </div>
        </Badge>

    </div>

    <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" style={{margin: '5px 0px'}}>Put a Price On It!</Typography>
            <Divider></Divider>
            <Typography id="modal-modal-description" variant="p" style={{margin: '5px 0px', lineHeight: '1.25'}}>Put a Price On It! is a  MERN Stack application where users can add information -- name, price, and a short description -- about items they find on eBay, Amazon, etc. Other users can see the items' price, description and popularity amongst users of the app to hopefully aid in making informed decisions about which items to buy. Users can post items and like items that they have not posted. Users can only like an item once, however (i.e. a user cannot like an item 2+ times). The most popular items with the lowest price are the first items users will see upon logging in. Users are also granted a profile showing recent activity on the app such as most popular items, recently liked and posted items, and total number of liked and posted items.</Typography>
        </Box>
    </Modal>
    </>)
}

export default Title;