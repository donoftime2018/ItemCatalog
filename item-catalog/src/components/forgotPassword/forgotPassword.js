import { useEffect } from "react"
import {Card, CardContent, TextField, Divider, Button, CardHeader} from "@mui/material"
import * as yup from "yup"
import { useFormik } from "formik"
import "./forgotPassword.css"

const ForgotPassword = (props) => {

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
            </Card>
        </div>
    </>)
}

export default ForgotPassword