import React from "react";
import Badge from "react-bootstrap/Badge"
import "bootstrap/dist/css/bootstrap.min.css"
import "./appTitle.css"
import { Component } from "react";

const Title = ({title}) => {
    return(<>
    <div class="titleBadge">   
        <Badge bg="primary" style={{padding: "2% 5%", border: '3px solid black', textShadow: '3px 2px black'}}>
            <div>
                <h1 style={{textDecoration: 'underline'}}>{title}</h1>
                {/* <p>{titleDesc}</p> */}
            </div>
        </Badge>

    </div>
    </>)
}

export class AppTitle extends React.Component {
    render(){
        return(<>
            <div class="titleBadge">   
                <Badge pill bg="primary" style={{padding: "2% 5%", border: '3px solid black', textShadow: '3px 2px black'}}>
                    <div>
                        <h1 style={{textDecoration: 'underline'}}>{this.props.title}</h1>
                        <p>{this.props.titleDesc}</p>
                    </div>
                </Badge>

            </div>
        </>)
    }


}

export default Title;