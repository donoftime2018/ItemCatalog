import FlagIcon from '@mui/icons-material/Flag';
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";
import {Tooltip, Card, CardHeader, CardContent, Button, FormGroup, FormControlLabel, Checkbox, Divider} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import * as yup from "yup"
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';
import {useFormik} from "formik";
import "./reportItem.css"

const ReportItem = () => {
    const [open, setOpen] = useState(false);

    const schema = yup.object().shape({
        sexual: yup.string(),
        inappropriate: yup.string(),
        harmfulOrDangerous: yup.string()
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            sexual: "",
            inappropriate: "",
            harmfulOrDangerous: ""
        },
        validationSchema: schema,
        onSubmit: (values, action) => {
            submitReport(values.sexual, values.inappropriate, values.harmfulOrDangerous)
        }
    })
    
    const closeForm = () => {
        formik.resetForm()
        formik.setTouched({}, false)
        setOpen(false)
    }

    const openForm = () => {
        setOpen(true)
    }

    const submitReport = (sexual, inappropriate, harmful) => {
        if (!sexual && !inappropriate && !harmful)
        {
            alert("You must select at least one reason to report this item!")
        }

        else
        {
            closeForm()            
        }
    }

    return (<>
        <Tooltip title="Report Item (WIP)">
            <IconButton onClick={openForm}>
                <FlagIcon color='error' fontSize='large'></FlagIcon>
            </IconButton>
        </Tooltip>

        
        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 100 }} open={open}>
            <div class="formLayout">
                <Tooltip title="Close Report Item (WIP)"><IconButton onClick={closeForm}><CancelIcon sx={{fontSize: 60, color: 'white'}}></CancelIcon></IconButton></Tooltip>
                <Card class="reportFormStyle">
                    <CardHeader sx={{textAlign: 'center'}} title="Report Item (WIP)"></CardHeader>
                    <Divider></Divider>
                    <CardContent style={{display: 'flex', justifyContent: 'center', padding: '0px'}}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <FormControlLabel control={
                                    <Checkbox
                                        name="sexual"
                                        id="sexual"
                                        value="sexual"
                                        onChange={(e)=>{formik.setFieldValue("sexual", e.target.value)}}
                                        checked={formik.values.sexual}
                                    />
                                } 
                            label="Sexual Content"
                            onChange={formik.handleChange}
                            >
                            </FormControlLabel>

                            <FormControlLabel control={
                                <Checkbox
                                    name="inappropriate"
                                    id="inappropriate"
                                    value="inappropriate"
                                    onChange={(e)=>{formik.setFieldValue("inappropriate", e.target.value)}}
                                    checked={formik.values.inappropriate}
                                />
                            } 
                            label="Inappropriate Content"
                            onChange={formik.handleChange}
                            >
                            </FormControlLabel>

                            <FormControlLabel control={
                                <Checkbox
                                    name="harmfulOrDangerous"
                                    id="harmfulOrDangerous"
                                    value="harmfulOrDangerous"
                                    onChange={(e)=>{formik.setFieldValue("harmfulOrDangerous", e.target.value)}}
                                    checked={formik.values.harmfulOrDangerous}
                                />
                            } 
                            label="Potentially Harmful or Dangerous Content"
                            onChange={formik.handleChange}
                            >
                            </FormControlLabel>
                        </FormGroup>

                        <div style={{display: 'flex', justifyContent: 'center', padding: '10px'}}>
                            <Button type="Submit" variant="contained" color="error" sx={{borderRadius: '25px', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Submit Report</Button>
                        </div>
                    </form> 
                    </CardContent>
                </Card>
            </div>
        </Backdrop>
    </>)
}

export default ReportItem