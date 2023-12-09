import {React, useState, useEffect} from "react";
import {Card, CardContent, Divider, CardHeader, Box} from "@mui/material"
import AppNav from "../NavBar/NavBar";
import Title from "../appTitle/appTitle";
import { useAuth } from "../context/user";
import axios from "axios";
import "./Bookmark.css"


const Bookmark = () => {

    const auth = useAuth()
    const user = auth.user
    const [bookmarkedItems, setBookmarkedItems] = useState([])

    useEffect(()=>{
        const getBookmarkedItems = () => {
            axios.get("http://localhost:4000/items/getBookmarkedItems/" + user).then((res)=>{
                setBookmarkedItems(res.data)
            })
        }
        getBookmarkedItems()

    }, [user, bookmarkedItems, bookmarkedItems.length])

    return(<>
        <AppNav></AppNav>
        <Title title={user + "'s Bookmarks"}></Title>
            <>
                {
                    
                    <div class="layout">
                    {
                        bookmarkedItems.map((item)=>{
                            return(<>
                                <Card sx={{display: 'flex'}}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}></Box>
                                        <CardContent sx={{ flex: '1 0 auto' }}></CardContent>
                                </Card>
                            </>)
                        })
                    }
                    </div>
                    
                }
            </>
    </>)
}

export default Bookmark;