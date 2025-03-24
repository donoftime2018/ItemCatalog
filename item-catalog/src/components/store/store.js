import {configureStore} from "@reduxjs/toolkit"
import itemReducer from "../features/itemSlice"

export default configureStore({
    reducer: {
        items: itemReducer
    }
})