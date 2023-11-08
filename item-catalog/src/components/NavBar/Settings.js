import {React, useState} from "react"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings'
import {DeleteForever, Edit, PersonRemove} from '@mui/icons-material'
import { Tooltip, IconButton} from "@mui/material";


const Settings = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const deleteProfile = () => {
        navigate("/deleteProfile")
    }
  

    return (<>
        <Tooltip title="Settings">
            <IconButton 
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color="inherit">
                <SettingsIcon fontSize="large"></SettingsIcon>
            </IconButton>
            </Tooltip>

        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={deleteProfile} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                Delete Account
            </MenuItem>
        </Menu>
    </>)
}


export default Settings