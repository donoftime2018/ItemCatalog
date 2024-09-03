import React, { useState, useCallback, useRef } from "react";
import { useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import "./Dashboard.css"
import Item from "../Item/Item";
import AddForm from "../addItem/addForm";
import Title from "../appTitle/appTitle";
import AppNav from "../NavBar/NavBar";
import axios from 'axios'
import {Card, CardHeader, CardContent, Divider, IconButton, TextField, Tooltip} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import {useFormik} from "formik";
import { useAuth } from "../context/user";

const Dashboard = (props) => {
    const [items, setItems] = useState([])
    const [isQueried, setIsQueried] = useState(false);

    const itemResults = useRef("")
    const posterResults = useRef("")

    const [searchParams, setSearchParams] = useSearchParams({items: "", poster: ""})
    const itemName = searchParams.get("items")
    const posterName = searchParams.get("poster")

    const auth = useAuth()
    const user = auth.user

    const searchQuery = useCallback((itemQuery="", posterQuery="") => {
        console.log(itemQuery);
        console.log(posterQuery);
      

        if (itemQuery !== "")
        {
            setIsQueried(true);
            setSearchParams(prev => {
                prev.set("items", itemQuery)
                return prev
            }, {replace: true})
        }

        if (posterQuery !== "")
        {
            setIsQueried(true);
            setSearchParams(prev => {
                prev.set("poster", posterQuery)
                    return prev
            }, {replace: true})
        }

        if (posterQuery === "")
        {
            setSearchParams(prev => {
                prev.set("poster", posterQuery)
                    return prev
            }, {replace: true})
        }

        if (itemQuery === "")
        {
            setSearchParams(prev => {
                prev.set("items", itemQuery)
                return prev
            }, {replace: true})
        }

        if (itemQuery === "" && posterQuery === "")
        {
            setIsQueried(false)
            setSearchParams(prev => {
                prev.delete("items")
                prev.delete("poster")
                return prev
            },{replace: true})
        }
    }, [setSearchParams])

    useEffect(()=>{

        const getItems = () => {
            axios.get("http://localhost:4000/items/").then((res)=>{setItems(res.data)}).catch((error) => {
              })
        }
        getItems()
        
        window.onload = () => {
             searchQuery()
        }

        if (isQueried === false && (itemName !== "" || posterName !== ""))
        {
            setSearchParams(prev => {
                prev.delete("items")
                prev.delete("poster")
                return prev
            },{replace: true})
        }
        document.title = props.title
    }, [items.length, items, setSearchParams, searchQuery, isQueried, itemName, posterName, props])


    const formik = useFormik({
        initialValues: {
            itemQuery: "",
            posterQuery: ""
        },
        onSubmit: (values)=>{
            searchQuery(values.itemQuery, values.posterQuery);
        }
    })

    const displayItems = () => {
        posterResults.current = ""
        itemResults.current = ""
        return(<>
            {
                items.map((item, index)=>{
                 
                    return(<>
                        <Item itemName={item.name} itemDesc={item.desc} itemPoster={item.poster} itemRatedByUser={item.usersRated.includes(user)} itemPrice={item.price} itemRating={item.rating} dateCreated={item.createdAt} lastUpdated={item.updatedAt} id={index} dbID={item._id}></Item>
                    </>)
                })
            }
        </>)
    }


    const displayQueriedItems = (itemQuery, posterQuery) => {

        if (itemQuery !== "" && posterQuery === "")
        {
            posterResults.current = ""
            itemResults.current = "Showing results for item: " + itemQuery
            return(<>
                {
                    items.filter(item=>new RegExp(itemQuery, 'i').test(item.name)).map((item, index)=>{
                        return(<>
                            <Item itemName={item.name} itemDesc={item.desc} itemPoster={item.poster} itemRatedByUser={item.usersRated.includes(user)} itemPrice={item.price} itemRating={item.rating} dateCreated={item.createdAt} lastUpdated={item.updatedAt} id={index} dbID={item._id}></Item>
                        </>)
                    })
                }
            </>)
        }

        if (posterQuery !== "" && itemQuery === "") 
        {
            itemResults.current = ""
            posterResults.current = "Showing results for poster: " + posterQuery
            return(<>
                {
                    items.filter(item=>new RegExp(posterQuery, 'i').test(item.poster)).map((item, index)=>{
                        return(<>
                            <Item itemName={item.name} itemDesc={item.desc} itemPoster={item.poster} itemRatedByUser={item.usersRated.includes(user)} itemPrice={item.price} itemRating={item.rating} dateCreated={item.createdAt} lastUpdated={item.updatedAt} id={index} dbID={item._id}></Item>
                        </>)
                    })
                }
            </>)
        }

        if (posterQuery !== "" && itemQuery !== "")
        {
            itemResults.current = "Showing results for item: " + itemQuery
            posterResults.current = "Showing results for poster: " + posterQuery

            return(<>
                {
                    items.filter(item=>new RegExp(posterQuery, 'i').test(item.poster) && new RegExp(itemQuery, 'i').test(item.name)).map((item, index)=>{
                        return(<>
                            <Item itemName={item.name} itemDesc={item.desc} itemPoster={item.poster} itemRatedByUser={item.usersRated.includes(user)} itemPrice={item.price} itemRating={item.rating} dateCreated={item.createdAt} lastUpdated={item.updatedAt} id={index} dbID={item._id}></Item>
                        </>)
                    })
                }
            </>)
        }
        
    }
    return(<>
            <AppNav></AppNav>
            <Title title={"Put a Price On It!"} ></Title>
            
            <div class="searchBar">
                <div>
                    <Card class="searchCard">
                        <CardHeader sx={{display: 'flex', textAlign: 'center'}} title="Search Items"></CardHeader>
                        <Divider/>
                        <CardContent>
                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                <Tooltip title="Search Items"><IconButton type="submit"><SearchIcon fontSize='large'/></IconButton></Tooltip>
                                <TextField
                                    id="itemQuery"
                                    name="itemQuery"
                                    variant="outlined"
                                    type="text"
                                    label="Search Item by Name"
                                    value={formik.values.itemQuery}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.itemQuery && Boolean(formik.errors.itemQuery)}
                                    helperText={formik.touched.itemQuery && formik.errors.itemQuery}
                                    sx={{ backgroundColor: 'white'}} 
                                    placeholder="Item name here..." 
                                    disableUnderline="true" 
                                />
                                </div>

                                <div style={{display: 'flex', justifyContent: 'end', marginBottom: '-3%'}}>
                                <TextField
                                    id="posterQuery"
                                    name="posterQuery"
                                    variant="outlined"
                                    type="text"
                                    label="Search Item by Poster"
                                    value={formik.values.posterQuery}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.posterQuery && Boolean(formik.errors.posterQuery)}
                                    helperText={formik.touched.posterQuery && formik.errors.posterQuery}
                                    sx={{ backgroundColor: 'white'}} 
                                    placeholder="Item poster here..." 
                                    disableUnderline="true" 
                                />
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
        </div>
        
        <div class="queryText">
                <div ref={itemResults}>{typeof itemResults.current === 'string' ? itemResults.current : null}</div>
                <div ref={posterResults}>{typeof posterResults.current === 'string' ? posterResults.current: null}</div>
        </div>
        
        <div class="itemLayout">
            <>
            {
                isQueried ? 
                displayQueriedItems(itemName, posterName)
                :
                displayItems()
            }
            </>
        </div>
        
        <AddForm></AddForm>
        
    </>)
}

export default Dashboard;