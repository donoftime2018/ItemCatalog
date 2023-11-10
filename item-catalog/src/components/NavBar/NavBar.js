import {React} from "react";
import { useAuth } from "../context/user";
import { useLocation, useNavigate } from "react-router-dom";
import { AppBar, IconButton, Tooltip, Box, Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import Settings from "./Settings";

const AppNav = () => {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    
    const user = auth.user

    const signOut = () => {
        auth.logout()
    }

    const goToProfile = () => {
        navigate('/profile')
    }

    const dashBoardNav = () => {
       return(<>
        <AppBar sx={{paddingBottom: '10px', paddingTop:'0.4%', display: 'flex', flexDirection: 'row', alignItems: 'center'}} color="primary" position="sticky">
            <Box sx={{marginLeft: '5%', fontSize: '20px', display: 'flex',  alignItems: 'center'}}>
               <Tooltip title="Go to Profile"><IconButton onClick={goToProfile} color="inherit"><AccountCircleIcon fontSize="large"></AccountCircleIcon></IconButton></Tooltip>
               <div>Welcome, <span style={{fontWeight: 'bold'}}>{user}</span></div>
            </Box>
            <Box sx={{flexGrow: '1'}}/>
            <Box sx={{ marginRight: '5%', display: {xs: 'none', md: 'flex', alignItems: 'center'}, alignItems: 'center'}}>
                <Button variant="contained" color="warning" sx={{border: '1px solid black', color: 'black', borderRadius: '25px'}} onClick={signOut}>Log Out</Button>
            </Box>
        </AppBar>
       </>)
    }

    const profileNav = () => {
        return(<>
        <AppBar sx={{paddingBottom: '10px', paddingTop:'0.4%', display: 'flex', flexDirection: 'row', alignItems: 'center'}} color="primary" position="sticky">
            <Box sx={{marginLeft: '5%', fontSize: '20px', display: 'flex', justifyContent: "space-between", alignItems: 'center'}}>
                <Link style={{fontWeight: 'bold', color: 'white'}} to="/">Return to Dashboard</Link>
            </Box>
            <Box sx={{flexGrow: '1'}}/>
            <Box sx={{marginRight: '5%', display: {xs: 'none', md: 'flex', alignItems: 'center'}}}>
                <Button variant="contained" color="warning" sx={{border: '1px solid black', color: 'black', borderRadius: '25px'}} onClick={signOut}>Log Out</Button>
                <Settings></Settings>
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