import { accordionActionsClasses } from "@mui/material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getItems = createAsyncThunk('items/getItems', async() => {
    const updatedData = await fetch(process.env.REACT_APP_LOCAL_HOST+"/items/", 
        {
            method: 'GET',
            header: {
              'Content-Type': 'application/json',
            },
        }
    )
    const data = await updatedData.json()
    console.log(data)
    return data
})

export const newItem = createAsyncThunk('items/addNewItem', async(data)=>{
    console.log(data)
    const newData = await axios.post(process.env.REACT_APP_LOCAL_HOST + "/items/insertItems", data)
    console.log(newData.data)
    return {newData}
})

export const addLike = createAsyncThunk('items/addLike', async({id, data})=>{
    console.log(id, data)
    const updatedData = await axios.put(process.env.REACT_APP_LOCAL_HOST+"/items/increaseRating/"+id, data)
    console.log(updatedData.data)
    return {id, updatedData}
})

export const removeLike = createAsyncThunk('items/removeLike', async({id, data})=>{
    console.log(id, data)
    const updatedData = await axios.put(process.env.REACT_APP_LOCAL_HOST+"/items/decreaseRating/"+id, data)
    console.log(updatedData)
    console.log(updatedData.data)

    return {id, updatedData}
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
        [addLike.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.items = state.items.map(item =>
                item._id === action.payload.id ? { ...item, ...action.payload.updatedData.data } : item
            );
        },

        [removeLike.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.items = state.items.map(item =>
                item._id === action.payload.id ? { ...item, ...action.payload.updatedData.data } : item
            );
        },

        [newItem.fulfilled]: (state, action) => {
            console.log(action.payload.newData.data)
            state.items.push(action.payload.newData.data)
            state.numOfItems = state.items.length
        },

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