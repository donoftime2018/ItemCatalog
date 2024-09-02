import {React, useEffect} from "react";
import {Card, CardContent, Divider, TextField, Button, CardHeader} from "@mui/material"
import {useFormik} from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup"
import axios from "axios";
import "./Register.css";

const Register = (props) => {

    useEffect(() =>{
        document.title=props.title;
    }, [props])
    const navigate=useNavigate()

    const validation = () => yup.object({
        userName: yup.string().min(10, "Username must be at least 10 characters long").max(20, "Username cannot be more than 20 characters").required("Username required"),
        passWord: yup.string().min(8, "Password must be at least 8 characters long").max(12, "Password cannot be over 12 characters long").required("Password required"),
        email: yup.string().required("Email required")
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
           userName: "",
           passWord: "",
           email: ""
        },
        validationSchema: validation,
        onSubmit: (values, actions)=>{
            registerUser(values.userName, values.passWord, values.email)
        }
    }, {})

    const registerUser = (name, pwd, email) => {
        const data = {name, pwd, email}
        axios.post("http://localhost:4000/register", data).then((res)=>{
            if(res.status===200)
            {
                navigate("/login")
            }

            else {
                return res.data;
            }
        }).catch((err) => {
            const errorMessage = JSON.parse(err.request.response);
            const validationMessage = err.response.data.msg.message;
            const errorAlert = validationMessage===undefined ? errorMessage.msg : validationMessage;
            alert(errorAlert);
            
        })
    }
    return(<>

<div class="registerLayout">
        <Card class="registerCard">
            <CardHeader sx={{textAlign: 'center'}} title="Sign Up"></CardHeader>
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
                        <TextField
                            id="email"
                            name="email"
                            variant="outlined"
                            type="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            sx={{ backgroundColor: 'white', /*borderRadius: '25px'*/}} 
                            placeholder="Email goes here..." 
                            disableUnderline="true" 
                        ></TextField>
                    </div>

                    <div style={{display: "flex", justifyContent: 'center'}}>
                        <Button type="Submit" variant="contained" color="primary" sx={{borderRadius: '25px', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Register</Button>
                    </div>

            </form>
            </CardContent>
            <Divider></Divider>
        </Card>
        </div>
    </>)
}

export default Register;