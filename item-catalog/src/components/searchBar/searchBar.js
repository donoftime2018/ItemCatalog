import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../features/itemSlice";
import SearchIcon from '@mui/icons-material/Search';
import { useState, useRef, useEffect } from "react";
import {Card, CardHeader, CardContent, Divider, IconButton, TextField, Tooltip} from "@mui/material"
import { useSearchParams } from "react-router-dom";
import {useFormik} from "formik";

const SearchBar = () => {

    const [searchParams, setSearchParams] = useSearchParams({items: "", poster: ""})
    const [isQueried, setIsQueried] = useState(false)

    const searchQuery = (itemQuery="", posterQuery="") => {

        if (itemQuery !== "")
        {
            setIsQueried(true);
            setSearchParams(prev => {
                prev.set("items", itemQuery)
                return prev
            }, {replace: true})
        }

        if (posterQuery !== "")
        {
            setIsQueried(true);
            setSearchParams(prev => {
                prev.set("poster", posterQuery)
                    return prev
            }, {replace: true})
        }

        if (posterQuery === "")
        {
            setSearchParams(prev => {
                prev.set("poster", posterQuery)
                    return prev
            }, {replace: true})
        }

        if (itemQuery === "")
        {
            setSearchParams(prev => {
                prev.set("items", itemQuery)
                return prev
            }, {replace: true})
        }

        if (itemQuery === "" && posterQuery === "")
        {
            setIsQueried(false)
            setSearchParams(prev => {
                prev.delete("items")
                prev.delete("poster")
                return prev
            },{replace: true})
        }
    }

    const formik = useFormik({
        initialValues: {
            itemQuery: "",
            posterQuery: ""
        },
        onSubmit: (values)=>{
            searchQuery(values.itemQuery, values.posterQuery);
        }
    })

    return (<>
        <div class="searchBar">
            <div>
                <Card class="searchCard">
                    <CardHeader sx={{display: 'flex', textAlign: 'center'}} title="Search Items"></CardHeader>
                    <Divider/>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                            <Tooltip title="Search Items"><IconButton type="submit"><SearchIcon fontSize='large'/></IconButton></Tooltip>
                            <TextField
                                id="itemQuery"
                                name="itemQuery"
                                variant="outlined"
                                type="text"
                                label="Search Item"
                                value={formik.values.itemQuery}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.itemQuery && Boolean(formik.errors.itemQuery)}
                                helperText={formik.touched.itemQuery && formik.errors.itemQuery}
                                sx={{ backgroundColor: 'white'}} 
                                placeholder="Item here..." 
                                disableUnderline="true" 
                            />
                            </div>

                            <div style={{display: 'flex', justifyContent: 'end', marginBottom: '-3%'}}>
                            <TextField
                                id="posterQuery"
                                name="posterQuery"
                                variant="outlined"
                                type="text"
                                label="Search Poster"
                                value={formik.values.posterQuery}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.posterQuery && Boolean(formik.errors.posterQuery)}
                                helperText={formik.touched.posterQuery && formik.errors.posterQuery}
                                sx={{ backgroundColor: 'white'}} 
                                placeholder="Poster here..." 
                                disableUnderline="true" 
                            />
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    </>)
}

export default SearchBar