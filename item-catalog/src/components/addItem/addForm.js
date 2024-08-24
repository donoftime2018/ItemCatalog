import { useState } from "react";
import {Card, CardHeader, CardContent, Divider, Button, TextField} from "@mui/material"
import Backdrop from "@mui/material/Backdrop";
import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import "./addForm.css";
import {useFormik} from "formik";
import { useAuth } from "../context/user";
import * as yup from "yup"
import axios from "axios";
import { Close } from "@mui/icons-material";

const AddForm = () => {
    const [open, setOpen] = useState(false);
    const auth = useAuth()


    const validation = () => yup.object({
        item_name: yup.string().max(65, "Item name cannot be over 65 characters long").required("Item name required"),
        item_price: yup.number().positive("Item price must be positive").required("Item price required"),
        item_desc: yup.string().max(85, "Item description cannot be over 85 characters long").required("Item description required"),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            item_name: "",
            item_price: 0.00,
            item_desc: ""
        },
        validationSchema: validation,
        onSubmit: (values, actions)=>{
            addItemToDB(values.item_name, values.item_price, values.item_desc);
        }
    }, {})

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        formik.setTouched({}, false)
        formik.resetForm()
        setOpen(false)
    }

    const addItemToDB = (name, price, desc) => {

        const user = auth.user
        const data = {name, price, desc, user}

        axios.post("http://localhost:4000/items/insertItems", data).then((res)=>{console.log(res);
            handleClose()
            }).catch((error) => {
            const errorMessage = JSON.parse(error.request.response)
            console.error(errorMessage.msg); 
            alert(errorMessage.msg);})
    }

   return(<>
        <Button
        onClick={handleOpen}
        variant="contained" 
        color="primary" 
        sx={{borderRadius: '25px', border: '1px solid black', display: 'flex', top: '12%', left: '5%', position: 'fixed',
         justifyContent: 'center', alignItems: 'center' }}>
            Open Add Items
        </Button>

        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 100 }} open={open}>
        <div class="formLayout">
            <Tooltip title="Close Add Items"><IconButton onClick={handleClose}><Close sx={{fontSize: 60, color: 'white'}}></Close></IconButton></Tooltip>
            <Card class="addFormStyle">
                <CardHeader sx={{textAlign: 'center'}} title="Add Item"></CardHeader>    
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
                        sx={{ backgroundColor: 'white', width: '100%'}} 
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
                        inputProps={{step: 0.01, min: 0.00}} 
                        sx={{backgroundColor: 'white', width: '100%'}} 
                        placeholder="Item Price goes here..." 
                        label="Item Price (USD)"
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
                        sx={{ backgroundColor: 'white', width: '100%'}}
                        multiline
                        rows="4"
                        placeholder="Item Desc goes here..." 
                        label="Item Description"
                        disableUnderline="true" 
                    />
                </div>
                <div style={{display: "flex", justifyContent: 'center'}}>
                    <Button type="Submit" variant="contained" color="primary" sx={{borderRadius: '25px', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Add Item to Catalog</Button>
                </div>
            </form>
            </CardContent>
        </Card>
        </div>
        </Backdrop>
        
   </>)

}

export default AddForm;

