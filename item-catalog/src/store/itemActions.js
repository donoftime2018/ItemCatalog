import { READ_ITEMS, SEARCH_ITEMS } from "./actionTypes";

export const readItems = (items) => {
    return{
        type: READ_ITEMS,
        payload: items
    }
}

export const searchItems = (searchKeyword) => {
    return{
        type: SEARCH_ITEMS,
        payload: searchKeyword
    }
}