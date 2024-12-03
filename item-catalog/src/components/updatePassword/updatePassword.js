import {React, useEffect, useState} from "react";
import {Card, CardContent, Divider, TextField, Button, CardHeader, IconButton} from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import {useFormik} from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup"
import axios from "axios";
import "./updatePassword.css";

const UpdatePassword = (props) => {

    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [repeatVisibility, setRepeatVisibility] = useState(false)

    const showPwd = () => {
        setPasswordVisibility(true)
    }

    const showRepeat = () => {
        setRepeatVisibility(true)
    }

    const hidePwd = () => {
        setPasswordVisibility(false)
    }

    const hideRepeat = () => {
        setRepeatVisibility(false)
    }

    useEffect(()=>{
        document.title = props.title
    }, [props])
    const navigate = useNavigate()

    const validation = () => yup.object({
        userName: yup.string().min(10, "Username must be at least 10 characters long").max(30, "Username cannot be more than 30 characters").required("Username required"),
        passWord: yup.string().min(8, "Password must be at least 8 characters long").max(20, "Password cannot be over 20 characters long").required("Password required"),
        confirmPassword: yup.string().min(8, "Confirmed password must be at least 8 characters long").max(20, "Confirmed password cannot be over 20 characters long").required("Confirm password required")
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
            changePassword(values.userName, values.passWord, values.confirmPassword)
        }
    }, {})

    const changePassword = (name, pwd, confirmPwd) => {
        if(pwd===confirmPwd) {
            const data = {name, pwd}
            axios.put(process.env.SERVER_URL + "/updatePassword", data).then((res)=>{
                if(res.status===200)
                {
                    navigate("/login")
                }
            }).catch((err)=>{
                const errorMessage = JSON.parse(err.request.response);
                const validationMessage = err.response.data.msg.message;
                const errorAlert = validationMessage===undefined ? errorMessage.msg : validationMessage;
                alert(errorAlert);
            })
        }

        else {
            alert("Passwords do not match!")
        }
    }

    return(<>
        <div class="updateLayout">
        <Card class="updateCard">
            <CardHeader sx={{textAlign: 'center'}} title="Change Password"></CardHeader>
            <Divider/>
            <CardContent style={{display: "flex", justifyContent: 'center'}}>
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

                    <div style={{display: "flex", justifyContent: 'center'}}>
                        <TextField
                            id="passWord"
                            name="passWord"
                            variant="outlined"
                            type={passwordVisibility ? "text" : "password"}
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
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            variant="outlined"
                            type={repeatVisibility ? "text" : "password"}
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
                        {
                            repeatVisibility ? 
                            <>                                
                                <IconButton fontSize="large"><VisibilityIcon onClick={hideRepeat}></VisibilityIcon></IconButton>
                            </> 
                            : 
                            <>
                                <IconButton fontSize="large"><VisibilityOffIcon onClick={showRepeat}></VisibilityOffIcon></IconButton>
                            </>
                        }
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