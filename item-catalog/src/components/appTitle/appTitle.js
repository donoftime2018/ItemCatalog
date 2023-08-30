import React from "react";
import Badge from "react-bootstrap/Badge"
import "bootstrap/dist/css/bootstrap.min.css"
import "./appTitle.css"

const Title = ({title}) => {
    return(<>
    <div class="titleBadge">   
        <Badge pill bg="primary" style={{padding: "2% 5%", border: '3px solid black', textShadow: '3px 2px black'}}><h1>{title}</h1></Badge>
    </div>
    </>)
}

export default Title;