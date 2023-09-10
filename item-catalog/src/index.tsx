import React from "react";
import { BrowserRouter } from "react-router-dom";
import {createRoot, Root} from "react-dom/client"
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    // <React.StrictMode>
        <BrowserRouter>
                <App/>
        </BrowserRouter>
    // </React.StrictMode>
)