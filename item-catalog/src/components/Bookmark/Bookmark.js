import {React, useState, useEffect} from "react";
import {Card, CardContent, Divider, CardHeader} from "@mui/material"
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
        <Title title={"Bookmarked Items"}></Title>
            <>
                {
                    
                    <div class="layout">
                    {
                        bookmarkedItems.map((item)=>{
                            return(<>
                                
                            </>)
                        })
                    }
                    </div>
                    
                }
            </>
    </>)
}

export default Bookmark;