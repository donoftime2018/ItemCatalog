import {React, useState} from "react"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings'
import {DeleteForever, Edit} from '@mui/icons-material'
import { Tooltip, IconButton} from "@mui/material";


const Settings = () => {
    return (<>
        <Tooltip title="Settings"><IconButton><SettingsIcon fontSize="large"></SettingsIcon></IconButton></Tooltip>

        <Menu>
            <MenuItem sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <DeleteForever fontSize="large" />
                Delete Profile
            </MenuItem>
            <MenuItem sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Edit fontSize="large" />
                Edit Items
            </MenuItem>
        </Menu>
    </>)
}


export default Settings