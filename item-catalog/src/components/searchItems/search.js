import {React, useState} from 'react';
import "./searchBar.css"
import SearchIcon from '@mui/icons-material/Search';
import {useFormik} from "formik";
import * as yup from "yup"
import {Card, CardHeader, CardContent, Divider, Input, Icon, IconButton, Button, TextField} from "@mui/material"

const SearchBar = () => {

    
    return(<>
        <div class="searchBar">
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <SearchIcon/>
                <TextField/>
            </div>
        </div>"
    </>)
}

export default SearchBar;