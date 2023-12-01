import {React, useState, useEffect} from "react";
import {Card, CardContent, Divider, CardHeader} from "@mui/material"
import AppNav from "../NavBar/NavBar";
import Title from "../appTitle/appTitle";
import { useAuth } from "../context/user";
import "./Bookmark.css"

const Bookmark = () => {

    const auth = useAuth()
    const user = auth.user

    return(<>
        <AppNav></AppNav>
        <Title title={user+"'s Bookmarked Items"}></Title>
        <div class="layout">
            <Card class="inCartItems">
            </Card>
        </div>
    </>)
}

export default Bookmark;