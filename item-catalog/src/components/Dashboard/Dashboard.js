import React, { useState } from "react";
import { useEffect } from "react";
import "./Dashboard.css"
import Item from "../Item/Item";
import AddForm from "../addItem/addForm";
import ItemContext from "../context/context";
import axios from 'axios'

const Dashboard = () => {

    const [items, setItems] = useState([])

    useEffect(()=>{

        const getItems = async() => {
            try {
                const response = await axios.get("http://localhost:4000/items/")
                setItems(response.data)
            } catch(error){
                console.error(error)
            }
    }
        getItems()
    }, [items.length, items])

    return(<>

        <ItemContext>
            <div class="itemLayout">
                {

                    items.map((item, index)=>{

                        if(items.length>0)
                        {
                            return(<>
                                <Item itemName={item.name} itemDesc={item.desc} itemPrice={item.price} id={index} itemQuantity={item.quantity} itemRating={item.rating} dbID={item._id}></Item>
                            </>)
                        }

                        else {
                            return(<>Error occured :/</>)
                        }
                    })
                }
            </div>
        </ItemContext>

        <div class="formLayout">
            <AddForm></AddForm>
        </div>
    </>)
}

export default Dashboard;