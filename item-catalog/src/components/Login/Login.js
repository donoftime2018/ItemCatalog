import {React, useState} from "react";
import {Card, CardContent, Divider, TextField, Button, CardHeader} from "@mui/material"
import {useFormik} from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup"
import axios from "axios";
import { useAuth } from "../context/user";
import "./Login.css";

const LoginPage = () => {
    const navigate = useNavigate()
    const auth = useAuth()

    const validation = () => yup.object({
        userName: yup.string().min(10, "Username must be at least 10 characters long").max(20, "Username cannot be more than 20 characters").required("Username required"),
        passWord: yup.string().min(8, "Password must be at least 8 characters long").max(12, "Password cannot be over 12 characters long").required("Password required")
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
           userName: "",
           passWord: ""
        },
        validationSchema: validation,
        onSubmit: (values, actions)=>{
            // addItemToDB(values.item_name, values.item_price, values.item_desc);
            checkLogin(values.userName, values.passWord)
        }
    }, {})

    const checkLogin = (name, pwd) => {
        const data = {name, pwd}
        axios.post("http://localhost:4000/login", data).then((res)=>{
            if(res.status===200)
            {
                auth.login(name)
                navigate("/")
            }

            else {
                
            }
        })
    }

    return(<>
        <div class="loginLayout">
        <Card class="loginCard">
            <CardHeader sx={{textAlign: 'center'}} title="Login"></CardHeader>
            <Divider/>
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <div style={{display: "flex", justifyContent: 'center'}}>
                        <TextField
                            id="userName"
                            name="userName"
                            variant="outlined"
                            type="text"
                            label="User Name"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.userName && Boolean(formik.errors.userName)}
                            helperText={formik.touched.userName && formik.errors.userName}
                            sx={{ backgroundColor: 'white', /*borderRadius: '25px'*/}} 
                            placeholder="User name goes here..." 
                            disableUnderline="true" 
                        ></TextField>
                    </div>

                    <div style={{display: "flex", justifyContent: 'center'}}>
                        <TextField
                            id="passWord"
                            name="passWord"
                            variant="outlined"
                            type="password"
                            label="Password"
                            value={formik.values.passWord}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.passWord && Boolean(formik.errors.passWord)}
                            helperText={formik.touched.passWord && formik.errors.passWord}
                            sx={{ backgroundColor: 'white', /*borderRadius: '25px'*/}} 
                            placeholder="Password goes here..." 
                            disableUnderline="true" 
                        ></TextField>
                    </div>

                    <div style={{display: "flex", justifyContent: 'center'}}>
                        <Button type="Submit" variant="contained" color="primary" sx={{borderRadius: '25px', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Submit Info</Button>
                    </div>

            </form>
            </CardContent>
            <Divider></Divider>
            <CardContent style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center'}}>
                {/* <p>Forgot Password? <Link to="/updatePassword">Click here.</Link></p> */}
                <p>Register? <Link to="/register">Click here.</Link></p>
            </CardContent>
        </Card>
        </div>
        
    </>)
}

export default LoginPage;