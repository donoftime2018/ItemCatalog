import React, { useState, useRef } from "react";
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
    const [isLoading, setLoading] = useState(true);

    const itemResults = useRef("")
    const posterResults = useRef("")
    const numItems = useRef("")

    const [searchParams, setSearchParams] = useSearchParams({items: "", poster: ""})
    const itemName = searchParams.get("items")
    const posterName = searchParams.get("poster")

    const auth = useAuth()
    const user = auth.user

    const searchQuery = (itemQuery="", posterQuery="") => {

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
    }

    useEffect(()=>{

        const getItems = () => {
            axios.get(process.env.REACT_APP_SERVER_URL + "/items/").then((res)=>{
                setItems(res.data)
            }).catch((error) => {
              }).finally(()=>{
                setLoading(false)
              })
        }
        getItems()
    
        if (isQueried === false && (itemName !== "" || posterName !== ""))
        {
            setSearchParams(prev => {
                prev.delete("items")
                prev.delete("poster")
                return prev
            },{replace: true})
        }
        document.title = props.title
    }, [items.length, items, setSearchParams, setLoading, isQueried, itemName, posterName, props])


    const formik = useFormik({
        initialValues: {
            itemQuery: "",
            posterQuery: ""
        },
        onSubmit: (values)=>{
            searchQuery(values.itemQuery, values.posterQuery);
        }
    })

    const displayItems = (itemQuery='', posterQuery='') => {

        function getPermutations(arr)
        {
            if (arr.length <= 1) return [arr];
            let permutations = [];
          
            arr.forEach((currentTerm, index) => {
              const remainingTerms = [...arr.slice(0, index), ...arr.slice(index + 1)];
              const remainingPermutations = getPermutations(remainingTerms);
          
              remainingPermutations.forEach(permutation => {
                permutations.push([currentTerm, ...permutation]);
              });
            });
          
            return permutations;
        }

        function createFlexibleSearchRegex(searchTerms)
        {
            const escapedTerms = searchTerms.split(' ').map(term=>term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
            const permutations = getPermutations(escapedTerms)
            const regexPattern = permutations.map(perm => perm.join('.*')).join('|')
            return new RegExp(regexPattern, 'i')
        }
        
        const flexibleRegex = createFlexibleSearchRegex(itemQuery)

        if (itemQuery !== "" && posterQuery === "")
        {
            posterResults.current = ""
            itemResults.current = "Showing results for item: " + itemQuery
            numItems.current = ""

            return(<>
                {
                    items.filter(item=>flexibleRegex.test(item.name) || flexibleRegex.test(item.desc)).map((item, index)=>{
                        return(<>
                            <Item itemName={item.name} itemWebsite={item.website} itemDesc={item.desc} itemPoster={item.poster} itemRatedByUser={item.usersRated.includes(user)} itemPrice={item.price} itemRating={item.rating} dateCreated={item.createdAt} lastUpdated={item.updatedAt} id={index} dbID={item._id}></Item>
                        </>)
                    })
                }
            </>)
        }

        else if (posterQuery !== "" && itemQuery === "") 
        {
            itemResults.current = ""
            posterResults.current = "Showing results for poster: " + posterQuery
            numItems.current = ""

            return(<>
                {
                    items.filter(item=>new RegExp(posterQuery).test(item.poster)).map((item, index)=>{
                        return(<>
                            <Item itemName={item.name} itemWebsite={item.website} itemDesc={item.desc} itemPoster={item.poster} itemRatedByUser={item.usersRated.includes(user)} itemPrice={item.price} itemRating={item.rating} dateCreated={item.createdAt} lastUpdated={item.updatedAt} id={index} dbID={item._id}></Item>
                        </>)
                    })
                }
            </>)
        }

        else if (posterQuery !== "" && itemQuery !== "")
        {
            itemResults.current = "Showing results for item: " + itemQuery
            posterResults.current = "Showing results for poster: " + posterQuery
            numItems.current = ""

            return(<>
                {
                    items.filter(item=>new RegExp(posterQuery).test(item.poster) && (flexibleRegex.test(item.name) || flexibleRegex.test(item.desc))).map((item, index)=>{
                        return(<>
                            <Item itemName={item.name} itemWebsite={item.website} itemDesc={item.desc} itemPoster={item.poster} itemRatedByUser={item.usersRated.includes(user)} itemPrice={item.price} itemRating={item.rating} dateCreated={item.createdAt} lastUpdated={item.updatedAt} id={index} dbID={item._id}></Item>
                        </>)
                    })
                }
            </>)
        }

        else
        {
            posterResults.current = ""
            itemResults.current = ""
            numItems.current = "Total Items: " + items.length
        
            return(<>
                {
                    items.map((item, index)=>{
                 
                        return(<>
                            <Item itemName={item.name} itemWebsite={item.website} itemDesc={item.desc} itemPoster={item.poster} itemRatedByUser={item.usersRated.includes(user)} itemPrice={item.price} itemRating={item.rating} dateCreated={item.createdAt} lastUpdated={item.updatedAt} id={index} dbID={item._id}></Item>
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
                                        label="Search Item"
                                        value={formik.values.itemQuery}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.itemQuery && Boolean(formik.errors.itemQuery)}
                                        helperText={formik.touched.itemQuery && formik.errors.itemQuery}
                                        sx={{ backgroundColor: 'white'}} 
                                        placeholder="Item here..." 
                                        disableUnderline="true" 
                                    />
                                    </div>

                                    <div style={{display: 'flex', justifyContent: 'end', marginBottom: '-3%'}}>
                                    <TextField
                                        id="posterQuery"
                                        name="posterQuery"
                                        variant="outlined"
                                        type="text"
                                        label="Search Poster"
                                        value={formik.values.posterQuery}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.posterQuery && Boolean(formik.errors.posterQuery)}
                                        helperText={formik.touched.posterQuery && formik.errors.posterQuery}
                                        sx={{ backgroundColor: 'white'}} 
                                        placeholder="Poster here..." 
                                        disableUnderline="true" 
                                    />
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
        
        <div class="queryText">
            {isLoading ? <>Loading...</> : <></>}
            <div ref={itemResults}>{typeof itemResults.current === 'string' ? itemResults.current : null}</div>
            <div ref={posterResults}>{typeof posterResults.current === 'string' ? posterResults.current: null}</div>
            <div ref={numItems}>{typeof numItems.current === 'string' ? numItems.current: null}</div>
        </div>

        <div class="itemLayout">
            {
                isQueried ? 
                displayItems(itemName, posterName)
                :
                displayItems()
            }
        </div>
        
        <AddForm></AddForm>        
    </>)
}

export default Dashboard;