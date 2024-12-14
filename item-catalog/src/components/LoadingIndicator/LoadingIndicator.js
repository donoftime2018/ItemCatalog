import React from "react"
import {OrbitProgress} from "react-loading-indicators"
import "./LoadingIndicator.css"

const LoadingIndicator = () => {
    return (<>
        <div class="loadingIndicator">
            <OrbitProgress color="#32cd32" size="large" text="" textColor="" />
        </div>
    </>)
}

export default LoadingIndicator;