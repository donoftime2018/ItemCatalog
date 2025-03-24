import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getItems = createAsyncThunk('items/getItems', async() => {
    const res = await fetch(process.env.REACT_APP_SERVER_URL+"/items/", 
        {
            method: 'GET',
            header: {
              'Content-Type': 'application/json',
            },
        }
    )
    const data = res.json()
    console.log(data)
    return data
})

export const itemSlice = createSlice({
    name: "items",
    initialState: {
        items: [],
        loading: false,
        numOfItems: 0
    },
    reducers: {},
    extraReducers: {
        [getItems.pending]: (state)=>{
            state.loading = true
            state.numOfItems = 0
        },

        [getItems.fulfilled]: (state, {payload})=>{
            state.loading = false
            state.items = payload
            state.numOfItems = state.items.length
        },

        [getItems.rejected]: (state)=>{
            state.loading = false
            state.numOfItems = 0
        }
    }
})

export default itemSlice.reducer