import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],

}

export const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        readItems: (state, action) => {
            axios.get("http://localhost:4000/items/").then((res)=>{state.items = [...res.data, action.payload]}).catch((error) => {
                console.log(error)
              })
        }
    },
})

export const {readItems} = itemSlice.actions

export default itemSlice.reducer