import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import ListSubheader from '@mui/material/ListSubheader';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";

const Sidebar = ({ handleDrawerToggle, mobileOpen }) => {
    const drawerWidth = 250;

    const options = [
        {
            name: 'Account Info',
            icon: <AccountBoxIcon />,
            suboptions: [
                "My DL", "Account Management"
            ]
        },
        {
            name: 'License',
            icon: <CreditCardIcon />,
            suboptions: [
                "Renewal", "Smart DL"
            ]
        },
        {
            name: 'New Drivers',
            icon: <AccessibilityNewIcon />,
            suboptions: [
                "Application for PDL", "Test Booking"
            ]
        }
    ];

    const drawer = (
        <div>
            <Toolbar sx={{ display: { xs: 'block', md: 'none' }, height: "70px" }} />
            <Box sx={{ overflow: 'auto' }}>
                {
                    options.map(option => (
                        <List
                            subheader={
                                <ListSubheader sx={{ background: '#98ffc5', display: 'flex', justifyContent: "space-evenly", alignItems: "center", cursor: "default" }} component="div">
                                    <ListItemIcon>
                                        {option.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={option.name} />
                                </ListSubheader>
                            }
                        >
                            {option.suboptions.map(suboption => (
                                <ListItemButton key={suboption} dense={true}>
                                    <ListItemText primary={suboption} />
                                </ListItemButton>
                            ))}
                        </List>
                    ))
                }
                {/* <List
                    sx={{ background: '#47b376' }}
                    subheader={
                        <ListSubheader sx={{ background: '#47b376', color: "white" }} component="div">
                            <ListItemIcon>
                                {option.icon}
                            </ListItemIcon>
                            <ListItemText primary={option.name} />
                            Nested List Items
                        </ListSubheader>
                    }
                >
                    {options.map(option => (
                        <ListItemButton key={option.name}>
                            <ListItemIcon>
                                {option.icon}
                            </ListItemIcon>
                            <ListItemText primary={option.name} />
                        </ListItemButton>
                    ))}
                </List> */}
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
                        boxShadow: 5,
                        width: drawerWidth,
                        background: '#47b376',
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
                        boxShadow: 5,
                        width: drawerWidth,
                        top: "70px",
                        background: '#47b376',
                        color: "white",
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