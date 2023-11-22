import {React, useState, useEffect} from "react";
import {Card, CardContent, Divider, CardHeader} from "@mui/material"
import AppNav from "../NavBar/NavBar";
import "./Buying.css"

const Buying = () => {
    return(<>
        <AppNav></AppNav>
        <div class="layout">
            <Card class="inCartItems">
                <CardHeader sx={{textAlign: 'center', textDecoration: 'underline'}} title="Your Cart:"></CardHeader>
            </Card>
        </div>
    </>)
}

export default Buying;