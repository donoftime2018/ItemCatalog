import {React} from "react";
import { useAuth } from "../context/user";
import { AppBar, Typography, IconButton, Box, Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";

const AppNav = () => {
    const auth = useAuth();

    const signOut = () => {
        auth.logout()
    }

    return(<>
        <AppBar sx={{paddingBottom: '10px', paddingTop:'0.4%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}  position="static">
            <Box sx={{marginLeft: '5%', fontSize: '20px'}}>
                Welcome, <Link style={{fontWeight: 'bold', color: 'white'}} to="/profile">{auth.user}</Link>
            </Box>
            <Box sx={{flexGrow: '1'}}/>
            <Box sx={{marginRight: '5%', display: {xs: 'none', md: 'flex'}}}>
                {/* <IconButton sx={{justifyContent: 'space-between'}}><AccountCircleIcon color="success" fontSize='large'></AccountCircleIcon></IconButton> */}
                <Button variant="contained" color="error" sx={{border: '1px solid black', borderRadius: '25px'}} onClick={signOut}>Log Out</Button>
            </Box>
        </AppBar>
    </>)
}

export default AppNav