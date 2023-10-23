import React, { useState, useEffect } from "react";
import "./Dashboard.css"
import Item from "../Item/Item";
import AddForm from "../addItem/addForm";
import Title from "../appTitle/appTitle";
import AppNav from "../NavBar/NavBar";
import axios from 'axios'
import "./searchBar.css"
import {Card, CardHeader, CardContent, Divider, IconButton, TextField, Tooltip} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import {useFormik} from "formik";

const Dashboard = () => {

    const [items, setItems] = useState([])
    // const [filteredItems, setFilteredItems] = useState([])
    const [isQueried, setIsQueried] = useState(false);
    const [queriedItems, setQueriedItems] = useState("");
    const [queriedPoster, setQueriedPoster] = useState("");

    useEffect(()=>{

        const getItems = () => {
            axios.get("http://localhost:4000/items/").then((res)=>{setItems(res.data)}).catch((error) => {
                console.log(error)
              })
        }
        getItems()
    }, [items.length, items])


    // const validation = () => yup.object({
    //     searchQuery: yup.string().required("Query must be filled out")
    // })

    const formik = useFormik({
        initialValues: {
            itemQuery: "",
            posterQuery: ""
        },
        // validationSchema: validation,
        onSubmit: (values)=>{
            searchQuery(values.itemQuery, values.posterQuery);
        }
    })
        
    // const clearQuery = () => {
    //     setQueriedItems("")

    // }

    const searchQuery = (itemQuery, posterQuery) => {
        // let queriedItem = query.;
        console.log(itemQuery);
        console.log(posterQuery);

        if (itemQuery !== "")
        {
            // setFilteredItems(items.filter(item=>item.name.includes(query)))
            setIsQueried(true);
            setQueriedItems(itemQuery);
        }

        if (posterQuery !== "")
        {
            setIsQueried(true);
            setQueriedPoster(posterQuery);
        }

        // else {
           

            if (posterQuery === "")
            {
                setQueriedPoster("")
            }

            if (itemQuery === "")
            {
                // setIsQueried(false);
                setQueriedItems("")
                // setQueriedPoster("")
            }

            if (itemQuery === "" && posterQuery === "")
            {
                setIsQueried(false)
            }
            
            
            // setFilteredItems([])
        // }
    }

    const displayItems = () => {
        return(<>
            {
                items.map((item, index)=>{

                    // if(items.length>0)
                    // {
                    return(<>
                        <Item itemName={item.name} itemDesc={item.desc} itemPoster={item.poster} itemPrice={item.price} id={index} itemQuantity={item.quantity} itemRating={item.rating} dbID={item._id} lastUpdate={item.updatedAt}></Item>
                    </>)
                    // }
             
                    // else {
                    //     return(<>Error occured :/</>)
                    // }
                })
            }
        </>)
    }


    const displayQueriedItems = (itemQuery, posterQuery) => {

        if (itemQuery !== "" && posterQuery === "")
        {
            return(<>
                {
                    items.filter(item=>item.name.includes(itemQuery)).map((item, index)=>{
                        return(<>
                            <Item itemName={item.name} itemDesc={item.desc} itemPoster={item.poster} itemPrice={item.price} id={index} itemQuantity={item.quantity} itemRating={item.rating} dbID={item._id} lastUpdate={item.updatedAt}></Item>
                        </>)
                    })
                }
            </>)
        }

        if (posterQuery !== "" && itemQuery === "") 
        {
            return(<>
                {
                    items.filter(item=>item.poster.includes(posterQuery)).map((item, index)=>{
                        return(<>
                            <Item itemName={item.name} itemDesc={item.desc} itemPoster={item.poster} itemPrice={item.price} id={index} itemQuantity={item.quantity} itemRating={item.rating} dbID={item._id} lastUpdate={item.updatedAt}></Item>
                        </>)
                    })
                }
            </>)
        }

        if (posterQuery !== "" && itemQuery !== "")
        {
            return(<>
                {
                    items.filter(item=>item.poster.includes(posterQuery) && item.name.includes(itemQuery)).map((item, index)=>{
                        return(<>
                            <Item itemName={item.name} itemDesc={item.desc} itemPoster={item.poster} itemPrice={item.price} id={index} itemQuantity={item.quantity} itemRating={item.rating} dbID={item._id} lastUpdate={item.updatedAt}></Item>
                        </>)
                    })
                }
            </>)
        }
        
    }

    // console.log(items)
    return(<>
            <AppNav></AppNav>
        {/* <ItemContext> */}
            <Title 
                title={"Put a Price On It!"} 
                titleDesc={"You can view the market prices, descriptions, and ratings of items to see which ones are worth buying! You can rate items as you please, and add new items."}>
            </Title>

            <div class="formLayout">
                <AddForm></AddForm>
            </div>

            <div class="searchBar">
            <div>
                <Card class="searchCard">
                    <CardHeader sx={{display: 'flex', textAlign: 'center'}} title="Search Items"></CardHeader>
                    <Divider/>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                            <Tooltip title="Search Items"><IconButton type="submit"><SearchIcon fontSize='large'/></IconButton></Tooltip>
                            {/* <Tooltip title="Clear Search"><IconButton type="submit"><ClearAllIcon fontSize="large"></ClearAllIcon></IconButton></Tooltip> */}
                            <TextField
                                id="itemQuery"
                                name="itemQuery"
                                variant="outlined"
                                type="text"
                                label="Search Item by Name"
                                // onChange={(e)=>{setQuery(e.target.value)}}
                                value={formik.values.itemQuery}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.itemQuery && Boolean(formik.errors.itemQuery)}
                                helperText={formik.touched.itemQuery && formik.errors.itemQuery}
                                sx={{ backgroundColor: 'white', /*borderRadius: '25px'*/}} 
                                placeholder="Item name here..." 
                                disableUnderline="true" 
                            />
                            </div>

                            <div style={{display: 'flex', justifyContent: 'end'}}>
                            {/* <Tooltip title="Search Users"><IconButton type="submit"><SearchIcon fontSize='large'/></IconButton></Tooltip> */}
                            <TextField
                                id="posterQuery"
                                name="posterQuery"
                                variant="outlined"
                                type="text"
                                label="Search Item by Poster"
                                // onChange={(e)=>{setQuery(e.target.value)}}
                                value={formik.values.posterQuery}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.posterQuery && Boolean(formik.errors.posterQuery)}
                                helperText={formik.touched.posterQuery && formik.errors.posterQuery}
                                sx={{ backgroundColor: 'white', /*borderRadius: '25px'*/}} 
                                placeholder="Item poster here..." 
                                disableUnderline="true" 
                            />
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>


        </div>
            
            <div class="itemLayout">
                <>
                {
                   isQueried && (queriedItems !== "" || queriedPoster !== "") ? 
                   

                    displayQueriedItems(queriedItems, queriedPoster)
                   :
                  
                    displayItems()
                }
                </>
            </div>
        {/* </ItemContext> */}

        {/* <div class="formLayout">
            <AddForm></AddForm>
        </div> */}
    </>)
}

export default Dashboard;