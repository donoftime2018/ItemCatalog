import React from "react"
import {Alert, AlertTitle} from "@mui/material"
import "./Alert.css"

const AppAlert = ({message}) => {
 
    return(<>
        <div class="itemAlert">
            <Alert sx={{width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} variant="filled" severity="success">
                <AlertTitle sx={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>{message}</AlertTitle>
            </Alert>
        </div>
    </>)
}

export default AppAlert