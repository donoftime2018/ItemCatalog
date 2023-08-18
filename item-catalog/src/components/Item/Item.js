import React from "react";
import {Card, CardContent, Divider, Button, IconButton} from "@mui/material";
import { useState } from "react";
import "./Item.css"
import Delete from "@mui/icons-material/Delete";



const Item = ({itemName, itemDesc, itemPrice, id, dbID}) => {

    const [open, setOpen] = useState(false);

    const openDesc = () => {
        setOpen(true);
    }

    const closeDesc = () => {
        setOpen(false);
    }

    const deleteItem = async() => {
        let id = dbID;
        const response = await fetch("http://localhost:4000/items/deleteItems/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        console.log(response)
        
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
            <Divider/>
            <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <IconButton onClick={deleteItem}><Delete color="error"></Delete></IconButton>
            </CardContent>
         </Card>
    </>)
    
   
}

export default Item;