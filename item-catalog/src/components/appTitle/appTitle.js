import React, {useEffect, useState} from "react";
import Badge from "react-bootstrap/Badge"
import "bootstrap/dist/css/bootstrap.min.css"
import "./appTitle.css"
import Modal from "@mui/material/Modal"
import { IconButton, Tooltip, Box, Typography, Divider } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import {useLocation} from "react-router-dom"
import projectDesc from "./projectDesc.txt"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
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
    const [appDesc, setDesc] = useState()

    useEffect(()=>{
        fetch(projectDesc).then(
            (response)=>{
                if (response.ok)
                {
                    return response.text()
                }
            }
        ).then((text)=>{setDesc(text)})
    }, 
    [appDesc])

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
            <Typography id="modal-modal-title" variant="h5" style={{margin: '5px 0px', fontWeight: 'bold'}}>Put a Price On It!</Typography>
            <Divider></Divider>
            <Typography id="modal-modal-description" variant="p" sx={{paddingTop: "10px"}}><pre>{appDesc}</pre></Typography>
        </Box>
    </Modal>
    </>)
}

export default Title;