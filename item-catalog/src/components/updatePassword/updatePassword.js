import {React, useEffect} from "react";
import {Card, CardContent, Divider, TextField, Button, CardHeader} from "@mui/material"
import {useFormik} from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup"
import axios from "axios";
import "./updatePassword.css";

const UpdatePassword = (props) => {

    useEffect(()=>{
        document.title = props.title
    }, [props])
    const navigate = useNavigate()

    const validation = () => yup.object({
        userName: yup.string().min(10, "Username must be at least 10 characters long").max(20, "Username cannot be more than 20 characters").required("Username required"),
        passWord: yup.string().min(8, "Password must be at least 8 characters long").max(12, "Password cannot be over 12 characters long").required("Password required"),
        confirmPassword: yup.string().min(8, "Confirmed password must be at least 8 characters long").max(12, "Confirmed password cannot be over 12 characters long").required("Confirm password required")
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
           userName: "",
           passWord: "",
           confirmPassword: ""
        },
        validationSchema: validation,
        onSubmit: (values, actions)=>{
            // addItemToDB(values.item_name, values.item_price, values.item_desc);
            changePassword(values.userName, values.passWord, values.confirmPassword)
        }
    }, {})

    const changePassword = (name, pwd, confirmPwd) => {
        if(pwd===confirmPwd) {
            const data = {name, pwd}
            axios.put("http://localhost:4000/updatePassword", data).then((res)=>{
                if(res.status===200)
                {
                    navigate("/login")
                }
            }).catch((err)=>{
                const errorMessage = JSON.parse(err.request.response);
                const validationMessage = err.response.data.msg.message;
                const errorAlert = validationMessage===undefined ? errorMessage : validationMessage;
                alert(errorAlert);
            })
        }

        else {
            console.log("Passwords must match!")
            alert("Passwords do not match!")
        }
    }

    return(<>
        <div class="updateLayout">
        <Card class="updateCard">
            <CardHeader sx={{textAlign: 'center'}} title="Change Password"></CardHeader>
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
                            sx={{ backgroundColor: 'white'}} 
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
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.passWord && Boolean(formik.errors.passWord)}
                            helperText={formik.touched.passWord && formik.errors.passWord}
                            sx={{ backgroundColor: 'white'}} 
                            placeholder="Password goes here..." 
                            disableUnderline="true" 
                        ></TextField>
                    </div>

                    <div style={{display: "flex", justifyContent: 'center'}}>
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            variant="outlined"
                            type="password"
                            label="Confirm Password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            sx={{ backgroundColor: 'white'}} 
                            placeholder="Confirm password goes here..." 
                            disableUnderline="true" 
                        ></TextField>
                    </div>

                    <div style={{display: "flex", justifyContent: 'center'}}>
                        <Button type="Submit" variant="contained" color="primary" sx={{borderRadius: '25px', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Submit Info</Button>
                    </div>
            </form>
            </CardContent>
        </Card>
        </div>
    </>)
}

export default UpdatePassword;