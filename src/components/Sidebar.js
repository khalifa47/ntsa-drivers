import { Link } from "react-router-dom"
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import ListSubheader from '@mui/material/ListSubheader';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { useTheme } from '@mui/material/styles';

const Sidebar = ({ handleDrawerToggle, mobileOpen }) => {
    const theme = useTheme();
    const drawerWidth = 280;

    const options = [
        {
            name: 'Account Info',
            icon: <AccountBoxIcon style={{backgroundColor:theme.palette.primary.main}} fontSize={'small'}/>,
            suboptions: [
                <Link to="/my-dl">My Driving License</Link>, 
                <Link to="/account-management">Account Management</Link>
            ]
        },
        {
            name: 'License',
            icon: <CreditCardIcon style={{backgroundColor:theme.palette.primary.main}} fontSize={'small'}/>,
            suboptions: [
                <Link to="/apply-for-smart-dl">Smart Driving License Application</Link>, 
                <Link to="/renew-dl">Renew License</Link>
            ]
        },
        {
            name: 'New Drivers',
            icon: <AccessibilityNewIcon style={{backgroundColor:theme.palette.primary.main}} fontSize={'small'}/>,
            suboptions: [
                <Link to="/pdl-application">Application for PDL</Link>,
                <Link to="/test-booking">Test Booking</Link>
            ]
        }
    ];

    const drawer = (
        <div>
            <Toolbar sx={{ display: { xs: 'block', md: 'none' }, height: "70px" }} />
            <Box sx={{ overflow: 'auto' }}>
                {
                    options.map((option, i) => (
                        <List key={`option-${i}`}
                            subheader={
                                <ListSubheader sx={{ display: 'flex', justifyContent: "space-evenly", alignItems: "center", cursor: "default" }} component="div">
                                    <ListItemIcon>
                                        {option.icon}
                                    </ListItemIcon>
                                    <ListItemText sx={{'& .MuiListItemText-primary': {fontWeight:'900!important'}}} primary={option.name}/>
                                </ListSubheader>
                            }
                        >
                            {option.suboptions.map((suboption, i) => (
                                <ListItemButton key={`sub-option-${i}`} dense={true} >
                                    <ListItemText primary={suboption} />
                                </ListItemButton>
                            ))}
                        </List>
                    ))
                }
            </Box>
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        pt: '1rem',
                        width: drawerWidth,
                        background: theme.palette.primary.main,
                        color: "white",
                        '& svg': { color: 'white' }
                    }
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        pt: '1rem',
                        top: "70px",
                        background: 'linear-gradient(rgb(249, 169, 48), rgb(253, 216, 56))',
                        '& svg': { color: 'white' }
                    }
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}

export default Sidebar;