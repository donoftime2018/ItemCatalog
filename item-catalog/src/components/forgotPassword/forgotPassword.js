import { useEffect, useState } from "react"
import {Card, CardContent, TextField, Divider, Button, CardHeader} from "@mui/material"
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator"
import * as yup from "yup"
import { useFormik } from "formik"
import axios from "axios"
import "./forgotPassword.css"

const ForgotPassword = (props) => {
    const [loading, setLoading] = useState(false)

    const validation = () => yup.object({
        email: yup.string().required("Email required")
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: ""
        },
        validationSchema: validation,
        onSubmit: (values)=>{
            sendResetLink(values.email)
        }
    })
    
    const sendResetLink = (email) => {
        console.log(email)
        const data = {email}
        axios.post(process.env.REACT_APP_SERVER_URL + "/resetPasswordLink", data).then((res)=>{
            setLoading(true)
            if (res.status === 200)
            {
                alert("A link to reset your password has been sent to your email.")
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

    useEffect(
        () => {
            document.title = props.title
        },
    [props])

    return (<>
        <div class="forgotLayout">
            <Card class="forgotCard">
                <CardHeader sx={{textAlign: 'center'}} title="Forgot Password"></CardHeader>
                <Divider></Divider>
                <CardContent>
                    <form onSubmit={formik.handleSubmit}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <TextField
                                id="email"
                                email="email"
                                variant="outlined"
                                type="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                sx={{ backgroundColor: 'white'}} 
                                placeholder="Email goes here..." 
                                disableUnderline="true" 
                            ></TextField>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button type="submit" variant="contained" color="primary" sx={{borderRadius: '25px', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Send Reset Link</Button>
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

export default ForgotPassword