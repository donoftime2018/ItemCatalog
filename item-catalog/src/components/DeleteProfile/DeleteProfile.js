import {React} from "react"
import axios from "axios"
import {Card, CardHeader, CardContent, TextField, Divider, Button} from "@mui/material"
import { useFormik } from "formik"
import { useAuth } from "../context/user"
import "./DeleteProfile.css"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"

const DeleteProfile = () => {

    const auth = useAuth()
    const user = auth.user;

    const validation = () => yup.object({
        userName: yup.string().required("Username required")
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
           userName: ""
        },
        validationSchema: validation,
        onSubmit: (values, actions)=>{
            handleDelete(values.userName)
        }
    }, {})

    const handleDelete = (enteredUser) => {
        if (user===enteredUser)
        {
            axios.delete("http://localhost:4000/deleteUser/" + user).then((res)=>{
                console.log(res);
                if(res.status===200)
                    auth.logout()
            }).catch((err)=>{
                const errorMessage = JSON.parse(err.request.response)
                console.error(errorMessage.msg); 
                alert(errorMessage.msg);
            })
        }

        else {
            alert("You must enter the user you are currently logged in as!")
        }
    }

    return(<>
        <div class="deleteLayout">
            <Card class="deleteCard">
                <CardHeader  sx={{textAlign: 'center'}} title="Delete Profile"></CardHeader>
                <Divider></Divider>
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
                            >
                            </TextField>
                        </div>
                        
                        <div style={{display: "flex", justifyContent: 'center'}}>
                            <Button type="Submit" variant="contained" color="error" sx={{borderRadius: '25px', color: "black", border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Delete Account</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </>)
}

export default DeleteProfile