import React from "react";
import Badge from "react-bootstrap/Badge"
import "bootstrap/dist/css/bootstrap.min.css"
import "./appTitle.css"

const Title = ({title}) => {
    return(<>
    <div class="titleBadge">   
        <Badge bg="primary" style={{padding: "2% 5%", border: '3px solid black', textShadow: '3px 2px black'}}>
            <div>
                <h1 style={{textDecoration: 'underline'}}>{title}</h1>
            </div>
        </Badge>

    </div>
    </>)
}

export default Title;