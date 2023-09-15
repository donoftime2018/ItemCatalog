import { READ_ITEMS, SEARCH_ITEMS } from "./actionTypes";

const initialState = {
    items: [],
    searchKeyword: ''
}

const itemReducer = (state=initialState, action) => {
    switch(action.type){
        case READ_ITEMS:
            return {
                ...state,
                items: action.payload
            }

        case SEARCH_ITEMS:
            return {
                ...state,
                searchKeyword: action.payload
            }
        default:
            return state;
    }
}

export default itemReducer;