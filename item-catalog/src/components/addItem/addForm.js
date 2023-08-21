import {Card, CardHeader, CardContent, Divider, Input, Icon, IconButton, Button, TextField} from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from "react"
import "./addForm.css"

const AddForm = () => {
        
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [desc, setDesc] = useState("")
    

    const addItemToDB = async() => {
        const data = {name, price, desc}

        if (name !== "" && desc !== "" && price !== "")
        {
            const response = await fetch("http://localhost:4000/items/insertItems", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                cache: 'no-cache',
                body: JSON.stringify(data)
            })
            
            return response.json()
        }
    }

   return(<>
       <Card class="addFormStyle">
            <CardHeader sx={{textAlign: 'center'}} title="Add Items"></CardHeader>
            <Divider></Divider>
            <CardContent>Item Name: <Input sx={{border: '1px black solid', backgroundColor: 'white', borderRadius: '25px'}} disableUnderline="true" type="text" onChange={(event)=>setName(event.currentTarget.value)}></Input></CardContent>
            <Divider></Divider>
            <CardContent>Item Price: <Input sx={{border: '1px black solid',  backgroundColor: 'white', width:'100px', borderRadius: '25px'}} disableUnderline="true" type="text" onChange={(event)=>setPrice(event.currentTarget.value)}></Input></CardContent>
            <Divider></Divider>
            <CardContent>Item Desc: <Input sx={{overflowX: 'auto', backgroundColor: 'white', border: '1px black solid', borderRadius: '25px'}} disableUnderline="true" type="text" onChange={(event)=>setDesc(event.currentTarget.value)}></Input></CardContent>
            <Divider></Divider>
            <CardContent sx={{display: 'flex', justifyContent: 'center'}}><Button onClick={addItemToDB} variant="contained" color="primary" sx={{borderRadius: '25px', border: '1px solid black'}}>Add Item to List</Button></CardContent>
        </Card>
   
   </>)

}

export default AddForm;

