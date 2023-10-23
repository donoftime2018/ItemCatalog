import {Card, CardHeader, CardContent, Box, Divider, Input, Icon, Tooltip, IconButton, Button, TextField} from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react"
import "./addForm.css";
import {useFormik} from "formik";
import { useAuth } from "../context/user";
import * as yup from "yup"
import axios from "axios";

const AddForm = () => {

    const auth = useAuth()

    const validation = () => yup.object({
        item_name: yup.string().max(40, "Item name cannot be over 40 characters long").required("Item name required"),
        item_price: yup.number().positive("Item price must be positive").required("Item price required"),
        item_desc: yup.string().max(60, "Item description cannot be over 60 characters long").required("Item description required")
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

        const user = auth.user
        const data = {name, price, desc, user}

            
        if (name !== "" && desc !== "" && price !== 0)
        {
            axios.post("http://localhost:4000/items/insertItems", data).then((res)=>{console.log(res);
                if (res.status !== 200)
                {
                    window.alert(name + " already exists!")
                }
            }).catch((error) => {
                console.log(error)
              })
        }
    }

   return(<>
        <div class="formLayout">
            <Card class="addFormStyle">
                <CardHeader sx={{textAlign: 'center', paddingRight: '4px'}} title="Add Items"></CardHeader>    
                <Divider></Divider>
                <CardContent>
                <form onSubmit={formik.handleSubmit}>
                <div style={{display: "flex", justifyContent: 'center'}}>
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
                <div style={{display: "flex", justifyContent: 'center'}}>
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
                <div style={{display: "flex", justifyContent: 'center'}}>
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
                <div style={{display: "flex", justifyContent: 'center'}}>
                    <Button type="Submit" variant="contained" color="primary" sx={{borderRadius: '25px', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Add Item to List</Button>
                </div>
            </form>
            </CardContent>
        </Card>
        </div>
   </>)

}

export default AddForm;

