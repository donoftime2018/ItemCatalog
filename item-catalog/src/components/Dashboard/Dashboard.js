import React, { useState } from "react";
import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux"
import { readItems } from "../../store/actionTypes";
import "./Dashboard.css"
import Item from "../Item/Item";
import AddForm from "../addItem/addForm";
import ItemContext from "../context/context";
import Title from "../appTitle/appTitle";
// import SearchBar from "../searchItems/search";
import { AppTitle } from "../appTitle/appTitle";
import axios from 'axios'
import "./searchBar.css"
import {Card, CardHeader, CardContent, Divider, Input, Icon, IconButton, Button, TextField} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import {useFormik} from "formik";
import * as yup from "yup"


const Dashboard = () => {

    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [isQueried, setIsQueried] = useState(false);

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

    const searchQuery = (query) => {
        // let queriedItem = query.;
        console.log(query);

        if (query !== "")
        {
            setFilteredItems(items.filter(item=>item.name.includes(query)))
            setIsQueried(true);
        }

        else {
            setIsQueried(false);
            setFilteredItems([])
        }
    }

    const displayItems = () => {
        return(<>
            {
                items.map((item, index)=>{

                    // if(items.length>0)
                    // {
                    return(<>
                        <Item itemName={item.name} itemDesc={item.desc} itemPrice={item.price} id={index} itemQuantity={item.quantity} itemRating={item.rating} dbID={item._id} lastUpdate={item.updatedAt}></Item>
                    </>)
                    // }
             
                    // else {
                    //     return(<>Error occured :/</>)
                    // }
                })
            }
        </>)
    }


    const displayQueriedItems = () => {
        return(<>
            {
                filteredItems.map((item, index)=>{
                    return(<>
                        <Item itemName={item.name} itemDesc={item.desc} itemPrice={item.price} id={index} itemQuantity={item.quantity} itemRating={item.rating} dbID={item._id} lastUpdate={item.updatedAt}></Item>
                    </>)
                })
            }
        </>)
    }

    // console.log(items)
    return(<>

        <ItemContext>
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
                            <IconButton type="submit"><SearchIcon fontSize='large'/></IconButton>
                            <TextField
                                id="searchQuery"
                                name="searchQuery"
                                variant="outlined"
                                type="text"
                                label="Search"
                                // onChange={(e)=>{setQuery(e.target.value)}}
                                value={formik.values.searchQuery}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.searchQuery && Boolean(formik.errors.searchQuery)}
                                helperText={formik.touched.searchQuery && formik.errors.searchQuery}
                                sx={{ backgroundColor: 'white', /*borderRadius: '25px'*/}} 
                                placeholder="Search query goes here..." 
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
                   isQueried ? 
                   

                    displayQueriedItems()
                   :
                  
                    displayItems()
                }
                </>
            </div>
        </ItemContext>

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