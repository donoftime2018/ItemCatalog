import React, { useState } from "react";
import { useEffect } from "react";
import "./Dashboard.css"
import Item from "../Item/Item";
import AddForm from "../addItem/addForm";
import ItemContext from "../context/context";
import Title from "../appTitle/appTitle";
import axios from 'axios'

const Dashboard = () => {

    const [items, setItems] = useState([])

    useEffect(()=>{

        const getItems = () => {
            axios.get("http://localhost:4000/items/").then(res=>setItems(res.data)).catch((error) => {
                console.log(error)
              })
    }
        getItems()
    }, [items.length, items])

    return(<>

        <ItemContext>
            <Title title={"Put a Price On It!"}></Title>

            <div class="formLayout">
                <AddForm></AddForm>
            </div>
            
            <div class="itemLayout">

                {
                    items.map((item, index)=>{

                        if(items.length>0)
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

        {/* <div class="formLayout">
            <AddForm></AddForm>
        </div> */}
    </>)
}

export default Dashboard;