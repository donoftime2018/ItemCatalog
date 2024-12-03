import {React, useEffect, useState} from "react";
import {Card, CardContent, Divider, TextField, Button, CardHeader, IconButton} from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import {useFormik} from "formik";
import { useNavigate, Link, useLocation } from "react-router-dom";
import * as yup from "yup"
import axios from "axios";
import { useAuth } from "../context/user";
import "./Login.css";

const LoginPage = (props) => {
    console.log(process.env.REACT_APP_SERVER_URL)

    const [passwordVisibility, setPasswordVisibility] = useState(false)

    const showPwd = () => {
        setPasswordVisibility(true)
    }

    const hidePwd = () => {
        setPasswordVisibility(false)
    }

    useEffect(()=>{
        document.title = props.title
    }, [props])
    
    const navigate = useNavigate()
    const location = useLocation()
    const auth = useAuth()

    const redirect = location.state?.path || '/'

    const validation = () => yup.object({
        userName: yup.string().min(10, "Username must be at least 10 characters long").max(30, "Username cannot be more than 30 characters").required("Username required"),
        passWord: yup.string().min(8, "Password must be at least 8 characters long").max(20, "Password cannot be over 20 characters long").required("Password required")
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
           userName: "",
           passWord: ""
        },
        validationSchema: validation,
        onSubmit: (values, actions)=>{
            checkLogin(values.userName, values.passWord)
        }
    }, {})

    const checkLogin = (name, pwd) => {
        const data = {name, pwd}
        axios.post(process.env.SERVER_URL + "/login", data).then((res)=>{
            if(res.status===200)
            {
                let username = res.data[0].username
                auth.login(username)
                navigate(redirect, {replace: true})
            }
        }).catch((err)=>{
            const errorMessage = JSON.parse(err.request.response);
            const validationMessage = err.response.data.msg.message;
            const errorAlert = validationMessage===undefined ? errorMessage.msg : validationMessage;
            alert(errorAlert);})
    }

    return(<>
        <div class="loginLayout">
        <Card class="loginCard">
            <CardHeader sx={{textAlign: 'center'}} title="Login"></CardHeader>
            <Divider/>
            <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
                <form onSubmit={formik.handleSubmit}>
                    <div>
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
                            sx={{ backgroundColor: 'white'}} 
                            placeholder="User name goes here..." 
                            disableUnderline="true" 
                        ></TextField>
                    </div>

                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <TextField
                            id="passWord"
                            name="passWord"
                            variant="outlined"
                            type={passwordVisibility ? "text" : "password"}
                            label="Password"
                            value={formik.values.passWord}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.passWord && Boolean(formik.errors.passWord)}
                            helperText={formik.touched.passWord && formik.errors.passWord}
                            sx={{ backgroundColor: 'white'}} 
                            placeholder="Password goes here..." 
                            disableUnderline="true" 
                        ></TextField>
                        {
                            passwordVisibility ? 
                            <>                                
                                <IconButton fontSize="large"><VisibilityIcon onClick={hidePwd}></VisibilityIcon></IconButton>
                            </> 
                            : 
                            <>
                                <IconButton fontSize="large"><VisibilityOffIcon onClick={showPwd}></VisibilityOffIcon></IconButton>
                            </>
                        }
                    </div>

                    <div style={{display: "flex", justifyContent: 'center'}}>
                        <Button type="Submit" variant="contained" color="primary" sx={{borderRadius: '25px', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Submit Info</Button>
                    </div>

            </form>
            </CardContent>
            <Divider></Divider>
            <CardContent style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center'}}>
                <p><Link to="/register">Click here to sign up.</Link></p>
                <p><Link to="/updatePassword">Forgot Password?</Link></p>
            </CardContent>
        </Card>
        </div>
        
    </>)
}

export default LoginPage;