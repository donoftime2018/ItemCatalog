import React, { useState } from "react";
import { useEffect } from "react";
import "./Dashboard.css"
import Item from "../Item/Item";
import AddForm from "../addItem/addForm";
import ItemContext from "../context/context";

const Dashboard = () => {

    const [items, setItems] = useState([])

    const getItems = async() => {
        const response = await fetch("http://localhost:4000/items/",{
            method: "GET",
            "Cache-Control": "no-cache"
        })
        const data = await response.json()
        setItems(data);

        if (!response.ok)
        {
            window.location.reload()
        }
    }

    useEffect(()=>{
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
                                <Item itemName={item.name} itemDesc={item.desc} itemPrice={item.price} id={index} dbID={item._id}></Item>
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