import { READ_ITEMS } from "./actionTypes";

export const readItems = (items) => {
    return{
        type: READ_ITEMS,
        payload: items
    }
}