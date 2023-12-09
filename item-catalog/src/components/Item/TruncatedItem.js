import React from "react";
import {Card, CardContent, Divider, Box} from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import "./Item.css"

const TruncatedItem = ({itemName, itemDesc, itemPoster, itemPrice, itemRating}) => {
    <Card class="itemCard">
        <CardContent>
            <div style={{flexDirection: 'column'}}>
                <span style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>{itemName}</span>
                <span style={{fontSize: '20px', display: 'flex', textAlign: 'center', justifyContent: 'center'}}>Posted by: {itemPoster}</span>
            </div>
        </CardContent>
        <Divider></Divider>
        <CardContent>
            <span style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>Avg. Market Price: ${itemPrice.toFixed(2)}</span>
        </CardContent>
        <Divider></Divider>
        <CardContent sx={{paddingBottom: '1px'}}>
            <span style={{fontSize: '20px', display: 'flex', textAlign: 'center', justifyContent: 'center'}}>{itemDesc}</span>
        </CardContent>
        <Divider></Divider>
        <CardContent style={{display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center'}}>
            <ThumbUpIcon fontSize="large" color="success"></ThumbUpIcon><Box flexGrow='0.02'/>{itemRating}
        </CardContent>
    </Card>
}

export default TruncatedItem;