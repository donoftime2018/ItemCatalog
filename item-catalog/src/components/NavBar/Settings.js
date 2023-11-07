import {React, useState} from "react"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings'
import {DeleteForever, Edit} from '@mui/icons-material'
import { Tooltip, IconButton} from "@mui/material";


const Settings = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  

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
            <MenuItem sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Tooltip title="Delete Profile"><DeleteForever fontSize="large" /></Tooltip>
            </MenuItem>
        </Menu>
    </>)
}


export default Settings