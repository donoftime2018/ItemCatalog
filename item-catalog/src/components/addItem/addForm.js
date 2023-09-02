import {Card, CardHeader, CardContent, Divider, Input, Icon, IconButton, Button, TextField} from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from "react"
import "./addForm.css";
import {useFormik} from "formik";
import * as yup from "yup"
import axios from "axios";

const AddForm = () => {

    // const [name, setName] = useState('')
    // const [price, setPrice] = useState(0)
    // const [desc, setDesc] = useState('')
    // const [quantity, setQuantity] = useState(null)

    const validation = yup.object({
        item_name: yup.string("Enter name of item").required("Item name required"),
        item_price: yup.number().min(10.00).positive().required("Item price required"),
        item_desc: yup.string("Enter description of item").required("Item description required")
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            item_name: "",
            item_price: null,
            item_desc: ""
        },
        validationSchema: validation,
        onSubmit: (values, actions)=>{
            addItemToDB(values.item_name, values.item_price, values.item_desc);
        }
    }, {})


    const addItemToDB = (name, price, desc) => {

        const data = {name, price, desc}

            
        if (name !== "" && desc !== "" && price !== 0)
        {
            axios.post("http://localhost:4000/items/insertItems", data).then(res=>console.log(res)).catch((error) => {
                console.log(error)
              })
            // const response = await fetch("http://localhost:4000/items/insertItems", {
            //     method: 'POST',
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     "Cache-Control": "no-cache",
            //     body: JSON.stringify(data)
            // }).then(response=>response.json())
            
            // return response.json()
        }
    }

   return(<>
       <Card class="addFormStyle">
            <CardHeader sx={{textAlign: 'center'}} title="Add Items"></CardHeader>
            <Divider></Divider>
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                <div>
                    <TextField 
                        id="item_name"
                        name="item_name"
                        variant="outlined"
                        type="text"
                        label="Item Name"
                        value={formik.values.item_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.item_name && Boolean(formik.errors.item_name)}
                        helperText={formik.touched.item_name && formik.errors.item_name}
                        sx={{ backgroundColor: 'white', /*borderRadius: '25px'*/}} 
                        placeholder="Item name goes here..." 
                        disableUnderline="true" 
                    />
                </div>
            {/* <Divider></Divider> */}
                <div>
                    <TextField 
                        id="item_price"
                        name="item_price"
                        variant="outlined"
                        type="number"
                        value={formik.values.item_price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.item_price && Boolean(formik.errors.item_price)}
                        helperText={formik.touched.item_price && formik.errors.item_price}
                        inputProps={{step: 0.01}} 
                        sx={{backgroundColor: 'white'/*borderRadius: '25px'*/}} 
                        placeholder="Item Price goes here..." 
                        label="Item Price"
                        disableUnderline="true" 
                    />
                </div>
            {/* <Divider></Divider> */}
                <div>
                    <TextField
                        id="item_desc"
                        name="item_desc"
                        variant="outlined"
                        type="text"
                        value={formik.values.item_desc}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.item_desc && Boolean(formik.errors.item_desc)}
                        helperText={formik.touched.item_desc && formik.errors.item_desc}
                        sx={{ backgroundColor: 'white', /*borderRadius: '25px'*/}} 
                        placeholder="Item Desc goes here..." 
                        label="Item Description"
                        disableUnderline="true" 
                    />
                </div>
            {/* <Divider></Divider> */}
            {/* <CardContent>Item Quantity: <Input sx={{overflowX: 'auto', width: '70px', backgroundColor: 'white', border: '1px black solid', borderRadius: '25px'}} disableUnderline="true" type="text" onChange={(event)=>setQuantity(event.currentTarget.value)}></Input></CardContent>
            <Divider></Divider> */}
            {/* <CardContent>Item Rating (between 0 and 10): <Input sx={{overflowX: 'auto', width: '40px', backgroundColor: 'white', border: '1px black solid', borderRadius: '25px'}} disableUnderline="true" type="text" onChange={(event)=>setRating(event.currentTarget.value)}></Input></CardContent>
            <Divider></Divider> */}
                <div>
                    <Button type="Submit" variant="contained" color="primary" sx={{borderRadius: '25px', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Add Item to List</Button>
                </div>
            </form>
                {/* <Input sx={{border: '1px black solid', backgroundColor: 'white', borderRadius: '25px'}} placeholder="Item Name" disableUnderline="true" type="text"/>
            {/* <Divider></Divider> */}
               {/* <Input inputProps={{step: 0.01}} sx={{border: '1px black solid',  backgroundColor: 'white', width:'60px', borderRadius: '25px'}} placeholder="Item Price" disableUnderline="true" type="number"></Input> */}
            {/* <Divider></Divider> */}
                {/* <Input sx={{overflowX: 'auto', backgroundColor: 'white', border: '1px black solid', borderRadius: '25px'}} disableUnderline="true" type="text"></Input> */}
            {/* <Divider></Divider> */}
            {/* <CardContent>Item Quantity: <Input sx={{overflowX: 'auto', width: '70px', backgroundColor: 'white', border: '1px black solid', borderRadius: '25px'}} disableUnderline="true" type="text" onChange={(event)=>setQuantity(event.currentTarget.value)}></Input></CardContent>
            <Divider></Divider> */}
            {/* <CardContent>Item Rating (between 0 and 10): <Input sx={{overflowX: 'auto', width: '40px', backgroundColor: 'white', border: '1px black solid', borderRadius: '25px'}} disableUnderline="true" type="text" onChange={(event)=>setRating(event.currentTarget.value)}></Input></CardContent>
            <Divider></Divider> */}
                {/* <Button variant="contained" color="primary" sx={{borderRadius: '25px', border: '1px solid black'}}>Add Item to List</Button> */}
            </CardContent>
        </Card>
   
   </>)

}

export default AddForm;

