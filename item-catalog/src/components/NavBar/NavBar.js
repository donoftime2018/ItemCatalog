import {React} from "react";
import { useAuth } from "../context/user";
import { useLocation } from "react-router-dom";
import { AppBar, Typography, IconButton, Box, Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";

const AppNav = () => {
    const auth = useAuth();
    const location = useLocation();

    const signOut = () => {
        auth.logout()
    }

    const dashBoardNav = () => {
       return(<>
        <AppBar sx={{paddingBottom: '10px', paddingTop:'0.4%', display: 'flex', flexDirection: 'row', alignItems: 'center'}} color="primary" position="sticky">
            <Box sx={{marginLeft: '5%', fontSize: '20px'}}>
                Welcome, <Link style={{fontWeight: 'bold', color: 'white'}} to="/profile">{auth.user}</Link>
            </Box>
            <Box sx={{flexGrow: '1'}}/>
            <Box sx={{marginRight: '5%', display: {xs: 'none', md: 'flex'}}}>
                {/* <IconButton sx={{justifyContent: 'space-between'}}><AccountCircleIcon color="success" fontSize='large'></AccountCircleIcon></IconButton> */}
                <Button variant="contained" color="warning" sx={{border: '1px solid black', color: 'black', borderRadius: '25px'}} onClick={signOut}>Log Out</Button>
            </Box>
        </AppBar>
       </>)
    }

    const profileNav = () => {
        return(<>
        <AppBar sx={{paddingBottom: '10px', paddingTop:'0.4%', display: 'flex', flexDirection: 'row', alignItems: 'center'}} color="primary" position="sticky">
            <Box sx={{marginLeft: '5%', fontSize: '20px'}}>
                <Link style={{fontWeight: 'bold', color: 'white'}} to="/">Return to Dashboard</Link>
            </Box>
            <Box sx={{flexGrow: '1'}}/>
            <Box sx={{marginRight: '5%', display: {xs: 'none', md: 'flex'}}}>
                {/* <IconButton sx={{justifyContent: 'space-between'}}><AccountCircleIcon color="success" fontSize='large'></AccountCircleIcon></IconButton> */}
                <Button variant="contained" color="warning" sx={{border: '1px solid black', color: 'black', borderRadius: '25px'}} onClick={signOut}>Log Out</Button>
            </Box>
        </AppBar>
        </>)
    }

    return(<>
        {
            location.pathname === '/' ? 
            dashBoardNav()
            :
            profileNav()
        }
    </>)
}

export default AppNav