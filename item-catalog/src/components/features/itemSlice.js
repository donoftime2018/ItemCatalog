import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getItems = createAsyncThunk('items/getItems', async() => {
    const res = await fetch(process.env.REACT_APP_LOCAL_HOST+"/items/", 
        {
            method: 'GET',
            header: {
              'Content-Type': 'application/json',
            },
        }
    )
    const data = await res.json()
    console.log(data)
    return data
})

export const addLike = createAsyncThunk('items/addLike', async({id, data})=>{
    console.log(id, data)
    const res = await axios.put(process.env.REACT_APP_LOCAL_HOST+"/items/increaseRating/"+id, data)
    console.log(res.data.usersRated)
    return {id, data}
})

export const removeLike = createAsyncThunk('items/removeLike', async({id, data})=>{
    console.log(id, data)
    const res = await axios.put(process.env.REACT_APP_LOCAL_HOST+"/items/decreaseRating/"+id, data)
    console.log(res)
    console.log(res.data)

    if (res.status !== 200)
    {
        return new Error(res.data)
    }

    return {id, data}
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
            state.items = state.items.map(item =>
                item._id === action.payload.id ? { ...item, ...action.payload.data } : item
            );
        },

        [removeLike.fulfilled]: (state, action) => {
            state.items = state.items.map(item =>
                item._id === action.payload.id ? { ...item, ...action.payload.data } : item
            );
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