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
    
    const closeForm = () => {
        setOpen(false)
    }

    const openForm = () => {
        setOpen(true)
    }

    return (<>
        <Tooltip title="Report Item">
            <IconButton onClick={openForm}>
                <FlagIcon color='error' fontSize='large'></FlagIcon>
            </IconButton>
        </Tooltip>

        
        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 100 }} open={open}>
            <div class="formLayout">
                <Tooltip title="Close Report Item"><IconButton onClick={closeForm}><CancelIcon sx={{fontSize: 60, color: 'white'}}></CancelIcon></IconButton></Tooltip>
                <Card class="reportFormStyle">
                    <CardHeader sx={{textAlign: 'center'}} title="Report Item"></CardHeader>
                    <Divider></Divider>
                    <CardContent>
                    <form>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox/>} label="Sexual or Inappropriate Content"></FormControlLabel>
                                <Divider></Divider>
                                <FormControlLabel control={<Checkbox/>} label="Potentially Dangerous Content"></FormControlLabel>
                                <Divider></Divider>
                            </FormGroup>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'center'}}>
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