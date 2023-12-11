import {React, useState, useEffect} from "react";
import AppNav from "../NavBar/NavBar";
import Title from "../appTitle/appTitle";
import { useAuth } from "../context/user";
import "bootstrap/dist/css/bootstrap.min.css"

import axios from "axios";
import "./Bookmark.css"


const Bookmark = (props) => {

    const auth = useAuth()
    const user = auth.user
    const [bookmarkedItems, setBookmarkedItems] = useState([])

    useEffect(()=>{
        const getBookmarkedItems = () => {
            axios.get("http://localhost:4000/items/getBookmarkedItems/" + user).then((res)=>{
                setBookmarkedItems(res.data);
                console.log(res.data);
            })
        }
        getBookmarkedItems()
        document.title = props.title
    }, [user, bookmarkedItems, bookmarkedItems.length, props])

    return(<>
        <AppNav></AppNav>
        <Title title={user + "'s Bookmarks"}></Title>
        <div class="layout">
            <div class="container">
                <div class="row align-items-center text-center" style={{fontSize: '24px', paddingTop: '5px'}}>
                    <div class="col" style={{textDecoration: 'underline'}}>
                        Name:
                    </div>
                    <div class="col" style={{textDecoration: 'underline'}}>
                        Poster:
                    </div>
                    <div class="col" style={{textDecoration: 'underline'}}>
                        Price:
                    </div>
                    <div class="col" style={{textDecoration: 'underline'}}>
                        Description:
                    </div>
                    <div class="col" style={{textDecoration: 'underline'}}>
                        Likes:
                    </div>
                </div>
                
                <>
                    {
                        bookmarkedItems.map(item=>{
                            return(<>
                                <div class="row align-items-center text-center" style={{fontSize: '18px', paddingTop: '10px'}}>
                                    <div class="col w-100">{item.name}</div>
                                    <div class="col">{item.poster}</div>
                                    <div class="col">${item.price.toFixed(2)}</div>
                                    <div class="col-xxl">{item.desc}</div>
                                    <div class="col">{item.rating}</div>
                                </div>
                            </>)
                        })
                    }
                </>

            </div>
            <>
                {}
            </>     
        </div>
    </>)
}

export default Bookmark;