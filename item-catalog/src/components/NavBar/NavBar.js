import {React} from "react";
import { useAuth } from "../context/user";
import { AppBar, Typography, Box, Button } from "@mui/material";

const AppNav = () => {
    const auth = useAuth();

    const signOut = () => {
        auth.logout()
    }

    return(<>
        <AppBar sx={{paddingBottom: '10px', paddingTop:'0.4%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}  position="static">
            <Box sx={{marginLeft: '5%', fontSize: '20px'}}>
                {auth.user}
            </Box>
            <Box sx={{flexGrow: '1'}}/>
            <Box sx={{marginRight: '5%', display: {xs: 'none', md: 'flex'}}}>
                <Button variant="contained" color="error" sx={{border: '1px solid black', borderRadius: '25px'}} onClick={signOut}>Logout</Button>
            </Box>
        </AppBar>
    </>)
}

export default AppNav