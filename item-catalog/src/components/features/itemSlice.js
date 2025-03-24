import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const itemSlice = createSlice({
    name: "items",
    initialState: {
        value: []
    },
    reducers: {
        readItems: async (state) => {
            const getData = await axios.get(process.env.REACT_APP_SERVER_URL + "/items/")
            state.value = getData.data
        }
    }
})

export const {readItems} = itemSlice.actions
export default itemSlice.reducer