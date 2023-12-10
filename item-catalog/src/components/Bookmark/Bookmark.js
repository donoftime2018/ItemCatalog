import {React, useState, useEffect} from "react";
import AppNav from "../NavBar/NavBar";
import Title from "../appTitle/appTitle";
import { useAuth } from "../context/user";
import "bootstrap/dist/css/bootstrap.min.css"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

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
            <>
                {
                    
                    <div class="layout">
                    {
                        <Container>
                            <Row>
                                <Col></Col>
                                <Col></Col>
                                <Col></Col>
                                <Col></Col>
                            </Row>

                        </Container>
                    }
                    </div>
                    
                }
            </>
    </>)
}

export default Bookmark;