import { createContext, useContext, useState } from "react";


const context = createContext()

export const ItemContext = ({children}) => {

    const [name, setItemName] = useState("");
    const [price, setItemPrice] = useState(0.0);
    const [desc, setItemDesc] = useState('');
    const [rating, setItemRating] = useState(0);
    const [id, setID] = useState("");
    const [dbID, setDBID] = useState("")
    const [lastUpdate, setLastUpdate] = useState(Date);

    return(<>
        <context.Provider value={[{name, setItemName}, {price, setItemPrice}, {desc, setItemDesc}, {rating, setItemRating}, {id, setID}, {dbID, setDBID}, {lastUpdate, setLastUpdate}]}>
            {children}
        </context.Provider>
    </>)
}

export const OfficialItem = () => {
    return useContext(context)
}

export default ItemContext;