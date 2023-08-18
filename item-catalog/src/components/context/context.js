import { createContext, useContext, useState } from "react";


const context = createContext()

export const ItemContext = ({children}) => {

    const [name, setItemName] = useState("");
    const [price, setItemPrice] = useState(0.0);
    const [desc, setItemDesc] = useState('');

    return(<>
        <context.Provider value={[{name, setItemName}, {price, setItemPrice}, {desc, setItemDesc}]}>
            {children}
        </context.Provider>
    </>)
}

export const OfficialItem = () => {
    return useContext(context)
}

export default ItemContext;