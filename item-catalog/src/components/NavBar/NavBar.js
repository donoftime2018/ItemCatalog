import {React} from "react";
import { useAuth } from "../context/user";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AppBar, Box, Button } from "@mui/material";
import Settings from "./Settings";
import "bootstrap/dist/css/bootstrap.min.css"

const AppNav = () => {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    
    const user = auth.user

    const signOut = () => {
        auth.logout()
        navigate("/login", {replace: true})
    }

    const goToProfile = () => {
        navigate('/profile')
    }

    const dashBoardNav = () => {
       return(<>
        <AppBar sx={{paddingBottom: '10px', paddingTop:'0.4%', display: 'flex', flexDirection: 'row', alignItems: 'center'}} color="primary" position="sticky">
        <Box sx={{marginLeft: '5%', fontSize: '20px', display: 'flex',  alignItems: 'center', justifyContent: 'space-between', gap: '20px'}}>
            <Button variant="contained" color="success" sx={{border: '1px solid black', color: 'white', borderRadius: '25px'}} onClick={goToProfile}>Go to Profile</Button>
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
                <Link style={{fontWeight: 'bold', color: 'white'}} to="/">Go to Dashboard</Link>
            </Box>
            <Box sx={{flexGrow: '1'}}/>
            <Box sx={{marginRight: '5%', display: {xs: 'none', md: 'flex', alignItems: 'center'}}}>
                <Button variant="contained" color="warning" sx={{border: '1px solid black', color: 'black', borderRadius: '25px'}} onClick={signOut}>Log Out</Button>
                {
                    location.pathname === '/profile' ? 
                    <>
                        <Settings></Settings>
                    </> 
                    : 
                    <></>
                }
            </Box>
        </AppBar>
        </>)
    }

    return(<>
        {
            location.pathname === '/'  ? 
            dashBoardNav()
            :
            profileNav()
        }
    </>)
}

export default AppNav