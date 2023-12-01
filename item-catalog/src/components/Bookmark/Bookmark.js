import {React, useState, useEffect} from "react";
import {Card, CardContent, Divider, CardHeader} from "@mui/material"
import AppNav from "../NavBar/NavBar";
import Title from "../appTitle/appTitle";
import { useAuth } from "../context/user";
import "./Bookmark.css"

const Bookmark = () => {

    const auth = useAuth()
    const user = auth.user
    const [bookmarkedItems, setBookmarkedItems] = useState([])

    useEffect(()=>{
        
    }, [user, bookmarkedItems, bookmarkedItems.length])

    return(<>
        <AppNav></AppNav>
        <Title title={"Bookmarked Items"}></Title>
        <div class="layout">
            <Card class="bookmarkedItems">
            </Card>
        </div>
    </>)
}

export default Bookmark;