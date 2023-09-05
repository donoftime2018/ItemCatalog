import React from "react";
import { BrowserRouter } from "react-router-dom";
import {createRoot, Root} from "react-dom/client"
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    // </React.StrictMode>
)