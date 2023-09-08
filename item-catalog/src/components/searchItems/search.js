import {React, useState} from 'react';
import "./searchBar.css"
import SearchIcon from '@mui/icons-material/Search';
import {useFormik} from "formik";
import * as yup from "yup"
import {Card, CardHeader, CardContent, Divider, Input, Icon, IconButton, Button, TextField} from "@mui/material"

const SearchBar = () => {

    const validation = () => yup.object({
        searchQuery: yup.string().required("Query must be filled out")
    })

    const formik = useFormik({
        initialValues: {
            searchQuery: ""
        },
        validationSchema: validation,
        onSubmit: (values)=>{
            
        }
    })

    
    return(<>
        <div class="searchBar">
            <div>
                <Card class="searchCard">
                    <CardHeader sx={{display: 'flex', textAlign: 'center'}} title="Search Items"></CardHeader>
                    <Divider/>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <IconButton type='Submit'><SearchIcon fontSize='large'/></IconButton>
                            <TextField
                                id="searchQuery"
                                name="searchQuery"
                                variant="outlined"
                                type="text"
                                label="Search"
                                value={formik.values.searchQuery}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.searchQuery && Boolean(formik.errors.searchQuery)}
                                helperText={formik.touched.searchQuery && formik.errors.searchQuery}
                                sx={{ backgroundColor: 'white', /*borderRadius: '25px'*/}} 
                                placeholder="Search query goes here..." 
                                disableUnderline="true" 
                            />
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>"
    </>)
}

export default SearchBar;