import {React, useState} from "react"
import axios from "axios"
import {Card, CardHeader, CardContent, TextField, Divider, Button} from "@mui/material"
import { useFormik } from "formik"
import "./DeleteProfile.css"

const DeleteProfile = () => {



    return(<>
        <div class="deleteLayout">
            <Card class="deleteCard">
                <CardHeader  sx={{textAlign: 'center'}} title="Delete Profile"></CardHeader>
                <Divider></Divider>
                <CardContent>
                    <form>
                        
                    </form>
                </CardContent>
            </Card>
        </div>
    </>)
}

export default DeleteProfile