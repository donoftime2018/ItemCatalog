import React, { useState } from "react";
import { useEffect, useRef } from "react";
import {useSelector, useDispatch} from "react-redux"
import { readItems } from "../../store/actionTypes";
import "./Dashboard.css"
import Item from "../Item/Item";
import AddForm from "../addItem/addForm";
import ItemContext from "../context/context";
import Title from "../appTitle/appTitle";
import AppNav from "../NavBar/NavBar";
// import SearchBar from "../searchItems/search";
import { AppTitle } from "../appTitle/appTitle";
import axios from 'axios'
import "./searchBar.css"
import {Card, CardHeader, CardContent, Divider, Input, Icon, IconButton, Button, TextField, Tooltip} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import {useFormik} from "formik";
import * as yup from "yup"


const Dashboard = () => {

    const [items, setItems] = useState([])
    // const [filteredItems, setFilteredItems] = useState([])
    const [isQueried, setIsQueried] = useState(false);
    const [queriedItems, setQueriedItems] = useState("");

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
            searchQuery: ""
        },
        // validationSchema: validation,
        onSubmit: (values)=>{
            searchQuery(values.searchQuery);
        }
    })
        
    // const clearQuery = () => {
    //     setQueriedItems("")

    // }

    const searchQuery = (query) => {
        // let queriedItem = query.;
        console.log(query);

        if (query !== "")
        {
            // setFilteredItems(items.filter(item=>item.name.includes(query)))
            setIsQueried(true);
            setQueriedItems(query);
        }

        else {
            setIsQueried(false);
            setQueriedItems("")
            // setFilteredItems([])
        }
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


    const displayQueriedItems = (query) => {
        return(<>
            {
                items.filter(item=>item.name.includes(query) || item.poster.includes(query)).map((item, index)=>{
                    return(<>
                        <Item itemName={item.name} itemDesc={item.desc} itemPoster={item.poster} itemPrice={item.price} id={index} itemQuantity={item.quantity} itemRating={item.rating} dbID={item._id} lastUpdate={item.updatedAt}></Item>
                    </>)
                })
            }
        </>)
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
                            <Tooltip title="Search Catalog"><IconButton type="submit"><SearchIcon fontSize='large'/></IconButton></Tooltip>
                            {/* <Tooltip title="Clear Search"><IconButton type="submit"><ClearAllIcon fontSize="large"></ClearAllIcon></IconButton></Tooltip> */}
                            <TextField
                                id="searchQuery"
                                name="searchQuery"
                                variant="outlined"
                                type="text"
                                label="Search By Name or Poster"
                                // onChange={(e)=>{setQuery(e.target.value)}}
                                value={formik.values.searchQuery}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.searchQuery && Boolean(formik.errors.searchQuery)}
                                helperText={formik.touched.searchQuery && formik.errors.searchQuery}
                                sx={{ backgroundColor: 'white', /*borderRadius: '25px'*/}} 
                                placeholder="Name and/or poster here..." 
                                disableUnderline="true" 
                            />
                        </form>
                    </CardContent>
                </Card>
            </div>


        </div>
            
            <div class="itemLayout">
                <>
                {
                   isQueried && queriedItems !== "" ? 
                   

                    displayQueriedItems(queriedItems)
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

export class classDashboard extends React.Component {

    constructor()
    {
        super();
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:4000/items/").then((res)=>{this.setState({items: res.data()})}).catch((error) => {
            console.log(error)
          })
    }

    render() {
        return(<>
            
        <ItemContext>
            <Title 
                title={"Put a Price On It!"} 
                titleDesc={"You can view the market prices, descriptions, and ratings of items to see which ones are worth buying! You can rate items as you please, and add new items."}>
            </Title>

            <div class="formLayout">
                <AddForm></AddForm>
            </div>
            
            <div class="itemLayout">

                {
                    this.state.items.map((item, index)=>{

                        if(this.state.items.length>0)
                        {
                            return(<>
                                <Item itemName={item.name} itemDesc={item.desc} itemPrice={item.price} id={index} itemQuantity={item.quantity} itemRating={item.rating} dbID={item._id} lastUpdate={item.updatedAt}></Item>
                            </>)
                        }

                        else {
                            return(<>Error occured :/</>)
                        }
                    })
                }
            </div>
        </ItemContext>
        </>)
    }


}

export default Dashboard;