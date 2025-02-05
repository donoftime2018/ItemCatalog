import React from "react";
import { BrowserRouter } from "react-router-dom";
import {createRoot} from "react-dom/client"
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <GoogleOAuthProvider clientId="281759591846-n3rr2thcenv8amtpt863rou8e0sqotc5.apps.googleusercontent.com">
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </GoogleOAuthProvider>

)