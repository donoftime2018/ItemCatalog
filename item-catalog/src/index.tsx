import React from "react";
import { BrowserRouter } from "react-router-dom";
import {createRoot} from "react-dom/client"
import {Provider} from "react-redux"
import store from "./components/store/store";
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>

)