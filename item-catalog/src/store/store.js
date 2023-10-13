import {configureStore} from "@reduxjs/toolkit"
import itemReducer from "./itemReducer"

export const store = configureStore({
    reducer: {
        items: [],

    }
})