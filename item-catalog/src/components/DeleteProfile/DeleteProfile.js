import {React, useEffect, useState} from "react"
import axios from "axios"
import {Card, CardHeader, CardContent, TextField, Divider, Button, IconButton} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { isEdge, isEdgeChromium } from "react-device-detect"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { useAuth } from "../context/user"
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator"
import "./DeleteProfile.css"
import * as yup from "yup"

const DeleteProfile = (props) => {
    const navigate = useNavigate()
    const [passwordVisibility, setPasswordVisibility] = useState(false)
        const [loading, setLoading] = useState(false)
        
        const showPwd = () => {
            setPasswordVisibility(true)
        }
    
        const hidePwd = () => {
            setPasswordVisibility(false)
        }
    
    useEffect(()=>{
        document.title = props.title
    }, [props])

    const auth = useAuth()
    const user = auth.user;

    const validation = () => yup.object({
        userName: yup.string().required("Username required"),
        password: yup.string().required("password required")
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
           userName: "",
           password: ""
        },
        validationSchema: validation,
        onSubmit: (values, actions)=>{
            handleDelete(values.userName, values.password)
        }
    }, {})

    const handleDelete = (enteredUser, password) => {
        if (user===enteredUser)
        {
            if (window.confirm("Are you sure you want to deactivate your account? All your likes and items will be gone forever.")===true)
            {
                const data = {user, password}
                setLoading(true)
                axios.delete(process.env.REACT_APP_LOCAL_HOST + "/deleteUser", {data: data}).then((res)=>{
                    if (res.status === 200)
                    {
                        auth.logout()
                        navigate("/login", {replace: true})
                    }
                }).catch((err)=>{
                    const errorMessage = JSON.parse(err.request.response);
                    const validationMessage = err.response.data.msg.message;
                    const errorAlert = validationMessage===undefined ? errorMessage.msg : validationMessage;
                    alert(errorAlert);
                }).finally(()=>{
                    setLoading(false)
                })
            }
        }

        else {
            alert("You must enter the user you are currently logged in as!")
        }
    }

    return(<>
        <div class="deleteLayout">
            <Card class="deleteCard">
                <CardHeader  sx={{textAlign: 'center'}} title="Deactivate Account"></CardHeader>
                <Divider></Divider>
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
                            >
                            </TextField>
                        </div>

                        <div style={{display: "flex", alignItems: 'center'}}>
                            <TextField
                                id="password"
                                name="password"
                                variant="outlined"
                                type={passwordVisibility ? "text" : "password"}
                                label="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                sx={{ backgroundColor: 'white'}} 
                                placeholder="Password goes here..." 
                                disableUnderline="true" 
                            ></TextField>
                                                    {
                            isEdge || isEdgeChromium ? 
                            <></>
                            :
                            <>
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
                            </>
                        }
                        </div>
                        
                        <div style={{display: "flex", justifyContent: 'center'}}>
                            <Button type="Submit" variant="contained" color="error" sx={{borderRadius: '25px', color: "black", border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Deactivate</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>

        {
            loading ? 
            <>
                <LoadingIndicator/>
            </> 
            : 
            <></>
        }
    </>)
}

export default DeleteProfile