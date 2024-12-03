import React from "react";
import { BrowserRouter } from "react-router-dom";
import {createRoot} from "react-dom/client"
import App from "./App";
import 'dotenv/config'

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)