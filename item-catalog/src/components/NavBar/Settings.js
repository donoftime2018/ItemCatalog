import {React, useState} from "react"
import { useNavigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings'
import { Tooltip, IconButton, MenuItem, Menu} from "@mui/material";


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
        navigate("/deleteAccount")
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
            disableScrollLock={true}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={deleteProfile} sx={{boxSizing: 'border-box'}}>
                Delete Account
            </MenuItem>
        </Menu>
    </>)
}


export default Settings