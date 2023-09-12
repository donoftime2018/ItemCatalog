import { READ_ITEMS } from "./actionTypes";

const initialState = {
    items: []
}

const itemReducer = (state=initialState, action) => {
    switch(action.type){
        case READ_ITEMS:
            return {
                ...state,
                items: action.payload
            }

        default:
            return state;
    }
}

export default itemReducer;