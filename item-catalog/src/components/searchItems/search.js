import {React, useState} from 'react';
import "./searchBar.css"
import SearchIcon from '@mui/icons-material/Search';
import {useFormik} from "formik";
import * as yup from "yup"
import {Card, CardHeader, CardContent, Divider, Input, Icon, IconButton, Button, TextField} from "@mui/material"

const SearchBar = () => {

    
    return(<>
        <div class="searchBar">
            <div>
                <Card class="searchCard">
                    <CardHeader sx={{display: 'flex', textAlign: 'center'}} title="Search Items"></CardHeader>
                    <Divider/>
                    <CardContent>
                        <IconButton><SearchIcon fontSize='large'/></IconButton>
                        <TextField
                            id="item_name"
                            name="item_name"
                            variant="outlined"
                            type="text"
                            label="Search"
                            // value={formik.values.item_name}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // error={formik.touched.item_name && Boolean(formik.errors.item_name)}
                            // helperText={formik.touched.item_name && formik.errors.item_name}
                            sx={{ backgroundColor: 'white', /*borderRadius: '25px'*/}} 
                            placeholder="Search query goes here..." 
                            disableUnderline="true" 
                        />
                    </CardContent>
                </Card>
            </div>
        </div>"
    </>)
}

export default SearchBar;